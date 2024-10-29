'use client'

import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { useState } from "react";
import { IoBarbellOutline } from "react-icons/io5";
import { BsXSquareFill } from "react-icons/bs";




type SingleExerciseProps = {
    exerciseTitle: string,
    reps: number,
    sets: number,
    restTime: number,
    totalweight: number,
    barbell: boolean,
    note: string[]
}

export default function SingleExercise({ exercise }: { exercise: SingleExerciseProps }) {
    const [isOpen, setIsOpen] = useState(false);
    const [notes, setNotes] = useState(exercise.note);
    const [newNote, setNewNote] = useState("");

    const accordionOpenClose = () => {
        setIsOpen(!isOpen);
    };

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, newNote]);
            setNewNote("");
        }
    };

    const removeNote = (index: number) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col text-white">
            <div
                className="p-2 flex justify-around items-center gap-2 rounded-lg font-bold bg-black cursor-pointer w-full mt-5 md:min-w-80 min-w-[90vw]"
                onClick={accordionOpenClose}
            >
                <div className="flex flex-col items-center justify-center">
                    <h1 className="uppercase text-[#f8bf58]">{exercise.exerciseTitle}</h1>
                    <div className="flex gap-5">
                        <h5 className="text-sm">{exercise.sets} x {exercise.reps} rep</h5>
                        <h5 className="text-sm">{exercise.totalweight} kg</h5>
                        <h5 className="text-sm">{exercise.restTime} sec </h5>
                    </div>
                </div>
                <div className="block">
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>

            {isOpen && (
                <div className="flex gap-2 justify-center items-center bg-[#ffffff14] rounded-b-xl p-4">
                    <div className="text-center flex flex-col gap-2">
                        <div className="flex gap-3 text-center bg-black p-2 rounded-full justify-center">
                            <p>Sets: {exercise.sets}</p>
                            <p>x</p>
                            <p>Reps: {exercise.reps}</p>
                        </div>
                        <p>Total Weight: {exercise.totalweight} kg</p>
                        <p>Rest Time: {exercise.restTime} seconds</p>
                        {exercise.barbell ?
                            <div className="flex justify-center gap-3 bg-black p-3 rounded-full mb-2 ">
                                <p>{(exercise.totalweight - 20) / 2} kg</p>
                                <IoBarbellOutline className="text-green-500 text-2xl" />
                                <p>{(exercise.totalweight - 20) / 2} kg</p>
                            </div>
                            :
                            <div className="flex gap-3 bg-black p-3 rounded-full m-2 justify-center">
                                <IoBarbellOutline className="text-red-500 text-2xl" />
                            </div>
                        }
                        <div className="bg-white text-black p-3 rounded-lg min-h-40 text-balance w-72 overflow-y-auto max-h-60 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-black">
                            <p className="font-bold">Note:</p>
                            {notes.map((note, index) => (
                                <div className="flex flex-col justify-between items-center py-1 gap-2 w-full border-b-2 border-black" key={index}>
                                    <textarea
                                        className="italic break-words w-full p-1 resize-none
                                        [&::-webkit-scrollbar]:w-2
                                        [&::-webkit-scrollbar-track]:rounded-full
                                        [&::-webkit-scrollbar-track]:bg-gray-100
                                        [&::-webkit-scrollbar-thumb]:rounded-full
                                        [&::-webkit-scrollbar-thumb]:bg-black
                                        [&::-webkit-scrollbar-thumb:hover]:cursor-auto
                                        "
                                        value={note}
                                        onChange={(e) => {
                                            const updatedNotes = [...notes];
                                            updatedNotes[index] = e.target.value;
                                            setNotes(updatedNotes);
                                        }}
                                    />
                                    <BsXSquareFill className="text-red-500 w-full font-extrabold text-lg cursor-pointer" onClick={() => removeNote(index)} />
                                </div>
                            ))}
                            <textarea
                                className="italic break-words w-full p-1 mt-2 resize-none 
                                [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-gray-100
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-black
                                [&::-webkit-scrollbar-thumb:hover]:cursor-auto

                                "
                                placeholder="Scrivi una nuova nota..."
                                value={newNote}
                                onChange={(e) => setNewNote(e.target.value)}
                            />

                        </div>
                        <button onClick={addNote} className="mt-2 bg-blue-500 text-white p-2 rounded">
                            + Aggiungi Nota
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
