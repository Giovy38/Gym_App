"use client"

import { useState } from "react"
import { FiMail, FiCheck, FiX } from "react-icons/fi"
import Switch from "../reusable_components/Switch"

interface PersonalTrainerProps {
    id: string
    firstName: string
    lastName: string
    email: string
    isEnabled: boolean
    onStatusChange?: (id: string, isEnabled: boolean) => void
}

export default function PersonalTrainerCard({
    id,
    firstName,
    lastName,
    email,
    isEnabled: initialIsEnabled = false,
    onStatusChange,
}: PersonalTrainerProps) {
    const [isEnabled, setIsEnabled] = useState(initialIsEnabled)

    const handleToggleStatus = () => {
        const newStatus = !isEnabled
        setIsEnabled(newStatus)
        if (onStatusChange) {
            onStatusChange(id, newStatus)
        }
    }

    return (
        <div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-md">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        {firstName} {lastName}
                    </h2>
                    <div className="mt-2 flex items-center text-gray-600">
                        <FiMail className="mr-2" />
                        <span>{email}</span>
                    </div>
                </div>
                <div className="flex flex-col items-end">
                    <div
                        className={`flex items-center rounded-full px-3 py-1 text-sm ${isEnabled ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                            }`}
                    >
                        {isEnabled ? (
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
                <span className="text-sm text-gray-600">Abilitazione PT:</span>
                <Switch
                    checked={isEnabled}
                    onChange={handleToggleStatus}
                    activeColor="bg-green-500"
                    inactiveColor="bg-gray-400"
                />
            </div>
        </div>
    )
}

