import { IoRemoveCircleOutline } from "react-icons/io5";


type AddItemButtonProps = {
    title: string;
    onRemove: () => void
}

export default function RemovibleItems({ title, onRemove }: AddItemButtonProps) {
    return (
        <div>
            <div
                onClick={onRemove}
                className="bg-white text-black hover:bg-red-800 hover:text-white p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 w-full max-w-40 text-balance">
                <h3 className="uppercase font-bold text-center">{title}</h3>
                <IoRemoveCircleOutline className="min-w-5" />
            </div>
        </div>
    )
}