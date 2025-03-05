'use client';

import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { bodyCheckService } from "@/src/services/body-check.services";
import ModalButton from "../reusable_components/ModalButton";


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


    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center text-text-primary z-50" onClick={onClose}>
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-bg-modal overflow-auto max-h-[97vh]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center px-2 pb-2">
                    <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Aggiungi misurazione</h1>
                    <IoMdCloseCircle className="text-btn-exit text-2xl cursor-pointer hover:text-btn-exit-hover" onClick={onClose} />
                </div>
                <div className="text-text-secondary flex flex-col gap-3">
                    <div className="flex flex-wrap justify-between gap-3 bg-bg-primary p-3 rounded-lg">
                        <div className="flex flex-col justify-center items-center flex-1 min-w-[200px]">
                            <label className="text-primary-color uppercase font-bold text-md select-none" htmlFor="date">data</label>
                            <input
                                className="rounded-lg p-2 text-center w-full"
                                type='date'
                                id="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                        {[
                            { label: "altezza (cm)", value: height, setValue: setHeight },
                            { label: "peso (kg)", value: weight, setValue: setWeight }
                        ].map(({ label, value, setValue }) => (
                            <div key={label} className="flex flex-col justify-center items-center flex-1 min-w-[200px]">
                                <label className="text-primary-color uppercase font-bold text-md select-none" htmlFor={label.toLowerCase()}>{label}</label>
                                <input
                                    className="rounded-lg p-2 text-center w-full"
                                    type='number'
                                    step="0.1"
                                    id={label.toLowerCase()}
                                    value={value}
                                    onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 bg-bg-primary p-3 rounded-lg">
                        {[
                            { label: "spalle (cm)", value: shoulder, setValue: setShoulder },
                            { label: "petto (cm)", value: chest, setValue: setChest },
                            { label: "vita (cm)", value: waist, setValue: setWaist },
                            { label: "glutei (cm)", value: buttocks, setValue: setButtocks },
                            { label: "coscia (cm)", value: thigh, setValue: setThigh }
                        ].map(({ label, value, setValue }) => (
                            <div key={label} className="flex flex-col justify-center items-center">
                                <label className="text-primary-color uppercase font-bold text-md select-none" htmlFor={label.toLowerCase()}>{label}</label>
                                <input
                                    className="rounded-lg p-2 text-center w-full"
                                    type='number'
                                    step="0.1"
                                    id={label.toLowerCase()}
                                    value={value}
                                    onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
                                />
                            </div>
                        ))}

                        {[
                            { label: "bicipiti", leftValue: bicepsLeft, setLeftValue: setBicepsLeft, rightValue: bicepsRight, setRightValue: setBicepsRight },
                            { label: "avambracci", leftValue: forearmLeft, setLeftValue: setForearmLeft, rightValue: forearmRight, setRightValue: setForearmRight },
                            { label: "quadricipiti", leftValue: quadricepsLeft, setLeftValue: setQuadricepsLeft, rightValue: quadricepsRight, setRightValue: setQuadricepsRight },
                            { label: "polpacci", leftValue: calfLeft, setLeftValue: setCalfLeft, rightValue: calfRight, setRightValue: setCalfRight }
                        ].map(({ label, leftValue, setLeftValue, rightValue, setRightValue }) => (
                            <div key={label} className="flex flex-col col-span-full">
                                <div className="flex justify-between">
                                    <label className="text-primary-color uppercase font-bold text-md text-center w-1/2 select-none">{label} SX (cm)</label>
                                    <label className="text-primary-color uppercase font-bold text-md text-center w-1/2 select-none">{label} DX (cm)</label>
                                </div>
                                <div className="flex gap-10">
                                    <div className="flex items-center w-1/2 gap-1">
                                        <input
                                            className="rounded-lg p-2 text-center w-full"
                                            type='number'
                                            step="0.1"
                                            id={`${label.toLowerCase()}Left`}
                                            value={leftValue}
                                            onChange={(e) => setLeftValue(parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                    <div className="flex items-center w-1/2 gap-1">
                                        <input
                                            className="rounded-lg p-2 text-center w-full"
                                            type='number'
                                            step="0.1"
                                            id={`${label.toLowerCase()}Right`}
                                            value={rightValue}
                                            onChange={(e) => setRightValue(parseFloat(e.target.value) || 0)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-3 mt-4">
                        <div className="w-1/2">
                            <ModalButton text='cancella' onClick={onClose} isAdd={false} />
                        </div>
                        <div className="w-1/2">
                            <ModalButton text='crea' onClick={handleSubmit} isAdd />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



