'use client'

import { GoPlusCircle } from "react-icons/go";
import RemovibleItems from "./RemovibleItems";
import { useState, useEffect } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";
import { DietData, Meal } from "@/src/type/DietData.type";
import AddFoodForm from "./AddFoodForm";

export default function AddItemButton({ title, latestDiet, dayOfWeek, meal, diets, selectedDiet }: AddItemButtonType) {
    const [items, setItems] = useState<Meal[]>([]);
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

            const dayMeals: Meal[] = (lastDiet[dayOfWeek as keyof Omit<DietData, 'id' | 'date'>] as unknown as { [key: string]: Meal[] })?.[meal] || [];
            setItems(dayMeals);
        }
    }, [diets, dayOfWeek, meal, selectedDiet]);

    // function to add or edit an item
    const addItem = (name: string, quantity: string) => {
        if (editIndex !== null) {
            // Edit existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = { name, quantity, id: items[editIndex].id };
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setItems([...items, { name, quantity, id: 0 }]);
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
                className="bg-black text-primary-color hover:bg-btn-plus-hover hover:text-text-secondary p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 w-full min-h-28 min-w-40">
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
                    itemId={editIndex !== null ? editIndex : undefined}
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
                        mealId={item.id}
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
    )
}