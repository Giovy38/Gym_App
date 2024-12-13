import { GenericButtonType } from "@/src/type/GenericButton.type";
import { GoPlus } from "react-icons/go";


export default function PlusButton({ text, onClick }: GenericButtonType) {
    return (
        <div className="w-full flex justify-center items-center">
            <div className="text-white flex flex-col items-center uppercase gap-1">
                <div onClick={onClick} className="text-white text-3xl border-2 border-white border-solids rounded-xl p-2 h-20 w-60 flex justify-center items-center cursor-pointer hover:bg-white hover:text-black transition-all duration-300">
                    <GoPlus />
                </div>
                <p className="text-center text-balance w-60 font-bold">{text}</p>
            </div>
        </div>
    )
}