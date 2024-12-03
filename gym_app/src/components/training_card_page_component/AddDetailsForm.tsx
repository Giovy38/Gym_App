import React, { useState } from 'react';
import AddRemoveButton from '../reusable_components/AddRemoveButton';

interface Workout {
    sets: number;
    reps?: number;
    weight?: number;
    time?: number;
    km?: number;
}

interface AddDetailsFormProps {
    onAddWorkout: (workout: Omit<Workout, 'sets'>) => void;
    onCancel: () => void;
    cardio: boolean;
    haveBarbell: boolean
}

export default function AddDetailsForm({ onAddWorkout, onCancel, cardio, haveBarbell }: AddDetailsFormProps) {
    const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'sets'>>(
        cardio ? { time: 0, km: 0 } : { reps: 0, weight: 0 }
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'reps') {
            const parsedValue = parseInt(value, 10);
            if (!isNaN(parsedValue)) {
                setNewWorkout({ ...newWorkout, [name]: parsedValue });
            }
        } else {
            setNewWorkout({ ...newWorkout, [name]: value });
        }
    };

    const handleSubmit = () => {
        if ((cardio && newWorkout.time && newWorkout.km) || (!cardio && newWorkout.reps && newWorkout.weight)) {
            onAddWorkout(newWorkout);
            setNewWorkout(cardio ? { time: 0, km: 0 } : { reps: 0, weight: 0 });
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0 bg-white rounded-lg w-full text-black p-4 flex flex-col gap-2 items-center shadow-lg z-10">
            {cardio ? (
                <>
                    <label className='uppercase font-bold' htmlFor="time">time (min)</label>
                    <input
                        type="text"
                        name="time"
                        value={newWorkout.time}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Time in minutes"
                        className="border p-1 rounded-lg"
                    />
                    <label className='uppercase font-bold' htmlFor="km">km</label>
                    <input
                        type="text"
                        name="km"
                        value={newWorkout.km}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Kilometers"
                        className="border p-1 rounded-lg"
                    />
                </>
            ) : (
                <>
                    <label className='uppercase font-bold' htmlFor="reps">reps</label>
                    <input
                        type="number"
                        name="reps"
                        value={newWorkout.reps}
                        onChange={handleChange}
                        placeholder="Reps"
                        className="border p-1 rounded-lg"
                        step="1"
                    />
                    <div className='flex flex-col'>
                        <label className='uppercase font-bold' htmlFor="weight">Total weight</label>
                        {haveBarbell ? <label className='italic text-sm' htmlFor="weight">(Including barbell weight)</label> : null}
                    </div>
                    <input
                        type="text"
                        name="weight"
                        value={newWorkout.weight}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Weight"
                        className="border p-1 rounded-lg"
                    />
                </>
            )}
            <div className="flex gap-2">
                <AddRemoveButton text='add' isAdd onClick={handleSubmit} />
                <AddRemoveButton text='cancel' onClick={onCancel} />
            </div>
        </div>
    );
}