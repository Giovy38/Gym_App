'use client'

import { useState, useCallback, useEffect } from "react";
import { usePT } from "@/src/context/PtProvider";
import { ptService } from "@/src/services/pt.services";
import { WorkoutTemplate } from "@/src/type/WorkoutTemplate.type";
import SearchBar from "@/src/components/reusable_components/SearchBar";
import PlusButton from "@/src/components/reusable_components/PlusButton";
import TemplateCard from "@/src/components/templates_page_components/TemplateCard";
import NewTemplateForm from "@/src/components/templates_page_components/NewTemplateForm";

export default function TrainingSheetsPage() {
    const pt = usePT();
    const [templates, setTemplates] = useState<WorkoutTemplate[]>([]);
    const [filteredTemplates, setFilteredTemplates] = useState<WorkoutTemplate[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [showNewTemplateForm, setShowNewTemplateForm] = useState(false);

    const fetchTemplates = useCallback(async () => {
        setIsLoading(true);
        console.log("PT ID:", pt?.id);
        if (pt?.id) {
            const templatesList = await ptService.getAllTemplates(pt.id);
            console.log("Templates ricevuti:", templatesList);
            setTemplates(templatesList);
            setFilteredTemplates(templatesList);
        }
        setIsLoading(false);
    }, [pt?.id]);

    useEffect(() => {
        fetchTemplates();
    }, [fetchTemplates]);

    useEffect(() => {
        const filtered = templates.filter(template => {
            return template.name?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false;
        });
        setFilteredTemplates(filtered);
    }, [searchQuery, templates]);

    const handleTemplateAdded = () => {
        fetchTemplates();
        setShowNewTemplateForm(false);
    };

    if (isLoading) {
        return <div className="p-5 text-text-primary">Caricamento template...</div>;
    }

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="flex flex-col w-full items-center justify-center gap-5">
                <div className="w-full max-w-2xl mb-5">
                    <SearchBar
                        placeholder="Cerca template per nome..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
                <div className="mb-5">
                    <PlusButton text="nuovo template" onClick={() => setShowNewTemplateForm(true)} />
                </div>
            </div>
            {filteredTemplates.length === 0 ? (
                <div className="text-center p-4 bg-bg-data rounded-lg">
                    <p className="text-text-primary">
                        {searchQuery
                            ? "Nessun template trovato per questa ricerca."
                            : "Non hai ancora nessun template."}
                    </p>
                    {!searchQuery && (
                        <p className="text-text-primary">Usa il pulsante sopra per aggiungere il tuo primo template!</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-5 w-full">
                    {filteredTemplates.map((template) => (
                        <TemplateCard
                            key={template.id}
                            id={template.id}
                            name={template.name}
                            type={template.type}
                            creationDate={new Date().toLocaleDateString()}
                            onClick={() => { }}
                            onDeleted={fetchTemplates}
                        />
                    ))}
                </div>
            )}
            {showNewTemplateForm && (
                <NewTemplateForm
                    onClose={() => setShowNewTemplateForm(false)}
                    onNewTemplate={handleTemplateAdded}
                    ptId={pt?.id || 0}
                />
            )}
        </div>
    );
}
