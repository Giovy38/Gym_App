import { FaCheckSquare } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AddBlueButton from "../reusable_components/AddBlueButton";
import { useState } from "react";
import { SingleExerciseType } from "../../type/SingleExercise.type";
import { TrainingData } from "@/src/type/TrainingData.type";
import { trainingCardService } from "@/src/services/training-card.services";


export default function NoteArea({ exercise, latestTraining, index }: { exercise: SingleExerciseType, latestTraining: TrainingData, index: number }) {

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [notes, setNotes] = useState<string[]>(exercise.note);
    const [newNote, setNewNote] = useState<string>("");


    const addNote = async () => {
        if (newNote.trim()) {
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            setNewNote("");


            try {
                const result = await trainingCardService.addNewNote(latestTraining.id, index, newNote)
                if (!result) {
                    console.error('Errore durante l\'aggiunta della nota al database');
                }
            } catch (error) {
                console.error('Errore durante l\'aggiunta della nota:', error);
            }
        }
    };

    const removeNote = async (noteIndex: number) => {
        try {
            const result = await trainingCardService.deleteNote(latestTraining.id, index, noteIndex)
            if (!result) {
                console.error('Errore durante la cancellazione della nota nel database');
            } else {
                setNotes(notes.filter((_, i) => i !== noteIndex));
            }
        } catch (error) {
            console.error('Errore durante la cancellazione della nota:', error);
        }
    };

    const saveNote = async (noteIndex: number) => {
        try {
            const result = await trainingCardService.editNote(latestTraining.id, index, notes[noteIndex], noteIndex);
            if (!result) {
                console.error('Errore durante la modifica della nota nel database');
            } else {
                setEditIndex(null);
            }
        } catch (error) {
            console.error('Errore durante la modifica della nota:', error);
        }
    };

    return (
        <div>
            <div className="bg-white text-black p-3 rounded-lg min-h-40 text-balance w-72 overflow-y-auto max-h-60 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-gray-100
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-black">
                <p className="font-bold">Note:</p>
                {notes.map((note, index) => (
                    <div className="flex flex-col justify-between items-center py-1 gap-2 w-full border-b-2 border-black" key={index}>
                        {editIndex === index ? (
                            <>
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
                                <div className="flex gap-2">
                                    <FaCheckSquare className="text-green-500 w-full font-extrabold text-lg cursor-pointer" onClick={() => saveNote(index)} />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="italic break-words w-full p-1">{note}</p>
                                <div className="flex gap-2">
                                    <MdEditSquare className="text-blue-500 cursor-pointer w-full text-lg font-extrabold" onClick={() => setEditIndex(index)} />
                                    <RiDeleteBin5Fill className="text-red-500 w-full font-extrabold text-lg cursor-pointer" onClick={() => removeNote(index)} />
                                </div>
                            </>
                        )}
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
            <AddBlueButton text="+ Aggiungi Nota" onClick={addNote} />
        </div>
    )
}