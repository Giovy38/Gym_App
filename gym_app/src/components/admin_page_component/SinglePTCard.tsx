"use client"

import { useState } from "react";
import { FiMail, FiCheck, FiX } from "react-icons/fi";
import { adminService } from "@/src/services/admin.services";
import Switch from "@/src/components/reusable_components/Switch";

interface PersonalTrainerProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEnabled: boolean;
    onStatusChange?: (id: string, isEnabled: boolean) => void;
}

export default function PersonalTrainerCard({
    id,
    firstName,
    lastName,
    email,
    isEnabled,
}: PersonalTrainerProps) {
    const [switchStatus, setSwitchStatus] = useState(isEnabled);

    const handleToggleStatus = async () => {
        try {
            const newStatus = !switchStatus;
            const response = await adminService.togglePTStatus(Number(id), { isEnabled: newStatus });

            if (response) {
                setSwitchStatus(newStatus);
            }
        } catch (error) {
            console.error("Errore durante l'aggiornamento dello stato:", error);
        }
    };

    return (
        <div className="w-full max-w-md rounded-lg bg-bg-primary p-6 shadow-md">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <h2 className="text-xl font-bold text-primary-color uppercase">
                        {firstName} {lastName}
                    </h2>
                    <div className="mt-2 flex items-center text-text-primary">
                        <FiMail className="mr-2" />
                        <span>{email}</span>
                    </div>
                    <div className="mt-2 md:hidden">
                        <div
                            className={`flex items-center justify-center rounded-full px-3 py-1 text-sm ${switchStatus ? "bg-bg-enabled text-text-enabled" : "bg-bg-disabled text-text-disabled"}`}
                        >
                            {switchStatus ? (
                                <>
                                    <FiCheck className="mr-1" />
                                    <span>Abilitato</span>
                                </>
                            ) : (
                                <>
                                    <FiX className="mr-1" />
                                    <span>Disabilitato</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex md:flex-col md:items-end">
                    <div
                        className={`flex items-center rounded-full px-3 py-1 text-sm ${switchStatus ? "bg-bg-enabled text-text-enabled" : "bg-bg-disabled text-text-disabled"}`}
                    >
                        {switchStatus ? (
                            <>
                                <FiCheck className="mr-1" />
                                <span>Abilitato</span>
                            </>
                        ) : (
                            <>
                                <FiX className="mr-1" />
                                <span>Disabilitato</span>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
                <span className="text-sm text-text-primary">Stato Account</span>
                <Switch checked={switchStatus} onChange={handleToggleStatus} />
            </div>
        </div>
    );
}
