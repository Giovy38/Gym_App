'use client'

import { GenericButtonType } from "@/src/type/GenericButton.type"


export default function AddButton({ text, isAdd, onClick, disabled = false }: GenericButtonType) {
    return (
        <div className="w-full">
            {isAdd ? <button
                className={`bg-green-800 text-white w-full rounded-md p-2 text-center mt-5 uppercase font-bold ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-green-600'}`}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
                :
                <button
                    className={'bg-red-800 text-white w-full rounded-md p-2 text-center mt-5 uppercase font-bold cursor-pointer hover:bg-red-600'}
                    onClick={onClick}
                >
                    {text}
                </button>
            }
        </div>

    )
}
