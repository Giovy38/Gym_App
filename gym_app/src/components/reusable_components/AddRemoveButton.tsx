'use client'

import { GenericButtonType } from "@/src/type/GenericButton.type"


export default function AddButton({ text, isAdd, onClick, disabled = false }: GenericButtonType) {
    return (
        <div className="w-full">
            {isAdd ? <button
                className={`bg-btn-add-active text-text-primary w-full rounded-md p-2 text-center mt-5 uppercase font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-btn-add-hover'}`}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
                :
                <button
                    className={'bg-btn-cancel text-text-primary w-full rounded-md p-2 text-center mt-5 uppercase font-bold cursor-pointer hover:bg-btn-cancel-hover'}
                    onClick={onClick}
                >
                    {text}
                </button>
            }
        </div>

    )
}
