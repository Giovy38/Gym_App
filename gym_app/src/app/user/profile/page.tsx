'use client'

import AddRemoveButton from "@/src/components/reusable_components/AddRemoveButton"
import PrimaryButton from "@/src/components/reusable_components/PrimaryButton"
import { userService } from "@/src/services/user.services"
import { useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import Toast from "@/src/components/reusable_components/Toast"
import ChangePasswordForm from "@/src/components/ChangePasswordForm"
import DeleteConfirm from "@/src/components/reusable_components/DeleteConfirm"
import { useUser } from "@/src/context/UserProvider"

export default function ProfilePage() {

    const userData = useUser();

    const [isEmailShowed, setIsEmailShowed] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);

    const logout = async () => {
        try {
            await userService.userLogout();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error during the user logout:', error);
        }
    }

    const handleConfirmDelete = async () => {
        if (userData?.id) {
            try {
                await userService.deleteUser(userData.id);
                await userService.userLogout();
                setShowDeleteToast(true);
                setTimeout(() => setShowDeleteToast(false), 3000);
            } catch (error) {
                console.error('Error during the user deletion:', error);
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

    const changePassword = async () => {
        setShowChangePasswordForm(true)
    }

    const closeChangePasswordForm = () => {
        setShowChangePasswordForm(false)
    }


    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <h1 className="text-white uppercase text-xl p-3 font-bold">Welcome <label className="text-[#f8bf58] text-2xl">{userData?.firstName}</label></h1>
            <h3 className="text-white">Your email: </h3>
            <div className="bg-black p-3 rounded-lg flex justify-around items-center gap-3 text-white w-56">
                {isEmailShowed ? userData?.email : '•••••••••••••••••'}
                {isEmailShowed ? <FaEyeSlash onClick={showEmail} className="cursor-pointer" /> : <FaRegEye onClick={showEmail} className="cursor-pointer" />}
            </div>

            <div className="flex justify-end">
                <div className="p-3 md:max-w-64">
                    <PrimaryButton text="Change Password" onClick={changePassword} />
                    <AddRemoveButton text="Delete Account" onClick={deleteAccount} />
                    <AddRemoveButton text="Logout" onClick={logout} />
                </div>
            </div>
            {showToast && <Toast message="Successful Logout" color="red" />}
            {showDeleteToast && <Toast message="Account successfully deleted" color="red" />}
            {showChangePasswordForm && userData && <ChangePasswordForm userData={userData} onClose={closeChangePasswordForm} />}
            {showDeleteConfirm && (
                <DeleteConfirm
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    )
}