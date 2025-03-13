import { InfoCardType } from "@/src/type/InfoCard.type";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { LuCircleEqual } from "react-icons/lu";


export default function InfoCard({ infoTitle, previousData, currentData }: InfoCardType) {
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
        <div className="bg-bg-data text-text-primary flex flex-col gap-2 p-5 rounded-xl shadow-sm shadow-shadow-fourth lg:w-72 w-full">
            <div className="flex items-center justify-between">
                <div className="flex gap-2">
                    <h1 className="text-3xl capitalize font-bold">{infoTitle}</h1>
                </div>
                <div className={`flex items-center gap-2 ${isDataBigger ? 'text-text-more' : isDataEqual ? 'text-text-neutral' : 'text-text-less'}`}>
                    {isDataBigger ? <GoArrowUpRight /> : isDataEqual ? <LuCircleEqual /> : <GoArrowDownRight />}
                    {isDataEqual ? <h1>0.00</h1> : <h1>{dataDifference}</h1>}
                </div>
            </div>
            <h1 className="text-3xl font-bold">{currentData} <span className="text-sm">cm</span></h1>
            <h3 className="text-sm text-text-neutral">Rispetto all&apos;ultima misurazione</h3>
        </div>
    )
}