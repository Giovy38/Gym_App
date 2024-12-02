'use client'

import React, { useState, useEffect } from 'react';
import { IoAddCircle } from "react-icons/io5";
import AddDetailsForm from './AddDetailsForm';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { SiPastebin } from "react-icons/si";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import { IoDownloadSharp } from "react-icons/io5";
import { HiCloudArrowUp } from "react-icons/hi2";
import { TrainingData } from '@/src/type/TrainingData.type';
import { trainingCardService } from '@/src/services/training-card.services';



interface Workout {
    sets: number;
    reps?: number;
    weight?: number;
    time?: number;
    km?: number;
    cardio: boolean;
}

interface WorkoutDetail {
    sets: number;
    reps: number;
    weight: string;
}





export default function LastTrainingDetails({ cardio, latestTraining, index }: { cardio: boolean, latestTraining: TrainingData, index: number }) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showPreviousWorkout, setShowPreviousWorkout] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [lastWorkoutDetails, setLastWorkoutDetails] = useState<WorkoutDetail[] | null>(null);

    useEffect(() => {
        const fetchLastWorkout = async () => {
            const res = await trainingCardService.GetLastWorkout(latestTraining.id, index)


            const formattedWorkoutDetails: WorkoutDetail[] = res.lastWorkout.map((workout: WorkoutDetail) => ({
                sets: workout.sets,
                reps: workout.reps,
                weight: workout.weight.toString(),
            }));

            setLastWorkoutDetails(formattedWorkoutDetails);
        };
        fetchLastWorkout();
    }, [latestTraining.id, index, isSaved]);


    const handleDelete = (index: number) => {
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts.map((workout, i) => ({ ...workout, sets: i + 1 })));
    };

    const handleAddWorkout = (newWorkout: Omit<Workout, 'sets' | 'cardio'>) => {
        const newSetNumber = workouts.length + 1;
        const workoutWithSet = {
            ...newWorkout,
            sets: newSetNumber,
            cardio,
            reps: cardio ? newWorkout.time : newWorkout.reps,
            weight: cardio ? newWorkout.km : newWorkout.weight,
        };
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

    const handleSave = async () => {
        setIsSaved(!isSaved);
        console.log('latestTraining', latestTraining);

        if (!isSaved) {
            const workoutData = workouts.map((workout) => ({
                sets: workout.sets,
                reps: workout.reps || 0,
                weight: workout.weight || 0,
            }));

            try {
                const res = await trainingCardService.AddNewWorkout(latestTraining.id, index, workoutData)
                if (!res) {
                    throw new Error('Error during the workout addition');
                }
            } catch (error) {
                console.error('Error during the workout addition:', error);
            }
        }
    };



    return (
        <div className="relative flex flex-col items-center gap-2">
            {showForm && !showPreviousWorkout && (
                <AddDetailsForm onAddWorkout={handleAddWorkout} onCancel={handleCancel} cardio={cardio} />
            )}

            <div className="bg-white rounded-lg w-full text-black p-2 flex flex-col gap-1 items-center">
                <div
                    className={`w-full flex items-center justify-center gap-5 p-1 rounded-lg cursor-pointer ${showPreviousWorkout ? 'bg-blue-500 hover:bg-blue-700' : 'bg-[#f8bf58] hover:bg-[#d4a347]'
                        }`}
                    onClick={toggleWorkoutView}
                >
                    {showPreviousWorkout ? (
                        <>
                            <SiPastebin className='text-2xl' />
                            <h1 className='font-bold'>Go to Current Workout</h1>
                            <IoMdArrowDropright className='text-2xl' />
                        </>
                    ) : (
                        <>
                            <IoMdArrowDropleft className='text-2xl' />
                            <h1 className='font-bold'>Go to Previous Workout</h1>
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
                        {showPreviousWorkout ? (
                            lastWorkoutDetails && lastWorkoutDetails.length > 0 ? (
                                lastWorkoutDetails.map((workout, index) => (
                                    <tr key={index}>
                                        <td>{workout.sets}</td>
                                        <td>{workout.reps}</td>
                                        <td>{workout.weight}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="text-center text-red-700 italic font-bold p-3">No previous workout found</td>
                                </tr>
                            )
                        ) : (
                            workouts.map((workout, index) => (
                                <tr key={index}>
                                    <td>{workout.sets}</td>
                                    <td>{workout.reps}</td>
                                    <td>{workout.weight}</td>
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
                            ))
                        )}
                    </tbody>
                </table>

                {!showPreviousWorkout && (
                    <IoAddCircle
                        className="text-green-500 text-2xl cursor-pointer hover:text-green-800 mb-2"
                        onClick={() => setShowForm(true)}
                    />
                )}
                {!showPreviousWorkout && (
                    <div onClick={handleSave} className={`w-full flex items-center justify-end gap-2  rounded-lg p-1 cursor-pointer border-t-2 border-black`}>
                        <p className='text-black font-bold'>{!isSaved ? 'Salva' : 'Dati Aggiornati'}</p>
                        <HiCloudArrowUp
                            className={`${isSaved ? 'text-green-800' : 'text-slate-500'} text-3xl hover:${isSaved ? 'text-green-800' : 'text-slate-800'}`}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}