'use client'

import { useState, useEffect } from "react"
import { adminService } from "@/src/services/admin.services"
import Toast from "./reusable_components/Toast"
import InputText from "./reusable_components/InputText"
import ModalButton from "./reusable_components/ModalButton"

interface ChangeAdminPasswordFormProps {
    onClose: () => void;
}

export default function ChangeAdminPasswordForm({ onClose }: ChangeAdminPasswordFormProps) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [showToast, setShowToast] = useState(false)
    const [toastMessage, setToastMessage] = useState("")
    const [toastColor, setToastColor] = useState<"red" | "green">("red")
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [isFormValid, setIsFormValid] = useState(false)

    useEffect(() => {
        const newErrors = {
            currentPassword: currentPassword.length < 1 ? 'Password attuale obbligatoria' : '',
            newPassword: newPassword.length < 8 && newPassword.length > 0 ? 'La Nuova password deve avere almeno 8 caratteri' : '',
            confirmPassword: newPassword !== confirmPassword ? 'Le password non corrispondono' : ''
        }
        setErrors(newErrors)
        setIsFormValid(Object.values(newErrors).every(error => error === ''))
    }, [currentPassword, newPassword, confirmPassword])

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false)
            }, 3000)
            return () => clearTimeout(timer)
        }
    }, [showToast])

    const handleSubmit = async () => {
        if (!isFormValid) return

        try {
            // Mostriamo subito il toast di successo
            setToastMessage("Password modificata con successo")
            setToastColor("green")
            setShowToast(true)

            // Aspettiamo un momento per mostrare il toast
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Chiamiamo il servizio che farà il reindirizzamento
            await adminService.changePassword({
                oldPassword: currentPassword,
                newPassword: newPassword
            })
        } catch (error) {
            console.error('Errore durante il cambio password:', error)
            setToastMessage("Errore durante il cambio password")
            setToastColor("red")
            setShowToast(true)
        }
    }

    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-bg-primary p-4 shadow-md rounded-lg md:w-2/3 xl:w-1/3 shadow-shadow-fourth" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Cambia Password Admin</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="text-text-secondary flex flex-col justify-center items-center">
                        <InputText
                            label="Password Attuale"
                            type="password"
                            placeholder="Password attuale"
                            name="currentPassword"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        {errors.currentPassword && <span className="text-text-error">{errors.currentPassword}</span>}
                    </div>
                    <div className="text-text-secondary flex flex-col justify-center items-center">
                        <InputText
                            label="Nuova Password"
                            type="password"
                            placeholder="Nuova password"
                            name="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        {errors.newPassword && <span className="text-text-error">{errors.newPassword}</span>}
                    </div>
                    <div className="text-text-secondary flex flex-col justify-center items-center">
                        <InputText
                            label="Conferma Password"
                            type="password"
                            placeholder="Conferma password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {errors.confirmPassword && <span className="text-text-error">{errors.confirmPassword}</span>}
                    </div>
                    <div className="flex flex-col-reverse md:flex-row justify-center items-center md:gap-3">
                        <ModalButton text='cancella' onClick={onClose} />
                        <ModalButton text='cambia password' isAdd disabled={!isFormValid} onClick={handleSubmit} />
                    </div>
                </form>
                {showToast && <Toast message={toastMessage} color={toastColor} />}
            </div>
        </div>
    )
} 