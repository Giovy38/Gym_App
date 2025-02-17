'use client'
import { useState, useEffect } from 'react';
import { DietData } from '@/src/type/DietData.type';
import { dietService } from '@/src/services/diet.services';
import BlueButton from '../reusable_components/BlueButton';
import AddRemoveButton from '../reusable_components/AddRemoveButton';


interface AddFoodFormProps {
    onAdd: (food: string, quantity: string) => void;
    onCancel: () => void;
    initialFood?: string;
    initialQuantity?: string;
    latestDiet: DietData | null;
    dayOfWeek: string;
    meal: string;
    itemId?: number;
}

export default function AddFoodForm({ onAdd, onCancel, initialFood = '', initialQuantity = '', latestDiet, dayOfWeek, meal, itemId }: AddFoodFormProps) {
    const [food, setFood] = useState(initialFood);
    const [quantity, setQuantity] = useState(initialQuantity);

    useEffect(() => {
        setFood(initialFood);
        setQuantity(initialQuantity);
    }, [initialFood, initialQuantity]);

    const handleAdd = async () => {
        if (food && quantity) {
            if (latestDiet) {
                const res = await dietService.addDietItem(latestDiet.id, dayOfWeek, meal, food, quantity)
                if (res) {
                    onAdd(food, quantity);
                }
            }
        };
    }

    const handleEdit = async () => {
        console.log('lastdietid', latestDiet?.id)
        console.log('itemid', itemId)
        console.log('dayofweek', dayOfWeek)
        console.log('meal', meal)
        console.log('quantity', quantity)
        console.log('food', food)
        if (latestDiet) {
            if (itemId !== undefined) {
                const res = await dietService.editDietItem(latestDiet.id, dayOfWeek, meal, quantity, food, itemId);
                if (res) {
                    onAdd(food, quantity);
                }
            }
        }
    }

    return (
        <div className="fixed z-50 inset-0 bg-bg-primary bg-opacity-50 flex items-center justify-center">
            <div className="bg-bg-primary p-4 shadow-md rounded-lg w-5/6 xl:w-2/5 shadow-shadow-secondary">
                <h3 className="text-center text-2xl font-bold uppercase mb-2 text-primary-color" >Add new Meal</h3>
                <input
                    type="text"
                    placeholder="Quantity (es. 120g/ 1.5 kg)"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <input
                    type="text"
                    placeholder="Aliment Name"
                    value={food}
                    onChange={(e) => setFood(e.target.value)}
                    className="border p-2 mb-2 w-full rounded-lg"
                />
                <div className="flex justify-center gap-2">
                    {(initialFood || initialQuantity) ?
                        <BlueButton text="Edit" onClick={handleEdit} disabled={!food || !quantity} />
                        :
                        <AddRemoveButton text="Add" onClick={handleAdd} isAdd={true} disabled={!food || !quantity} />
                    }


                    <AddRemoveButton text="Cancel" onClick={onCancel} isAdd={false} disabled={!food || !quantity} />
                </div>
            </div>
        </div>
    );
}