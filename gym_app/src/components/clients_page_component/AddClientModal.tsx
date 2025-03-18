import { useState, useEffect } from "react";
import { ptService } from "../../services/pt.services";
import ModalButton from "../reusable_components/ModalButton";
import Toast from "../reusable_components/Toast";
import SectionTitle from "../reusable_components/SectionTitle";

interface AddClientModalProps {
    ptId: number | undefined;
    onClose: () => void;
    onClientAdded: () => void;
}

export default function AddClientModal({ ptId, onClose, onClientAdded }: AddClientModalProps) {
    const [clientId, setClientId] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastColor, setToastColor] = useState<"green" | "red">("green");
    const [shouldClose, setShouldClose] = useState(false);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showToast) {
            timer = setTimeout(() => {
                setShowToast(false);
                if (shouldClose) {
                    onClientAdded();
                    setTimeout(() => {
                        onClose();
                    }, 500);
                }
            }, 3000);
        }
        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [showToast, shouldClose, onClose, onClientAdded]);

    const handleSubmit = async () => {
        setError(null);
        setShouldClose(false);

        if (!ptId) {
            setError("ID del personal trainer non disponibile");
            setToastMessage("ID del personal trainer non disponibile");
            setToastColor("red");
            setShowToast(true);
            return;
        }

        try {
            const result = await ptService.addClient(ptId, parseInt(clientId));

            if (!result) {
                setError("Cliente non trovato o già presente nella lista");
                setToastMessage("Cliente non trovato o già presente nella lista");
                setToastColor("red");
                setShowToast(true);
                return;
            }


            setToastMessage("Cliente aggiunto con successo!");
            setToastColor("green");
            setShowToast(true);
            setShouldClose(true);
        } catch (error) {
            console.error("Errore durante l'aggiunta del cliente:", error);
            const errorMessage = "Si è verificato un errore imprevisto. Riprova più tardi.";
            setError(errorMessage);
            setToastMessage(errorMessage);
            setToastColor("red");
            setShowToast(true);
        }
    };

    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-bg-modal p-6 rounded-lg md:w-96" onClick={(e) => e.stopPropagation()}>
                <div className="pb-5 ">
                    <SectionTitle title="Aggiungi Cliente" />
                </div>
                <form className="flex flex-col gap-4">
                    <div>
                        <label className="text-text-primary block mb-1">ID Cliente</label>
                        <input
                            type="number"
                            value={clientId}
                            onChange={(e) => setClientId(e.target.value)}
                            className="w-full p-2 rounded bg-input text-text-secondary"
                            required
                            min="0"
                            placeholder="Inserisci l'ID di un cliente già registrato"
                        />
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    <div className="flex gap-4">
                        <ModalButton text='cancella' onClick={onClose} />
                        <ModalButton
                            text='aggiungi'
                            onClick={handleSubmit}
                            isAdd
                            disabled={!clientId}
                        />
                    </div>
                </form>
            </div>
            {showToast && <Toast message={toastMessage} color={toastColor} />}
        </div>
    );
}
