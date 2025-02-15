import React, { useState, useEffect } from 'react';
import InputText from './reusable_components/InputText';
import { UserData } from '../type/UserData.type';
import Toast from './reusable_components/Toast';
import { userService } from '../services/user.services';
import { useUser } from '../context/UserProvider';

export default function ChangePasswordForm({ onClose }: { onClose: () => void, userData: UserData }) {


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
    const user = useUser();

    useEffect(() => {
        const newErrors = {
            currentPassword: currentPassword.length < 1 ? 'Current password is required' : '',
            newPassword: newPassword.length < 8 && newPassword.length > 0 ? 'New password must be at least 8 characters' : '',
            confirmNewPassword: newPassword !== confirmNewPassword ? 'Passwords do not match' : ''
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

        if (user) {
            try {
                const updatedUser = await userService.editUserPassword(user.id, currentPassword, newPassword);
                if (updatedUser) {
                    setToastMessage('Password changed');
                    setToastColor('green');
                    setShowToast(true);
                    const closeFormTimer = setTimeout(() => {
                        onClose();
                    }, 3000);
                    return () => clearTimeout(closeFormTimer);
                } else {
                    setToastMessage('Current password doesn\'t match');
                    setToastColor('red');
                    setShowToast(true);
                }
            } catch (error) {
                console.error('Error changing password:', error);
                setToastMessage('Error changing password');
                setToastColor('red');
                setShowToast(true);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center">
            <div className="bg-bg-primary p-4 shadow-md rounded-lg w-2/3 xl:w-1/5 shadow-shadow-secondary">
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Change Password</h1>
                <div className="text-text-secondary flex flex-col justify-center items-center">
                    <InputText
                        label="Current Password"
                        type="password"
                        placeholder="Enter current password"
                        name="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                    {errors.currentPassword && <span className="text-text-error">{errors.currentPassword}</span>}
                </div>
                <div className="text-text-secondary flex flex-col justify-center items-center mt-4">
                    <InputText
                        label="New Password"
                        type="password"
                        placeholder="Enter new password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    {errors.newPassword && <span className="text-text-error">{errors.newPassword}</span>}
                </div>
                <div className="text-text-secondary flex flex-col justify-center items-center mt-4">
                    <InputText
                        label="Confirm New Password"
                        type="password"
                        placeholder="Confirm new password"
                        name="confirmNewPassword"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                    />
                    {errors.confirmNewPassword && <span className="text-text-error">{errors.confirmNewPassword}</span>}
                </div>
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="w-1/2">
                        <button
                            className={`bg-btn-edit text-text-primary w-full rounded-md p-2 text-center mt-5 uppercase font-bold  ${!isFormValid ? 'opacity-50' : 'opacity-100 cursor-pointer hover:bg-btn-edit-hover'}`}
                            onClick={handleChangePassword}
                            disabled={!isFormValid}
                        >
                            Change Password
                        </button>
                    </div>
                    <div className="w-1/2">
                        <button
                            className="bg-btn-cancel text-text-primary w-full rounded-md p-2 text-center mt-5 uppercase font-bold cursor-pointer hover:bg-btn-cancel-hover"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
                {showToast && <Toast message={toastMessage} color={toastColor} />}
            </div>
        </div>
    );
}