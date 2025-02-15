import { GenericButtonType } from "@/src/type/GenericButton.type";

export default function AddBlueButton({ text, onClick }: GenericButtonType) {
    return (
        <button onClick={onClick} className="mt-2 bg-btn-edit text-white p-2 rounded hover:bg-btn-edit-hover">
            {text}
        </button>
    )
}