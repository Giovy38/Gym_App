import { GenericButtonType } from "@/src/type/GenericButton.type";


export default function PrimaryButton({ text, onClick }: GenericButtonType) {
    return (
        <div className="bg-[#eac174] font-bold rounded-md p-2 text-center mt-5 cursor-pointer hover:text-black hover:bg-[#f8bf58] ">
            <button onClick={onClick} className="uppercase font-bold">{text}</button>
        </div>
    )
}