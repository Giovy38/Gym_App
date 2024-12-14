
import { FaArrowsLeftRight } from "react-icons/fa6";
import { InfoCardType } from "@/src/type/InfoCard.type";

export default function InfoCard({ infoTitle, leftData, rightData, useConditionalColor = true }: InfoCardType) {

    const isRightDataGreater = rightData > leftData;
    const isRightDataEqual = rightData === leftData;

    return (
        <div className="bg-[#282828] p-3 rounded-xl flex flex-col items-center justify-center w-full text-center">
            <h3 className="uppercase text-[#f8bf58] font-extrabold">{infoTitle}</h3>
            <div className="flex justify-center items-center gap-2">
                <h5 className="text-white">{leftData}</h5>
                <FaArrowsLeftRight className="text-black" />
                <h5 className={`text-xl font-bold ${useConditionalColor
                    ? (isRightDataGreater ? 'text-green-300' : isRightDataEqual ? 'text-white' : 'text-blue-300')
                    : 'text-white'
                    }`}>
                    {rightData}
                </h5>
            </div>

        </div>
    )
}