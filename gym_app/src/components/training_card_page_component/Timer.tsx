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

        if (name === "seconds" || name === "minutes") {
            if (parsedValue >= 60) {
                parsedValue = parsedValue % 60;
            }
        }

        setTime({ ...time, [name]: parsedValue });
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
        <div className="fixed inset-0 bg-[#000000e8] z-10 flex justify-center items-center">
            <div className="bg-white rounded-lg p-8 relative">
                <IoMdCloseCircle className='absolute top-2 right-2 text-red-500 text-2xl cursor-pointer' onClick={closeComponent} />
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                    <div className='flex flex-col gap-2'>
                        <label className='bg-black text-center rounded-lg text-white' htmlFor="hours">Hours:</label>
                        <input className='bg-slate-400 text-center rounded-md' type="number" name="hours" onChange={handleTimeChange} placeholder="h" disabled={isRunning || !isCompleted} />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <label className='bg-black text-center rounded-lg text-white' htmlFor="minutes">Minutes:</label>
                        <input className='bg-slate-400 text-center rounded-md' type="number" name="minutes" onChange={handleTimeChange} placeholder="m" max="59" disabled={isRunning || !isCompleted} />
                    </div>
                    <div className='flex flex-col justify-center gap-2'>
                        <label className='bg-black text-center rounded-lg text-white' htmlFor="seconds">Seconds:</label>
                        <input className='bg-slate-400 text-center rounded-md' type="number" name="seconds" onChange={handleTimeChange} placeholder="s" max="59" disabled={isRunning || !isCompleted} />
                    </div>
                </div>
                <div className="flex justify-center items-center my-4">
                    <div className="w-40 h-40 flex justify-center items-center border-4 border-black rounded-full">
                        <h1 className='text-xl font-bold text-black'>{`${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`}</h1>
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