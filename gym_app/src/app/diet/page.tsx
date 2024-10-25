'use client'

import Accordion from "@/src/components/reusable_components/Accordion"

export default function DietPage() {
    return (
        // rimosso flex-col added pl-5
        <div className="min-h-[82vh] flex flex-col justify-center gap-3 p-5">
            <Accordion accordionTitle="monday" />
            <Accordion accordionTitle="tuesday" />
            <Accordion accordionTitle="wednesday" />
            <Accordion accordionTitle="thursday" />
            <Accordion accordionTitle="friday" />
            <Accordion accordionTitle="saturday" />
            <Accordion accordionTitle="sunday" />
        </div>
    )
}