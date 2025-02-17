import React from "react";
import ReactDOM from "react-dom";
import AddRemoveButton from "./AddRemoveButton";

type DeleteConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirm({ onConfirm, onCancel }: DeleteConfirmProps) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-bg-primary bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-bg-secondary rounded shadow-lg text-center p-4">
                <p className="text-lg">Are you sure you want to delete?</p>
                <div className="flex gap-1 mt-4">
                    <AddRemoveButton text='yes' onClick={onConfirm} isAdd />
                    <AddRemoveButton text='no' onClick={onCancel} isAdd={false} />
                </div>
            </div>
        </div>,
        document.body
    );
}