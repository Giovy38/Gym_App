"use client"

import { MdDeleteForever } from "react-icons/md";
import { ptService } from "@/src/services/pt.services";
import { usePT } from "@/src/context/PtProvider";
import Toast from "../reusable_components/Toast";
import { useState } from "react";
import { GiWeightLiftingUp } from "react-icons/gi";


// Define the props for our WorkoutCard component
type WorkoutCardProps = {
    id?: number;
    name: string;
    type: string;
    creationDate: string;
    onClick?: () => void;
    onDeleted?: () => void;
}

export default function WorkoutCard({
    id,
    name,
    type,
    creationDate,
    onClick,
    onDeleted
}: WorkoutCardProps) {
    const pt = usePT();
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);

    const handleDelete = async (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!id || !pt?.id) return;

        try {
            const result = await ptService.deleteTemplate(pt.id, id);
            if (result && result.success) {
                setShowSuccessToast(true);
                setTimeout(() => {
                    setShowSuccessToast(false);
                    if (onDeleted) onDeleted();
                }, 2000);
            } else {
                setShowErrorToast(true);
                setTimeout(() => setShowErrorToast(false), 3000);
            }
        } catch (error) {
            console.error('Errore durante l\'eliminazione del template:', error);
            setShowErrorToast(true);
            setTimeout(() => setShowErrorToast(false), 3000);
        }
    };

    return (
        <>
            <div
                className={`relative w-full max-w-xs rounded-lg bg-bg-primary p-6 shadow-md transition-all duration-300 hover:shadow-md hover:shadow-shadow-fourth`}
                onClick={onClick}
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
                    {/* Icon - same for all workout types */}
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 text-text-secondary">
                        <GiWeightLiftingUp className="h-16 w-16" />
                    </div>

                    {/* Workout name */}
                    <h3 className="text-xl font-bold text-primary-color uppercase">{name}</h3>

                    {/* Workout type */}
                    <div className="inline-block rounded-full bg-bg-secondary-opacity px-3 py-1 text-sm font-medium text-text-secondary">
                        {type ? type.charAt(0).toUpperCase() + type.slice(1) : 'N/A'}
                    </div>

                    {/* Creation date */}
                    <div className="text-sm text-text-primary">Creata il: {creationDate}</div>
                </div>
            </div>
            {showSuccessToast && (
                <Toast
                    message="Template eliminato con successo!"
                    color="green"
                />
            )}
            {showErrorToast && (
                <Toast
                    message="Errore durante l'eliminazione del template"
                    color="red"
                />
            )}
        </>
    )
}

