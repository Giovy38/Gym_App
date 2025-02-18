'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
import Accordion from "@/src/components/diet_page_component/Accordion"
// import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import { dietService } from "@/src/services/diet.services"
import { DietData } from "@/src/type/DietData.type"
import { useEffect, useState } from "react"
import { FaBowlFood } from "react-icons/fa6";
import { BodyCheckData } from "@/src/type/BodyCheckData.type"
import { TrainingData } from "@/src/type/TrainingData.type"
import AddItemButtonSlider from "@/src/components/diet_page_component/AddItemButtonSlider"


export default function DietPage() {

    const [latestDiet, setLatestDiet] = useState<DietData | null>(null);
    const [diets, setDiets] = useState<DietData[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const updateDiets = (selectedData: DietData) => {
        setLatestDiet(selectedData);
        console.log('latestDiet', latestDiet);
        console.log('diets', diets);
        console.log('selectedData', selectedData);
    };

    const handleUpdateSelectedData = (selectedData: DietData | BodyCheckData | TrainingData) => {
        if ('monday' in selectedData) {
            setLatestDiet(selectedData as DietData);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoaded(true);
    }, []);

    const fetchData = async () => {
        try {
            const data = await dietService.getDiets();
            setDiets(data);
            if (data.length > 0) {
                setLatestDiet(data[data.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewDiet = () => {
        fetchData();
    };

    const handleRemoveDiet = () => {
        fetchData();
    };

    const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    const meals = ['breakfast', 'snack', 'lunch', 'snack2', 'dinner'];

    return (
        <div className={`min-h-screen w-full flex flex-col justify-start xl:items-center gap-3 p-5 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <SectionTitle title="Diet page" />
            <DataSlider
                dataPage='diet'
                onUpdateData={updateDiets}
                dbDate={diets}
                onNewDiet={handleNewDiet}
                onNewBodyCheck={() => { }}
                onRemoveDiet={handleRemoveDiet}
                onUpdateSelectedData={handleUpdateSelectedData}
                onNewTraining={() => { }}
                onRemoveTraining={() => { }}
            />

            {diets.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-5 animate-pulse">
                    <SectionTitle title="Add a new diet to see weekly plan" />
                    <FaBowlFood className="text-5xl text-primary-color animate-bounce" />
                </div>
            ) : (
                <div className="flex flex-col justify-start items-center p-5 gap-3 w-full">
                    {daysOfWeek.map((day) => (
                        <Accordion
                            key={day}
                            accordionTitle={day.charAt(0).toUpperCase() + day.slice(1)}
                            buttons={meals.map((meal) => (
                                <AddItemButtonSlider
                                    key={meal}
                                    title={meal}
                                    latestDiet={diets[diets.length - 1]}
                                    dayOfWeek={day}
                                    meal={meal}
                                    diets={diets}
                                    selectedDiet={latestDiet}
                                />
                            ))}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}