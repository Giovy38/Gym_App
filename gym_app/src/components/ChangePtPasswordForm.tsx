import React, { useState, useEffect } from 'react';
import InputText from './reusable_components/InputText';
import { PersonalTrainerData } from '../type/PersonalTrainer.type';
import Toast from './reusable_components/Toast';
import { ptService } from '../services/pt.services';
import { usePT } from '../context/PtProvider';
import ModalButton from './reusable_components/ModalButton';

export default function ChangePasswordForm({ onClose }: { onClose: () => void, ptData: PersonalTrainerData }) {


    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [errors, setErrors] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastColor, setToastColor] = useState<'green' | 'red'>('green');
    const pt = usePT();

    useEffect(() => {
        const newErrors = {
            currentPassword: currentPassword.length < 1 ? 'Password attuale obbligatoria' : '',
            newPassword: newPassword.length < 8 && newPassword.length > 0 ? 'La Nuova password deve avere almeno 8 caratteri' : '',
            confirmNewPassword: newPassword !== confirmNewPassword ? 'Le password non corrispondono' : ''
        };
        setErrors(newErrors);
        setIsFormValid(Object.values(newErrors).every(error => error === ''));
    }, [currentPassword, newPassword, confirmNewPassword]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const handleChangePassword = async () => {
        if (!isFormValid) return;

        if (pt) {
            try {
                const updatedUser = await ptService.editPTPassword(pt.id, currentPassword, newPassword);
                if (updatedUser) {
                    setToastMessage('Password cambiata');
                    setToastColor('green');
                    setShowToast(true);
                    const closeFormTimer = setTimeout(() => {
                        onClose();
                    }, 3000);
                    return () => clearTimeout(closeFormTimer);
                } else {
                    setToastMessage('Password attuale errata');
                    setToastColor('red');
                    setShowToast(true);
                }
            } catch (error) {
                console.error('Error changing password:', error);
                setToastMessage('Errore nel cambiare password');
                setToastColor('red');
                setShowToast(true);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center" onClick={onClose}>
            <div className="bg-bg-primary p-4 shadow-md rounded-lg md:w-2/3 xl:w-1/3 shadow-shadow-fourth" onClick={(e) => e.stopPropagation()}>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Cambia Password</h1>
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
                <div className="text-text-secondary flex flex-col justify-center items-center mt-4">
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
                <div className="text-text-secondary flex flex-col justify-center items-center mt-4">
                    <InputText
                        label="Conferma Nuova Password"
                        type="password"
                        placeholder="Conferma password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {errors.confirmNewPassword && <span className="text-text-error">{errors.confirmNewPassword}</span>}
                </div>
                <div className="flex flex-col-reverse md:flex-row justify-center items-center md:gap-3">
                    <ModalButton text='cancella' onClick={onClose} />
                    <ModalButton text='cambia password' onClick={handleChangePassword} isAdd disabled={!isFormValid} />
                </div>
                {showToast && <Toast message={toastMessage} color={toastColor} />}
            </div>
        </div>
    );
}