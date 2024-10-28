'use-client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle";
import Image from 'next/image';
import man_body from '../../assets/img/man_body.png';
import woman_body from '../../assets/img/woman_body.png'
import InfoCard from "@/src/components/reusable_components/InfoCard";
import AddRemoveButton from "@/src/components/reusable_components/AddRemoveButton";


export default function BodyCheckPage() {
    const isMan = true

    return (
        <div className="flex flex-col p-3">
            <SectionTitle title="body check page" />
            <div className="flex flex-col lg:flex-row flex-grow items-center justify-around gap-5 lg:gap-20 p-5">
                <div className="w-full lg:w-96 ml-0 lg:ml-5 flex flex-col items-center">
                    {/* top details */}
                    <div className="flex flex-col md:flex-row justify-center gap-3 mb-5 lg:hidden">
                        <InfoCard infoTitle="date" leftData='19/07/2024' rightData='22/10/2024' useConditionalColor={false} />
                        <InfoCard infoTitle="height" leftData='170 cm' rightData='170 cm' />
                        <InfoCard infoTitle="weight" leftData='61.05 kg' rightData='62.20 kg' useConditionalColor={false} />
                    </div>
                    {isMan ? <Image src={man_body} alt="body-img" /> :
                        <Image src={woman_body} alt="body-img" />}
                    <div className="hidden lg:flex flex-col gap-3 mt-5">
                        <AddRemoveButton text='add new datas' isAdd />
                        <AddRemoveButton text='remove specifics datas' isAdd={false} />
                    </div>
                </div>
                <div className="flex flex-col gap-5 justify-start w-full lg:w-auto">
                    {/* top details */}
                    <div className="hidden lg:flex flex-col md:flex-row justify-center gap-3">
                        <InfoCard infoTitle="date" leftData='19/07/2024' rightData='22/10/2024' useConditionalColor={false} />
                        <InfoCard infoTitle="height" leftData='170 cm' rightData='170 cm' />
                        <InfoCard infoTitle="weight" leftData='61.05 kg' rightData='62.20 kg' useConditionalColor={false} />
                    </div>
                    {/* details */}
                    <div className="flex flex-col flex-wrap gap-3">
                        {/* shoulders - spalle */}
                        <InfoCard infoTitle="shoulders" leftData='42 cm' rightData='43 cm' />
                        {/* chest - pettp */}
                        <InfoCard infoTitle="chest" leftData='85 cm' rightData='88 cm' />
                        {/* waits - vita */}
                        <InfoCard infoTitle="waist" leftData='77 cm' rightData='81 cm' />
                        {/* biceps - bicipiti */}
                        <div className="flex gap-3">
                            <InfoCard infoTitle="biceps sx" leftData='28 cm' rightData='29.5 cm' />
                            <InfoCard infoTitle="biceps dx" leftData='28 cm' rightData='29.5 cm' />
                        </div>
                        {/* forearm - avambraccio */}
                        <div className="flex gap-3">
                            <InfoCard infoTitle="forearm sx" leftData='23 cm' rightData='24 cm' />
                            <InfoCard infoTitle="forearm dx" leftData='23 cm' rightData='24 cm' />
                        </div>
                        {/* buttocks - glutei */}
                        <InfoCard infoTitle="buttocks" leftData='86 cm' rightData='89 cm' />
                        {/* thigh - coscia */}
                        <InfoCard infoTitle="thigh" leftData='/' rightData='/' />
                        {/* quadriceps - quadricipite */}
                        <div className="flex gap-3">
                            <InfoCard infoTitle="quadriceps sx" leftData='42 cm' rightData='47 cm' />
                            <InfoCard infoTitle="quadriceps dx" leftData='45 cm' rightData='48 cm' />
                        </div>
                        {/* calf - polpacci */}
                        <div className="flex gap-3">
                            <InfoCard infoTitle="calf sx" leftData='30 cm' rightData='31 cm' />
                            <InfoCard infoTitle="calf dx" leftData='33 cm' rightData='34 cm' />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-5 lg:hidden">
                        <AddRemoveButton text='add new datas' isAdd />
                        <AddRemoveButton text='remove specifics datas' isAdd={false} />
                    </div>
                </div>
            </div>
        </div>
    )
}
