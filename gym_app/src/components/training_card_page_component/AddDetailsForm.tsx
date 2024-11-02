import React, { useState } from 'react';
import AddRemoveButton from '../reusable_components/AddRemoveButton';

interface Workout {
    sets: number;
    reps: number;
    weight: string;
}

interface AddDetailsFormProps {
    onAddWorkout: (workout: Omit<Workout, 'sets'>) => void;
    onCancel: () => void;
}

export default function AddDetailsForm({ onAddWorkout, onCancel }: AddDetailsFormProps) {
    const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'sets'>>({ reps: 0, weight: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewWorkout({ ...newWorkout, [name]: name === 'weight' ? value : parseInt(value) });
    };

    const handleSubmit = () => {
        if (newWorkout.reps && newWorkout.weight) {
            onAddWorkout(newWorkout);
            setNewWorkout({ reps: 0, weight: '' });
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0 bg-white rounded-lg w-full text-black p-4 flex flex-col gap-2 items-center shadow-lg z-10">
            <label className='uppercase font-bold' htmlFor="reps">reps</label>
            <input
                type="number"
                name="reps"
                value={newWorkout.reps}
                onChange={handleChange}
                placeholder="Reps"
                className="border p-1 rounded-lg"
            />
            <label className='uppercase font-bold' htmlFor="weight">weight</label>
            <input
                type="text"
                name="weight"
                value={newWorkout.weight}
                onChange={handleChange}
                placeholder="Weight"
                className="border p-1 rounded-lg"
            />
            <div className="flex gap-2">
                <AddRemoveButton text='add' isAdd onClick={handleSubmit} />
                <AddRemoveButton text='cancel' onClick={onCancel} />
            </div>
        </div>
    );
}