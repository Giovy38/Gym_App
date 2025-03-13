import React from "react";
import ReactDOM from "react-dom";
import AddRemoveButton from "./AddRemoveButton";

type DeleteConfirmProps = {
    onConfirm: () => void;
    onCancel: () => void;
}

export default function DeleteConfirm({ onConfirm, onCancel }: DeleteConfirmProps) {
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-bg-primary bg-opacity-80 flex justify-center items-center z-50" onClick={onCancel}>
            <div className="bg-bg-modal text-text-primary rounded shadow-lg text-center p-4" onClick={(e) => e.stopPropagation()}>
                <p className="text-lg">Sei sicuro di voler eliminare questo elemento?</p>
                <div className="flex gap-1 mt-4">
                    <AddRemoveButton text='no' onClick={onCancel} isAdd={false} />
                    <AddRemoveButton text='yes' onClick={onConfirm} isAdd />
                </div>
            </div>
        </div>,
        document.body
    );
}