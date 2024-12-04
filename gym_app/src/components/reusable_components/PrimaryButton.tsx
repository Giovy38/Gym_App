import { GenericButtonType } from "@/src/type/GenericButton.type";


export default function PrimaryButton({ text, onClick, disabled }: GenericButtonType) {
    return (
        <div
            onClick={onClick}
            className={` ${disabled ? 'opacity-50' : 'opacity-100'} bg-[#eac174] font-bold rounded-md p-2 text-center mt-5 cursor-pointer hover:text-black ${disabled ? '' : 'hover:bg-[#f8bf58]'} `}>
            <button className="uppercase font-bold" disabled={disabled}>{text}</button>
        </div>
    )
}