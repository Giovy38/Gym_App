import { GenericButtonType } from "@/src/type/GenericButton.type";


export default function PrimaryButton({ text, onClick, disabled }: GenericButtonType) {
    return (
        <div
            onClick={disabled ? () => { } : onClick}
            className={` ${disabled ? 'opacity-50' : 'opacity-100 cursor-pointer'} bg-primary-active font-bold rounded-md p-2 text-center mt-5 hover:text-text-secondary ${disabled ? '' : 'hover:bg-primary-color'} `}>
            <button className="uppercase font-bold" disabled={disabled}>{text}</button>
        </div>
    )
}