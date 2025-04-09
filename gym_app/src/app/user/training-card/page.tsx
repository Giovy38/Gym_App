'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import TrainingAccordion from "@/src/components/training_card_page_component/TrainingAccordion"
import SingleExercise from "@/src/components/training_card_page_component/SingleExercise";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import Timer from "@/src/components/training_card_page_component/Timer";
import { useEffect, useState, useCallback } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { TrainingData } from "@/src/type/TrainingData.type";
import { GiWeightLiftingUp } from "react-icons/gi";
import { trainingCardService } from "@/src/services/training-card.services";
import { BodyCheckData } from "@/src/type/BodyCheckData.type";
import { DietData } from "@/src/type/DietData.type";

export default function TrainingCardPage() {

    const [latestTraining, setLatestTraining] = useState<TrainingData | null>(null);
    const [trainings, setTrainings] = useState<TrainingData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const sortExercisesByOrder = (training: TrainingData): TrainingData => {
        const sortedTraining = { ...training };

        sortedTraining.workoutDays = training.workoutDays.map(day => ({
            ...day,
            exercises: [...day.exercises].sort((a, b) => a.id - b.id)
        }));

        return sortedTraining;
    };

    const fetchData = useCallback(async () => {
        try {
            const data: TrainingData[] = await trainingCardService.getTrainings();
            const sortedData = data.map(training => sortExercisesByOrder(training));
            setTrainings(sortedData);
            if (sortedData.length > 0) {
                setLatestTraining(sortedData[sortedData.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
        setIsLoaded(true);
    }, [fetchData]);

    const updateTrainings = (selectedData: TrainingData) => {
        const sortedData = sortExercisesByOrder(selectedData);
        setLatestTraining(sortedData);
        setTrainings(prevTrainings => {
            return prevTrainings.map(training => {
                if (training.id === selectedData.id) {
                    return sortedData;
                }
                return training;
            });
        });
    };

    const handleUpdateSelectedData = (selectedData: TrainingData | BodyCheckData | DietData) => {
        if ('workoutDays' in selectedData) {
            const sortedData = sortExercisesByOrder(selectedData as TrainingData);
            setLatestTraining(sortedData);
        } else {
            setLatestTraining(null);
        }
    };

    const handleNewTraining = () => {
        fetchData();
    }

    const handleRemoveTraining = async () => {
        await fetchData();
        if (trainings.length <= 1) {
            setLatestTraining(null);
        }
    }

    const [isTimerVisible, setIsTimerVisible] = useState(false);

    const showTimer = () => {
        setIsTimerVisible(true)
    }

    console.log('latestTraining:', latestTraining);

    return (
        <div className={` p-5 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <div>
                <MdOutlineTimer onClick={showTimer} className="text-text-secondary text-5xl cursor-pointer bg-primary-color hover:bg-primary-focus hover:text-text-primary p-2 rounded-xl fixed bottom-5 right-5 z-10 shadow-lg shadow-shadow-primary" />
            </div>
            {isTimerVisible && <Timer onClose={() => setIsTimerVisible(false)} />}
            <DataSlider
                dataPage='training'
                onUpdateData={updateTrainings}
                dbDate={trainings}
                onNewDiet={() => { }}
                onNewBodyCheck={() => { }}
                onRemoveTraining={handleRemoveTraining}
                onUpdateSelectedData={handleUpdateSelectedData}
                onNewTraining={handleNewTraining}
                onRemoveDiet={() => { }}
            />

            {latestTraining ? (
                latestTraining.workoutDays.map((workoutDay, dayIndex) => (
                    <TrainingAccordion
                        key={`workout-day-${dayIndex}-${workoutDay.workoutName}`}
                        accordionTitle={workoutDay.workoutName}
                        buttons={
                            <>
                                {workoutDay.exercises.map((exercise) => (
                                    <SingleExercise
                                        key={`exercise-${dayIndex}-${exercise.id}`}
                                        exercise={{
                                            exerciseId: exercise.id,
                                            exerciseTitle: exercise.name,
                                            sets: exercise.sets,
                                            repetitions: exercise.repetitions,
                                            durationSeconds: exercise.durationSeconds,
                                            distanceKm: exercise.distanceKm,
                                            restTimeSeconds: exercise.restTimeSeconds,
                                            exerciseType: exercise.exerciseType,
                                            barbellWeightKg: exercise.exerciseType === 'withBarbell' ? exercise.barbellWeightKg : 0,
                                            totalWeight: exercise.exerciseType === 'withBarbell' ? (exercise.barbellWeightKg || 0) : 0,
                                            notes: exercise.notes,
                                            latestTraining: latestTraining,
                                            dayIndex: dayIndex,
                                            exerciseImg: exercise.exerciseImg,
                                            exerciseVideo: exercise.exerciseVideo
                                        }}
                                    />
                                ))}
                            </>
                        }
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center gap-5">
                    <SectionTitle title="Aggiungi un allenamento per vedere i tuoi progressi" />
                    <GiWeightLiftingUp className="text-5xl text-primary-color" />
                </div>
            )}
        </div>
    )
}