'use-client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import TrainingAccordion from "@/src/components/training_card_page_component/TrainingAccordion"
import SingleExercise from "@/src/components/training_card_page_component/SingleExercise";


export default function TrainingCardPage() {

    const pancaPiana = {
        exerciseTitle: "Panca Piana",
        sets: 4,
        reps: 5,
        restTime: 1.20,
        totalweight: 50,
        barbell: true,
        note: []
    };
    const pancaInclinata = {
        exerciseTitle: "Panca Inclinata",
        sets: 4,
        reps: 6,
        restTime: 1.20,
        totalweight: 45,
        barbell: true,
        note: []
    };
    const pancaInclinataManubri = {
        exerciseTitle: "Panca Inclinata Manubri",
        sets: 3,
        reps: 8,
        restTime: 1.20,
        totalweight: 15,
        barbell: false,
        note: []
    };

    return (
        <div className="p-5 ">
            <SectionTitle title="training card page" />

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