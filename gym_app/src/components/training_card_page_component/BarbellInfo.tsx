import { BarbellInfoType } from "@/src/type/BarbellInfo.type";
import { IoBarbellOutline } from "react-icons/io5";



export default function BarbellInfo({ haveBarbell, totalWeight, barbellWeight }: BarbellInfoType) {
    if (totalWeight < barbellWeight) {
        totalWeight = barbellWeight
    }
    return (
        <div>
            {haveBarbell ?
                <div className="bg-bg-primary p-3 rounded-full mb-2 flex flex-col items-center justify-center gap-2" >
                    <div className="flex justify-center gap-3">
                        <p>{(totalWeight - barbellWeight) / 2} kg</p>
                        <IoBarbellOutline className="text-barbell-icon text-2xl" />
                        <p>{(totalWeight - barbellWeight) / 2} kg</p>
                    </div>
                    <div>
                        <p className="text-center text-xs">({barbellWeight} kg)</p>
                    </div>
                </div>
                :
                <div className="flex gap-3 bg-bg-primary p-3 rounded-full m-2 justify-center">
                    <IoBarbellOutline className="text-barbell-no-icon text-2xl" />
                </div>
            }
        </div>
    )
}