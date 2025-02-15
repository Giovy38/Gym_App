'use client'
import { useState } from "react";
import { IoPencilOutline } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import DeleteConfirm from "../reusable_components/DeleteConfirm";
import { dietService } from "@/src/services/diet.services";

interface RemovibleItemsProps {
    index: number;
    food: string;
    quantity: string;
    mealId: number;
    onRemove: () => void;
    onEdit: (index: number) => void;
    latestDietId: number;
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
            dietService.deleteDietItem(latestDietId, dayOfWeek, meal, index);
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
            <div className="bg-bg-secondary text-text-secondary p-2 rounded-lg flex flex-col items-center justify-center gap-2 cursor-pointer mt-2 w-full lg:max-w-40 text-balance overflow-hidden">
                <h3 className="font-bold text-center bg-bg-meal-title p-1 rounded-lg min-w-14">
                    {truncateText(quantity, 14)}
                </h3>
                <div className="text-center font-bold uppercase overflow-auto max-h-20 w-full [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-slider-color
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-bg-primary">
                    <p className="break-words">{food}</p>
                </div>
                <div className="flex gap-2 w-full">
                    <div onClick={handleEditClick} className="flex items-center justify-center w-1/2 rounded-md p-1 hover:bg-black">
                        <IoPencilOutline className="cursor-pointer text-btn-edit text-xl rounded-md" />
                    </div>
                    <div onClick={handleDeleteClick} className="flex items-center justify-center w-1/2 rounded-md p-1 hover:bg-black">
                        <MdDeleteForever className="cursor-pointer text-btn-delete text-xl rounded-md" />
                    </div>
                </div>
            </div>
            {showDeleteConfirm && (
                <DeleteConfirm onConfirm={handleConfirmDelete} onCancel={handleCancelDelete} />
            )}
        </>
    );
}