'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import TrainingAccordion from "@/src/components/training_card_page_component/TrainingAccordion"
import SingleExercise from "@/src/components/training_card_page_component/SingleExercise";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import Timer from "@/src/components/training_card_page_component/Timer";
import AddBlueButton from "@/src/components/reusable_components/AddBlueButton";
import { useState } from "react";


export default function TrainingCardPage() {

    const pancaPiana = {
        exerciseTitle: "Panca Piana",
        sets: 4,
        reps: 5,
        restTime: 90,
        totalweight: 50,
        barbell: true,
        note: []
    };
    const pancaInclinata = {
        exerciseTitle: "Panca Inclinata",
        sets: 4,
        reps: 6,
        restTime: 30,
        totalweight: 45,
        barbell: true,
        note: []
    };
    const pancaInclinataManubri = {
        exerciseTitle: "Panca Inclinata Manubri",
        sets: 3,
        reps: 8,
        restTime: 240,
        totalweight: 15,
        barbell: false,
        note: []
    };

    const [isTimerVisible, setIsTimerVisible] = useState(false);

    const showTimer = () => {
        setIsTimerVisible(true)
    }


    return (
        <div className="p-5 ">
            <SectionTitle title="training card page" />
            <div className="w-full flex justify-end">
                <AddBlueButton text="Show Timer" onClick={showTimer} />
            </div>
            {isTimerVisible && <Timer onClose={() => setIsTimerVisible(false)} />}
            <DataSlider dataPage='training' />

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