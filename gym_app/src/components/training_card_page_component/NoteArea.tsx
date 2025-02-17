import { FaCheckSquare } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AddBlueButton from "../reusable_components/AddBlueButton";
import { useState } from "react";
import { SingleExerciseType } from "../../type/SingleExercise.type";
import { TrainingData } from "@/src/type/TrainingData.type";
import { trainingCardService } from "@/src/services/training-card.services";


export default function NoteArea({ exercise, latestTraining }: { exercise: SingleExerciseType, latestTraining: TrainingData }) {

    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [notes, setNotes] = useState<string[]>(exercise.notes);
    const [newNote, setNewNote] = useState<string>("");


    const addNote = async () => {
        if (newNote.trim()) {
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            setNewNote("");


            try {
                const result = await trainingCardService.addNewNote(latestTraining.id, exercise.exerciseId, newNote)
                if (!result) {
                    console.error('Error during note addition');
                }
            } catch (error) {
                console.error('Error during note addition', error);
            }
        }
    };

    const removeNote = async (noteIndex: number) => {
        try {
            const result = await trainingCardService.deleteNote(latestTraining.id, exercise.exerciseId, noteIndex)
            if (!result) {
                console.error('Error during note deletion');
            } else {
                setNotes(notes.filter((_, i) => i !== noteIndex));
            }
        } catch (error) {
            console.error('Error during note deletion', error);
        }
    };

    const saveNote = async (noteIndex: number) => {
        try {
            const result = await trainingCardService.editNote(latestTraining.id, exercise.exerciseId, notes[noteIndex], noteIndex);
            if (!result) {
                console.error('Error during note editing');
            } else {
                setEditIndex(null);
            }
        } catch (error) {
            console.error('Error during note editing', error);
        }
    };

    return (
        <div>
            <div className="bg-bg-secondary text-text-secondary p-3 rounded-lg min-h-40 text-balance w-72 overflow-y-auto max-h-60 
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:rounded-full
                        [&::-webkit-scrollbar-track]:bg-slider-color
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:bg-bg-primary">
                <p className="font-bold">Note:</p>
                {notes.map((note, index) => (
                    <div className="flex flex-col justify-between items-center py-1 gap-2 w-full border-b-2 border-border-secondary" key={index}>
                        {editIndex === index ? (
                            <>
                                <textarea
                                    className="italic break-words w-full p-1 resize-none
                                                [&::-webkit-scrollbar]:w-2
                                                [&::-webkit-scrollbar-track]:rounded-full
                                                [&::-webkit-scrollbar-track]:bg-slider-color
                                                [&::-webkit-scrollbar-thumb]:rounded-full
                                                [&::-webkit-scrollbar-thumb]:bg-bg-primary
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
                                    <FaCheckSquare className="text-btn-plus hover:text-btn-plus-hover w-full font-extrabold text-lg cursor-pointer" onClick={() => saveNote(index)} />
                                </div>
                            </>
                        ) : (
                            <>
                                <p className="italic break-words w-full p-1">{note}</p>
                                <div className="flex gap-2">
                                    <MdEditSquare className="text-btn-edit hover:text-btn-edit-hover cursor-pointer w-full text-lg font-extrabold" onClick={() => setEditIndex(index)} />
                                    <RiDeleteBin5Fill className="text-btn-delete hover:text-btn-delete-hover w-full font-extrabold text-lg cursor-pointer" onClick={() => removeNote(index)} />
                                </div>
                            </>
                        )}
                    </div>
                ))}
                <textarea
                    className="italic break-words w-full p-1 mt-2 resize-none 
                                [&::-webkit-scrollbar]:w-2
                                [&::-webkit-scrollbar-track]:rounded-full
                                [&::-webkit-scrollbar-track]:bg-slider-color
                                [&::-webkit-scrollbar-thumb]:rounded-full
                                [&::-webkit-scrollbar-thumb]:bg-bg-primary
                                [&::-webkit-scrollbar-thumb:hover]:cursor-auto

                                "
                    placeholder="Scrivi una nuova nota..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                />

            </div>
            <AddBlueButton text="+ New Note" onClick={addNote} />
        </div>
    )
}