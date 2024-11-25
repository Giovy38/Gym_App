import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import { TrainingData, days, Exercise } from "@/src/type/TrainingData.type";
import CreateNewTrainingCard from "@/src/services/training-card-page-services/CreateNewTrainingCard.services";
import { TbBarbellOff } from "react-icons/tb";
import { IoBarbellOutline } from "react-icons/io5";


type NewTrainingCardFormProps = {
    onClose: () => void;
    onNewTraining: () => void;
}

// Aggiungi un componente Switch personalizzato
const Switch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <div className="flex items-center cursor-pointer" onClick={onChange}>
        <div className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ease-in-out ${checked ? 'bg-green-400' : 'bg-red-400'}`}>
            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${checked ? 'translate-x-5' : ''}`}></div>
        </div>
    </div>
);

export default function NewTrainingCardForm({ onClose, onNewTraining }: NewTrainingCardFormProps) {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState<string>(getCurrentDate());
    const [workoutDays, setWorkoutDays] = useState<days[]>([]);

    const addWorkoutDay = () => {
        setWorkoutDays([...workoutDays, { workoutName: '', exercises: [] }]);
    };

    const handleExerciseChange = <K extends keyof Exercise>(
        dayIndex: number,
        exerciseIndex: number,
        field: K,
        value: Exercise[K]
    ) => {
        const updatedDays = [...workoutDays];
        const updatedExercises = [...updatedDays[dayIndex].exercises];
        updatedExercises[exerciseIndex] = { ...updatedExercises[exerciseIndex], [field]: value };
        updatedDays[dayIndex].exercises = updatedExercises;
        setWorkoutDays(updatedDays);
    };

    const handleSubmit = async () => {
        const trainingData: TrainingData = {
            id: 0,
            date,
            workoutDays
        };

        try {
            await CreateNewTrainingCard(trainingData);
            onNewTraining();
            onClose();
        } catch (error) {
            console.error('Errore durante l\'aggiunta del training:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center text-white z-50">
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-black overflow-auto max-h-full">
                <div className="flex justify-end">
                    <IoMdCloseCircle className="text-red-400 text-2xl cursor-pointer hover:text-red-500" onClick={onClose} />
                </div>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-[#f8bf58] mb-3">Add New Training Card</h1>
                <div className="text-black flex flex-col justify-center items-center">
                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor="date">Date</label>
                    <input
                        className="rounded-lg p-2 text-center"
                        type='date'
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="flex flex-col gap-3 mt-4">
                    {workoutDays.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex flex-col gap-3 bg-[#111111] p-3 rounded-lg mb-10">
                            <label className="bg-[#f8bf58] text-black rounded-lg p-2 text-center uppercase font-extrabold text-lg italic text-md select-none" htmlFor={`workoutName-${dayIndex}`}>Muscle Group</label>
                            <input
                                id={`workoutName-${dayIndex}`}
                                className="rounded-lg p-2 text-center text-black"
                                type='text'
                                placeholder="Muscle Group"
                                value={day.workoutName}
                                onChange={(e) => {
                                    const updatedDays = [...workoutDays];
                                    updatedDays[dayIndex].workoutName = e.target.value;
                                    setWorkoutDays(updatedDays);
                                }}
                            />
                            {day.exercises.map((exercise, exerciseIndex) => (
                                <div key={exerciseIndex} className="flex flex-col gap-2 text-black bg-[#2b2a2a80] p-3 rounded-lg">
                                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`}>Exercise</label>
                                    <input
                                        id={`exerciseName-${dayIndex}-${exerciseIndex}`}
                                        className="rounded-lg p-2 text-center"
                                        type='text'
                                        placeholder="Exercise Name"
                                        value={exercise.name}
                                        onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                                    />
                                    <div className="flex gap-2">
                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`sets-${dayIndex}-${exerciseIndex}`}>Sets</label>
                                            <input
                                                id={`sets-${dayIndex}-${exerciseIndex}`}
                                                className="rounded-lg p-2 text-center w-1/2"
                                                type='number'
                                                placeholder="Sets"
                                                value={exercise.sets}
                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`reps-${dayIndex}-${exerciseIndex}`}>Reps</label>
                                            <input
                                                id={`reps-${dayIndex}-${exerciseIndex}`}
                                                className="rounded-lg p-2 text-center w-1/2"
                                                type='number'
                                                placeholder="Reps"
                                                value={exercise.reps}
                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', parseInt(e.target.value) || 0)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`restTimeMinutes-${dayIndex}-${exerciseIndex}`}>Rest Time (Minutes)</label>
                                            <input
                                                id={`restTimeMinutes-${dayIndex}-${exerciseIndex}`}
                                                className="rounded-lg p-2 text-center w-1/2"
                                                type='number'
                                                placeholder="Rest Time Minutes"
                                                value={exercise.restTime.minutes}
                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'restTime', { ...exercise.restTime, minutes: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}>Rest Time (Seconds)</label>
                                            <input
                                                id={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}
                                                className="rounded-lg p-2 text-center w-1/2"
                                                type='number'
                                                placeholder="Rest Time Seconds"
                                                value={exercise.restTime.seconds}
                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'restTime', { ...exercise.restTime, seconds: parseInt(e.target.value) || 0 })}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex gap-2 justify-center items-center text-xl mt-3 bg-black p-3 rounded-lg">
                                        <span className="ml-2">
                                            {exercise.barbell ? <IoBarbellOutline className="text-green-400 text-2xl" /> : <TbBarbellOff className="text-red-400 text-2xl" />}
                                        </span>
                                        <label className="text-[#f8bf58] uppercase font-bold text-md select-none">Barbell?</label>
                                        <Switch
                                            checked={exercise.barbell}
                                            onChange={() => handleExerciseChange(dayIndex, exerciseIndex, 'barbell', !exercise.barbell)}
                                        />
                                    </div>
                                    {exercise.barbell && (
                                        <div className="flex gap-2 justify-center items-center">
                                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={`barbellWeight-${dayIndex}-${exerciseIndex}`}>Barbell Weight</label>
                                            <input
                                                id={`barbellWeight-${dayIndex}-${exerciseIndex}`}
                                                className="rounded-lg p-2 text-center"
                                                type='number'
                                                placeholder="Barbell Weight"
                                                value={exercise.barbellWeight}
                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'barbellWeight', parseFloat(e.target.value) || 0)}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <AddRemoveButton text="Add Exercise" onClick={() => {
                                const updatedDays = [...workoutDays];
                                updatedDays[dayIndex].exercises.push({
                                    name: '',
                                    sets: 0,
                                    reps: 0,
                                    restTime: { minutes: 0, seconds: 0 },
                                    barbell: false,
                                    barbellWeight: 0,
                                    Workouts: [],
                                    notes: []
                                });
                                setWorkoutDays(updatedDays);
                            }} isAdd />
                        </div>
                    ))}
                    <AddRemoveButton text="Add Workout Day" onClick={addWorkoutDay} isAdd />
                </div>
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="w-1/2">
                        <AddRemoveButton text="Create" onClick={handleSubmit} isAdd />
                    </div>
                    <div className="w-1/2">
                        <AddRemoveButton text="Cancel" onClick={onClose} isAdd={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
