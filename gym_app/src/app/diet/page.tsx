'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
import Accordion from "@/src/components/diet_page_component/Accordion"
import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import LoadAllDiet from "@/src/services/diet-page-services/LoadDiet.services"
import { DietData } from "@/src/type/DietData.type"
import { useEffect, useState } from "react"
import { FaBowlFood } from "react-icons/fa6";


export default function DietPage() {

    const [latestDiet, setLatestDiet] = useState<DietData | null>(null);
    const [diets, setDiets] = useState<DietData[]>([]);

    const updateDiets = (selectedData: DietData) => {
        setLatestDiet(selectedData);
        console.log('latestDiet', latestDiet);
        console.log('diets', diets);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const data: DietData[] = await LoadAllDiet();
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
    const meals = ['breakfast', 'snack', 'lunch', 'snack 2', 'dinner'];

    return (
        <div className="min-h-[82vh] flex flex-col justify-start xl:items-center gap-3 p-5">
            <SectionTitle title="Diet page" />
            <DataSlider
                dataPage='diet'
                onUpdateData={updateDiets}
                dbDate={diets}
                onNewDiet={handleNewDiet}
                onNewBodyCheck={() => { }}
                onRemoveDiet={handleRemoveDiet}
            />

            {diets.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-5 animate-pulse">
                    <SectionTitle title="Add a new diet to see weekly plan" />
                    <FaBowlFood className="text-5xl text-[#f8bf58] animate-bounce" />
                </div>
            ) : (
                <>
                    {daysOfWeek.map((day) => (
                        <Accordion
                            key={day}
                            accordionTitle={day.charAt(0).toUpperCase() + day.slice(1)}
                            buttons={
                                <>
                                    {meals.map((meal) => (
                                        <AddItemButton
                                            key={meal}
                                            title={meal}
                                            latestDiet={diets[diets.length - 1]}
                                            dayOfWeek={day}
                                            meal={meal}
                                            diets={diets}
                                        />
                                    ))}
                                </>
                            }
                        />
                    ))}
                </>
            )}
        </div>
    )
}