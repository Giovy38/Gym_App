'use client'

import React, { useState, useEffect, useRef } from 'react';
import AddBlueButton from '../reusable_components/AddBlueButton';
import AddRemoveButton from '../reusable_components/AddRemoveButton';
import { IoMdCloseCircle } from "react-icons/io";


type TimerProps = {
    onClose: () => void,
    initialTime?: number
}

export default function Timer({ onClose, initialTime = 0 }: TimerProps) {
    const initialHours = Math.floor(initialTime / 3600);
    const initialMinutes = Math.floor((initialTime % 3600) / 60);
    const initialSeconds = initialTime % 60;

    const [time, setTime] = useState({ hours: initialHours, minutes: initialMinutes, seconds: initialSeconds });
    const [isRunning, setIsRunning] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [isCompleted, setIsCompleted] = useState(true);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let parsedValue = parseInt(value);

        if (isNaN(parsedValue)) {
            parsedValue = 0;
        }

        setTime(prevTime => {
            let { hours, minutes, seconds } = prevTime;

            if (name === "seconds") {
                seconds = parsedValue;
                if (seconds >= 60) {
                    minutes += Math.floor(seconds / 60);
                    seconds = seconds % 60;
                }
            }

            if (name === "minutes") {
                minutes = parsedValue;
                if (minutes >= 60) {
                    hours += Math.floor(minutes / 60);
                    minutes = minutes % 60;
                }
            }

            if (name === "hours") {
                hours = Math.max(0, parsedValue); // Assicura che le ore non siano negative
            }

            return { hours, minutes, seconds };
        });
    };

    const startTimer = () => {
        setIsRunning(true);
        setIsCompleted(false);
    };

    const pauseTimer = () => {
        setIsRunning(!isRunning);
    };

    const cancelTimer = () => {
        setIsRunning(false);
        setTime({ hours: 0, minutes: 0, seconds: 0 });
        setIsCompleted(true);
    };

    const closeComponent = () => {
        setIsVisible(false);
        onClose();
    };

    const adjustTime = (field: string, amount: number) => {
        setTime(prevTime => {
            let { hours, minutes, seconds } = prevTime;

            if (field === "seconds") {
                seconds += amount;
                if (seconds >= 60) {
                    minutes += Math.floor(seconds / 60);
                    seconds = seconds % 60;
                } else if (seconds < 0) {
                    if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else {
                        seconds = 0; // Assicura che i secondi non siano negativi
                    }
                }
            }

            if (field === "minutes") {
                minutes += amount;
                if (minutes >= 60) {
                    hours += Math.floor(minutes / 60);
                    minutes = minutes % 60;
                } else if (minutes < 0) {
                    if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                    } else {
                        minutes = 0; // Assicura che i minuti non siano negativi
                    }
                }
            }

            if (field === "hours") {
                hours = Math.max(0, hours + amount); // Assicura che le ore non siano negative
            }

            return { hours, minutes, seconds };
        });
    };

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setTime(prevTime => {
                    let { hours, minutes, seconds } = prevTime;
                    if (seconds > 0) {
                        seconds -= 1;
                    } else if (minutes > 0) {
                        minutes -= 1;
                        seconds = 59;
                    } else if (hours > 0) {
                        hours -= 1;
                        minutes = 59;
                        seconds = 59;
                    } else {
                        clearInterval(intervalRef.current!);
                        setIsRunning(false);
                        setIsCompleted(true);
                        if (audioRef.current) {
                            audioRef.current.play();
                        }
                    }
                    return { hours, minutes, seconds };
                });
            }, 1000);
        } else if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [isRunning]);

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-bg-primary-opacity z-10 flex justify-center items-center">
            <div className="bg-bg-secondary rounded-lg p-8 relative">
                <IoMdCloseCircle className='absolute top-2 right-2 text-btn-exit hover:text-btn-exit-hover text-2xl cursor-pointer' onClick={closeComponent} />
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className='flex flex-col gap-2 text-text-secondary'>
                        <label className='bg-bg-primary text-center rounded-lg text-text-primary' htmlFor="hours">Hours:</label>
                        <div className='flex items-center'>
                            <button onClick={() => adjustTime('hours', -1)} disabled={isRunning || !isCompleted}>-</button>
                            <input
                                className='bg-bg-input text-center rounded-md mx-2'
                                name="hours"
                                onChange={handleTimeChange}
                                value={time.hours}
                                disabled={isRunning || !isCompleted}
                            />
                            <button onClick={() => adjustTime('hours', 1)} disabled={isRunning || !isCompleted}>+</button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-2 text-text-secondary'>
                        <label className='bg-bg-primary text-center rounded-lg text-text-primary' htmlFor="minutes">Minutes:</label>
                        <div className='flex items-center'>
                            <button onClick={() => adjustTime('minutes', -1)} disabled={isRunning || !isCompleted}>-</button>
                            <input
                                className='bg-bg-input text-center rounded-md mx-2'
                                name="minutes"
                                onChange={handleTimeChange}
                                value={time.minutes}
                                max="59"
                                disabled={isRunning || !isCompleted}
                            />
                            <button onClick={() => adjustTime('minutes', 1)} disabled={isRunning || !isCompleted}>+</button>
                        </div>
                    </div>
                    <div className='flex flex-col justify-center gap-2 text-text-secondary'>
                        <label className='bg-bg-primary text-center rounded-lg text-text-primary' htmlFor="seconds">Seconds:</label>
                        <div className='flex items-center'>
                            <button onClick={() => adjustTime('seconds', -1)} disabled={isRunning || !isCompleted}>-</button>
                            <input
                                className='bg-bg-input text-center rounded-md mx-2'
                                name="seconds"
                                onChange={handleTimeChange}
                                value={time.seconds}
                                max="59"
                                disabled={isRunning || !isCompleted}
                            />
                            <button onClick={() => adjustTime('seconds', 1)} disabled={isRunning || !isCompleted}>+</button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center my-4">
                    <div className="w-40 h-40 flex justify-center items-center border-4 border-border-secondary rounded-full">
                        <h1 className='text-xl font-bold text-text-secondary'>{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</h1>
                    </div>
                </div>
                {(isCompleted) || (!isRunning && time.hours === 0 && time.minutes === 0 && time.seconds === 0) ? (
                    <div className='w-full flex justify-center items-center'>
                        <AddBlueButton text="Start" onClick={startTimer} />
                    </div>
                ) : (
                    <div>
                        <AddRemoveButton text='Play/Pause' onClick={pauseTimer} isAdd />
                        <AddRemoveButton text='Cancel' onClick={cancelTimer} isAdd={false} />
                    </div>
                )}
                <audio ref={audioRef} src="/sounds/alert.mp3" />
            </div>
        </div>
    );
}