type NewTrainingCardFormProps = {
    onClose: () => void;
}

export default function NewTrainingCardForm({ onClose }: NewTrainingCardFormProps) {
    return (
        <div onClick={onClose}>
            <h1>New Training Card Form</h1>
        </div>
    );
}
