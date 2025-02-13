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
    setNumber: number;
    reps: number;
    weight: number;
    time?: number;
    distanceInKm?: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
}

interface SingleWorkout {
    sets: number;
    reps: number;
    weight: number;
}

export default function LastTrainingDetails({ cardio, latestTraining, exerciseId, haveBarbell }: { cardio: boolean, latestTraining: TrainingData, exerciseId: number, haveBarbell: boolean }) {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);
    const [showPreviousWorkout, setShowPreviousWorkout] = useState<boolean>(false);
    const [isSaved, setIsSaved] = useState<boolean>(false);
    const [lastWorkoutDetails, setLastWorkoutDetails] = useState<SingleWorkout[] | null>(null);

    useEffect(() => {
        const fetchLastWorkout = async () => {
            const res = await trainingCardService.getLastWorkout(latestTraining.id, exerciseId);

            const formattedWorkoutDetails = res.lastWorkout.map((workout) => ({
                sets: workout.setNumber,
                reps: workout.reps,
                weight: workout.weight,
            }));

            setLastWorkoutDetails(formattedWorkoutDetails);
        };
        fetchLastWorkout();
    }, [latestTraining.id, exerciseId, isSaved]);


    const handleDelete = (index: number) => {
        setIsSaved(false);
        const updatedWorkouts = workouts.filter((_, i) => i !== index);
        setWorkouts(updatedWorkouts.map((workout, i) => ({ ...workout, sets: i + 1 })));
    };

    const handleAddWorkout = (newWorkout: Omit<Workout, 'setNumber'>) => {
        setIsSaved(false);
        const newSetNumber = workouts.length + 1;
        const workoutWithSet: Workout = {
            setNumber: newSetNumber,
            reps: cardio ? 0 : newWorkout.reps,
            weight: cardio ? 0 : newWorkout.weight,
            time: cardio ? newWorkout.time : undefined,
            distanceInKm: cardio ? newWorkout.distanceInKm : undefined,
            exerciseType: newWorkout.exerciseType
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
        const duplicatedWorkout = { ...workoutToDuplicate, setNumber: newSetNumber };
        setWorkouts([...workouts, duplicatedWorkout]);
    };

    const handleSave = async () => {
        if (workouts.length === 0) return;

        try {
            const workoutSets = workouts.map((workout) => ({
                setNumber: workout.setNumber,
                reps: workout.exerciseType === 'cardio' ? Number(workout.time) || 0 : Number(workout.reps) || 0,
                weight: workout.exerciseType === 'cardio' ? Number(workout.distanceInKm) || 0 : Number(workout.weight) || 0
            }));

            console.log('Dati inviati:', {
                trainingId: latestTraining.id,
                exerciseId,
                workoutSets
            });

            const res = await trainingCardService.createNewWorkout(
                latestTraining.id,
                exerciseId,
                workoutSets
            );

            if (!res) {
                console.error('Nessuna risposta dal server durante l\'aggiunta del workout');
                setIsSaved(false);
                return;
            }

            setIsSaved(true);
            // Aggiorniamo i dati dell'ultimo allenamento
            const formattedWorkoutDetails = workoutSets.map((workout) => ({
                sets: workout.setNumber,
                reps: workout.reps,
                weight: workout.weight,
            }));
            setLastWorkoutDetails(formattedWorkoutDetails);
        } catch (error) {
            console.error('Errore dettagliato durante il salvataggio:', error);
            setIsSaved(false);
        }
    };



    return (
        <div className="relative flex flex-col items-center gap-2">
            {showForm && !showPreviousWorkout && (
                <AddDetailsForm onAddWorkout={handleAddWorkout} onCancel={handleCancel} cardio={cardio} haveBarbell={haveBarbell} />
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
                                    <th>Total Weight</th>
                                </>
                            )}
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {showPreviousWorkout ? (
                            lastWorkoutDetails && lastWorkoutDetails.length > 0 ? (
                                lastWorkoutDetails.map((workout, index) => (
                                    <tr key={`last-workout-${index}`}>
                                        <td>{workout.sets}</td>
                                        <td>{cardio ? workout.reps : workout.reps}</td>
                                        <td>{cardio ? workout.weight : workout.weight}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="text-center text-red-700 italic font-bold p-3">
                                        No previous workout found
                                    </td>
                                </tr>
                            )
                        ) : (
                            workouts.map((workout, index) => (
                                <tr key={`workout-${exerciseId}-${index}`}>
                                    <td>{workout.setNumber}</td>
                                    <td>{cardio ? workout.time : workout.reps}</td>
                                    <td>{cardio ? workout.distanceInKm : workout.weight}</td>
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
                        <p className='text-black font-bold'>{!isSaved ? 'Save' : 'Data Saved'}</p>
                        <HiCloudArrowUp
                            className={`${isSaved ? 'text-green-800' : 'text-slate-500'} text-3xl hover:${isSaved ? 'text-green-800' : 'text-slate-800'}`}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}