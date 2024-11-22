'use client'
import { useState, useEffect } from 'react';
import { DietData } from '@/src/type/DietData.type';
import AddDietItem from '@/src/services/diet-page-services/AddDietItem.services';
import EditDietItem from '@/src/services/diet-page-services/EditDietItem.services';

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
                const res = await AddDietItem(latestDiet.id, dayOfWeek, meal, food, quantity);
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
                const res = await EditDietItem(latestDiet.id, dayOfWeek, meal, quantity, food, itemId);
                if (res) {
                    onAdd(food, quantity);
                }
            }
        }
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-black p-4 shadow-md rounded-lg w-2/3 xl:w-1/5 shadow-[#f8bf58]">
                <h3 className="text-center text-2xl font-bold uppercase mb-2 text-[#f8bf58]" >Add new Meal</h3>
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
                        <button onClick={handleEdit} className='bg-blue-500 text-white p-2 rounded w-1/2'>
                            Edit
                        </button> : <button onClick={handleAdd} className='bg-green-500 text-white p-2 rounded w-1/2'>
                            Add
                        </button>
                    }

                    <button onClick={onCancel} className="bg-red-500 text-white p-2 rounded w-1/2">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
}