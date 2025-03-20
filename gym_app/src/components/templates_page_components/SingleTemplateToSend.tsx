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

    const handleSendTemplate = async () => {
        try {
            setIsSending(true);
            const trainingData = {
                clientId: clientId,
                personalTrainerId: ptId,
                date: new Date().toISOString(),
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
            console.error('Errore durante l\'invio del template:', error);
            setErrorMessage('Errore durante l\'invio del template');
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
            <div className="flex items-center justify-between rounded-lg bg-bg-primary p-4 hover:bg-bg-input-hover">
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
            {showSuccessToast && (
                <Toast
                    message="Template inviato con successo!"
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
