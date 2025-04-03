'use client'

import React, { useState, useEffect, useRef } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import ModalButton from '../reusable_components/ModalButton';



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
    const [inputValue, setInputValue] = useState('');
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleNumberClick = (num: number) => {
        if (isRunning) return;

        // Se è un valore preimpostato, azzera prima il timer
        if (num >= 30) {
            setInputValue('');
            const minutes = Math.floor(num / 60);
            const seconds = num % 60;
            setTime({ hours: 0, minutes, seconds });
            return;
        }

        setInputValue(prev => {
            const newValue = (prev + num).slice(-6); // Mantiene solo gli ultimi 6 numeri

            // Gestione del tempo in base alla lunghezza dell'input
            if (newValue.length <= 2) {
                // Se 1-2 numeri: interpreta come secondi
                const seconds = parseInt(newValue);
                if (seconds >= 60) {
                    const minutes = Math.floor(seconds / 60);
                    const remainingSeconds = seconds % 60;
                    setTime({ hours: 0, minutes, seconds: remainingSeconds });
                } else {
                    setTime({ hours: 0, minutes: 0, seconds });
                }
            } else if (newValue.length <= 4) {
                // Se 3-4 numeri: interpreta come minuti e secondi
                const totalSeconds = parseInt(newValue);
                const minutes = Math.floor(totalSeconds / 60);
                const seconds = totalSeconds % 60;
                setTime({ hours: 0, minutes, seconds });
            } else {
                // Se 5-6 numeri: interpreta come ore, minuti e secondi
                const hours = parseInt(newValue.slice(0, 2));
                const minutes = parseInt(newValue.slice(2, 4));
                const seconds = parseInt(newValue.slice(4, 6));
                setTime({ hours, minutes, seconds });
            }

            return newValue;
        });
    };

    const clearInput = () => {
        setInputValue('');
        setTime({ hours: 0, minutes: 0, seconds: 0 });
    };

    const startTimer = () => {
        if (time.hours === 0 && time.minutes === 0 && time.seconds === 0) return;
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
        setInputValue('');
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

    // Funzione per formattare il tempo da mostrare
    const formatDisplayTime = () => {
        if (isRunning || !isCompleted) {
            return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
        }

        if (inputValue === '') {
            return `${time.hours.toString().padStart(2, '0')}:${time.minutes.toString().padStart(2, '0')}:${time.seconds.toString().padStart(2, '0')}`;
        }

        return inputValue.padStart(6, '0').replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2:$3');
    };

    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-bg-primary-opacity z-10 flex justify-center items-center p-4" onClick={closeComponent}>
            <div className="bg-bg-modal rounded-lg p-8 relative max-w-md w-full" onClick={(e) => e.stopPropagation()}>
                <IoMdCloseCircle className='absolute top-2 right-2 text-btn-exit hover:text-btn-exit-hover text-2xl cursor-pointer' onClick={closeComponent} />
                <div className="flex flex-col items-center gap-4">
                    <div className="w-40 h-40 flex justify-center items-center border-4 border-btn-accent bg-bg-primary rounded-full">
                        <h1 className='text-xl font-bold text-text-primary'>
                            {formatDisplayTime()}
                        </h1>
                    </div>

                    <div className='bg-black rounded-md p-2 flex flex-wrap justify-center gap-2 w-full'>
                        {[
                            { display: '30s', value: 30 },
                            { display: '1m', value: 60 },
                            { display: '1m20s', value: 80 },
                            { display: '2m', value: 120 },
                            { display: '5m', value: 300 },
                        ].map((item) => (
                            <button
                                key={item.value}
                                onClick={() => handleNumberClick(item.value)}
                                disabled={isRunning || !isCompleted}
                                className="border-2 border-border-primary hover:bg-bg-secondary w-16 font-bold h-16 flex justify-center items-center hover:text-text-secondary text-text-primary p-2 rounded-full hover:bg-bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {item.display}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-48">
                        {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => (
                            <button
                                key={num}
                                onClick={() => handleNumberClick(num)}
                                disabled={isRunning || !isCompleted}
                                className="bg-bg-primary hover:bg-bg-secondary hover:text-text-secondary text-text-primary p-4 rounded-lg hover:bg-bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            onClick={clearInput}
                            disabled={isRunning || !isCompleted}
                            className="bg-btn-accent hover:bg-btn-accent-hover text-text-secondary p-4 rounded-lg hover:bg-bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            C
                        </button>
                        <button
                            onClick={() => handleNumberClick(0)}
                            disabled={isRunning || !isCompleted}
                            className="bg-bg-primary hover:bg-bg-secondary hover:text-text-secondary text-text-primary p-4 rounded-lg hover:bg-bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            0
                        </button>
                        <button
                            onClick={() => setInputValue(prev => prev.slice(0, -1))}
                            disabled={isRunning || !isCompleted}
                            className="bg-btn-accent hover:bg-btn-accent-hover text-text-secondary p-4 rounded-lg hover:bg-bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            ←
                        </button>
                    </div>

                    {(!isRunning && (isCompleted || (time.hours === 0 && time.minutes === 0 && time.seconds === 0))) ? (
                        <div className='w-full flex justify-center items-center'>
                            <ModalButton text='Start' onClick={startTimer} isAdd />
                        </div>
                    ) : (
                        <div className="flex gap-2">
                            <ModalButton text='Stop' onClick={cancelTimer} isAdd={false} />
                            {isRunning ?
                                <ModalButton text='Pausa' onClick={pauseTimer} isAdd />
                                :
                                <ModalButton text='Riprendi' onClick={pauseTimer} isAdd />
                            }

                        </div>
                    )}
                </div>
                <audio ref={audioRef} src="/sounds/alert.mp3" />
            </div>
        </div>
    );
}