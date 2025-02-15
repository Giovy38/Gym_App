
import { FaArrowsLeftRight } from "react-icons/fa6";
import { InfoCardType } from "@/src/type/InfoCard.type";

export default function InfoCard({ infoTitle, leftData, rightData, useConditionalColor = true }: InfoCardType) {

    const isRightDataGreater = rightData > leftData;
    const isRightDataEqual = rightData === leftData;

    return (
        <div className="bg-bg-data p-3 rounded-xl flex flex-col items-center justify-center w-full text-center">
            <h3 className="uppercase text-primary-color font-extrabold">{infoTitle}</h3>
            <div className="flex justify-center items-center gap-2">
                <h5 className="text-text-primary">{leftData}</h5>
                <FaArrowsLeftRight className="text-text-secondary" />
                <h5 className={`text-xl font-bold ${useConditionalColor
                    ? (isRightDataGreater ? 'text-text-more' : isRightDataEqual ? 'text-text-primary' : 'text-text-less')
                    : 'text-text-primary'
                    }`}>
                    {rightData}
                </h5>
            </div>

        </div>
    )
}