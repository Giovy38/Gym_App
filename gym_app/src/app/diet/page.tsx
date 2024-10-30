'use client'

import Accordion from "@/src/components/diet_page_component/Accordion"
import AddItemButton from "@/src/components/diet_page_component/AddItemButton"
import SectionTitle from "@/src/components/reusable_components/SectionTitle"

export default function DietPage() {



    return (
        // rimosso flex-col added pl-5
        <div className="min-h-[82vh] flex flex-col justify-center gap-3 p-5">
            <SectionTitle title="Diet page" />
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