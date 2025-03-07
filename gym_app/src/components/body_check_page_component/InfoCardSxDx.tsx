import { InfoCardSxDxType } from "@/src/type/InfoCard.type";
import { GoArrowUpRight, GoArrowDownRight } from "react-icons/go";
import { LuCircleEqual } from "react-icons/lu";


export default function InfoCardSxDx({ infoTitle, previousDataSx, previousDataDx, currentDataSx, currentDataDx }: InfoCardSxDxType) {
    const isCurrentSxNumber = typeof currentDataSx === 'number';
    const isPreviousSxNumber = typeof previousDataSx === 'number';
    const isCurrentDxNumber = typeof currentDataDx === 'number';
    const isPreviousDxNumber = typeof previousDataDx === 'number';

    const isDataSxBigger = isCurrentSxNumber && isPreviousSxNumber
        ? currentDataSx > previousDataSx
        : false;
    const isDataSxEqual = currentDataSx === previousDataSx;

    const isDataDxBigger = isCurrentDxNumber && isPreviousDxNumber
        ? currentDataDx > previousDataDx
        : false;
    const isDataDxEqual = currentDataDx === previousDataDx;

    const dataDifferenceSx = isCurrentSxNumber && isPreviousSxNumber
        ? (currentDataSx > previousDataSx)
            ? currentDataSx - previousDataSx
            : previousDataSx - currentDataSx
        : 0;

    const dataDifferenceDx = isCurrentDxNumber && isPreviousDxNumber
        ? (currentDataDx > previousDataDx)
            ? currentDataDx - previousDataDx
            : previousDataDx - currentDataDx
        : 0;



    return (
        <div className="bg-bg-data text-text-primary flex flex-col gap-2 p-5 rounded-xl shadow-sm shadow-shadow-fourth lg:w-72 w-full">
            <div className="flex gap-2">
                <h1 className="text-3xl capitalize font-bold">{infoTitle}</h1>
            </div>
            <div className="flex justify-between w-full">
                <label className="text-text-neutral w-1/2 text-left">Sx</label>
                <label className="text-text-neutral w-1/2 text-right">Dx</label>
            </div>
            <div className={`flex justify-between w-full`}>
                {/* left data */}
                <div className="flex flex-col">
                    <div className={` flex jastify-center items-center gap-2 ${isDataSxBigger ? 'text-text-more' : isDataSxEqual ? 'text-text-neutral' : 'text-text-less'}`}>
                        {isDataSxBigger ? <GoArrowUpRight /> : isDataSxEqual ? <LuCircleEqual /> : <GoArrowDownRight />}
                        {isDataSxEqual ? <h1>0.00</h1> : <h1>{dataDifferenceSx}</h1>}
                    </div>
                    <h1 className="text-3xl font-bold text-left">{currentDataSx}  <span className="text-sm">cm</span></h1>
                </div>
                {/* right data */}
                <div className="flex flex-col">
                    <div className={` flex justify-end items-center gap-2 ${isDataDxBigger ? 'text-text-more' : isDataDxEqual ? 'text-text-neutral' : 'text-text-less'}`}>
                        {isDataDxBigger ? <GoArrowUpRight /> : isDataDxEqual ? <LuCircleEqual /> : <GoArrowDownRight />}
                        {isDataDxEqual ? <h1>0.00</h1> : <h1>{dataDifferenceDx}</h1>}
                    </div>
                    <h1 className="text-3xl font-bold text-right">{currentDataDx} <span className="text-sm">cm</span></h1>
                </div>

            </div>

        </div>
    )
}