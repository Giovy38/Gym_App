'use client'

import PrimaryButton from "@/src/components/reusable_components/PrimaryButton"
import { useState, useEffect } from "react"
import Toast from "@/src/components/reusable_components/Toast"
import { adminService } from "@/src/services/admin.services"
import ModalButton from "@/src/components/reusable_components/ModalButton"
import ChangeAdminPasswordForm from "@/src/components/ChangeAdminPasswordForm";

export default function AdminProfilePage() {
    const [showToast, setShowToast] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false);
    const [toastMessage, setToastMessage] = useState("");

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const logout = async () => {
        try {
            const response = await adminService.adminLogout();
            if (response?.success) {
                setToastMessage(response.message);
                setShowToast(true);
                setTimeout(() => {
                    window.location.replace('/admin/login');
                }, 3000);
            } else {
                setToastMessage(response?.message || "Errore durante il logout");
                setShowToast(true);
            }
        } catch (error) {
            console.error('Errore durante il logout dell\'admin:', error);
            setToastMessage("Errore durante il logout");
            setShowToast(true);
        }
    }

    const changePassword = async () => {
        setShowChangePasswordForm(true)
    }

    const closeChangePasswordForm = () => {
        setShowChangePasswordForm(false)
    }

    return (
        <div className={`flex flex-col justify-center items-center gap-3 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-text-primary uppercase text-xl p-3 font-bold"> Benvenuto <label className="text-primary-color text-2xl"> Admin</label></h1>
            <div className="flex justify-end">
                <div className="p-3 md:max-w-64">
                    <PrimaryButton text="Cambia Password" onClick={changePassword} />
                    <ModalButton text='Logout' onClick={logout} />
                </div>
            </div>
            {showToast && <Toast message={toastMessage} color="red" />}
            {showChangePasswordForm && <ChangeAdminPasswordForm onClose={closeChangePasswordForm} />}
        </div>
    )
}
