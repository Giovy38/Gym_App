import { useEffect, useState } from 'react';
import { ptService } from '@/src/services/pt.services';
import { WorkoutTemplate } from '@/src/type/WorkoutTemplate.type';
import SingleTemplateToSend from './SingleTemplateToSend';
import { IoMdCloseCircle } from "react-icons/io";


interface TemplateListToSendProps {
    onClose: () => void;
    ptId: number;
    clientId: number;
}

export default function TemplateListToSend({ onClose, ptId, clientId }: TemplateListToSendProps) {
    const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const fetchedTemplates = await ptService.getAllTemplates(ptId);
                setTemplates(fetchedTemplates);
            } catch (error) {
                console.error('Errore durante il recupero dei template:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, [ptId]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-bg-primary bg-opacity-50" onClick={onClose}>
            <div className="w-full max-w-2xl rounded-lg bg-bg-modal p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-text-primary">Seleziona un Template</h2>
                    <IoMdCloseCircle
                        onClick={onClose}
                        className="text-btn-exit text-2xl cursor-pointer hover:text-btn-exit-hover"
                    />
                </div>

                {loading ? (
                    <div className="flex justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-btn-accent border-t-transparent"></div>
                    </div>
                ) : templates.length === 0 ? (
                    <div className="text-center text-text-primary py-4">
                        Nessuna scheda disponibile
                    </div>
                ) : (
                    <div className="space-y-2">
                        {templates.map((template) => (
                            <SingleTemplateToSend
                                key={template.id}
                                template={template}
                                ptId={ptId}
                                clientId={clientId}
                                onTemplateSent={onClose}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
