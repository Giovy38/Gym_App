'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
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
    const [selectedDay, setSelectedDay] = useState('monday');

    const updateDiets = (selectedData: DietData) => {
        console.log('Updating diets with:', selectedData);
        setLatestDiet(selectedData);
    };

    const handleUpdateSelectedData = (selectedData: DietData | BodyCheckData | TrainingData) => {
        if ('monday' in selectedData) {
            console.log('Updating selected data with:', selectedData);
            setLatestDiet(selectedData as DietData);
        }
    };

    useEffect(() => {
        fetchData();
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        console.log('Selected day changed to:', selectedDay);
        fetchData();
    }, [selectedDay]);

    const fetchData = async () => {
        try {
            const data = await dietService.getDiets();
            console.log('Fetched diets:', data);
            setDiets(data);
            if (data.length > 0) {
                const currentDiet = data[data.length - 1];
                console.log('Setting latest diet:', currentDiet);
                setLatestDiet(currentDiet);
            }
        } catch (error) {
            console.log('Error fetching diets:', error);
        }
    };

    const handleNewDiet = async () => {
        console.log('Handling new diet');
        await fetchData();
    };

    const handleRemoveDiet = async () => {
        console.log('Handling remove diet');
        await fetchData();
    };

    const daysOfWeek = ['lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato', 'domenica'];
    const daysMapping: { [key: string]: string } = {
        'lunedì': 'monday',
        'martedì': 'tuesday',
        'mercoledì': 'wednesday',
        'giovedì': 'thursday',
        'venerdì': 'friday',
        'sabato': 'saturday',
        'domenica': 'sunday'
    };

    const meals = ['breakfast', 'snack', 'lunch', 'snack2', 'dinner'];
    const mealsMapping: { [key: string]: string } = {
        'breakfast': 'Colazione',
        'snack': 'Spuntino',
        'lunch': 'Pranzo',
        'snack2': 'Merenda',
        'dinner': 'Cena'
    };

    const handleDaySelect = (italianDay: string) => {
        console.log('Day selected:', italianDay);
        const newDay = daysMapping[italianDay];
        console.log('Setting selected day to:', newDay);
        setSelectedDay(newDay);
    };

    return (
        <div className={`min-h-screen w-full flex flex-col justify-start xl:items-center gap-3 p-5 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                <div className="flex flex-col items-center justify-center gap-5">
                    <SectionTitle title="aggiungi una dieta per vedere il piano settimanale" />
                    <FaBowlFood className="text-5xl text-primary-color" />
                </div>
            ) : (
                <div className="flex flex-col w-full max-w-4xl">
                    {/* Tab Navigation */}
                    <div className="relative w-full bg-bg-primary rounded-t-md md:flex md:justify-center md:items-center">
                        <div className="flex overflow-x-auto scrollbar-hide -mx-2 px-2">
                            <div className="flex space-x-2 min-w-full">
                                {daysOfWeek.map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => handleDaySelect(day)}
                                        className={`flex-shrink-0 px-3 py-2 text-sm font-bold whitespace-nowrap rounded-b-md transition-all duration-200 ${daysMapping[day] === selectedDay
                                            ? 'bg-primary-color text-text-secondary'
                                            : 'text-text-neutral md:hover:bg-primary-focus md:hover:text-text-secondary'
                                            }`}
                                    >
                                        {day.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Meals Content */}
                    <div className="flex flex-col gap-4 rounded-lg w-full">
                        <div className="flex flex-col w-full">
                            {meals.map((meal) => (
                                <div key={meal} className="w-full rounded-lg">
                                    <AddItemButtonSlider
                                        title={mealsMapping[meal]}
                                        displayTitle={mealsMapping[meal]}
                                        latestDiet={latestDiet}
                                        dayOfWeek={selectedDay}
                                        meal={meal}
                                        diets={diets}
                                        selectedDiet={latestDiet}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}