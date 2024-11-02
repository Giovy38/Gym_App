import { GenericButtonType } from "@/src/type/GenericButton.type";
import { IoRemoveCircleOutline } from "react-icons/io5";



export default function RemovibleItems({ text, onClick }: GenericButtonType) {
    return (
        <div>
            <div
                onClick={onClick}
                className="bg-white text-black hover:bg-red-800 hover:text-white p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 w-full lg:max-w-40 text-balance">
                <h3 className="uppercase font-bold text-center">{text}</h3>
                <IoRemoveCircleOutline className="min-w-5" />
            </div>
        </div>
    )
}