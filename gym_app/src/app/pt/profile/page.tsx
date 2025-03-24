'use client'

import AddRemoveButton from "@/src/components/reusable_components/AddRemoveButton"
import PrimaryButton from "@/src/components/reusable_components/PrimaryButton"
import { useEffect, useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import Toast from "@/src/components/reusable_components/Toast"
import ChangePtPasswordForm from "@/src/components/ChangePtPasswordForm";
import DeleteConfirm from "@/src/components/reusable_components/DeleteConfirm"
import { usePT } from "@/src/context/PtProvider"
import ModalButton from "@/src/components/reusable_components/ModalButton"
import { ptService } from "@/src/services/pt.services"
import Link from "next/link"

export default function ProfilePage() {

    const ptData = usePT();
    console.log('Dati utente:', ptData);

    const [isEmailShowed, setIsEmailShowed] = useState(false);
    const [isIdShowed, setIsIdShowed] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    const logout = async () => {
        try {
            await ptService.ptLogout();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error during the pt logout:', error);
        }
    }

    const handleConfirmDelete = async () => {
        if (ptData?.id) {
            try {
                await ptService.deletePT(ptData.id);
                await ptService.ptLogout();
                setShowDeleteToast(true);
                setTimeout(() => setShowDeleteToast(false), 3000);
            } catch (error) {
                console.error('Error during the pt deletion:', error);
            }
        }
        setShowDeleteConfirm(false);
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const deleteAccount = () => {
        setShowDeleteConfirm(true);
    };

    const showEmail = () => {
        setIsEmailShowed(!isEmailShowed)
    }

    const showId = () => {
        setIsIdShowed(!isIdShowed)
    }

    const changePassword = async () => {
        setShowChangePasswordForm(true)
    }

    const closeChangePasswordForm = () => {
        setShowChangePasswordForm(false)
    }

    const welcomeMessage = () => {
        if (ptData?.gender === 'male') {
            return 'Benvenuto'
        } else if (ptData?.gender === 'female') {
            return 'Benvenuta'
        } else {
            return 'Benvenuto'
        }
    }


    return (
        <div className={`flex flex-col justify-center items-center gap-3 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-text-primary uppercase text-xl p-3 font-bold">{welcomeMessage()} <label className="text-primary-color text-2xl">{ptData?.firstName}</label></h1>
            <h3 className="text-text-primary">La tua email: </h3>
            <div className="bg-bg-primary p-3 rounded-lg flex justify-around items-center gap-3 text-text-primary min-w-56">
                {isEmailShowed ? ptData?.email : '•••••••••••••••••'}
                {isEmailShowed ? <FaEyeSlash onClick={showEmail} className="cursor-pointer" /> : <FaRegEye onClick={showEmail} className="cursor-pointer" />}
            </div>
            <h3 className="text-text-primary">Il tuo ID: </h3>
            <div className="bg-bg-primary p-3 rounded-lg flex justify-around items-center gap-3 text-text-primary min-w-56">
                {isIdShowed ? ptData?.id : '•••••••••••••••••'}
                {isIdShowed ? <FaEyeSlash onClick={showId} className="cursor-pointer" /> : <FaRegEye onClick={showId} className="cursor-pointer" />}
            </div>

            <div className="flex justify-end">
                <div className="p-3 md:max-w-64">
                    {ptData?.isMaster && <Link href="/pt/master" className="bg-btn-neutral p-3 rounded-lg flex justify-around items-center gap-3 text-text-secondary font-bold uppercase text-center min-w-56 hover:bg-btn-neutral-hover">
                        <h3>Gestisci Personal Trainer</h3>
                    </Link>}
                    <PrimaryButton text="Cambia Password" onClick={changePassword} />
                    <AddRemoveButton text="Cancella Account" onClick={deleteAccount} />
                    <ModalButton text='Logout' onClick={logout} />
                </div>
            </div>
            {showToast && <Toast message="Logout effettuato con successo" color="red" />}
            {showDeleteToast && <Toast message="Account cancellato con successo" color="red" />}
            {showChangePasswordForm && ptData && <ChangePtPasswordForm ptData={ptData} onClose={closeChangePasswordForm} />}
            {showDeleteConfirm && (
                <DeleteConfirm
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}