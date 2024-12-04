'use client'

import AddRemoveButton from "@/src/components/reusable_components/AddRemoveButton"
import PrimaryButton from "@/src/components/reusable_components/PrimaryButton"
import { userService } from "@/src/services/user.services"
import { useEffect, useState } from "react"
import { FaRegEye, FaEyeSlash } from "react-icons/fa6";
import Toast from "@/src/components/reusable_components/Toast"
import LoginPage from "../login/page"
import ChangePasswordForm from "@/src/components/ChangePasswordForm"
import { UserData } from "@/src/type/UserData.type"

export default function ProfilePage() {

    const userId = 161

    const [isEmailShowed, setIsEmailShowed] = useState(false);
    const [userData, setUserData] = useState<UserData>({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        gender: "male"
    })

    const [showToast, setShowToast] = useState(false);
    const [isLogged, setIsLogged] = useState(false);
    const [showChangePasswordForm, setShowChangePasswordForm] = useState(false)

    const logout = () => {
        localStorage.setItem('isLogged', 'false');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    }

    const showEmail = () => {
        setIsEmailShowed(!isEmailShowed)
    }

    const fetchData = async () => {
        const userDetails = await userService.getUserById(userId) //change with dinamic ID 
        if (userDetails !== null) {
            setUserData(userDetails)
        }
    }

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
    }, [])

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
                            <AddRemoveButton text="Delete Account" onClick={() => { }} />
                            <AddRemoveButton text="Logout" onClick={logout} />
                        </div>
                    </div>
                    {showToast && <Toast message="Successful Logout" color="red" />}
                    {showChangePasswordForm && <ChangePasswordForm userData={userData} onClose={closeChangePasswordForm} />}
                </div>
            </>
        ) : (
            <LoginPage />
        )
    )
}