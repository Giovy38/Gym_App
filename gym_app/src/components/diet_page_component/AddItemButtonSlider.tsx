'use client'

import RemovibleItems from "./RemovibleItems";
import { useState, useEffect } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";
import { DietData, MealItem, MealPlan } from "@/src/type/DietData.type";
import AddFoodForm from "./AddFoodForm";
import PlusButton from "../reusable_components/PlusButton";
import ReactDOM from 'react-dom';

export default function AddItemButtonSlider({ latestDiet, dayOfWeek, meal, diets, selectedDiet }: AddItemButtonType) {
    const [items, setItems] = useState<MealItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        if (diets && diets.length > 0) {
            let lastDiet: DietData;
            if (selectedDiet) {
                lastDiet = selectedDiet;
            } else {
                lastDiet = diets[diets.length - 1];
            }

            const dayMeals: MealItem[] = lastDiet[dayOfWeek as keyof Omit<DietData, 'id' | 'date'>]?.[meal as keyof MealPlan] || [];
            setItems(dayMeals);
        }
    }, [diets, dayOfWeek, meal, selectedDiet]);

    // function to add or edit an item
    const addItem = (name: string, quantity: string) => {
        if (editIndex !== null) {
            // Edit existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = { name, quantity };
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setItems([...items, { name, quantity }]);
        }
        setShowForm(false);
    }

    // function to remove items from the list
    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    }

    const editItem = (index: number) => {
        setEditIndex(index);
        setShowForm(true);
    }

    return (
        <div className="flex flex-col gap-3 mt-4 w-full">
            <div className="flex flex-col gap-3 bg-[#111111] shadow-lg p-3 rounded-lg mb-10 relative w-full">
                <h3 className="text-center text-2xl font-bold uppercase font-logo-font text-[#f8bf58] mb-3">{meal}</h3>
                <div
                    className="bg-black text-[#f8bf58] p-2 rounded-lg flex justify-around items-center gap-2">
                    <PlusButton text=" " onClick={() => {
                        setEditIndex(null);
                        setShowForm(true);
                    }} />
                </div>
                {showForm && ReactDOM.createPortal(
                    <AddFoodForm
                        onAdd={addItem}
                        onCancel={() => {
                            setShowForm(false);
                            setEditIndex(null);
                        }}
                        initialFood={editIndex !== null ? items[editIndex].name : ''}
                        initialQuantity={editIndex !== null ? items[editIndex].quantity : ''}
                        latestDiet={latestDiet}
                        dayOfWeek={dayOfWeek}
                        meal={meal}
                        itemId={editIndex !== null ? editIndex : undefined}
                    />,
                    document.body
                )}
                <div className="flex flex-wrap gap-4 justify-center items-center p-1 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-black
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-gray-100 h-[200px]">
                    {items.map((item, index) => (
                        <RemovibleItems
                            key={`${selectedDiet?.id}-${meal}-${index}`}
                            index={index}
                            food={item.name}
                            quantity={item.quantity}
                            onRemove={() => removeItem(index)}
                            onEdit={() => editItem(index)}
                            latestDietId={selectedDiet!.id}
                            dayOfWeek={dayOfWeek}
                            meal={meal}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}