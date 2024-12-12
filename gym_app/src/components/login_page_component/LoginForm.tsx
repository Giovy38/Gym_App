'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import { useState, useEffect } from "react";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";
import { userService } from "@/src/services/user.services";
import Toast from "../reusable_components/Toast";

export default function LoginForm() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<'green' | 'red'>('green');



    const handleLogin = async () => {
        try {
            const result = await userService.userLogin(email, password);
            if (result) {
                setToastMessage('Login successful!');
                setToastColor('green');
                window.location.href = '/';
                localStorage.setItem('activePage', 'home');
            } else {
                setToastMessage('email or password incorrect');
                setToastColor('red');
            }
        } catch (error) {
            setToastMessage('Error during login');
            setToastColor('red');
            console.error('Error during login:', error);
        }
    }

    useEffect(() => {
        if (toastMessage) {
            const timer = setTimeout(() => {
                setToastMessage('');
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [toastMessage]);

    return (
        <div className="bg-black flex flex-col p-5 rounded-lg">
            <SectionTitle title="login" />
            <div className="flex flex-col">
                <InputText label="e-mail" type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText label="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="mt-5 w-full flex justify-center">
                    <a href="#" className=" underline underline-offset-2 text-white">Forgot password</a>
                </div>
                <Link href="/signin">
                    <h4 className="text-[#f8bf58] mt-3 underline underline-offset-2">Dont have an account? Register now</h4>
                </Link>
                <PrimaryButton text="Login" onClick={handleLogin} disabled={!email || !password} />
            </div>
            {toastMessage && <Toast message={toastMessage} color={toastColor} />}
        </div>
    )
}