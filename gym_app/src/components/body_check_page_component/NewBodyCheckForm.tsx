'use client';

import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import AddBodyCheck from "@/src/services/body-check-page-services/AddBodyCheck.services";


type NewBodyCheckFormProps = {
    onClose: () => void;
}

export default function NewBodyCheckForm({ onClose }: NewBodyCheckFormProps) {

    const currentDate = new Date().toLocaleDateString('en-EN');
    const [date, setDate] = useState(currentDate);
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [shoulder, setShoulder] = useState(0);
    const [chest, setChest] = useState(0);
    const [waist, setWaist] = useState(0);
    const [bicepsLeft, setBicepsLeft] = useState(0);
    const [bicepsRight, setBicepsRight] = useState(0);
    const [forearmLeft, setForearmLeft] = useState(0);
    const [forearmRight, setForearmRight] = useState(0);
    const [buttocks, setButtocks] = useState(0);
    const [thigh, setThigh] = useState(0);
    const [quadricepsLeft, setQuadricepsLeft] = useState(0);
    const [quadricepsRight, setQuadricepsRight] = useState(0);
    const [calfLeft, setCalfLeft] = useState(0);
    const [calfRight, setCalfRight] = useState(0);

    const handleSubmit = async () => {
        const bodyCheckData = {
            date,
            height,
            weight,
            shoulder,
            chest,
            waist,
            biceps: {
                left: bicepsLeft,
                right: bicepsRight
            },
            forearm: {
                left: forearmLeft,
                right: forearmRight
            },
            buttocks,
            thigh,
            quadriceps: {
                left: quadricepsLeft,
                right: quadricepsRight
            },
            calf: {
                left: calfLeft,
                right: calfRight
            }
        };

        try {
            await AddBodyCheck(bodyCheckData);
            onClose();

        } catch (error) {
            console.error('Errore durante l\'aggiunta del body check:', error);
        }
    };

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => setter(prev => prev + 1);
    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => setter(prev => Math.max(0, prev - 1));

    const formatDate = (input: string) => {
        const cleaned = input.replace(/\D+/g, ''); // Rimuove tutto tranne i numeri
        const match = cleaned.match(/^(\d{0,2})(\d{0,2})(\d{0,4})$/);
        if (match) {
            let [, mm, dd, yyyy] = match;

            // Controllo per il mese
            if (mm && parseInt(mm, 10) > 12) {
                mm = '12';
            }

            // Controllo per il giorno
            if (dd && parseInt(dd, 10) > 31) {
                dd = '31';
            }

            // Limita l'anno a 4 cifre
            if (yyyy && yyyy.length > 4) {
                yyyy = yyyy.substring(0, 4);
            }

            return [mm, dd, yyyy].filter(Boolean).join('/');
        }
        return input;
    };

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const formattedDate = formatDate(e.target.value);
        setDate(formattedDate);
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center text-white z-50">
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-black overflow-auto max-h-full">
                <div className="flex justify-end">
                    <IoMdCloseCircle className="text-red-400 text-2xl cursor-pointer hover:text-red-500" onClick={onClose} />
                </div>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-[#f8bf58] mb-3">Add New Body Check </h1>
                <div className="text-black flex flex-col md:flex-row gap-3">
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        <div className="flex flex-col justify-center items-center">
                            <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor="date">Date</label>
                            <input
                                className="rounded-lg p-2 text-center"
                                type='text'
                                id="date"
                                value={date}
                                onChange={handleDateChange}
                            />
                        </div>
                        {[{ label: "Height", value: height, setValue: setHeight },
                        { label: "Weight", value: weight, setValue: setWeight },
                        { label: "Shoulder", value: shoulder, setValue: setShoulder },
                        { label: "Chest", value: chest, setValue: setChest },
                        { label: "Waist", value: waist, setValue: setWaist },
                        { label: "Buttocks", value: buttocks, setValue: setButtocks },
                        { label: "Thigh", value: thigh, setValue: setThigh }]
                            .map(({ label, value, setValue }) => (
                                <div key={label} className="flex flex-col justify-center items-center">
                                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor={label.toLowerCase()}>{label}</label>
                                    <div className="flex justify-center items-center gap-3">
                                        <FaMinus className="text-white text-2xl cursor-pointer hover:text-red-500" onClick={() => decrement(setValue)} />
                                        <input
                                            className="rounded-lg p-2 text-center"
                                            type='number'
                                            step="0.1"
                                            id={label.toLowerCase()}
                                            value={value}
                                            onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                                        />
                                        <FaPlus className="text-white text-2xl cursor-pointer hover:text-green-500" onClick={() => increment(setValue)} />
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex flex-col gap-3 w-full md:w-1/2">
                        {[{ label: "Biceps", leftValue: bicepsLeft, setLeftValue: setBicepsLeft, rightValue: bicepsRight, setRightValue: setBicepsRight },
                        { label: "Forearm", leftValue: forearmLeft, setLeftValue: setForearmLeft, rightValue: forearmRight, setRightValue: setForearmRight },
                        { label: "Quadriceps", leftValue: quadricepsLeft, setLeftValue: setQuadricepsLeft, rightValue: quadricepsRight, setRightValue: setQuadricepsRight },
                        { label: "Calf", leftValue: calfLeft, setLeftValue: setCalfLeft, rightValue: calfRight, setRightValue: setCalfRight }]
                            .map(({ label, leftValue, setLeftValue, rightValue, setRightValue }) => (
                                <div key={label} className="flex flex-col">
                                    <div className="flex justify-between">
                                        <label className="text-[#f8bf58] uppercase font-bold text-md text-center w-1/2 select-none">{label} SX</label>
                                        <label className="text-[#f8bf58] uppercase font-bold text-md text-center w-1/2 select-none">{label} DX</label>
                                    </div>
                                    <div className="flex gap-10">
                                        <div className="flex items-center w-1/2 gap-1">
                                            <FaMinus className="text-white text-2xl cursor-pointer hover:text-red-500" onClick={() => decrement(setLeftValue)} />
                                            <input
                                                className="rounded-lg p-2 text-center w-full"
                                                type='number'
                                                step="0.1"
                                                id={`${label.toLowerCase()}Left`}
                                                value={leftValue}
                                                onChange={(e) => setLeftValue(parseFloat(e.target.value) || 0)}
                                            />
                                            <FaPlus className="text-white text-2xl cursor-pointer hover:text-green-500" onClick={() => increment(setLeftValue)} />
                                        </div>
                                        <div className="flex items-center w-1/2 gap-1">
                                            <FaMinus className="text-white text-2xl cursor-pointer hover:text-red-500" onClick={() => decrement(setRightValue)} />
                                            <input
                                                className="rounded-lg p-2 text-center w-full"
                                                type='number'
                                                step="0.1"
                                                id={`${label.toLowerCase()}Right`}
                                                value={rightValue}
                                                onChange={(e) => setRightValue(parseFloat(e.target.value) || 0)}
                                            />
                                            <FaPlus className="text-white text-2xl cursor-pointer hover:text-green-500" onClick={() => increment(setRightValue)} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="w-1/2">
                        <AddRemoveButton text="Create" onClick={handleSubmit} isAdd />
                    </div>
                    <div className="w-1/2">
                        <AddRemoveButton text="Cancel" onClick={onClose} isAdd={false} />
                    </div>
                </div>
            </div>
        </div>
    );
}



