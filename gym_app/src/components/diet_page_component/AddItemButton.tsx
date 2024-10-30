'use client'

import { GoPlusCircle } from "react-icons/go";
import RemovibleItems from "./RemovibleItems";
import { useState } from "react";
import { AddItemButtonType } from "@/src/type/AddItemButton.type";


export default function AddItemButton({ title }: AddItemButtonType) {

    const [items, setItems] = useState<string[]>([]);

    // function to add a new item
    const addItem = () => {
        const newItem = prompt('Insert a food to add');
        if (newItem) {
            setItems([...items, newItem]);
        }
    }

    // function to remove items from the list
    const removeItem = (itemToRemove: string) => {
        setItems(items.filter((item) => item !== itemToRemove))
    }

    return (
        <div>
            <div
                onClick={addItem}
                className="bg-black text-[#f8bf58] hover:bg-green-800 hover:text-black p-2 rounded-lg flex items-center justify-center gap-2 cursor-pointer mt-2 w-full min-h-28 min-w-40">
                <h3 className="uppercase font-bold  ">{title}</h3>
                <GoPlusCircle />
            </div>
            {/* item added */}
            <div>
                {items.map((item, index) => (
                    <RemovibleItems
                        key={index}
                        text={item}
                        onClick={() => removeItem(item)}
                    />
                ))}
            </div>
        </div>
    )
}