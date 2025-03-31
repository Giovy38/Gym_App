'use client'

import { MdAdd } from "react-icons/md";
import { useState } from "react";
import AddClientModal from "./AddClientModal";

interface AddClientButtonProps {
    ptId: number | undefined;
    onClientAdded: () => void;
}

export default function AddClientButton({ ptId }: AddClientButtonProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddClick = () => {
        setIsModalOpen(true);
    };

    return (
        <div className="flex flex-col items-center gap-2">
            <button
                onClick={handleAddClick}
                className="text-btn-add-active hover:text-text-primary hover:bg-btn-add-hover bg-btn-neutral w-10 h-10 flex items-center justify-center rounded-lg transition-all duration-500 font-bold text-3xl"
            >
                <MdAdd />
            </button>

            {isModalOpen && (
                <AddClientModal
                    ptId={ptId}
                    onClose={() => setIsModalOpen(false)}
                    onClientAdded={() => {
                        setIsModalOpen(false);
                    }}
                />
            )}
        </div>
    )
}
