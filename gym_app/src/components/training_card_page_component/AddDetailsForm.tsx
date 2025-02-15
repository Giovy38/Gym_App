import React, { useState } from 'react';
import AddRemoveButton from '../reusable_components/AddRemoveButton';

interface Workout {
    setNumber: number;
    reps: number;
    weight: number;
    time?: number;
    distanceInKm?: number;
    exerciseType: 'cardio' | 'stretching' | 'withBarbell' | 'withWeight';
}

interface AddDetailsFormProps {
    onAddWorkout: (workout: Omit<Workout, "setNumber">) => void;
    onCancel: () => void;
    cardio: boolean;
    haveBarbell: boolean
}

export default function AddDetailsForm({ onAddWorkout, onCancel, cardio, haveBarbell }: AddDetailsFormProps) {
    const [newWorkout, setNewWorkout] = useState<Omit<Workout, 'setNumber'>>(
        cardio
            ? { reps: 0, weight: 0, time: 0, distanceInKm: 0, exerciseType: 'cardio' }
            : { reps: 0, weight: 0, time: undefined, distanceInKm: undefined, exerciseType: 'withWeight' }
    );

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === '0') {
            e.target.value = '';
        }
    };

    const isFormValid = () => {
        if (cardio && newWorkout.time) {
            return newWorkout.time > 0;
        } else if (cardio && newWorkout.distanceInKm) {
            return newWorkout.distanceInKm > 0;
        }
        else if (!cardio && newWorkout.reps && newWorkout.weight) {
            return newWorkout.reps > 0 && newWorkout.weight > 0;
        }
        return false;
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
        if (isFormValid()) {
            onAddWorkout(newWorkout);
            setNewWorkout(cardio ? { reps: 0, weight: 0, time: 0, distanceInKm: 0, exerciseType: 'cardio' } : { reps: 0, weight: 0, time: undefined, distanceInKm: undefined, exerciseType: 'withWeight' });
        }
    };

    return (
        <div className="absolute top-0 left-0 right-0 bg-bg-secondary rounded-lg w-full text-text-secondary p-4 flex flex-col gap-2 items-center shadow-lg z-10">
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
                        className='border p-1 rounded-lg'
                    />
                    <label className='uppercase font-bold' htmlFor="km">km</label>
                    <input
                        type="text"
                        name="distanceInKm"
                        value={newWorkout.distanceInKm}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Kilometers"
                        className="border p-1 rounded-lg"
                    />
                </>
            ) : (
                <>
                    <label className='uppercase font-bold' htmlFor="reps">reps*</label>
                    <input
                        type="number"
                        name="reps"
                        value={newWorkout.reps}
                        onChange={handleChange}
                        placeholder="Reps"
                        className='border p-1 rounded-lg'
                        step="1"
                    />
                    <div className='flex flex-col'>
                        <label className='uppercase font-bold' htmlFor="weight">Total weight*</label>
                        {haveBarbell ? <label className='italic text-sm' htmlFor="weight">(Including barbell weight)</label> : null}
                    </div>
                    <input
                        type="text"
                        name="weight"
                        value={newWorkout.weight}
                        onFocus={handleFocus}
                        onChange={handleChange}
                        placeholder="Weight*"
                        className='border p-1 rounded-lg'
                    />
                </>
            )}
            <div className="flex gap-2 w-full">
                <AddRemoveButton text='add' isAdd onClick={handleSubmit} disabled={!isFormValid()} />
                <AddRemoveButton text='cancel' onClick={onCancel} />
            </div>
        </div>
    );
}