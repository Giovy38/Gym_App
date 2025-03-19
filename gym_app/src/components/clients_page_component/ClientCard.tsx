import { FaPersonHalfDress } from "react-icons/fa6";
import { MdCreate, MdSend, MdDeleteForever } from "react-icons/md";
import { ptService } from "@/src/services/pt.services";
import { useState } from 'react';
import NewPtTrainingCardForm from './NewPtTrainingCardForm';

interface ClientCardProps {
    id: number;
    name: string;
    email: string;
    ptId: number;
    onClientDeleted: () => void;
}

export default function ClientCard({ id, name, email, ptId, onClientDeleted }: ClientCardProps) {
    const [showTrainingForm, setShowTrainingForm] = useState(false);

    const handleDelete = async () => {
        try {
            const result = await ptService.deleteClient(ptId, id);
            if (result?.success) {
                onClientDeleted();
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione del cliente:', error);
        }
    };

    return (
        <>
            <div
                className='relative w-full max-w-xs rounded-lg bg-bg-primary p-6 shadow-md transition-all duration-300 hover:shadow-md hover:shadow-shadow-fourth'
            >
                <div className="flex justify-end">
                    <button
                        onClick={handleDelete}
                        className="text-btn-cancel hover:text-btn-cancel-hover"
                    >
                        <MdDeleteForever className="text-2xl" />
                    </button>
                </div>
                {/* Card content */}
                <div className="flex flex-col items-center space-y-4">
                    {/* Icon */}
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-input text-text-secondary">
                        <FaPersonHalfDress className="text-4xl" />
                    </div>

                    {/* Client name */}
                    <h3 className="text-xl font-bold text-text-primary capitalize">{name}</h3>

                    {/* Client email */}
                    <div className="text-sm text-text-primary truncate w-full text-center">{email}</div>

                    {/* Action buttons */}
                    <div className="flex w-full space-x-2 pt-2">
                        <button
                            onClick={() => setShowTrainingForm(true)}
                            className="flex flex-1 items-center font-bold justify-center uppercase rounded-md bg-btn-neutral px-3 py-2 text-sm text-text-secondary hover:bg-btn-neutral-hover"
                        >
                            <MdCreate className="mr-1 h-4 w-4" />
                            crea scheda
                        </button>

                        <button
                            className="flex flex-1 items-center font-bold justify-center uppercase rounded-md bg-btn-accent px-3 py-2 text-sm  text-text-secondary hover:bg-btn-accent-hover"
                        >
                            <MdSend className="mr-1 h-4 w-4" />
                            invia scheda
                        </button>
                    </div>
                </div>
            </div>

            {showTrainingForm && (
                <NewPtTrainingCardForm
                    onClose={() => setShowTrainingForm(false)}
                    onNewTraining={() => setShowTrainingForm(false)}
                    ptId={ptId}
                    clientId={id}
                />
            )}
        </>
    )
}
