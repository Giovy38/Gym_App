import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { dietService } from "@/src/services/diet.services";
import { DayOfWeek } from "@/src/type/DietData.type";
import ModalButton from "../reusable_components/ModalButton";

type NewDietFormProps = {
    onClose: () => void;
    onNewDiet: () => void;
}

export default function NewDietForm({ onClose, onNewDiet }: NewDietFormProps) {
    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const [date, setDate] = useState(getCurrentDate());

    const emptyDailyMenu = {
        id: 0,
        menuItems: []
    };

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] as const;

    const handleSubmit = async () => {
        const dailyDiets = days.map((day, index) => ({
            id: index + 1,
            day: day as DayOfWeek,
            dailyMenu: {
                ...emptyDailyMenu,
                id: index + 1
            }
        }));

        const dietData = {
            id: 0,
            date,
            dailyDiets
        };

        try {
            await dietService.createNewDiet(dietData);
            onNewDiet();
            onClose();
        } catch (error) {
            console.error('Error during diet creation:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center text-text-primary z-50" onClick={onClose}>
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-bg-modal overflow-auto max-h-[97vh]" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center px-2 pb-2">
                    <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Aggiungi dieta</h1>
                    <IoMdCloseCircle className="text-btn-exit text-2xl cursor-pointer hover:text-btn-exit-hover" onClick={onClose} />
                </div>
                <div className="text-text-secondary flex flex-col justify-center items-center">
                    <label className="text-primary-color uppercase font-bold text-md select-none" htmlFor="date">data</label>
                    <input
                        className="rounded-lg p-2 text-center"
                        type='date'
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="flex justify-center items-center gap-3 mt-4">
                    <div className="w-1/2">
                        {/* <AddRemoveButton text="cancella" onClick={onClose} isAdd={false} /> */}
                        <ModalButton text='cancella' onClick={onClose} isAdd={false} />
                    </div>
                    <div className="w-1/2">
                        {/* <AddRemoveButton text="crea" onClick={handleSubmit} isAdd /> */}
                        <ModalButton text='crea' onClick={handleSubmit} isAdd />
                    </div>
                </div>
            </div>
        </div>
    );
}
