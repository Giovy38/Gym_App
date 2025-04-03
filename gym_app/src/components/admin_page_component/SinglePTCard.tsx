"use client"

import { useState } from "react";
import { FiMail, FiCheck, FiX, FiTrash2 } from "react-icons/fi";
import { adminService } from "@/src/services/admin.services";
import Switch from "@/src/components/reusable_components/Switch";

interface PersonalTrainerProps {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isEnabled: boolean;
    renewalDate: string | null;
    paymentDate: string | null;
    onStatusChange?: (id: string, isEnabled: boolean) => void;
    onDatesChange?: (id: string, renewalDate: string | null, paymentDate: string | null) => void;
}

export default function PersonalTrainerCard({
    id,
    firstName,
    lastName,
    email,
    isEnabled,
    renewalDate,
    paymentDate,
    onDatesChange,
}: PersonalTrainerProps) {
    const formatDateForInput = (date: string) => {
        return new Date(date).toISOString().split('T')[0];
    };

    const formatDate = (date: string | null) => {
        if (!date) return 'Non impostata';
        return new Date(date).toLocaleDateString('it-IT');
    };

    const [switchStatus, setSwitchStatus] = useState(isEnabled);
    const [newRenewalDate, setNewRenewalDate] = useState<string>(renewalDate ? formatDateForInput(renewalDate) : '');
    const [newPaymentDate, setNewPaymentDate] = useState<string>(paymentDate ? formatDateForInput(paymentDate) : '');
    const [isEditing, setIsEditing] = useState(false);

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

    const handleUpdateDates = async () => {
        try {
            const response = await adminService.updatePTDates(Number(id), {
                renewalDate: newRenewalDate || null,
                paymentDate: newPaymentDate || null
            });

            if (response) {
                setIsEditing(false);
                if (onDatesChange) {
                    onDatesChange(id, newRenewalDate || null, newPaymentDate || null);
                }
            }
        } catch (error) {
            console.error("Errore durante l'aggiornamento delle date:", error);
        }
    };

    return (
        <div className="w-full flex flex-col gap-4 max-w-md rounded-lg bg-bg-primary p-6 shadow-md">
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

            <div className="flex items-center justify-between bg-bg-modal p-2 rounded-md">
                <span className="text-sm text-text-primary uppercase">Stato Account</span>
                <Switch checked={switchStatus} onChange={handleToggleStatus} />
            </div>

            <div className="flex flex-col gap-2">
                <div>
                    <span className="text-sm text-text-primary">Data Pagamento: </span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={newPaymentDate}
                                onChange={(e) => setNewPaymentDate(e.target.value)}
                                className="ml-2 rounded border p-1"
                            />
                            <button
                                onClick={() => setNewPaymentDate('')}
                                className="text-text-primary hover:text-red-500 transition-colors"
                                title="Rimuovi data"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ) : (
                        <span className="ml-2 text-primary-data">{formatDate(paymentDate)}</span>
                    )}
                </div>
                <div >
                    <span className="text-sm text-text-primary">Data Rinnovo: </span>
                    {isEditing ? (
                        <div className="flex items-center gap-2">
                            <input
                                type="date"
                                value={newRenewalDate}
                                onChange={(e) => setNewRenewalDate(e.target.value)}
                                className="ml-2 rounded border p-1"
                            />
                            <button
                                onClick={() => setNewRenewalDate('')}
                                className="text-text-primary hover:text-red-500 transition-colors"
                                title="Rimuovi data"
                            >
                                <FiTrash2 />
                            </button>
                        </div>
                    ) : (
                        <span className="ml-2 text-primary-data">{formatDate(renewalDate)}</span>
                    )}
                </div>

                <div className="w-full flex gap-3 justify-between">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleUpdateDates}
                                className="rounded bg-btn-plus hover:bg-btn-plus-hover px-3 py-1 text-text-secondary w-1/2"
                            >
                                Salva
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="rounded bg-btn-neutral hover:bg-btn-neutral-hover px-3 py-1 text-text-secondary w-1/2"
                            >
                                Annulla
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="rounded w-full bg-btn-neutral hover:bg-btn-neutral-hover px-3 py-1 text-text-secondary"
                        >
                            Modifica Date
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
