import { GenericButtonType } from "@/src/type/GenericButton.type";


export default function PrimaryButton({ text, onClick, disabled }: GenericButtonType) {
    return (
        <div
            onClick={disabled ? () => { } : onClick}
            className={` ${disabled ? 'opacity-50' : 'opacity-100 cursor-pointer'} bg-[#eac174] font-bold rounded-md p-2 text-center mt-5 hover:text-black ${disabled ? '' : 'hover:bg-[#f8bf58]'} `}>
            <button className="uppercase font-bold" disabled={disabled}>{text}</button>
        </div>
    )
}