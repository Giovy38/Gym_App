'use client';

import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { FaMinus, FaPlus } from "react-icons/fa6";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import { bodyCheckService } from "@/src/services/body-check.services";


type NewBodyCheckFormProps = {
    onClose: () => void;
    onNewBodyCheck: () => void;
}

export default function NewBodyCheckForm({ onClose, onNewBodyCheck }: NewBodyCheckFormProps) {

    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(getCurrentDate());
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
            id: 0,
            date,
            height,
            weight,
            shoulder,
            chest,
            waist,
            leftBicep: bicepsLeft,
            rightBicep: bicepsRight,
            leftForearm: forearmLeft,
            rightForearm: forearmRight,
            buttocks,
            thigh,
            leftQuadricep: quadricepsLeft,
            rightQuadricep: quadricepsRight,
            leftCalf: calfLeft,
            rightCalf: calfRight
        };

        try {
            await bodyCheckService.createBodyCheck(bodyCheckData);
            onNewBodyCheck();
            onClose();

        } catch (error) {
            console.error('Error during body check creation:', error);
        }
    };

    const increment = (setter: React.Dispatch<React.SetStateAction<number>>) => setter(prev => prev + 1);
    const decrement = (setter: React.Dispatch<React.SetStateAction<number>>) => setter(prev => Math.max(0, prev - 1));


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
                                type='date'
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        {[{ label: "Height (cm)", value: height, setValue: setHeight },
                        { label: "Weight (kg)", value: weight, setValue: setWeight },
                        { label: "Shoulder (cm)", value: shoulder, setValue: setShoulder },
                        { label: "Chest (cm)", value: chest, setValue: setChest },
                        { label: "Waist (cm)", value: waist, setValue: setWaist },
                        { label: "Buttocks (cm)", value: buttocks, setValue: setButtocks },
                        { label: "Thigh (cm)", value: thigh, setValue: setThigh }]
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
                                        <label className="text-[#f8bf58] uppercase font-bold text-md text-center w-1/2 select-none">{label} SX (cm)</label>
                                        <label className="text-[#f8bf58] uppercase font-bold text-md text-center w-1/2 select-none">{label} DX (cm)</label>
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



