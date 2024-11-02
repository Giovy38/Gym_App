'use client'

import { GenericButtonType } from "@/src/type/GenericButton.type"


export default function AddButton({ text, isAdd, onClick }: GenericButtonType) {
    return (
        <div>
            {isAdd ?
                <div className="bg-green-800 text-white rounded-md p-2 text-center mt-5 cursor-pointer hover:bg-green-600 " onClick={onClick}>
                    <button className="uppercase font-bold">{text}</button>
                </div>
                :
                <div className="bg-red-800 text-white rounded-md p-2 text-center mt-5 cursor-pointer hover:bg-red-600 " onClick={onClick}>
                    <button className="uppercase font-bold">{text}</button>
                </div>}
        </div>

    )
}