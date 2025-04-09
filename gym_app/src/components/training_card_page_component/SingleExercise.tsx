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
import Image from "next/image";

function formatRestTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
        return remainingSeconds > 0 ? `${minutes} min ${remainingSeconds} sec` : `${minutes} min`;
    }
    return `${remainingSeconds} sec`;
}

export default function SingleExercise({ exercise }: { exercise: SingleExerciseType }) {
    const [isOpen, setIsOpen] = useState(false);
    const [showTimer, setShowTimer] = useState(false);
    const [showVideo, setShowVideo] = useState(false);
    const [maxWeight, setMaxWeight] = useState(0)
    let time: number | string | undefined = exercise.durationSeconds
    let distanceInKm: number | string | undefined = exercise.distanceKm

    if (time === undefined || time === null) {
        time = 'No'
    }

    if (distanceInKm === undefined || distanceInKm === null) {
        distanceInKm = 'No'
    }


    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    const handleStartTimer = () => {
        setShowTimer(true);
    };

    useEffect(() => {
        const fetchLastWorkout = async () => {
            const res = await trainingCardService.getLastWorkout(exercise.latestTraining.id, exercise.exerciseId);
            if (res.lastWorkout.length > 0) {
                res.lastWorkout.map(workout => {
                    if (workout.weight > maxWeight) {
                        setMaxWeight(workout.weight)
                    }
                })
            }

        };
        fetchLastWorkout();
    }, [exercise.dayIndex, exercise.exerciseId, exercise.latestTraining.id, maxWeight]);

    console.log('Exercise data:', exercise);

    const getVideoUrl = (url: string | undefined) => {
        if (!url) return '';
        if (url.includes('youtube.com') || url.includes('youtu.be')) {
            // Extract video ID from YouTube URL
            const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
            return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
        }
        return url;
    };

    return (
        <div className="flex flex-col text-text-primary">
            <div
                className={`p-2 flex justify-around items-center gap-2 rounded-lg font-bold bg-bg-primary cursor-pointer w-full mt-5 md:min-w-80 min-w-[90vw] ${isOpen ? '' : 'shadow-md shadow-shadow-fourth md:shadow-none'}`}
                onClick={accordionOpenClose}
            >
                <div className="flex flex-col items-center justify-center">
                    <h1 className="uppercase text-primary-color">{exercise.exerciseTitle}</h1>
                    <div className="flex gap-5">
                        {exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching' ? (
                            <h5 className="text-sm">{time} min | {distanceInKm} km</h5>
                        ) : (
                            <h5 className="text-sm">{exercise.sets} x {exercise.repetitions} rep</h5>
                        )}
                        {exercise.exerciseType !== 'cardio' && exercise.exerciseType !== 'stretching' && <h5 className="text-sm">{maxWeight} kg</h5>}
                        {exercise.restTimeSeconds && (
                            <h5 className="text-sm">{formatRestTime(exercise.restTimeSeconds)} </h5>
                        )}
                    </div>
                </div>
                <div className="block">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {isOpen && (
                <div className="flex gap-2 justify-center items-center bg-bg-data rounded-b-xl p-4">
                    <div className="text-center flex flex-col gap-2">
                        {exercise.exerciseImg && (
                            <div className="relative w-full h-48 mb-4">
                                <Image
                                    src={exercise.exerciseImg}
                                    alt={exercise.exerciseTitle}
                                    fill
                                    className="object-cover rounded-lg"
                                    unoptimized
                                />
                            </div>
                        )}
                        {exercise.exerciseVideo && (
                            <div className="relative w-full h-48">
                                <iframe
                                    src={getVideoUrl(exercise.exerciseVideo)}
                                    title={exercise.exerciseTitle}
                                    className="w-full h-full rounded-lg"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            </div>
                        )}
                        {exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching' ? (
                            <div className="flex gap-3 text-center bg-bg-primary p-2 rounded-full justify-center">
                                <p>Tempo: {time} min</p>
                                <p>|</p>
                                <p>Distanza: {distanceInKm} km</p>
                            </div>
                        ) : (
                            <div className="flex gap-3 text-center bg-bg-primary p-2 rounded-full justify-center">
                                <p>Serie: {exercise.sets}</p>
                                <p>x</p>
                                <p>Ripetizioni: {exercise.repetitions}</p>
                            </div>
                        )}
                        {exercise.exerciseType !== 'cardio' && exercise.exerciseType !== 'stretching' && (
                            <div className="flex gap-2 items-center justify-center">
                                <CgGym />
                                <p>Peso totale: {maxWeight} kg</p>
                            </div>
                        )}
                        {exercise.restTimeSeconds && (
                            <>
                                <div className="flex gap-2 items-center justify-center">
                                    <MdOutlineTimer />
                                    <p>Tempo di recupero: {formatRestTime(exercise.restTimeSeconds)}</p>
                                </div>
                                <div className="flex gap-2 items-center cursor-pointer justify-center text-black font-bold uppercase hover:bg-primary-focus bg-primary-color p-2 rounded-full" onClick={handleStartTimer}>
                                    <MdOutlineTimer />
                                    <p>Start Timer</p>
                                </div>
                            </>
                        )}
                        {exercise.exerciseType === 'withBarbell' && (
                            <BarbellInfo
                                haveBarbell={true}
                                totalWeight={maxWeight}
                                barbellWeight={exercise.barbellWeightKg || 0}
                            />
                        )}
                        <LastTrainingDetails
                            cardio={exercise.exerciseType === 'cardio' || exercise.exerciseType === 'stretching'}
                            latestTraining={exercise.latestTraining}
                            exerciseId={exercise.exerciseId}
                            haveBarbell={exercise.exerciseType === 'withBarbell'}
                        />
                        <NoteArea exercise={exercise} latestTraining={exercise.latestTraining} />
                    </div>
                </div>
            )}
            {showTimer && (
                <Timer
                    onClose={() => setShowTimer(false)}
                    initialTime={exercise.restTimeSeconds || 0}
                />
            )}
            {showVideo && exercise.exerciseVideo && (
                <div className="fixed inset-0 bg-bg-primary bg-opacity-75 flex items-center justify-center z-50" onClick={() => setShowVideo(false)}>
                    <div className="relative w-full h-full max-w-4xl max-h-[80vh]">
                        <button
                            className="absolute top-4 right-4 text-text-primary text-2xl z-10"
                            onClick={() => setShowVideo(false)}
                        >
                            ×
                        </button>
                        <iframe
                            src={exercise.exerciseVideo}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
