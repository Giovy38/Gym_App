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

export default function TrainingCardPage() {

    const [latestTraining, setLatestTraining] = useState<TrainingData | null>(null);
    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    const updateTrainings = (selectedData: TrainingData) => {
        setLatestTraining(trainings[trainings.length - 1]);
        console.log('latestTraining', latestTraining);
        console.log('trainings', trainings);
        console.log('selectedData', selectedData);
    };

    const handleUpdateSelectedData = (selectedData: TrainingData) => {
        setLatestTraining(selectedData);
    };

    useEffect(() => {
        fetchData();
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

    const handleRemoveTraining = () => {
        fetchData();
    }

    const [isTimerVisible, setIsTimerVisible] = useState(false);

    const showTimer = () => {
        setIsTimerVisible(true)
    }

    return (
        <div className="p-5 ">
            <SectionTitle title="training card page" />
            <div>
                <MdOutlineTimer onClick={showTimer} className="text-black text-5xl cursor-pointer bg-[#f8bf58] hover:bg-[#efb242b6] hover:text-white p-2 rounded-xl fixed bottom-5 right-5 z-10 shadow-lg shadow-black" />
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
                latestTraining.workoutDays.map((workoutDay) => (
                    <TrainingAccordion
                        key={workoutDay.workoutName}
                        accordionTitle={workoutDay.workoutName}
                        buttons={
                            <>
                                {workoutDay.exercises.map((exercise) => (
                                    <SingleExercise
                                        key={exercise.name}
                                        exercise={{
                                            index: exercise.index,
                                            exerciseTitle: exercise.name,
                                            sets: exercise.sets,
                                            reps: exercise.reps,
                                            restTime: exercise.restTime.minutes * 60 + exercise.restTime.seconds,
                                            barbellWeight: exercise.barbell ? exercise.barbellWeight : 0,
                                            totalweight: exercise.barbell ? (exercise.barbellWeight || 0) : 0,
                                            barbell: exercise.barbell,
                                            note: exercise.notes,
                                            cardio: exercise.isCardio,
                                            latestTraining: latestTraining
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
                    <GiWeightLiftingUp className="text-5xl text-[#f8bf58] animate-bounce" />
                </div>
            )}
        </div>
    )
}