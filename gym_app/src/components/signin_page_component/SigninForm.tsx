'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";
import Switch from "../reusable_components/Switch";
import { useState, useEffect } from "react";
import { FaMale, FaFemale } from "react-icons/fa";
import { userService } from "../../services/user.services";
import Toast from "../reusable_components/Toast";

export default function SigninForm() {

    const [bodyCheckImageIsMan, setBodyCheckImageIsMan] = useState(true);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: bodyCheckImageIsMan ? 'male' : 'female' as 'male' | 'female'
    });

    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [isFormValid, setIsFormValid] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<'green' | 'red'>('green');

    useEffect(() => {
        const newErrors = {
            firstName: userData.firstName.trim().length < 2 ? 'Almeno 2 caratteri' : '',
            lastName: userData.lastName.trim().length < 2 ? 'Almeno 2 caratteri' : '',
            email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userData.email) ? '' : 'Formato email non valido',
            password: userData.password.trim().length < 8 ? 'Almeno 8 caratteri' : '',
            confirmPassword: userData.password !== userData.confirmPassword ? 'Le password non corrispondono' : ''
        };
        setErrors(newErrors);
        setIsFormValid(Object.values(newErrors).every(error => error === ''));
    }, [userData]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async () => {
        if (!isFormValid) return;

        try {
            const result = await userService.createNewUser(userData);
            if (result) {
                console.log('User created successfully:', result.createdUser);
                setToastMessage('Successfully registered');
                setToastColor('green');

                const loginResult = await userService.userLogin(userData.email, userData.password);
                if (loginResult) {
                    console.log('User logged in successfully:', loginResult);
                    window.location.href = '/';
                    localStorage.setItem('activePage', 'home');
                } else {
                    setToastMessage('Login failed');
                    setToastColor('red');
                }
            } else {
                setToastMessage('Email already exists');
                setToastColor('red');
            }
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        } catch (error) {
            console.error('Error during user creation:', error);
            setToastMessage('Error during user creation');
            setToastColor('red');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    return (
        <div className="bg-bg-primary flex flex-col p-5 rounded-lg">
            {showToast && <Toast message={toastMessage} color={toastColor} />}
            <SectionTitle title="registrati" />
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col">
                        <InputText label="nome" type="text" placeholder='Nome' name="firstName" onChange={handleInputChange} />
                        {errors.firstName && <span className="text-text-error text-center">{errors.firstName}</span>}
                    </div>
                    <div className="flex flex-col">
                        <InputText label="cognome" type="text" placeholder='Cognome' name="lastName" onChange={handleInputChange} />
                        {errors.lastName && <span className="text-text-error text-center">{errors.lastName}</span>}
                    </div>
                </div>
                <InputText label="e-mail" type="email" placeholder='E-mail' name="email" onChange={handleInputChange} />
                {errors.email && <span className="text-text-error text-center">{errors.email}</span>}
                <InputText label="password" type="password" placeholder='Password' name="password" onChange={handleInputChange} />
                {errors.password && <span className="text-text-error text-center">{errors.password}</span>}
                <InputText label="repeat password" type="password" placeholder='Password' name="confirmPassword" onChange={handleInputChange} />
                {errors.confirmPassword && <span className="text-text-error text-center">{errors.confirmPassword}</span>}
                <div className="w-full flex flex-col justify-around items-center gap-2 bg-bg-second mt-5 p-2 rounded-md">
                    <h4 className="uppercase font-bold text-xl text-text-primary">sesso</h4>
                    <div className="flex gap-20">
                        <FaFemale className={`${bodyCheckImageIsMan ? 'text-2xl text-text-primary w-1/3' : 'text-3xl text-female-color w-1/3'}`} />
                        <Switch
                            checked={bodyCheckImageIsMan}
                            onChange={() => {
                                setBodyCheckImageIsMan(!bodyCheckImageIsMan);
                                setUserData({ ...userData, gender: !bodyCheckImageIsMan ? 'male' : 'female' });
                            }}
                            activeColor="bg-blue-400"
                            inactiveColor="bg-pink-400"
                        />
                        <FaMale className={`${bodyCheckImageIsMan ? 'text-3xl text-male-color w-1/3' : 'text-2xl text-white w-1/3'}`} />
                    </div>
                </div>

                <Link href="/login">
                    <h4 className="text-primary-color mt-3 underline underline-offset-2 text-center">Hai già un account? Accedi ora</h4>
                </Link>

                <PrimaryButton text="Registrati" onClick={handleSubmit} disabled={!isFormValid} />
            </div>
        </div>
    )
}