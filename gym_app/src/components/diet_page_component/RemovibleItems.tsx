'use client'
import { useState } from "react";
import { IoPencilOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import DeleteConfirm from "../reusable_components/DeleteConfirm";
import RemoveDietItem from "@/src/services/diet-page-services/RemoveDietItem.services";

interface RemovibleItemsProps {
    index: number;
    food: string;
    quantity: string;
    onRemove: () => void;
    onEdit: (index: number) => void;
    latestDietId: number | null;
    dayOfWeek: string;
    meal: string;
}

export default function RemovibleItems({ index, food, quantity, onRemove, onEdit, latestDietId, dayOfWeek, meal }: RemovibleItemsProps) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const truncateText = (text: string, maxLength: number) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const handleDeleteClick = () => {
        setShowDeleteConfirm(true);
    };

    const handleConfirmDelete = () => {
        setShowDeleteConfirm(false);
        console.log('latestDietId', latestDietId);
        if (latestDietId) {
            RemoveDietItem(latestDietId, dayOfWeek, meal, index);
        }
        onRemove();
    };

    const handleCancelDelete = () => {
        setShowDeleteConfirm(false);
    };

    const handleEditClick = () => {
        onEdit(index);
    };

    return (
        <>
            <div className="bg-white text-black p-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer mt-2 w-full lg:max-w-40 text-balance overflow-hidden">
                <h3 className="font-bold text-center bg-slate-300 p-1 rounded-lg min-w-14">
                    {truncateText(quantity, 14)}
                </h3>
                <div className="text-center font-bold uppercase overflow-auto max-h-20 w-full [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-black">
                    <p className="break-words">{food}</p>
                </div>
                <div className="flex gap-2 w-full">
                    <div onClick={handleEditClick} className="flex items-center justify-center w-1/2 rounded-md p-1 hover:bg-black">
                        <IoPencilOutline className="cursor-pointer text-blue-500 text-xl rounded-md" />
                    </div>
                    <div onClick={handleDeleteClick} className="flex items-center justify-center w-1/2 rounded-md p-1 hover:bg-black">
                        <MdDeleteForever className="cursor-pointer text-red-500 text-xl rounded-md" />
                    </div>
                </div>
            </div>
            {showDeleteConfirm && (
                <DeleteConfirm onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            )}
        </>
    );
}