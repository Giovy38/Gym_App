'use client'

import { GenericButtonType } from "@/src/type/GenericButton.type"


export default function ModalButton({ text, isAdd, onClick, disabled = false }: GenericButtonType) {
    return (
        <div className="w-full">
            {isAdd ? <button
                className={`bg-btn-accent w-full text-text-secondary rounded-md p-2 text-center mt-5 uppercase font-bold ${disabled ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer hover:bg-btn-accent-hover'}`}
                onClick={onClick}
                disabled={disabled}
            >
                {text}
            </button>
                :
                <button
                    className={'bg-btn-neutral text-text-secondary w-full rounded-md p-2 text-center mt-5 uppercase font-bold cursor-pointer hover:bg-btn-neutral-hover'}
                    onClick={onClick}
                >
                    {text}
                </button>
            }
        </div>

    )
}
