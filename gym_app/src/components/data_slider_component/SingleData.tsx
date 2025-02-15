import { useState } from "react";
import { GoPlus } from "react-icons/go";
import { GiWeightLiftingUp } from "react-icons/gi";
import { IoBody } from "react-icons/io5";
import { FaBowlFood } from "react-icons/fa6";
import { SingleDataType } from "@/src/type/SingleDataDataSlide.type";
import DeleteConfirm from "../reusable_components/DeleteConfirm";
import { TiDelete } from "react-icons/ti";


export default function SingleData({ isAdd, dataDate, dataType, onClick, onOpen, onDelete }: SingleDataType) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const renderIcon = () => {
        switch (dataType) {
            case 'training':
                return <GiWeightLiftingUp />;
            case 'body':
                return <IoBody />;
            case 'diet':
                return <FaBowlFood />;
            default:
                return null;
        }
    };


    return (
        <div className="w-20 relative">
            {isAdd ? (
                <div onClick={onClick} className="text-text-primary flex flex-col items-center uppercase gap-1">
                    <div className="text-text-primary text-3xl border-2 border-border-primary border-dotted rounded-xl p-2 h-20 w-20 flex justify-center items-center cursor-pointer hover:bg-bg-secondary hover:text-text-secondary transition-all duration-300">
                        <GoPlus />
                    </div>
                    <p>add new</p>
                </div>
            ) : (
                <div onClick={onOpen} className="text-text-primary flex flex-col items-center uppercase gap-1">
                    <div className="text-text-primary text-3xl cursor-pointer bg-primary-data rounded-xl p-2 h-20 w-20 flex justify-center items-center hover:bg-primary-focus transition-all duration-300">
                        {renderIcon()}
                    </div>
                    <p className="text-sm">{dataDate}</p>
                    <TiDelete
                        onClick={(e) => {
                            e.stopPropagation();
                            setShowDeleteConfirm(true);
                        }}
                        className="absolute top-0 right-0 text-text-secondary hover:text-btn-delete cursor-pointer text-2xl" />
                </div>
            )}
            {showDeleteConfirm && (
                <DeleteConfirm
                    onConfirm={() => {
                        if (onDelete) {
                            onDelete();
                        }
                        setShowDeleteConfirm(false);
                    }}
                    onCancel={() => setShowDeleteConfirm(false)}
                />
            )}
        </div>
    );
}