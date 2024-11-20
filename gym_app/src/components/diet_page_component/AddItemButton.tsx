'use client'

import { GoPlusCircle } from "react-icons/go";
import RemovibleItems from "./RemovibleItems";
import { useState } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";
import AddFoodForm from "./AddFoodForm";

export default function AddItemButton({ title, latestDiet, dayOfWeek, meal }: AddItemButtonType) {
    const [items, setItems] = useState<{ food: string; quantity: string }[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editIndex, setEditIndex] = useState<number | null>(null);

    // function to add or edit an item
    const addItem = (food: string, quantity: string) => {
        if (editIndex !== null) {
            // Edit existing item
            const updatedItems = [...items];
            updatedItems[editIndex] = { food, quantity };
            setItems(updatedItems);
            setEditIndex(null);
        } else {
            // Add new item
            setItems([...items, { food, quantity }]);
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
                    initialFood={editIndex !== null ? items[editIndex].food : ''}
                    initialQuantity={editIndex !== null ? items[editIndex].quantity : ''}
                    latestDiet={latestDiet}
                    dayOfWeek={dayOfWeek}
                    meal={meal}
                />
            )}
            {/* item added */}
            <div>
                {items.map((item, index) => (
                    <RemovibleItems
                        key={index}
                        food={item.food}
                        quantity={item.quantity}
                        onRemove={() => removeItem(index)}
                        onEdit={() => editItem(index)}
                    />
                ))}
            </div>
        </div>
    )
}