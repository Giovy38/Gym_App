import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import { dietService } from "@/src/services/diet.services";
import { DayOfWeek } from "@/src/type/DietData.type";

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
        <div className="fixed inset-0 bg-bg-secondary bg-opacity-50 flex items-center justify-center text-text-primary z-50">
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-bg-primary overflow-auto max-h-full">
                <div className="flex justify-end">
                    <IoMdCloseCircle className="text-btn-exit text-2xl cursor-pointer hover:text-btn-exit-hover" onClick={onClose} />
                </div>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">Add New Diet </h1>
                <div className="text-text-secondary flex flex-col justify-center items-center">
                    <label className="text-text-primary uppercase font-bold text-md select-none" htmlFor="date">Date</label>
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
