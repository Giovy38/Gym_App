'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import { useState, useEffect } from "react";
import PrimaryButton from "../reusable_components/PrimaryButton";
import { adminService } from "@/src/services/admin.services";
import Toast from "../reusable_components/Toast";

export default function AdminLoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<'green' | 'red'>('green');

    const handleLogin = async () => {
        try {
            const result = await adminService.adminLogin(email, password);
            if (result) {
                setToastMessage('Login effettuato con successo!');
                setToastColor('green');
            } else {
                setToastMessage('email o password errati');
                setToastColor('red');
            }
        } catch (error) {
            setToastMessage('Errore durante il login');
            setToastColor('red');
            console.error('Errore durante il login:', error);
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
        <div className="bg-bg-primary flex flex-col p-5 rounded-lg">
            <SectionTitle title="login admin" />
            <div className="flex flex-col">
                <InputText label="e-mail" type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText label="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <PrimaryButton text="accesso" onClick={handleLogin} disabled={!email || !password} />
            </div>
            {toastMessage && <Toast message={toastMessage} color={toastColor} />}
        </div>
    )
} 