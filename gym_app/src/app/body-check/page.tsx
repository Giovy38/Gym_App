'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle";
import Image from 'next/image';
import man_body from '../../assets/img/man_body.png';
import woman_body from '../../assets/img/woman_body.png'
import InfoCard from "@/src/components/body_check_page_component/InfoCard";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import { useEffect, useState } from "react";
import { BodyCheckData } from "@/src/type/BodyCheckData.type";
import { bodyCheckService } from "@/src/services/body-check.services";
import LoginPage from "../login/page";


export default function BodyCheckPage() {
    const isMan = true;
    const [bodyChecks, setBodyChecks] = useState<BodyCheckData[]>([]);
    const [latestCheck, setLatestCheck] = useState<BodyCheckData | null>(null);
    const [previousCheck, setPreviousCheck] = useState<BodyCheckData | null>(null);
    const [isLogged, setIsLogged] = useState(false)

    useEffect(() => {
        fetchData();
        if (localStorage.getItem('isLogged') === 'true') {
            setIsLogged(true)
        }
    }, []);

    const fetchData = async () => {
        try {
            const data = await bodyCheckService.getBodyChecks();
            setBodyChecks(data);
            if (data.length > 0) {
                setLatestCheck(data[data.length - 1]);
                setPreviousCheck(data.length > 1 ? data[data.length - 2] : data[data.length - 1]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleNewBodyCheck = () => {
        fetchData(); // Refresh the data when a new body check is created
    };

    const updateChecks = (selectedData: BodyCheckData) => {
        setLatestCheck(selectedData);
        if (bodyChecks.length === 1) {
            setPreviousCheck(selectedData);
        }
    };

    const defaultData = {
        date: "N/A",
        height: 0,
        weight: 0,
        shoulder: 0,
        chest: 0,
        waist: 0,
        biceps: { left: 0, right: 0 },
        forearm: { left: 0, right: 0 },
        buttocks: 0,
        thigh: 0,
        quadriceps: { left: 0, right: 0 },
        calf: { left: 0, right: 0 }
    }


    return (
        isLogged ? (
            <>
                <div className="flex flex-col p-3">
                    <SectionTitle title="body check page" />
                    <DataSlider
                        dataPage='body'
                        onUpdateData={updateChecks}
                        dbDate={bodyChecks}
                        onNewBodyCheck={handleNewBodyCheck}
                        onNewDiet={() => { }}
                        onRemoveDiet={() => { }}
                        onUpdateSelectedData={() => { }}
                        onNewTraining={() => { }}
                        onRemoveTraining={() => { }}
                    />
                    <div className="flex flex-col lg:flex-row flex-grow items-center justify-around gap-5 lg:gap-20 p-5">
                        <div className="w-full lg:w-96 ml-0 lg:ml-5 flex flex-col items-center">
                            {/* top details */}
                            <div className="flex flex-col md:flex-row justify-center gap-3 mb-5 lg:hidden">
                                <InfoCard infoTitle="date" leftData={previousCheck?.date || defaultData.date} rightData={latestCheck?.date || defaultData.date} useConditionalColor={false} />
                                <InfoCard infoTitle="height" leftData={previousCheck?.height || defaultData.height} rightData={latestCheck?.height || defaultData.height} />
                                <InfoCard infoTitle="weight" leftData={previousCheck?.weight || defaultData.weight} rightData={latestCheck?.weight || defaultData.weight} useConditionalColor={false} />
                            </div>
                            {isMan ? <Image src={man_body} alt="body-img" /> :
                                <Image src={woman_body} alt="body-img" />}
                        </div>
                        <div className="flex flex-col gap-5 justify-start w-full lg:w-auto">
                            {/* top details */}
                            <div className="hidden lg:flex flex-col md:flex-row justify-center gap-3">
                                <InfoCard infoTitle="date" leftData={previousCheck?.date || defaultData.date} rightData={latestCheck?.date || defaultData.date} useConditionalColor={false} />
                                <InfoCard infoTitle="height" leftData={previousCheck?.height || defaultData.height} rightData={latestCheck?.height || defaultData.height} />
                                <InfoCard infoTitle="weight" leftData={previousCheck?.weight || defaultData.weight} rightData={latestCheck?.weight || defaultData.weight} useConditionalColor={false} />
                            </div>
                            {/* details */}
                            <div className="flex flex-col flex-wrap gap-3">
                                {/* shoulders - spalle */}
                                <InfoCard infoTitle="shoulders" leftData={previousCheck?.shoulder || defaultData.shoulder} rightData={latestCheck?.shoulder || defaultData.shoulder} />
                                {/* chest - petto */}
                                <InfoCard infoTitle="chest" leftData={previousCheck?.chest || defaultData.chest} rightData={latestCheck?.chest || defaultData.chest} />
                                {/* waist - vita */}
                                <InfoCard infoTitle="waist" leftData={previousCheck?.waist || defaultData.waist} rightData={latestCheck?.waist || defaultData.waist} />
                                {/* biceps - bicipiti */}
                                <div className="flex gap-3">
                                    <InfoCard infoTitle="biceps sx" leftData={previousCheck?.biceps?.left || defaultData.biceps.left} rightData={latestCheck?.biceps?.left || defaultData.biceps.left} />
                                    <InfoCard infoTitle="biceps dx" leftData={previousCheck?.biceps?.right || defaultData.biceps.right} rightData={latestCheck?.biceps?.right || defaultData.biceps.right} />
                                </div>
                                {/* forearm - avambraccio */}
                                <div className="flex gap-3">
                                    <InfoCard infoTitle="forearm sx" leftData={previousCheck?.forearm?.left || defaultData.forearm.left} rightData={latestCheck?.forearm?.left || defaultData.forearm.left} />
                                    <InfoCard infoTitle="forearm dx" leftData={previousCheck?.forearm?.right || defaultData.forearm.right} rightData={latestCheck?.forearm?.right || defaultData.forearm.right} />
                                </div>
                                {/* buttocks - glutei */}
                                <InfoCard infoTitle="buttocks" leftData={previousCheck?.buttocks || defaultData.buttocks} rightData={latestCheck?.buttocks || defaultData.buttocks} />
                                {/* thigh - coscia */}
                                <InfoCard infoTitle="thigh" leftData={previousCheck?.thigh || defaultData.thigh} rightData={latestCheck?.thigh || defaultData.thigh} />
                                {/* quadriceps - quadricipite */}
                                <div className="flex gap-3">
                                    <InfoCard infoTitle="quadriceps sx" leftData={previousCheck?.quadriceps?.left || defaultData.quadriceps.left} rightData={latestCheck?.quadriceps?.left || defaultData.quadriceps.left} />
                                    <InfoCard infoTitle="quadriceps dx" leftData={previousCheck?.quadriceps?.right || defaultData.quadriceps.right} rightData={latestCheck?.quadriceps?.right || defaultData.quadriceps.right} />
                                </div>
                                {/* calf - polpacci */}
                                <div className="flex gap-3">
                                    <InfoCard infoTitle="calf sx" leftData={previousCheck?.calf?.left || defaultData.calf.left} rightData={latestCheck?.calf?.left || defaultData.calf.left} />
                                    <InfoCard infoTitle="calf dx" leftData={previousCheck?.calf?.right || defaultData.calf.right} rightData={latestCheck?.calf?.right || defaultData.calf.right} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>) :
            (<LoginPage />)
    )
}
