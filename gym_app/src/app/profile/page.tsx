'use client'

import AddRemoveButton from "@/src/components/reusable_components/AddRemoveButton"
import PrimaryButton from "@/src/components/reusable_components/PrimaryButton"
import { userService } from "@/src/services/user.services"
import { useCallback, useEffect, useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import Toast from "@/src/components/reusable_components/Toast"
import LoginPage from "../login/page"
import ChangePasswordForm from "@/src/components/ChangePasswordForm"
import { UserData } from "@/src/type/UserData.type"
import DeleteConfirm from "@/src/components/reusable_components/DeleteConfirm"

export default function ProfilePage() {

    const userId = localStorage.getItem('userId');
    const [userIdNumber, setUserIdNumber] = useState<number | null>(null);

    useEffect(() => {
        if (userId) {
            setUserIdNumber(Number(userId));
        }
    }, [userId]);


    const [isEmailShowed, setIsEmailShowed] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        gender: "male"
    })

    const [showToast, setShowToast] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [showDeleteToast, setShowDeleteToast] = useState(false);

    const logout = async () => {
        try {
            await userService.userLogout();
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
            localStorage.removeItem('userId');
        } catch (error) {
            console.error('Error during the user logout:', error);
        }
    }

    const handleConfirmDelete = async () => {
        if (userIdNumber) {
            try {
                await userService.deleteUser(userIdNumber);
                await userService.userLogout();
                localStorage.removeItem('userId');
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

    const fetchData = useCallback(async () => {
        if (userId) {
            const userIdNumber = Number(userId);
            const userDetails = await userService.getUserById(userIdNumber) //change with dinamic ID 
            if (userDetails !== null) {
                setUserData(userDetails)
            }
        }
    }, [userId]);

    const changePassword = async () => {
        setShowChangePasswordForm(true)
    }

    const closeChangePasswordForm = () => {
        setShowChangePasswordForm(false)
    }

    useEffect(() => {
        fetchData()
        if (localStorage.getItem('isLogged') === 'true') {
            setIsLogged(true)
        }
    }, [fetchData])

    return (
        isLogged ? (
            <>
                <div className="flex flex-col justify-center items-center gap-3">
                    <h1 className="text-white uppercase text-xl p-3 font-bold">Welcome <label className="text-[#f8bf58] text-2xl">{userData.firstName}</label></h1>
                    <h3 className="text-white">Your email: </h3>
                    <div className="bg-black p-3 rounded-lg flex justify-around items-center gap-3 text-white w-56">
                        {isEmailShowed ? userData.email : '•••••••••••••••••'}
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
                    {showChangePasswordForm && <ChangePasswordForm userData={userData} onClose={closeChangePasswordForm} />}
                    {showDeleteConfirm && (
                        <DeleteConfirm
                            onConfirm={handleConfirmDelete}
                            onCancel={handleCancelDelete}
                        />
                    )}
                </div>
            </>
        ) : (
            <LoginPage />
        )
    )
}