import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { days, Exercise as TrainingExercise } from "@/src/type/TrainingData.type";
import { WorkoutDay } from "@/src/type/WorkoutTemplate.type";
import { IoBarbellOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import { MdDirectionsRun } from "react-icons/md";
import { ptService } from "@/src/services/pt.services";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { Scrollbar, Navigation } from "swiper/modules";
import PlusButton from "../reusable_components/PlusButton";
import { TbStretching } from "react-icons/tb";
import ModalButton from "../reusable_components/ModalButton";
import Toast from "../reusable_components/Toast";

type NewTemplateFormProps = {
    onClose: () => void;
    onNewTemplate: () => void;
    ptId: number;
}

export default function NewTemplateForm({ onClose, onNewTemplate, ptId }: NewTemplateFormProps) {
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [templateName, setTemplateName] = useState('');
    const [templateType, setTemplateType] = useState('');
    const [workoutDays, setWorkoutDays] = useState<days[]>([]);

    const addWorkoutDay = () => {
        setWorkoutDays([...workoutDays, { workoutName: '', exercises: [] }]);
    };

    const handleTimeChange = (dayIndex: number, exerciseIndex: number, value: number) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise.durationSeconds = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const handleDistanceChange = (dayIndex: number, exerciseIndex: number, value: number) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise.distanceKm = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const handleExerciseChange = <K extends keyof TrainingExercise>(
        dayIndex: number,
        exerciseIndex: number,
        field: K,
        value: TrainingExercise[K]
    ) => {
        const updatedDays = [...workoutDays];
        const exercise = { ...updatedDays[dayIndex].exercises[exerciseIndex] };
        exercise[field] = value;
        updatedDays[dayIndex].exercises[exerciseIndex] = exercise;
        setWorkoutDays(updatedDays);
    };

    const isFormValid = () => {
        return templateName.trim() !== '' &&
            templateType.trim() !== '' &&
            workoutDays.length > 0 &&
            workoutDays.every(day =>
                day.workoutName.trim() !== '' &&
                day.exercises.length > 0 &&
                day.exercises.every(exercise => {
                    const baseValidation = exercise.name.trim() !== '';

                    switch (exercise.exerciseType) {
                        case 'cardio':
                        case 'stretching':
                            return baseValidation && (exercise.durationSeconds > 0 || exercise.distanceKm > 0);
                        case 'withWeight':
                            return baseValidation && exercise.sets > 0 && exercise.repetitions > 0;
                        case 'withBarbell':
                            return baseValidation && exercise.sets > 0 && exercise.repetitions > 0 && exercise.barbellWeightKg > 0;
                        default:
                            return false;
                    }
                })
            );
    };

    const handleSubmit = async () => {
        try {
            if (!templateName.trim()) {
                throw new Error('Nome template richiesto');
            }

            if (!templateType.trim()) {
                throw new Error('Tipo template richiesto');
            }

            if (workoutDays.length === 0) {
                throw new Error('Aggiungi almeno un giorno di allenamento');
            }

            const templateWorkoutDays: WorkoutDay[] = workoutDays.map(day => {
                if (!day.workoutName.trim()) {
                    throw new Error('Nome del giorno di allenamento richiesto');
                }

                if (day.exercises.length === 0) {
                    throw new Error(`Aggiungi almeno un esercizio per ${day.workoutName}`);
                }

                return {
                    dayName: day.workoutName.trim(),
                    exercises: day.exercises.map(exercise => {
                        if (!exercise.name.trim()) {
                            throw new Error('Nome esercizio richiesto');
                        }

                        let notes = '';

                        switch (exercise.exerciseType) {
                            case 'cardio':
                            case 'stretching':
                                if (!exercise.durationSeconds && !exercise.distanceKm) {
                                    throw new Error(`Specifica tempo o distanza per l'esercizio ${exercise.name}`);
                                }
                                notes = '';
                                break;

                            case 'withWeight':
                            case 'withBarbell':
                                if (!exercise.sets || !exercise.repetitions) {
                                    throw new Error(`Serie e ripetizioni richieste per l'esercizio ${exercise.name}`);
                                }
                                notes = '';
                                break;

                            default:
                                throw new Error(`Tipo di esercizio non valido per ${exercise.name}`);
                        }

                        return {
                            name: exercise.name.trim(),
                            sets: Math.max(1, Number(exercise.sets) || 1),
                            reps: Math.max(1, Number(exercise.repetitions) || 1),
                            rest: Math.max(0, Number(exercise.restTimeSeconds) || 0),
                            notes,
                            exerciseType: exercise.exerciseType,
                            durationSeconds: exercise.durationSeconds,
                            distanceKm: exercise.distanceKm,
                            barbellWeightKg: exercise.barbellWeightKg
                        };
                    })
                };
            });

            console.log('Invio dati template:', {
                ptId,
                templateName: templateName.trim(),
                templateType: templateType.trim(),
                workoutDays: templateWorkoutDays
            });

            const result = await ptService.createWorkoutTemplate(
                ptId,
                templateName.trim(),
                templateType.trim(),
                templateWorkoutDays
            );

            if (result) {
                setShowSuccessToast(true);
                setTimeout(() => {
                    setShowSuccessToast(false);
                    onNewTemplate();
                    onClose();
                }, 2000);
            } else {
                throw new Error('Errore durante la creazione del template');
            }
        } catch (error) {
            console.error('Errore durante la creazione del template:', error);
            setErrorMessage(error instanceof Error ? error.message : 'Errore sconosciuto durante la creazione');
            setShowErrorToast(true);
            setTimeout(() => {
                setShowErrorToast(false);
            }, 3000);
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

    const inputClass = (fieldName?: string, value?: string | number, exerciseType?: string, currentExercise?: TrainingExercise) => {
        // Validazione specifica per tipo di campo
        if (fieldName) {
            switch (fieldName) {
                case 'templateName':
                case 'templateType':
                    return (value as string)?.trim() === ''
                        ? 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500'
                        : 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';

                case 'workoutName':
                    return (value as string)?.trim() === ''
                        ? 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500'
                        : 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';

                case 'exerciseName':
                    return (value as string)?.trim() === ''
                        ? 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500'
                        : 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';

                case 'sets':
                case 'repetitions':
                    return !value || (value as number) <= 0
                        ? 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500'
                        : 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';

                case 'durationSeconds':
                case 'distanceKm':
                    // Per gli esercizi cardio e stretching, il campo è valido se almeno uno dei due campi ha un valore
                    if (exerciseType === 'cardio' || exerciseType === 'stretching') {
                        if (currentExercise && (currentExercise.durationSeconds > 0 || currentExercise.distanceKm > 0)) {
                            return 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';
                        }
                        return 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500';
                    }
                    return (!value && value !== 0)
                        ? 'rounded-lg text-text-secondary p-2 text-center border-2 bg-red-200 border-red-500'
                        : 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';

                default:
                    return 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';
            }
        }

        return 'rounded-lg p-2 text-center text-text-secondary bg-slate-200 font-bold italic';
    };

    return (
        <>
            <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center text-text-primary z-50" onClick={onClose}>
                <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-bg-modal overflow-auto max-h-[97vh]" onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-between items-center px-2 pb-2">
                        <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">
                            Nuovo Template
                        </h1>
                        <IoMdCloseCircle className="text-btn-exit text-2xl cursor-pointer hover:text-btn-exit-hover" onClick={onClose} />
                    </div>

                    <div className="flex flex-col gap-4 mb-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                nome scheda allenamento*
                            </label>
                            <input
                                className={inputClass('templateName', templateName)}
                                type="text"
                                placeholder="Nome della scheda"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                Tipologia allenamento*
                            </label>
                            <input
                                className={inputClass('templateType', templateType)}
                                type="text"
                                placeholder="(es. forza, massa, resistenza, etc.)"
                                value={templateType}
                                onChange={(e) => setTemplateType(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-4">
                        {workoutDays.map((day, dayIndex) => (
                            <div key={dayIndex} className="flex flex-col gap-3 bg-bg-third shadow-lg shadow-shadow-fourth p-3 rounded-lg mb-10 relative">
                                <div className="grid grid-cols-[1fr_auto] gap-3 items-center">
                                    <label className="bg-bg-primary text-text-primary rounded-lg p-2 text-center uppercase font-extrabold text-lg italic text-md select-none" htmlFor={`workoutName-${dayIndex}`}>gruppo muscolare / giorno</label>
                                    <MdDeleteForever
                                        className="top-2 right-2 text-icon-delete text-4xl cursor-pointer hover:text-text-primary bg-bg-primary hover:bg-btn-delete rounded-lg p-1"
                                        onClick={() => removeWorkoutDay(dayIndex)}
                                    />
                                </div>

                                <input
                                    id={`workoutName-${dayIndex}`}
                                    className={inputClass('workoutName', day.workoutName)}
                                    type='text'
                                    placeholder="Gruppo muscolare/  Giorno Allenamento*"
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
                                            <div className="flex flex-col gap-2 text-text-secondary bg-bg-data p-3 rounded-lg relative">
                                                <MdDeleteForever
                                                    className="absolute top-2 right-2 text-icon-delete text-3xl cursor-pointer hover:text-text-primary bg-bg-primary hover:bg-btn-delete rounded-lg p-1"
                                                    onClick={() => {
                                                        const updatedExercises = day.exercises.filter((_, index) => index !== 0);
                                                        const updatedDays = [...workoutDays];
                                                        updatedDays[dayIndex].exercises = updatedExercises;
                                                        setWorkoutDays(updatedDays);
                                                    }}
                                                />
                                                <label className="text-primary-color uppercase font-bold text-center text-md select-none" htmlFor={`exerciseName-${dayIndex}-0`}>Esercizio</label>
                                                <input
                                                    id={`exerciseName-${dayIndex}-0`}
                                                    className={inputClass('exerciseName', day.exercises[0].name)}
                                                    type='text'
                                                    placeholder="Nome Esercizio*"
                                                    value={day.exercises[0].name}
                                                    onChange={(e) => handleExerciseChange(dayIndex, 0, 'name', e.target.value)}
                                                />
                                                <div className="flex flex-col justify-center items-center gap-4 text-xl mt-3 bg-bg-primary p-3 rounded-lg min-h-[160px]">
                                                    <div className="flex justify-center items-center gap-4">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <MdDirectionsRun
                                                                className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'cardio' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'cardio')}
                                                            />
                                                            <div
                                                                className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'cardio'
                                                                    ? 'bg-icon-active border-icon-active'
                                                                    : 'border-icon-inactive'
                                                                    }`}
                                                                onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'cardio')}
                                                            />
                                                            <span className="text-xs text-primary-color uppercase font-bold">Cardio</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <TbStretching
                                                                className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'stretching' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'stretching')}
                                                            />
                                                            <div
                                                                className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'stretching'
                                                                    ? 'bg-icon-active border-icon-active'
                                                                    : 'border-icon-inactive'
                                                                    }`}
                                                                onClick={() => handleExerciseChange(dayIndex, 0, 'exerciseType', 'stretching')}
                                                            />
                                                            <span className="text-xs text-primary-color uppercase font-bold">Stretch</span>
                                                        </div>
                                                        <div className="flex flex-col items-center gap-2">
                                                            <CgGym
                                                                className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'withWeight' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                onClick={() => {
                                                                    handleExerciseChange(dayIndex, 0, 'exerciseType', 'withWeight');
                                                                }}
                                                            />
                                                            <div
                                                                className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'withWeight'
                                                                    ? 'bg-icon-active border-icon-active'
                                                                    : 'border-icon-inactive'
                                                                    }`}
                                                                onClick={() => {
                                                                    handleExerciseChange(dayIndex, 0, 'exerciseType', 'withWeight');
                                                                }}
                                                            />
                                                            <span className="text-xs text-primary-color uppercase font-bold">Peso</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-4">
                                                        <div className="flex flex-col items-center gap-2">
                                                            <IoBarbellOutline
                                                                className={`text-2xl cursor-pointer ${day.exercises[0].exerciseType === 'withBarbell' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                onClick={() => {
                                                                    handleExerciseChange(dayIndex, 0, 'exerciseType', 'withBarbell');
                                                                }}
                                                            />
                                                            <div
                                                                className={`w-4 h-4 rounded-full border-2 cursor-pointer ${day.exercises[0].exerciseType === 'withBarbell'
                                                                    ? 'bg-icon-active border-icon-active'
                                                                    : 'border-icon-inactive'
                                                                    }`}
                                                                onClick={() => {
                                                                    handleExerciseChange(dayIndex, 0, 'exerciseType', 'withBarbell');
                                                                }}
                                                            />
                                                            <span className="text-xs text-primary-color uppercase font-bold">Bilanciere</span>
                                                        </div>
                                                        {day.exercises[0].exerciseType === 'withBarbell' && (
                                                            <div className="flex flex-col items-center gap-2">
                                                                <span className="text-xs text-primary-color uppercase font-bold">Peso Bilanciere</span>
                                                                <input
                                                                    id={`barbellWeight-${dayIndex}-0`}
                                                                    className={`${inputClass()} w-16 text-sm`}
                                                                    type='text'
                                                                    value={day.exercises[0].barbellWeightKg}
                                                                    onChange={(e) => handleExerciseChange(dayIndex, 0, 'barbellWeightKg', parseFloat(e.target.value) || 0)}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex gap-2">
                                                    {(day.exercises[0].exerciseType === 'cardio' || day.exercises[0].exerciseType === 'stretching') ? (
                                                        <>
                                                            <div className="flex flex-col w-1/2 justify-center items-center">
                                                                <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                    tempo (min)*
                                                                </label>
                                                                <input
                                                                    className={`${inputClass('durationSeconds', day.exercises[0].durationSeconds, day.exercises[0].exerciseType, day.exercises[0])} w-1/2`}
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Tempo in minuti"
                                                                    value={day.exercises[0].durationSeconds || ''}
                                                                    onChange={(e) => handleTimeChange(dayIndex, 0, handleNumberInputChange(e.target.value, 0))}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col w-1/2 justify-center items-center">
                                                                <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                    distanza (km)*
                                                                </label>
                                                                <input
                                                                    className={`${inputClass('distanceKm', day.exercises[0].distanceKm, day.exercises[0].exerciseType, day.exercises[0])} w-1/2`}
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Distanza in km"
                                                                    value={day.exercises[0].distanceKm || ''}
                                                                    onChange={(e) => handleDistanceChange(dayIndex, 0, handleNumberInputChange(e.target.value, 0))}
                                                                />
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="flex flex-col w-1/2 justify-center items-center">
                                                                <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                    serie*
                                                                </label>
                                                                <input
                                                                    className={`${inputClass('sets', day.exercises[0].sets)} w-1/2`}
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Serie"
                                                                    value={day.exercises[0].sets || ''}
                                                                    onChange={(e) => handleExerciseChange(dayIndex, 0, 'sets', handleNumberInputChange(e.target.value, 0))}
                                                                />
                                                            </div>
                                                            <div className="flex flex-col w-1/2 justify-center items-center">
                                                                <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                    ripetizioni*
                                                                </label>
                                                                <input
                                                                    className={`${inputClass('repetitions', day.exercises[0].repetitions)} w-1/2`}
                                                                    type="number"
                                                                    min="0"
                                                                    placeholder="Ripetizioni"
                                                                    value={day.exercises[0].repetitions || ''}
                                                                    onChange={(e) => handleExerciseChange(dayIndex, 0, 'repetitions', handleNumberInputChange(e.target.value, 0))}
                                                                />
                                                            </div>
                                                        </>
                                                    )}
                                                </div>
                                                <div className="flex gap-2">
                                                    <div className="flex flex-col w-full justify-center items-center">
                                                        <label className="text-primary-color uppercase text-center font-bold text-md select-none" htmlFor={`restTimeSeconds-${dayIndex}-0`}>tempo di recupero (sec)</label>
                                                        <input
                                                            id={`restTimeSeconds-${dayIndex}-0`}
                                                            className="rounded-lg p-2 text-center w-1/2"
                                                            type='number'
                                                            placeholder="Tempo di recupero in secondi"
                                                            value={day.exercises[0].restTimeSeconds}
                                                            onChange={(e) => {
                                                                const seconds = handleNumberInputChange(e.target.value, 0);
                                                                handleExerciseChange(dayIndex, 0, 'restTimeSeconds', seconds);
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
                                                        <div className="flex flex-col gap-2 text-text-secondary bg-bg-data p-3 rounded-lg relative">
                                                            <MdDeleteForever
                                                                className="absolute top-2 right-2 text-icon-delete text-3xl cursor-pointer hover:text-text-primary bg-bg-primary hover:bg-btn-delete rounded-lg p-1"
                                                                onClick={() => {
                                                                    const updatedExercises = day.exercises.filter((_, index) => index !== exerciseIndex);
                                                                    const updatedDays = [...workoutDays];
                                                                    updatedDays[dayIndex].exercises = updatedExercises;
                                                                    setWorkoutDays(updatedDays);
                                                                }}
                                                            />
                                                            <label className="text-primary-color uppercase font-bold text-center text-md select-none" htmlFor={`exerciseName-${dayIndex}-${exerciseIndex}`}>Esercizio</label>
                                                            <input
                                                                id={`exerciseName-${dayIndex}-${exerciseIndex}`}
                                                                className={inputClass('exerciseName', exercise.name)}
                                                                type='text'
                                                                placeholder="Nome Esercizio*"
                                                                value={exercise.name}
                                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'name', e.target.value)}
                                                            />
                                                            <div className="flex flex-col justify-center items-center gap-4 text-xl mt-3 bg-bg-primary p-3 rounded-lg min-h-[160px]">
                                                                <div className="flex justify-center items-center gap-4">
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <MdDirectionsRun
                                                                            className={`text-2xl cursor-pointer ${exercise.exerciseType === 'cardio' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                            onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'cardio')}
                                                                        />
                                                                        <div
                                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'cardio'
                                                                                ? 'bg-icon-active border-icon-active'
                                                                                : 'border-icon-inactive'
                                                                                }`}
                                                                            onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'cardio')}
                                                                        />
                                                                        <span className="text-xs text-primary-color uppercase font-bold">Cardio</span>
                                                                    </div>
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <TbStretching
                                                                            className={`text-2xl cursor-pointer ${exercise.exerciseType === 'stretching' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                            onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'stretching')}
                                                                        />
                                                                        <div
                                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'stretching'
                                                                                ? 'bg-icon-active border-icon-active'
                                                                                : 'border-icon-inactive'
                                                                                }`}
                                                                            onClick={() => handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'stretching')}
                                                                        />
                                                                        <span className="text-xs text-primary-color uppercase font-bold">Stretch</span>
                                                                    </div>
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <CgGym
                                                                            className={`text-2xl cursor-pointer ${exercise.exerciseType === 'withWeight' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                            onClick={() => {
                                                                                handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withWeight');
                                                                            }}
                                                                        />
                                                                        <div
                                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'withWeight'
                                                                                ? 'bg-icon-active border-icon-active'
                                                                                : 'border-icon-inactive'
                                                                                }`}
                                                                            onClick={() => {
                                                                                handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withWeight');
                                                                            }}
                                                                        />
                                                                        <span className="text-xs text-primary-color uppercase font-bold">Peso</span>
                                                                    </div>
                                                                </div>
                                                                <div className="flex justify-center items-center gap-4">
                                                                    <div className="flex flex-col items-center gap-2">
                                                                        <IoBarbellOutline
                                                                            className={`text-2xl cursor-pointer ${exercise.exerciseType === 'withBarbell' ? 'text-icon-active' : 'text-icon-inactive'}`}
                                                                            onClick={() => {
                                                                                handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withBarbell');
                                                                            }}
                                                                        />
                                                                        <div
                                                                            className={`w-4 h-4 rounded-full border-2 cursor-pointer ${exercise.exerciseType === 'withBarbell'
                                                                                ? 'bg-icon-active border-icon-active'
                                                                                : 'border-icon-inactive'
                                                                                }`}
                                                                            onClick={() => {
                                                                                handleExerciseChange(dayIndex, exerciseIndex, 'exerciseType', 'withBarbell');
                                                                            }}
                                                                        />
                                                                        <span className="text-xs text-primary-color uppercase font-bold">Bilanciere</span>
                                                                    </div>
                                                                    {exercise.exerciseType === 'withBarbell' && (
                                                                        <div className="flex flex-col items-center gap-2">
                                                                            <span className="text-xs text-primary-color uppercase font-bold">Peso Bilanciere</span>
                                                                            <input
                                                                                id={`barbellWeight-${dayIndex}-${exerciseIndex}`}
                                                                                className={`${inputClass()} w-16 text-sm`}
                                                                                type='text'
                                                                                value={exercise.barbellWeightKg}
                                                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'barbellWeightKg', parseFloat(e.target.value) || 0)}
                                                                            />
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>

                                                            <div className="flex gap-2">
                                                                {(exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching') ? (
                                                                    <>
                                                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                                                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                                tempo (min)*
                                                                            </label>
                                                                            <input
                                                                                className={`${inputClass('durationSeconds', exercise.durationSeconds, exercise.exerciseType, exercise)} w-1/2`}
                                                                                type="number"
                                                                                min="0"
                                                                                placeholder="Tempo in minuti"
                                                                                value={exercise.durationSeconds || ''}
                                                                                onChange={(e) => handleTimeChange(dayIndex, exerciseIndex, handleNumberInputChange(e.target.value, 0))}
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                                                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                                distanza (km)*
                                                                            </label>
                                                                            <input
                                                                                className={`${inputClass('distanceKm', exercise.distanceKm, exercise.exerciseType, exercise)} w-1/2`}
                                                                                type="number"
                                                                                min="0"
                                                                                placeholder="Distanza in km"
                                                                                value={exercise.distanceKm || ''}
                                                                                onChange={(e) => handleDistanceChange(dayIndex, exerciseIndex, handleNumberInputChange(e.target.value, 0))}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                                                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                                serie*
                                                                            </label>
                                                                            <input
                                                                                className={`${inputClass('sets', exercise.sets)} w-1/2`}
                                                                                type="number"
                                                                                min="0"
                                                                                placeholder="Serie"
                                                                                value={exercise.sets || ''}
                                                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'sets', handleNumberInputChange(e.target.value, 0))}
                                                                            />
                                                                        </div>
                                                                        <div className="flex flex-col w-1/2 justify-center items-center">
                                                                            <label className="text-primary-color uppercase font-bold text-md select-none">
                                                                                ripetizioni*
                                                                            </label>
                                                                            <input
                                                                                className={`${inputClass('repetitions', exercise.repetitions)} w-1/2`}
                                                                                type="number"
                                                                                min="0"
                                                                                placeholder="Ripetizioni"
                                                                                value={exercise.repetitions || ''}
                                                                                onChange={(e) => handleExerciseChange(dayIndex, exerciseIndex, 'repetitions', handleNumberInputChange(e.target.value, 0))}
                                                                            />
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                            <div className="flex gap-2">
                                                                <div className="flex flex-col w-full justify-center items-center">
                                                                    <label className="text-primary-color uppercase text-center font-bold text-md select-none" htmlFor={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}>tempo di recupero (sec)</label>
                                                                    <input
                                                                        id={`restTimeSeconds-${dayIndex}-${exerciseIndex}`}
                                                                        className="rounded-lg p-2 text-center w-1/2"
                                                                        type='number'
                                                                        placeholder="Rest Time Seconds"
                                                                        value={exercise.restTimeSeconds}
                                                                        onChange={(e) => {
                                                                            const seconds = handleNumberInputChange(e.target.value, 0);
                                                                            handleExerciseChange(dayIndex, exerciseIndex, 'restTimeSeconds', seconds);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}

                                                <div className="custom-next swiper-button-next !text-primary-color"></div>
                                                <div className="custom-prev swiper-button-prev !text-primary-color "></div>

                                                <div className="custom-scrollbar swiper-scrollbar !bg-bg-primary">
                                                    <div className="swiper-scrollbar-drag !bg-white rounded"></div>
                                                </div>
                                            </Swiper>
                                        )}
                                    </div>
                                )}
                                <PlusButton text="nuovo esercizio" onClick={() => {
                                    const updatedDays = [...workoutDays];
                                    updatedDays[dayIndex].exercises.push({
                                        id: 0,
                                        name: '',
                                        sets: 0,
                                        repetitions: 0,
                                        restTimeSeconds: 0,
                                        barbellWeightKg: 0,
                                        notes: [],
                                        durationSeconds: 0,
                                        distanceKm: 0,
                                        exerciseType: 'withWeight',
                                        workoutSessions: []
                                    });
                                    setWorkoutDays(updatedDays);
                                }} />
                                {!isFormValid() ? <div className="w-full flex justify-center items-center"><p className="text-text-error font-bold text-sm text-center italic">*uno o più campi obbligatori non sono compilati correttamente*</p></div> : null}
                            </div>
                        ))}
                        <PlusButton text='nuovo giorno allenamento' onClick={addWorkoutDay} />
                    </div>

                    <div className="flex justify-center items-center gap-3 mt-4">
                        <div className="w-1/2">
                            <ModalButton text='Cancella' onClick={onClose} isAdd={false} />
                        </div>
                        <div className="w-1/2">
                            <ModalButton text='Crea' onClick={handleSubmit} disabled={!isFormValid()} isAdd={true} />
                        </div>
                    </div>
                </div>
            </div>
            {showSuccessToast && (
                <Toast
                    message="Template creato con successo!"
                    color="green"
                />
            )}
            {showErrorToast && (
                <Toast
                    message={errorMessage}
                    color="red"
                />
            )}
        </>
    );
} 