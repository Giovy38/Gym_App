'use client'

import DataSlider from "@/src/components/data_slider_component/DataSlider"
import Accordion from "@/src/components/diet_page_component/Accordion"
import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"

export default function DietPage() {



    return (
        <div className="min-h-[82vh] flex flex-col justify-center gap-3 p-5">
            <SectionTitle title="Diet page" />
            <DataSlider dataPage='diet' />
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