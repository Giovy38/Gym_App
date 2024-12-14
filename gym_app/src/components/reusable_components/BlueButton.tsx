import { GenericButtonType } from "@/src/type/GenericButton.type";

export default function BlueButton({ text, onClick, disabled }: GenericButtonType) {
    return (
        <button
            className={`bg-blue-700 text-white w-full rounded-md p-2 text-center mt-5 uppercase font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-600'}`}
            onClick={onClick}
            disabled={disabled}
        >
            {text}
        </button>
    )
}
