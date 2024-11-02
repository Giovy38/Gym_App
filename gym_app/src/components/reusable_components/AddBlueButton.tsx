import { GenericButtonType } from "@/src/type/GenericButton.type";

export default function AddBlueButton({ text, onClick }: GenericButtonType) {
    return (
        <button onClick={onClick} className="mt-2 bg-blue-500 text-white p-2 rounded hover:bg-blue-700">
            {text}
        </button>
    )
}