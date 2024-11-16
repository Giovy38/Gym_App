type NewDietFormProps = {
    onClose: () => void;
}

export default function NewDietForm({ onClose }: NewDietFormProps) {
    return (
        <div onClick={onClose}>
            <h1>New Diet Form</h1>
        </div>
    );
}
