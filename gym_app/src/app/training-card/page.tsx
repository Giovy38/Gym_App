'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import TrainingAccordion from "@/src/components/training_card_page_component/TrainingAccordion"
import SingleExercise from "@/src/components/training_card_page_component/SingleExercise";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import Timer from "@/src/components/training_card_page_component/Timer";
import { useEffect, useState } from "react";
import { MdOutlineTimer } from "react-icons/md";
import { TrainingData } from "@/src/type/TrainingData.type";
import LoadAllTraining from "@/src/services/training-card-page-services/LoadAllTraining.services";

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
            const data: TrainingData[] = await LoadAllTraining();
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

    const pancaPiana = {
        exerciseTitle: "Panca Piana",
        sets: 4,
        reps: 5,
        restTime: 90,
        totalweight: 50,
        barbell: true,
        note: [],
        cardio: false
    };
    const pancaInclinata = {
        exerciseTitle: "Panca Inclinata",
        sets: 4,
        reps: 6,
        restTime: 30,
        totalweight: 45,
        barbell: true,
        note: [],
        cardio: false
    };
    const pancaInclinataManubri = {
        exerciseTitle: "Panca Inclinata Manubri",
        sets: 3,
        reps: 8,
        restTime: 240,
        totalweight: 15,
        barbell: false,
        note: [],
        cardio: true
    };

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

            <TrainingAccordion
                accordionTitle="petto e tricipiti"
                buttons={
                    <>
                        <SingleExercise exercise={pancaPiana} />
                        <SingleExercise exercise={pancaInclinata} />
                        <SingleExercise exercise={pancaInclinataManubri} />
                    </>
                }
            />
            <TrainingAccordion
                accordionTitle="gambe"
                buttons={
                    <>
                        <SingleExercise exercise={pancaPiana} />
                        <SingleExercise exercise={pancaInclinata} />
                        <SingleExercise exercise={pancaInclinataManubri} />
                    </>
                }
            />
            <TrainingAccordion
                accordionTitle="spalle e bicipiti"
                buttons={
                    <>
                        <SingleExercise exercise={pancaPiana} />
                        <SingleExercise exercise={pancaInclinata} />
                        <SingleExercise exercise={pancaInclinataManubri} />
                        <SingleExercise exercise={pancaPiana} />
                        <SingleExercise exercise={pancaInclinata} />
                        <SingleExercise exercise={pancaInclinataManubri} />
                        <SingleExercise exercise={pancaPiana} />
                        <SingleExercise exercise={pancaInclinata} />
                        <SingleExercise exercise={pancaInclinataManubri} />
                    </>
                }
            />

        </div>
    )
}