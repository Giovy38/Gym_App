'use client'

import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import AddDetailsForm from './AddDetailsForm';
import { RiDeleteBin5Fill } from "react-icons/ri";


interface Workout {
    sets: number;
    reps: number;
    weight: string;
}

export default function LastTrainingDetails() {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleDelete = (index: number) => {
        setWorkouts(workouts.filter((_, i) => i !== index));
    };

    const handleAddWorkout = (newWorkout: Omit<Workout, 'sets'>) => {
        const newSetNumber = workouts.length + 1;
        const workoutWithSet = { ...newWorkout, sets: newSetNumber };
        setWorkouts([...workouts, workoutWithSet]);
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    return (
        <div className="relative flex flex-col items-center gap-2">
            {showForm && (
                <AddDetailsForm onAddWorkout={handleAddWorkout} onCancel={handleCancel} />
            )}

            <div className="bg-white rounded-lg w-full text-black p-2 flex flex-col gap-1 items-center">
                <h1 className="uppercase font-extrabold">Last Workout:</h1>



                <table className="w-full text-left">
                    <thead>
                        <tr>
                            <th>Set</th>
                            <th>Reps</th>
                            <th>Weight</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {workouts.map((workout, index) => (
                            <tr key={index}>
                                <td>{workout.sets}</td>
                                <td>{workout.reps}</td>
                                <td>{workout.weight}</td>
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
                    className="text-green-500 text-2xl cursor-pointer hover:text-green-800"
                    onClick={() => setShowForm(true)}
                />
            </div>
        </div>
    )
}