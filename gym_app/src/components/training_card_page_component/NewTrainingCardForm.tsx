import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import { TrainingData, days, Exercise } from "@/src/type/TrainingData.type";
import { IoBarbellOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdDirectionsRun } from "react-icons/md";
import { trainingCardService } from "@/src/services/training-card.services";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Scrollbar, Navigation } from "swiper/modules";
import PlusButton from "../reusable_components/PlusButton";
import BlueButton from "../reusable_components/BlueButton";
import { TbStretching } from "react-icons/tb";


type NewTrainingCardFormProps = {
    onClose: () => void;
    onNewTraining: () => void;
}




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

    const handleTimeChange = (dayIndex: number, exerciseIndex: number, value: number) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise.time = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const handleDistanceChange = (dayIndex: number, exerciseIndex: number, value: number) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise.distanceInKm = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const handleExerciseChange = <K extends keyof Exercise>(
        dayIndex: number,
        exerciseIndex: number,
        field: K,
        value: Exercise[K]
    ) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise[field] = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const isFormValid = () => {
        return workoutDays.length > 0 && workoutDays.every(day =>
            day.workoutName.trim() !== '' &&
            day.exercises.length > 0 &&
            day.exercises.every(exercise => {
                const isCardioOrStretching = exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching';
                return exercise.name.trim() !== '' &&
                    (isCardioOrStretching ? (exercise.time > 0 || exercise.distanceInKm > 0) : (exercise.sets > 0 && exercise.reps > 0)) &&
                    (exercise.exerciseType !== 'withBarbell' || exercise.barbellWeight > 0);
            })
        );
    };

    const handleSubmit = async () => {
        const trainingData: TrainingData = {
            id: 0,
            date,
            workoutDays
        };

        try {
            await trainingCardService.createNewTrainingCard(trainingData)
            onNewTraining();
            onClose();
        } catch (error) {
            console.error('Error during training card creation:', error);
        }
    };

    const removeWorkoutDay = (dayIndex: number) => {
        const updatedDays = workoutDays.filter((_, index) => index !== dayIndex);
        setWorkoutDays(updatedDays);
    };

    const handleNumberInputChange = (value: string, min: number, max?: number) => {
        let numValue = parseInt(value) || 0;
        if (numValue < min) numValue = min;
        if (max !== undefined && numValue > max) numValue = max;
        return numValue;
    };

    const inputClass = () => {

        return isFormValid() ? 'rounded-lg p-2 text-center text-black bg-slate-200 font-bold italic' : 'rounded-lg text-black p-2 text-center border-2 bg-red-200 border-red-500';


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
                        <div key={dayIndex} className="flex flex-col gap-3 bg-[#111111] shadow-lg shadow-[#f8bf58] p-3 rounded-lg mb-10 relative">
                            <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                                <label className="bg-[#f8bf58] text-black rounded-lg p-2 text-center uppercase font-extrabold text-lg italic text-md select-none" htmlFor={`workoutName-${dayIndex}`}>Muscle Group</label>
                                <MdDeleteForever
                                    className="top-2 right-2 text-red-300 text-4xl cursor-pointer hover:text-white bg-black hover:bg-red-500 rounded-lg p-1"
                                    onClick={() => removeWorkoutDay(dayIndex)}
                                />
                            </div>

                            <input
                                id={`workoutName-${dayIndex}`}
                                className={inputClass()}
                                type='text'
                                placeholder="Muscle Group Name*"
                                value={day.workoutName}
                                onChange={(e) => {
                                    const updatedDays = [...workoutDays];
                                    updatedDays[dayIndex].workoutName = e.target.value;
                                    setWorkoutDays(updatedDays);
                                }}
                            />
                            {day.exercises.length > 0 && (
                                <div>
                                    {day.exercises.length === 1 ? (
                                        <div className="flex flex-col gap-2 text-black bg-[#2b2a2a80] p-3 rounded-lg relative">
                                            <MdDeleteForever
                                                className="absolute top-2 right-2 text-red-300 text-3xl cursor-pointer hover:text-white bg-black hover:bg-red-500 rounded-lg p-1"
                                                onClick={() => {
                                                    const updatedExercises = day.exercises.filter((_, index) => index !== 0);
                                                    const updatedDays = [...workoutDays];
                                                    updatedDays[dayIndex].exercises = updatedExercises;
                                                    setWorkoutDays(updatedDays);
                                                }}
                                            />
                                            <label className="text-[#f8bf58] uppercase font-bold text-center text-md select-none" htmlFor={`exerciseName-${dayIndex}-0`}>Exercise*</label>
                                            <input
                                                id={`exerciseName-${dayIndex}-0`}
                                                className={inputClass()}
                                                type='text'
                                                placeholder="Exercise Name*"
                                                value={day.exercises[0].name}
                                                onChange={(e) => handleExerciseChange(dayIndex, 0, 'name', e.target.value)}
                                            />
                                            <div className="flex flex-col justify-center items-center gap-4 text-xl mt-3 bg-black p-3 rounded-lg min-h-[160px]">
                                                <div className="flex justify-center items-center gap-4">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <MdDirectionsRun
                                                            className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'cardio' ? 'text-green-400' : 'text-gray-400'}`}
                                                            onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'cardio')}
                                                        />
                                                        <div
                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'cardio'
                                                                ? 'bg-green-400 border-green-400'
                                                                : 'border-gray-400'
                                                                }`}
                                                            onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'cardio')}
                                                        />
                                                        <span className="text-xs text-[#f8bf58] uppercase font-bold">Cardio</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <TbStretching
                                                            className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'stretching' ? 'text-green-400' : 'text-gray-400'}`}
                                                            onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'stretching')}
                                                        />
                                                        <div
                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'stretching'
                                                                ? 'bg-green-400 border-green-400'
                                                                : 'border-gray-400'
                                                                }`}
                                                            onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'stretching')}
                                                        />
                                                        <span className="text-xs text-[#f8bf58] uppercase font-bold">Stretch</span>
                                                    </div>
                                                    <div className="flex flex-col items-center gap-2">
                                                        <CgGym
                                                            className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'withWeight' ? 'text-green-400' : 'text-gray-400'}`}
                                                            onClick={() => {
                                                                handleExerciseChange(dayIndex, 0, 'exerciseType', 'withWeight');
                                                            }}
                                                        />
                                                        <div
                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'withWeight'
                                                                ? 'bg-green-400 border-green-400'
                                                                : 'border-gray-400'
                                                                }`}
                                                            onClick={() => {
                                                                handleExerciseChange(dayIndex, 0, 'exerciseType', 'withWeight');
                                                            }}
                                                        />
                                                        <span className="text-xs text-[#f8bf58] uppercase font-bold">Weight</span>
                                                    </div>
                                                </div>
                                                <div className="flex justify-center items-center gap-4">
                                                    <div className="flex flex-col items-center gap-2">
                                                        <IoBarbellOutline
                                                            className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'withBarbell' ? 'text-green-400' : 'text-gray-400'}`}
                                                            onClick={() => {
                                                                handleExerciseChange(dayIndex, 0, 'exerciseType', 'withBarbell');
                                                            }}
                                                        />
                                                        <div
                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'withBarbell'
                                                                ? 'bg-green-400 border-green-400'
                                                                : 'border-gray-400'
                                                                }`}
                                                            onClick={() => {
                                                                handleExerciseChange(dayIndex, 0, 'exerciseType', 'withBarbell');
                                                            }}
                                                        />
                                                        <span className="text-xs text-[#f8bf58] uppercase font-bold">Barbell</span>
                                                    </div>
                                                    {day.exercises[0].exerciseType === 'withBarbell' && (
                                                        <div className="flex flex-col items-center gap-2">
                                                            <span className="text-xs text-[#f8bf58] uppercase font-bold">Barbell Weight</span>
                                                            <input
                                                                id={`barbellWeight-${dayIndex}-0`}
                                                                className={`${inputClass()} w-16 text-sm`}
                                                                type='text'
                                                                value={day.exercises[0].barbellWeight}
                                                                onChange={(e) => handleExerciseChange(dayIndex, 0, 'barbellWeight', parseFloat(e.target.value) || 0)}
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex gap-2 items-end">
                                                <div className="flex flex-col w-1/2 justify-center items-center">
                                                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                        Time (min)*
                                                    </label>
                                                    <input
                                                        className={`${inputClass()} w-1/2`}
                                                        type="number"
                                                        min="0"
                                                        placeholder="Time in minutes"
                                                        value={day.exercises[0].time || ''}
                                                        onChange={(e) => handleTimeChange(dayIndex, 0, handleNumberInputChange(e.target.value, 0))}
                                                    />
                                                </div>
                                                <div className="flex flex-col w-1/2 justify-center items-center">
                                                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                        Distance (km)*
                                                    </label>
                                                    <input
                                                        className={`${inputClass()} w-1/2`}
                                                        type="number"
                                                        min="0"
                                                        placeholder="Distance in km"
                                                        value={day.exercises[0].distanceInKm || ''}
                                                        onChange={(e) => handleDistanceChange(dayIndex, 0, handleNumberInputChange(e.target.value, 0))}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <div className="flex flex-col w-full justify-center items-center">
                                                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none text-center" htmlFor={`restTimeSeconds-${dayIndex}-0`}>Rest Time (Seconds)</label>
                                                    <input
                                                        id={`restTimeSeconds-${dayIndex}-0`}
                                                        className="rounded-lg p-2 text-center w-1/2"
                                                        type='number'
                                                        placeholder="Rest Time Seconds"
                                                        value={day.exercises[0].restTimeInSeconds}
                                                        onChange={(e) => {
                                                            const seconds = handleNumberInputChange(e.target.value, 0);
                                                            handleExerciseChange(dayIndex, 0, 'restTimeInSeconds', seconds);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <Swiper
                                            spaceBetween={10}
                                            modules={[Scrollbar, Navigation]}
                                            slidesPerView={1.1}
                                            scrollbar={{
                                                el: '.custom-scrollbar',
                                                draggable: true
                                            }}
                                            navigation={{
                                                nextEl: '.custom-next',
                                                prevEl: '.custom-prev'
                                            }}
                                            style={{ cursor: 'grab' }}
                                        >
                                            {day.exercises.map((exercise, exerciseIndex) => (
                                                <SwiperSlide key={`exercise-${dayIndex}-${exerciseIndex}-${exercise.id}`}>
                                                    <div className="flex flex-col gap-2 text-black bg-[#2b2a2a80] p-3 rounded-lg relative">
                                                        <MdDeleteForever
                                                            className="absolute top-2 right-2 text-red-300 text-3xl cursor-pointer hover:text-white bg-black hover:bg-red-500 rounded-lg p-1"
                                                            onClick={() => {
                                                                const updatedExercises = day.exercises.filter((_, index) => index !== exerciseIndex);
                                                                const updatedDays = [...workoutDays];
                                                                updatedDays[dayIndex].exercises = updatedExercises;
                                                                setWorkoutDays(updatedDays);
                                                            }}
                                                        />
                                                        <label className="text-[#f8bf58] uppercase font-bold text-center text-md select-none" htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`}>Exercise</label>
                                                        <input
                                                            id={`exerciseName-${dayIndex}-${exerciseIndex}`}
                                                            className={inputClass()}
                                                            type='text'
                                                            placeholder="Exercise Name*"
                                                            value={exercise.name}
                                                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                                                        />
                                                        <div className="flex flex-col justify-center items-center gap-4 text-xl mt-3 bg-black p-3 rounded-lg min-h-[160px]">
                                                            <div className="flex justify-center items-center gap-4">
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <MdDirectionsRun
                                                                        className={`text-2xl cursor-pointer ${exercise.exerciseType === 'cardio' ? 'text-green-400' : 'text-gray-400'}`}
                                                                        onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'cardio')}
                                                                    />
                                                                    <div
                                                                        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'cardio'
                                                                            ? 'bg-green-400 border-green-400'
                                                                            : 'border-gray-400'
                                                                            }`}
                                                                        onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'cardio')}
                                                                    />
                                                                    <span className="text-xs text-[#f8bf58] uppercase font-bold">Cardio</span>
                                                                </div>
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <TbStretching
                                                                        className={`text-2xl cursor-pointer ${exercise.exerciseType === 'stretching' ? 'text-green-400' : 'text-gray-400'}`}
                                                                        onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'stretching')}
                                                                    />
                                                                    <div
                                                                        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'stretching'
                                                                            ? 'bg-green-400 border-green-400'
                                                                            : 'border-gray-400'
                                                                            }`}
                                                                        onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'stretching')}
                                                                    />
                                                                    <span className="text-xs text-[#f8bf58] uppercase font-bold">Stretch</span>
                                                                </div>
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <CgGym
                                                                        className={`text-2xl cursor-pointer ${exercise.exerciseType === 'withWeight' ? 'text-green-400' : 'text-gray-400'}`}
                                                                        onClick={() => {
                                                                            handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withWeight');
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'withWeight'
                                                                            ? 'bg-green-400 border-green-400'
                                                                            : 'border-gray-400'
                                                                            }`}
                                                                        onClick={() => {
                                                                            handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withWeight');
                                                                        }}
                                                                    />
                                                                    <span className="text-xs text-[#f8bf58] uppercase font-bold">Weight</span>
                                                                </div>
                                                            </div>
                                                            <div className="flex justify-center items-center gap-4">
                                                                <div className="flex flex-col items-center gap-2">
                                                                    <IoBarbellOutline
                                                                        className={`text-2xl cursor-pointer ${exercise.exerciseType === 'withBarbell' ? 'text-green-400' : 'text-gray-400'}`}
                                                                        onClick={() => {
                                                                            handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withBarbell');
                                                                        }}
                                                                    />
                                                                    <div
                                                                        className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'withBarbell'
                                                                            ? 'bg-green-400 border-green-400'
                                                                            : 'border-gray-400'
                                                                            }`}
                                                                        onClick={() => {
                                                                            handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withBarbell');
                                                                        }}
                                                                    />
                                                                    <span className="text-xs text-[#f8bf58] uppercase font-bold">Barbell</span>
                                                                </div>
                                                                {exercise.exerciseType === 'withBarbell' && (
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <span className="text-xs text-[#f8bf58] uppercase font-bold">Barbell Weight</span>
                                                                        <input
                                                                            id={`barbellWeight-${dayIndex}-${exerciseIndex}`}
                                                                            className={`${inputClass()} w-16 text-sm`}
                                                                            type='text'
                                                                            value={exercise.barbellWeight}
                                                                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'barbellWeight', parseFloat(e.target.value) || 0)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex gap-2">
                                                            {exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching' ? (
                                                                <>
                                                                    <div className="flex flex-col w-1/2 justify-center items-center">
                                                                        <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                                            Time (min)*
                                                                        </label>
                                                                        <input
                                                                            className={`${inputClass()} w-1/2`}
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder="Time in minutes"
                                                                            value={exercise.time || ''}
                                                                            onChange={(e) => handleTimeChange(dayIndex, exerciseIndex, handleNumberInputChange(e.target.value, 0))}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col w-1/2 justify-center items-center">
                                                                        <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                                            Distance (km)*
                                                                        </label>
                                                                        <input
                                                                            className={`${inputClass()} w-1/2`}
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder="Distance in km"
                                                                            value={exercise.distanceInKm || ''}
                                                                            onChange={(e) => handleDistanceChange(dayIndex, exerciseIndex, handleNumberInputChange(e.target.value, 0))}
                                                                        />
                                                                    </div>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <div className="flex flex-col w-1/2 justify-center items-center">
                                                                        <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                                            Sets*
                                                                        </label>
                                                                        <input
                                                                            className={`${inputClass()} w-1/2`}
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder="Sets"
                                                                            value={exercise.sets || ''}
                                                                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', handleNumberInputChange(e.target.value, 0))}
                                                                        />
                                                                    </div>
                                                                    <div className="flex flex-col w-1/2 justify-center items-center">
                                                                        <label className="text-[#f8bf58] uppercase font-bold text-md select-none">
                                                                            Reps*
                                                                        </label>
                                                                        <input
                                                                            className={`${inputClass()} w-1/2`}
                                                                            type="number"
                                                                            min="0"
                                                                            placeholder="Reps"
                                                                            value={exercise.reps || ''}
                                                                            onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'reps', handleNumberInputChange(e.target.value, 0))}
                                                                        />
                                                                    </div>
                                                                </>
                                                            )}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <div className="flex flex-col w-full justify-center items-center">
                                                                <label className="text-[#f8bf58] uppercase text-center font-bold text-md select-none" htmlFor={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}>Rest Time (Seconds)</label>
                                                                <input
                                                                    id={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}
                                                                    className="rounded-lg p-2 text-center w-1/2"
                                                                    type='number'
                                                                    placeholder="Rest Time Seconds"
                                                                    value={exercise.restTimeInSeconds}
                                                                    onChange={(e) => {
                                                                        const seconds = handleNumberInputChange(e.target.value, 0);
                                                                        handleExerciseChange(dayIndex, exerciseIndex, 'restTimeInSeconds', seconds);
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </SwiperSlide>
                                            ))}

                                            <div className="custom-next swiper-button-next !text-[#f8bf58]"></div>
                                            <div className="custom-prev swiper-button-prev !text-[#f8bf58] "></div>

                                            <div className="custom-scrollbar swiper-scrollbar !bg-black">
                                                <div className="swiper-scrollbar-drag !bg-white rounded"></div>
                                            </div>
                                        </Swiper>
                                    )}
                                </div>
                            )}
                            <PlusButton text="add new exercise" onClick={() => {
                                const updatedDays = [...workoutDays];
                                updatedDays[dayIndex].exercises.push({
                                    id: 0,
                                    name: '',
                                    sets: 0,
                                    reps: 0,
                                    restTimeInSeconds: 0,
                                    barbellWeight: 0,
                                    notes: [],
                                    time: 0,
                                    distanceInKm: 0,
                                    exerciseType: 'withWeight',
                                    workoutSessions: []
                                });
                                setWorkoutDays(updatedDays);
                            }} />
                            {!isFormValid() ? <div className="w-full flex justify-center items-center"><p className="text-red-500 font-bold text-sm text-center italic">*one or more necessary fields are not compiled correctly*</p></div> : null}
                        </div>
                    ))}
                    <PlusButton text='add new muscle group' onClick={addWorkoutDay} />
                </div>
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="w-1/2">
                        <BlueButton text="Create" onClick={handleSubmit} disabled={!isFormValid()} />
                    </div>
                    <div className="w-1/2">
                        <AddRemoveButton text="Cancel" onClick={onClose} isAdd={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}
