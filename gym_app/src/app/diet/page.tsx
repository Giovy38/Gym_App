'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
import Accordion from "@/src/components/diet_page_component/Accordion"
import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"
import LoadAllDiet from "@/src/services/diet-page-services/LoadDiet.services"
import { DietData } from "@/src/type/DietData.type"
import { useEffect, useState } from "react"

export default function DietPage() {

    const [latestDiet, setLatestDiet] = useState<DietData | null>(null);
    const [diets, setDiets] = useState<DietData[]>([]);

    const updateDiets = (selectedData: DietData) => {
        setLatestDiet(selectedData);
        console.log(latestDiet);
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



    return (
        <div className="min-h-[82vh] flex flex-col justify-center xl:items-center gap-3 p-5">
            <SectionTitle title="Diet page" />
            <DataSlider dataPage='diet' onUpdateData={updateDiets} dbDate={diets} onNewDiet={handleNewDiet} onNewBodyCheck={() => { }} />
            <Accordion accordionTitle="monday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="monday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="monday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="monday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="monday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="monday" meal="dinner" />
            </>} />
            <Accordion accordionTitle="tuesday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="tuesday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="tuesday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="tuesday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="tuesday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="tuesday" meal="dinner" /></>} />
            <Accordion accordionTitle="wednesday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="wednesday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="wednesday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="wednesday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="wednesday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="wednesday" meal="dinner" /></>} />
            <Accordion accordionTitle="thursday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="thursday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="thursday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="thursday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="thursday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="thursday" meal="dinner" /></>} />
            <Accordion accordionTitle="friday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="friday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="friday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="friday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="friday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="friday" meal="dinner" /></>} />
            <Accordion accordionTitle="saturday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="saturday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="saturday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="saturday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="saturday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="saturday" meal="dinner" /></>} />
            <Accordion accordionTitle="sunday" buttons={<>
                <AddItemButton title="breakfast" latestDiet={latestDiet} dayOfWeek="sunday" meal="breakfast" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="sunday" meal="snack" />
                <AddItemButton title="lunch" latestDiet={latestDiet} dayOfWeek="sunday" meal="lunch" />
                <AddItemButton title="snack" latestDiet={latestDiet} dayOfWeek="sunday" meal="snack" />
                <AddItemButton title="dinner" latestDiet={latestDiet} dayOfWeek="sunday" meal="dinner" /></>} />
        </div>
    )
}