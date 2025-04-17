'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import { useState, useEffect } from "react";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";
import { userService } from "@/src/services/user.services";
import Toast from "../reusable_components/Toast";
import { ptService } from "@/src/services/pt.services";
import { FaUser } from "react-icons/fa";
import { FaPeopleRobbery } from "react-icons/fa6";
import Switch from "../reusable_components/Switch";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<'green' | 'red'>('green');
    const [isUserLogin, setIsUserLogin] = useState(true);

    const handleLogin = async () => {
        try {
            const result = await userService.userLogin(email, password);
            if (result) {
                setToastMessage('Login effettuato con successo!');
                setToastColor('green');
                window.location.href = '/';
                localStorage.setItem('activePage', 'home');
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

    const handlePtLogin = async () => {
        try {
            const result = await ptService.ptLogin(email, password);
            if (result) {
                setToastMessage('Login effettuato con successo!');
                setToastColor('green');
                window.location.href = '/';
                localStorage.setItem('activePage', 'home');
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
            <SectionTitle title="login" />
            <div className="flex flex-col">
                <InputText label="e-mail" type="email" placeholder='E-mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                <InputText label="password" type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <Link href="/signin">
                    <h4 className="text-primary-color mt-3 underline underline-offset-2">Non hai un account? Registrati ora</h4>
                </Link>
                <div className="flex items-center justify-center gap-4 my-4 text-text-neutral">
                    <FaUser
                        className={`text-xl ${isUserLogin ? 'text-switch-blue' : ''} cursor-pointer`}
                        onClick={() => setIsUserLogin(true)}
                    />
                    <Switch
                        checked={!isUserLogin}
                        onChange={() => setIsUserLogin(!isUserLogin)}
                        activeColor="bg-switch-violet"
                        inactiveColor="bg-switch-blue"
                    />
                    <FaPeopleRobbery
                        className={`text-xl ${isUserLogin ? '' : 'text-switch-violet'} cursor-pointer`}
                        onClick={() => setIsUserLogin(false)}
                    />
                </div>
                {isUserLogin ? (
                    <PrimaryButton text="accesso utente" onClick={handleLogin} disabled={!email || !password} />
                ) : (
                    <PrimaryButton text="accesso Personal Trainer" onClick={handlePtLogin} disabled={!email || !password} />
                )}
            </div>
            {toastMessage && <Toast message={toastMessage} color={toastColor} />}
        </div>
    )
}