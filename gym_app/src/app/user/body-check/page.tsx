'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle";
import Image from 'next/image';
import man_body from '@/src/assets/img/man_body.png';
import woman_body from '@/src/assets/img/woman_body.png';
import InfoCard from "@/src/components/body_check_page_component/InfoCard";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import { useEffect, useState } from "react";
import { BodyCheckData } from "@/src/type/BodyCheckData.type";
import { bodyCheckService } from "@/src/services/body-check.services";
import { useUser } from "@/src/context/UserProvider";
import { IoBody } from "react-icons/io5";



export default function BodyCheckPage() {
    const [isMan, setIsMan] = useState(true);
    const [bodyChecks, setBodyChecks] = useState<BodyCheckData[]>([]);
    const [latestCheck, setLatestCheck] = useState<BodyCheckData | null>(null);
    const [previousCheck, setPreviousCheck] = useState<BodyCheckData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const userData = useUser();


    useEffect(() => {
        fetchData();
        console.log(userData)
        if (userData?.gender === 'female') {
            setIsMan(false)
        } else {
            setIsMan(true)
        }
    }, [userData]);

    useEffect(() => {
        setIsLoaded(true);
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

    const handleNewBodyCheck = async () => {
        await fetchData();
    };

    const updateChecks = (selectedData: BodyCheckData) => {
        setLatestCheck(selectedData);
        setPreviousCheck(bodyChecks.length > 1 ? bodyChecks[bodyChecks.length - 2] : selectedData);
    };

    const defaultData = {
        date: "N/A",
        height: 0,
        weight: 0,
        shoulder: 0,
        chest: 0,
        waist: 0,
        leftBicep: 0,
        rightBicep: 0,
        leftForearm: 0,
        rightForearm: 0,
        buttocks: 0,
        thigh: 0,
        leftQuadricep: 0,
        rightQuadricep: 0,
        leftCalf: 0,
        rightCalf: 0
    }


    return (
        <div className={`flex flex-col p-3 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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

            {bodyChecks.length === 0 || !latestCheck ? (
                <div className="flex flex-col items-center justify-center gap-5 animate-pulse">
                    <SectionTitle title="Add a new body check to see your progress" />
                    <IoBody className="text-5xl text-[#f8bf58] animate-bounce" />
                </div>
            ) : (
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
                                <InfoCard infoTitle="biceps sx" leftData={previousCheck?.leftBicep || defaultData.leftBicep} rightData={latestCheck?.leftBicep || defaultData.leftBicep} />
                                <InfoCard infoTitle="biceps dx" leftData={previousCheck?.rightBicep || defaultData.rightBicep} rightData={latestCheck?.rightBicep || defaultData.rightBicep} />
                            </div>
                            {/* forearm - avambraccio */}
                            <div className="flex gap-3">
                                <InfoCard infoTitle="forearm sx" leftData={previousCheck?.leftForearm || defaultData.leftForearm} rightData={latestCheck?.leftForearm || defaultData.leftForearm} />
                                <InfoCard infoTitle="forearm dx" leftData={previousCheck?.rightForearm || defaultData.rightForearm} rightData={latestCheck?.rightForearm || defaultData.rightForearm} />
                            </div>
                            {/* buttocks - glutei */}
                            <InfoCard infoTitle="buttocks" leftData={previousCheck?.buttocks || defaultData.buttocks} rightData={latestCheck?.buttocks || defaultData.buttocks} />
                            {/* thigh - coscia */}
                            <InfoCard infoTitle="thigh" leftData={previousCheck?.thigh || defaultData.thigh} rightData={latestCheck?.thigh || defaultData.thigh} />
                            {/* quadriceps - quadricipite */}
                            <div className="flex gap-3">
                                <InfoCard infoTitle="quadriceps sx" leftData={previousCheck?.leftQuadricep || defaultData.leftQuadricep} rightData={latestCheck?.leftQuadricep || defaultData.leftQuadricep} />
                                <InfoCard infoTitle="quadriceps dx" leftData={previousCheck?.rightQuadricep || defaultData.rightQuadricep} rightData={latestCheck?.rightQuadricep || defaultData.rightQuadricep} />
                            </div>
                            {/* calf - polpacci */}
                            <div className="flex gap-3">
                                <InfoCard infoTitle="calf sx" leftData={previousCheck?.leftCalf || defaultData.leftCalf} rightData={latestCheck?.leftCalf || defaultData.leftCalf} />
                                <InfoCard infoTitle="calf dx" leftData={previousCheck?.rightCalf || defaultData.rightCalf} rightData={latestCheck?.rightCalf || defaultData.rightCalf} />
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}
