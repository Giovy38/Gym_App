import { InfoCardType, IconType } from "@/src/type/InfoCard.type";
import { TbWeight } from "react-icons/tb";
import { CiRuler } from "react-icons/ci";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { LuCircleEqual } from "react-icons/lu";


export default function InfoCard({ infoTitle, previousData, currentData, icon }: InfoCardType) {
    const isCurrentNumber = typeof currentData === 'number';
    const isPreviousNumber = typeof previousData === 'number';

    const isDataBigger = isCurrentNumber && isPreviousNumber
        ? currentData > previousData
        : false;
    const isDataEqual = currentData === previousData;

    const dataDifference = isCurrentNumber && isPreviousNumber
        ? (currentData > previousData)
            ? currentData - previousData
            : previousData - currentData
        : 0;

    return (
        <div className="bg-bg-primary text-text-primary flex flex-col gap-5 p-5 rounded-xl shadow-sm shadow-shadow-fourth w-full">
            <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-bg-secondary text-text-secondary rounded-full flex items-center justify-center">
                        {icon === IconType.WEIGHT ? <TbWeight /> : <CiRuler />}
                    </div>
                    <h1 className="text-4xl capitalize font-bold">{infoTitle}</h1>
                </div>
                <div className={`flex w-full md:w-auto items-center justify-end gap-2 ${isDataBigger ? 'text-text-more' : isDataEqual ? 'text-text-neutral' : 'text-text-less'}`}>
                    {isDataBigger ? <GoArrowUpRight /> : isDataEqual ? <LuCircleEqual /> : <GoArrowDownRight />}
                    {isDataEqual ? <h1>0.0</h1> : <h1>{dataDifference.toFixed(1)}</h1>}
                </div>
            </div>
            <h1 className="text-3xl font-bold">{currentData} {icon === IconType.WEIGHT ? 'Kg' : 'cm'}</h1>
            <h3 className="text-sm text-text-neutral">Rispetto all&apos;ultima misurazione</h3>
        </div>
    )
}