'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import TrainingAccordion from "@/src/components/training_card_page_component/TrainingAccordion"
import SingleExercise from "@/src/components/training_card_page_component/SingleExercise";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import Timer from "@/src/components/training_card_page_component/Timer";
import { useEffect, useState } from "react";
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

    const updateTrainings = (selectedData: TrainingData) => {
        setLatestTraining(trainings[trainings.length - 1]);
        console.log('latestTraining', latestTraining);
        console.log('trainings', trainings);
        console.log('selectedData', selectedData);
    };

    const handleUpdateSelectedData = (selectedData: TrainingData | BodyCheckData | DietData) => {
        if ('workoutDays' in selectedData) {
            setLatestTraining(selectedData as TrainingData);
        } else {
            setLatestTraining(null);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoaded(true);
    }, []);

    const fetchData = async () => {
        try {
            const data: TrainingData[] = await trainingCardService.getTrainings();
            setTrainings(data);
            if (data.length > 0) {
                setLatestTraining(data[data.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
            <SectionTitle title="training card page" />
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
                                            reps: exercise.reps,
                                            time: exercise.time,
                                            distanceInKm: exercise.distanceInKm,
                                            restTimeInSeconds: exercise.restTimeInSeconds,
                                            exerciseType: exercise.exerciseType,
                                            barbellWeight: exercise.exerciseType === 'withBarbell' ? exercise.barbellWeight : 0,
                                            totalWeight: exercise.exerciseType === 'withBarbell' ? (exercise.barbellWeight || 0) : 0,
                                            notes: exercise.notes,
                                            latestTraining: latestTraining,
                                            dayIndex: dayIndex
                                        }}
                                    />
                                ))}
                            </>
                        }
                    />
                ))
            ) : (
                <div className="flex flex-col items-center justify-center gap-5 animate-pulse">
                    <SectionTitle title="Add a new training card to see workout plan" />
                    <GiWeightLiftingUp className="text-5xl text-primary-color animate-bounce" />
                </div>
            )}
        </div>
    )
}