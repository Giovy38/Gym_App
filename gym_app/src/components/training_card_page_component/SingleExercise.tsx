'use client'

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import { SingleExerciseType } from "@/src/type/SingleExercise.type";
import LastTrainingDetails from "./LastTrainingDetails";
import { MdOutlineTimer } from "react-icons/md";
import { CgGym } from "react-icons/cg";
import Timer from './Timer';
import NoteArea from "./NoteArea";
import BarbellInfo from "./BarbellInfo";
import { trainingCardService } from "@/src/services/training-card.services";

function formatRestTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
        return remainingSeconds > 0 ? `${minutes} min e ${remainingSeconds} sec` : `${minutes} min`;
    }
    return `${remainingSeconds} sec`;
}

export default function SingleExercise({ exercise }: { exercise: SingleExerciseType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [maxWeight, setMaxWeight] = useState(0)

    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    const handleStartTimer = () => {
        setShowTimer(true);
    };

    useEffect(() => {
        const fetchLastWorkout = async () => {
            const res = await trainingCardService.getLastWorkout(exercise.latestTraining.id, exercise.dayIndex, exercise.index);
            if (res.lastWorkout.length > 0) {
                res.lastWorkout.map(workout => {
                    if (workout.weight > maxWeight) {
                        setMaxWeight(workout.weight)
                    }
                })
            }

        };
        fetchLastWorkout();
    }, [exercise.dayIndex, exercise.index, exercise.latestTraining.id, maxWeight]);

    console.log('Exercise data:', exercise);

    return (
        <div className="flex flex-col text-white">
            <div
                className="p-2 flex justify-around items-center gap-2 rounded-lg font-bold bg-black cursor-pointer w-full mt-5 md:min-w-80 min-w-[90vw]"
                onClick={accordionOpenClose}
            >
                <div className="flex flex-col items-center justify-center">
                    <h1 className="uppercase text-[#f8bf58]">{exercise.exerciseTitle}</h1>
                    <div className="flex gap-5">
                        {exercise.cardio ? <h5 className="text-sm">{exercise.sets} min | {exercise.reps} km</h5> : <h5 className="text-sm">{exercise.sets} x {exercise.reps} rep</h5>}
                        {exercise.cardio ? null : <h5 className="text-sm">{maxWeight} kg</h5>}
                        {exercise.cardio ? null : <h5 className="text-sm">{formatRestTime(exercise.restTime)} </h5>}
                    </div>
                </div>
                <div className="block">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {isOpen && (
                <div className="flex gap-2 justify-center items-center bg-[#ffffff14] rounded-b-xl p-4">
                    <div className="text-center flex flex-col gap-2">
                        <div className="flex gap-3 text-center bg-black p-2 rounded-full justify-center">
                            <p>Sets: {exercise.sets}</p>
                            <p>x</p>
                            <p>Reps: {exercise.reps}</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <CgGym />
                            <p>Total Weight: {maxWeight} kg</p>
                        </div>
                        <div className="flex gap-2 items-center justify-center">
                            <MdOutlineTimer />
                            <p>Rest Time: {formatRestTime(exercise.restTime)}</p>
                        </div>
                        <div className="flex gap-2 items-center cursor-pointer justify-center text-black font-bold uppercase hover:bg-[#efb242b6] bg-[#f8bf58] p-2 rounded-full" onClick={handleStartTimer}>
                            <MdOutlineTimer />
                            <p>Start Timer</p>
                        </div>
                        <BarbellInfo haveBarbell={exercise.barbell} totalWeight={maxWeight} barbellWeight={exercise.barbellWeight} />
                        <LastTrainingDetails
                            cardio={exercise.cardio}
                            latestTraining={exercise.latestTraining}
                            index={exercise.index}
                            haveBarbell={exercise.barbell}
                            dayIndex={exercise.dayIndex}
                        />
                        <NoteArea exercise={exercise} latestTraining={exercise.latestTraining} index={exercise.index} />
                    </div>
                </div>
            )}
            {showTimer && (
                <Timer
                    onClose={() => setShowTimer(false)}
                    initialTime={exercise.restTime}
                />
            )}
        </div>
    );
}
