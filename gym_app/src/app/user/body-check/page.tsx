'use client'

import SectionTitle from "@/src/components/reusable_components/SectionTitle";
import InfoCard from "@/src/components/body_check_page_component/InfoCard";
import DataSlider from "@/src/components/data_slider_component/DataSlider";
import { useEffect, useState } from "react";
import { BodyCheckData } from "@/src/type/BodyCheckData.type";
import { bodyCheckService } from "@/src/services/body-check.services";
import { IoBody } from "react-icons/io5";
import BigInfoCard from "@/src/components/body_check_page_component/BigInfoCard";
import { IconType } from "@/src/type/InfoCard.type";
import InfoCardSxDx from "@/src/components/body_check_page_component/InfoCardSxDx";



export default function BodyCheckPage() {
    const [bodyChecks, setBodyChecks] = useState<BodyCheckData[]>([]);
    const [latestCheck, setLatestCheck] = useState<BodyCheckData | null>(null);
    const [previousCheck, setPreviousCheck] = useState<BodyCheckData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);



    useEffect(() => {
        fetchData();
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

    const formatDate = (dateString: string) => {
        if (dateString === "N/A") return dateString;
        const date = new Date(dateString);
        return date.toLocaleDateString('it-IT', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    }

    return (
        <div className={`flex flex-col p-3 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
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
                <div className="flex flex-col items-center justify-center gap-5">
                    <SectionTitle title="Aggiungi una misurazione per vedere i tuoi progressi" />
                    <IoBody className="text-5xl text-primary-color" />
                </div>
            ) : (
                <div className="flex flex-col gap-5 justify-center items-center">
                    <div className="flex justify-start items-start w-full mt-5 p-2">
                        <h1 className="text-text-primary font-bold text-2xl ">Misurazioni del <span className="text-primary-color text-3xl">{formatDate(latestCheck.date)}</span></h1>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-grow items-center justify-center pt-5 px-5 gap-5 w-full md:w-4/5">
                        <BigInfoCard
                            infoTitle="peso"
                            previousData={previousCheck?.weight || defaultData.weight}
                            currentData={latestCheck?.weight || defaultData.weight}
                            icon={IconType.WEIGHT}
                        />
                        <BigInfoCard
                            infoTitle="altezza"
                            previousData={previousCheck?.height || defaultData.height}
                            currentData={latestCheck?.height || defaultData.height}
                            icon={IconType.MEASUREMENT}
                        />
                    </div>
                    {/* small info cards */}
                    <div className="flex justify-start items-start w-full mt-5 p-2 ">
                        <h1 className="text-text-primary font-bold text-2xl">Altre misurazioni</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-grow items-center justify-center px-5 gap-5 w-full md:w-4/5">
                        <InfoCard
                            infoTitle="petto"
                            previousData={previousCheck?.chest || defaultData.chest}
                            currentData={latestCheck?.chest || defaultData.chest}
                        />
                        <InfoCard
                            infoTitle="vita"
                            previousData={previousCheck?.waist || defaultData.waist}
                            currentData={latestCheck?.waist || defaultData.waist}
                        />
                        <InfoCard
                            infoTitle="spalle"
                            previousData={previousCheck?.shoulder || defaultData.shoulder}
                            currentData={latestCheck?.shoulder || defaultData.shoulder}
                        />
                        <InfoCard
                            infoTitle="glutei"
                            previousData={previousCheck?.buttocks || defaultData.buttocks}
                            currentData={latestCheck?.buttocks || defaultData.buttocks}
                        />
                        <InfoCard
                            infoTitle="giro coscia"
                            previousData={previousCheck?.thigh || defaultData.thigh}
                            currentData={latestCheck?.thigh || defaultData.thigh}
                        />

                    </div>
                    {/* info cards sx dx */}
                    <div className="flex justify-start items-start w-full mt-5 p-2">
                        <h1 className="text-text-primary font-bold text-2xl">Misurazioni sx dx</h1>
                    </div>
                    <div className="flex flex-col lg:flex-row flex-grow items-center justify-center px-5 gap-5 w-full md:w-4/5">
                        <InfoCardSxDx
                            infoTitle="bicipiti"
                            previousDataSx={previousCheck?.leftBicep || defaultData.leftBicep}
                            previousDataDx={previousCheck?.rightBicep || defaultData.rightBicep}
                            currentDataSx={latestCheck?.leftBicep || defaultData.leftBicep}
                            currentDataDx={latestCheck?.rightBicep || defaultData.rightBicep}
                        />
                        <InfoCardSxDx
                            infoTitle="avambracci"
                            previousDataSx={previousCheck?.leftForearm || defaultData.leftForearm}
                            previousDataDx={previousCheck?.rightForearm || defaultData.rightForearm}
                            currentDataSx={latestCheck?.leftForearm || defaultData.leftForearm}
                            currentDataDx={latestCheck?.rightForearm || defaultData.rightForearm}
                        />
                        <InfoCardSxDx
                            infoTitle="quadricipiti"
                            previousDataSx={previousCheck?.leftQuadricep || defaultData.leftQuadricep}
                            previousDataDx={previousCheck?.rightQuadricep || defaultData.rightQuadricep}
                            currentDataSx={latestCheck?.leftQuadricep || defaultData.leftQuadricep}
                            currentDataDx={latestCheck?.rightQuadricep || defaultData.rightQuadricep}
                        />
                        <InfoCardSxDx
                            infoTitle="polpacci"
                            previousDataSx={previousCheck?.leftCalf || defaultData.leftCalf}
                            previousDataDx={previousCheck?.rightCalf || defaultData.rightCalf}
                            currentDataSx={latestCheck?.leftCalf || defaultData.leftCalf}
                            currentDataDx={latestCheck?.rightCalf || defaultData.rightCalf}
                        />
                    </div>
                </div>
            )}
        </div>
    )
}
