"use client"

import { useState } from "react"
import {
    FaDumbbell,
    FaCalendarAlt,
    FaChevronDown,
    FaChevronUp,
} from "react-icons/fa"
import { GiWeightLiftingUp } from "react-icons/gi"
import { WorkoutDay } from "@/src/type/WorkoutTemplate.type";

type WorkoutTemplateProps = {
    name: string
    type: string
    days: WorkoutDay[]
}

export default function WorkoutTemplateCard({
    name = "Full Body Workout",
    type = "Strength",
    days = [],
}: WorkoutTemplateProps) {
    const [expandedDays, setExpandedDays] = useState<Record<number, boolean>>({})

    // Toggle day expansion
    const toggleDay = (dayIndex: number) => {
        setExpandedDays((prev) => ({
            ...prev,
            [dayIndex]: !prev[dayIndex],
        }))
    }


    return (
        <div className="w-full max-w-2xl mx-auto my-4 px-4 rounded-lg bg-bg-primary p-2">
            {/* Card Header */}
            <div className="flex items-center justify-between p-4 rounded-lg bg-bg-modal">
                <div className="flex items-center">
                    <GiWeightLiftingUp className="mr-3 h-8 w-8 text-text-primary" />
                    <div>
                        <h2 className="text-xl font-bold text-text-primary uppercase">{name}</h2>
                        <div className="mt-1 inline-block rounded-full bg-primary-color px-2.5 py-0.5 text-sm uppercase text-text-secondary font-bold">
                            {type}
                        </div>
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-4">
                {days.length === 0 ? (
                    <div className="py-8 text-center text-text-primary">Non ci sono giorni di allenamento in questo template.</div>
                ) : (
                    <div className="space-y-4">
                        {days.map((day, dayIndex) => (
                            <div key={dayIndex} className="rounded-md">
                                {/* Day Header */}
                                <div
                                    className="flex cursor-pointer items-center justify-between bg-bg-modal p-3 rounded-md"
                                    onClick={() => toggleDay(dayIndex)}
                                >
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-2 h-5 w-5 text-text-primary" />
                                        <h3 className="font-medium text-text-primary capitalize">{day.dayName}</h3>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="mr-2 text-sm text-text-primary">{day.exercises.length} esercizi</span>
                                        {expandedDays[dayIndex] ? (
                                            <FaChevronUp className="h-4 w-4 text-text-primary" />
                                        ) : (
                                            <FaChevronDown className="h-4 w-4 text-text-primary" />
                                        )}
                                    </div>
                                </div>

                                {/* Day Content */}
                                {expandedDays[dayIndex] && (
                                    <div className="p-3">
                                        {day.exercises.map((exercise, exerciseIndex) => {

                                            return (
                                                <div key={exerciseIndex} className="mb-2 rounded bg-bg-secondary">
                                                    {/* Exercise Header */}
                                                    <div
                                                        className="flex items-center justify-between p-2"
                                                    >
                                                        <div className="flex items-center">
                                                            <FaDumbbell className="mr-2 h-4 w-4 text-text-secondary" />
                                                            <span className="font-bold capitalize">{exercise.name}</span>
                                                        </div>
                                                        <div className="flex items-center space-x-4">
                                                            {exercise.sets && exercise.reps && (
                                                                <span className="text-md font-bold text-text-secondary">
                                                                    {exercise.sets} × {exercise.reps}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

