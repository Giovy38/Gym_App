type AddBlueButtonProps = {
    onClick: () => void
}


export default function AddBlueButton({ onClick }: AddBlueButtonProps) {
    return (
        <button onClick={onClick} className="mt-2 bg-blue-500 text-white p-2 rounded">
            + Aggiungi Nota
        </button>
    )
}