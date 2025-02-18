'use client'

import RemovibleItems from "./RemovibleItems";
import { useState, useEffect } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";
import AddFoodForm from "./AddFoodForm";
import PlusButton from "../reusable_components/PlusButton";
import ReactDOM from 'react-dom';
import { Meal } from "@/src/type/DietData.type";

export default function AddItemButtonSlider({ dayOfWeek, meal, selectedDiet }: AddItemButtonType) {
    const [items, setItems] = useState<Meal[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        if (selectedDiet) {
            const currentDayDiet = selectedDiet.dailyDiets.find(d => d.day === dayOfWeek);
            if (currentDayDiet) {
                const mealItems = currentDayDiet.dailyMenu.menuItems
                    .filter(item => item.mealType === meal)
                    .map(item => ({
                        name: item.meal.name,
                        quantity: item.meal.quantity,
                        id: item.meal.id
                    }));
                setItems(mealItems);
            }
        }
    }, [selectedDiet, dayOfWeek, meal]);

    // function to add or edit an item
    const addItem = (name: string, quantity: string, id: number = 0) => {
        if (editIndex !== null) {
            // Edit existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = { name, quantity, id: items[editIndex].id };
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setItems([...items, { name, quantity, id }]);
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
            <div className="flex flex-col gap-3 bg-bg-third shadow-lg p-3 rounded-lg mb-10 relative w-full">
                <h3 className="text-center text-2xl font-bold uppercase font-logo-font text-primary-color mb-3">{meal}</h3>
                <div
                    className="bg-bg-primary text-primary-color p-2 rounded-lg flex justify-around items-center gap-2">
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
                        latestDiet={selectedDiet}
                        dayOfWeek={dayOfWeek}
                        meal={meal}
                        itemId={editIndex !== null ? editIndex : undefined}
                    />,
                    document.body
                )}
                <div className="flex flex-wrap gap-4 justify-center items-center p-1 overflow-y-auto  [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-bg-primary
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-slider-color h-[200px]">
                    {items.map((item, index) => (
                        <RemovibleItems
                            key={`${selectedDiet?.id}-${meal}-${index}`}
                            index={index}
                            food={item.name}
                            quantity={item.quantity}
                            mealId={item.id}
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