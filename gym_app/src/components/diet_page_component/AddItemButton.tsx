'use client'

import { GoPlusCircle } from "react-icons/go";
import RemovibleItems from "./RemovibleItems";
import { useState, useEffect } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";
import { DietData, MealItem, MealPlan } from "@/src/type/DietData.type";
import AddFoodForm from "./AddFoodForm";

export default function AddItemButton({ title, latestDiet, dayOfWeek, meal, diets }: AddItemButtonType) {
    const [items, setItems] = useState<MealItem[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    useEffect(() => {
        if (diets && diets.length > 0) {
            const lastDiet: DietData = diets[diets.length - 1];
            const dayMeals: MealItem[] = lastDiet[dayOfWeek as keyof Omit<DietData, 'id' | 'date'>]?.[meal as keyof MealPlan] || [];
            setItems(dayMeals);
        }
    }, [diets, dayOfWeek, meal]);

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
        <div>
            <div
                onClick={() => {
                    setEditIndex(null);
                    setShowForm(true);
                }}
                className="bg-black text-[#f8bf58] hover:bg-green-800 hover:text-black p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 w-full min-h-28 min-w-40">
                <h3 className="uppercase font-bold">{title}</h3>
                <GoPlusCircle />
            </div>
            {showForm && (
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
                />
            )}
            {/* item added */}
            <div>
                {

                }
                {items.map((item, index) => (
                    <RemovibleItems
                        key={index}
                        index={index}
                        food={item.name}
                        quantity={item.quantity}
                        onRemove={() => removeItem(index)}
                        onEdit={() => editItem(index)}
                        latestDietId={latestDiet!.id}
                        dayOfWeek={dayOfWeek}
                        meal={meal}
                    />
                ))}
            </div>
        </div>
    )
}