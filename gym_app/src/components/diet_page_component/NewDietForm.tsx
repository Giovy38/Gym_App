import { useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import AddRemoveButton from "../reusable_components/AddRemoveButton";
import { MealPlan } from "@/src/type/DietData.type";
import { dietService } from "@/src/services/diet.services";

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



    const MealPlan: MealPlan = {
        breakfast: [],
        snack: [],
        lunch: [],
        snack2: [],
        dinner: []
    }

    const handleSubmit = async () => {
        const dietData = {
            id: 0,
            date,
            monday: MealPlan,
            tuesday: MealPlan,
            wednesday: MealPlan,
            thursday: MealPlan,
            friday: MealPlan,
            saturday: MealPlan,
            sunday: MealPlan
        };

        try {
            await dietService.createNewDiet(dietData);
            onNewDiet();
            onClose();
        } catch (error) {
            console.error('Errore durante l\'aggiunta della dieta:', error);
        }
    };

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center text-white z-50">
            <div className="p-4 shadow-md rounded-lg w-full max-w-4xl bg-black overflow-auto max-h-full">
                <div className="flex justify-end">
                    <IoMdCloseCircle className="text-red-400 text-2xl cursor-pointer hover:text-red-500" onClick={onClose} />
                </div>
                <h1 className="text-center text-2xl font-bold uppercase font-logo-font text-[#f8bf58] mb-3">Add New Diet </h1>
                <div className="text-black flex flex-col justify-center items-center">
                    <label className="text-[#f8bf58] uppercase font-bold text-md select-none" htmlFor="date">Date</label>
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
