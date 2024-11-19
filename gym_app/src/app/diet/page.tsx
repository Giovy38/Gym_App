'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
import Accordion from "@/src/components/diet_page_component/Accordion"
import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import LoadAllDiet from "@/src/services/diet-page-services/LoadDiet.services"
import { DietData } from "@/src/type/DietData.type"
import { useState } from "react"

export default function DietPage() {

    const [latestDiet, setLatestDiet] = useState<DietData | null>(null);
    const [diets, setDiets] = useState<DietData[]>([]);

    const updateDiets = (selectedData: DietData) => {
        setLatestDiet(selectedData);
        console.log(latestDiet);
    };

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
        fetchData(); // Ricarica i dati quando viene creato un nuovo body check
    };



    return (
        <div className="min-h-[82vh] flex flex-col justify-center xl:items-center gap-3 p-5">
            <SectionTitle title="Diet page" />
            <DataSlider dataPage='diet' onUpdateData={updateDiets} dbDate={diets} onNewDiet={handleNewDiet} onNewBodyCheck={() => { }} />
            <Accordion accordionTitle="monday" buttons={<>
                <AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" />
            </>} />
            <Accordion accordionTitle="tuesday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
            <Accordion accordionTitle="wednesday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
            <Accordion accordionTitle="thursday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
            <Accordion accordionTitle="friday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
            <Accordion accordionTitle="saturday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
            <Accordion accordionTitle="sunday" buttons={<><AddItemButton title="breakfast" />
                <AddItemButton title="snack" />
                <AddItemButton title="lunch" />
                <AddItemButton title="snack" />
                <AddItemButton title="dinner" /></>} />
        </div>
    )
}