import { GenericButtonType } from "@/src/type/GenericButton.type";

export default function PtButton({ text, onClick, disabled = false }: GenericButtonType) {
    return (
        <button
            onClick={disabled ? () => { } : onClick}
            className={`mt-2 uppercase font-bold bg-btn-neutral p-2 rounded  ${disabled ? 'opacity-50 cursor-default' : 'opacity-100 cursor-pointer hover:bg-btn-neutral-hover'}`}>
            {text}
        </button>
    )
}

