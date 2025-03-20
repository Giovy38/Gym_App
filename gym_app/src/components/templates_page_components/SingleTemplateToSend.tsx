import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { ptService } from '@/src/services/pt.services';
import { WorkoutTemplate } from '@/src/type/WorkoutTemplate.type';
import Toast from '../reusable_components/Toast';

interface SingleTemplateToSendProps {
    template: WorkoutTemplate;
    ptId: number;
    clientId: number;
    onTemplateSent: () => void;
}

export default function SingleTemplateToSend({ template, ptId, clientId, onTemplateSent }: SingleTemplateToSendProps) {
    const [isSending, setIsSending] = useState(false);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [showErrorToast, setShowErrorToast] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

    const handleSendTemplate = async () => {
        try {
            setIsSending(true);
            const trainingData = {
                clientId: clientId,
                personalTrainerId: ptId,
                date: selectedDate,
                useTemplate: true,
                templateId: template.id,
                workoutDays: template.workoutDays.map(day => ({
                    workoutName: day.dayName || 'Giorno di allenamento',
                    exercises: day.exercises.map(ex => ({
                        name: ex.name,
                        sets: ex.sets,
                        repetitions: ex.reps,
                        restTimeSeconds: ex.rest,
                        notes: ex.notes ? [ex.notes] : [],
                        exerciseType: ex.exerciseType || 'withWeight',
                        barbellWeightKg: ex.barbellWeightKg,
                        durationSeconds: ex.durationSeconds,
                        distanceKm: ex.distanceKm
                    }))
                }))
            };

            const result = await ptService.createTrainingCard(ptId, trainingData);
            if (result) {
                setShowSuccessToast(true);
                setTimeout(() => {
                    setShowSuccessToast(false);
                    onTemplateSent();
                }, 2000);
            }
        } catch (error) {
            console.error('Errore durante l\'invio della scheda:', error);
            setErrorMessage('Errore durante l\'invio della scheda');
            setShowErrorToast(true);
            setTimeout(() => {
                setShowErrorToast(false);
            }, 3000);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <>
            <div className="flex flex-col gap-2 rounded-lg bg-bg-primary p-4 hover:bg-bg-input-hover">
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-primary-color uppercase">{template.name}</h3>
                        <div className='px-1 rounded-full bg-bg-data w-fit min-w-40 flex items-center justify-center'>
                            <p className="text-sm font-bold capitalize p-1 text-text-primary">{template.type}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSendTemplate}
                        disabled={isSending}
                        className="ml-4 flex items-center rounded-full bg-btn-accent p-2 text-text-secondary hover:bg-bg-secondary disabled:opacity-50"
                    >
                        {isSending ? (
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-text-secondary border-t-transparent"></div>
                        ) : (
                            <FaArrowRight className="h-5 w-5" />
                        )}
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <label htmlFor="trainingDate" className="text-sm text-text-primary">Data:</label>
                    <input
                        type="date"
                        id="trainingDate"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="rounded-md bg-bg-modal p-1 text-text-primary border border-border-color focus:outline-none focus:border-primary-color"
                    />
                </div>
            </div>
            {showSuccessToast && (
                <Toast
                    message="Scheda inviata con successo!"
                    color="green"
                />
            )}
            {showErrorToast && (
                <Toast
                    message={errorMessage}
                    color="red"
                />
            )}
        </>
    );
}
