import { BarbellInfoType } from "@/src/type/BarbellInfo.type";
import { IoBarbellOutline } from "react-icons/io5";



export default function BarbellInfo({ haveBarbell, totalWeight }: BarbellInfoType) {
    return (
        <div>
            {haveBarbell ?
                <div className="flex justify-center gap-3 bg-black p-3 rounded-full mb-2 ">
                    <p>{(totalWeight - 20) / 2} kg</p>
                    <IoBarbellOutline className="text-green-500 text-2xl" />
                    <p>{(totalWeight - 20) / 2} kg</p>
                </div>
                :
                <div className="flex gap-3 bg-black p-3 rounded-full m-2 justify-center">
                    <IoBarbellOutline className="text-red-500 text-2xl" />
                </div>
            }
        </div>
    )
}