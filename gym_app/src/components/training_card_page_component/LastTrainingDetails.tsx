'use client'

import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import AddDetailsForm from './AddDetailsForm';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { SiPastebin } from "react-icons/si";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import { HiCloudArrowUp } from "react-icons/hi2";






interface Workout {
    sets: number;
    reps?: number;
    weight?: number;
    time?: number;
    km?: number;
    cardio: boolean;
}

export default function LastTrainingDetails({ cardio }: { cardio: boolean }) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showPreviousWorkout, setShowPreviousWorkout] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);

    const handleDelete = (index: number) => {
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts.map((workout, i) => ({ ...workout, sets: i + 1 })));
    };

    const handleAddWorkout = (newWorkout: Omit<Workout, 'sets' | 'cardio'>) => {
        const newSetNumber = workouts.length + 1;
        const workoutWithSet = { ...newWorkout, sets: newSetNumber, cardio };
        setWorkouts([...workouts, workoutWithSet]);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    const toggleWorkoutView = () => {
        setShowPreviousWorkout(!showPreviousWorkout);
    };

    const handleDuplicateWorkout = (index: number) => {
        const workoutToDuplicate = workouts[index];
        const newSetNumber = workouts.length + 1;
        const duplicatedWorkout = { ...workoutToDuplicate, sets: newSetNumber };
        setWorkouts([...workouts, duplicatedWorkout]);
    };

    const handleSave = () => {
        setIsSaved(!isSaved);
    };

    return (
        <div className="relative flex flex-col items-center gap-2">
            {showForm && (
                <AddDetailsForm onAddWorkout={handleAddWorkout} onCancel={handleCancel} cardio={cardio} />
            )}

            <div className="bg-white rounded-lg w-full text-black p-2 flex flex-col gap-1 items-center">
                <div
                    className='bg-[#f8bf58] w-full flex items-center justify-center gap-5 p-1 rounded-lg cursor-pointer'
                    onClick={toggleWorkoutView}
                >
                    {showPreviousWorkout ? (
                        <>
                            <SiPastebin className='text-2xl' />
                            <h1 className='font-bold'>Current Workout</h1>
                            <IoMdArrowDropright className='text-2xl' />
                        </>
                    ) : (
                        <>
                            <IoMdArrowDropleft className='text-2xl' />
                            <h1 className='font-bold'>Previous Workout</h1>
                            <SiPastebin className='text-2xl' />
                        </>
                    )}
                </div>
                <h1 className="uppercase font-extrabold">
                    {showPreviousWorkout ? 'Previous Workout:' : 'Current Workout:'}
                </h1>

                <table className="w-full text-left ">
                    <thead>
                        <tr>
                            <th>Set</th>
                            {cardio ? (
                                <>
                                    <th>Time</th>
                                    <th>KM</th>
                                </>
                            ) : (
                                <>
                                    <th>Reps</th>
                                    <th>Weight</th>
                                </>
                            )}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((workout, index) => (
                            <tr key={index}>
                                <td>{workout.sets}</td>
                                {workout.cardio ? (
                                    <>
                                        <td>{workout.time}</td>
                                        <td>{workout.km}</td>
                                    </>
                                ) : (
                                    <>
                                        <td>{workout.reps}</td>
                                        <td>{workout.weight}</td>
                                    </>
                                )}
                                <td>
                                    <IoDownloadSharp
                                        className='text-blue-500 cursor-pointer'
                                        onClick={() => handleDuplicateWorkout(index)}
                                    />
                                </td>
                                <td>
                                    <RiDeleteBin5Fill
                                        className='text-red-600 cursor-pointer'
                                        onClick={() => handleDelete(index)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <IoAddCircle
                    className="text-green-500 text-2xl cursor-pointer hover:text-green-800 mb-2"
                    onClick={() => setShowForm(true)}
                />
                <div onClick={handleSave} className={`w-full flex items-center justify-end gap-2  rounded-lg p-1 cursor-pointer border-t-2 border-black`}>
                    <p className='text-black font-bold'>{!isSaved ? 'Salva' : 'Dati Aggiornati'}</p>
                    <HiCloudArrowUp
                        className={`${isSaved ? 'text-green-800' : 'text-slate-500'} text-3xl hover:${isSaved ? 'text-green-800' : 'text-slate-800'}`}

                    />
                </div>
            </div>
        </div>
    )
}