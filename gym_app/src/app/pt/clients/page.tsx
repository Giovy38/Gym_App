'use client'

import { useEffect, useState, useCallback } from "react";
import ClientCard from "@/src/components/clients_page_component/ClientCard";
import AddClientButton from "@/src/components/clients_page_component/AddClientButton";
import SearchBar from "@/src/components/reusable_components/SearchBar";
import { usePT } from "@/src/context/PtProvider";
import { ptService } from "@/src/services/pt.services";

type Client = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
}

export default function ClientsPage() {
    const pt = usePT();
    const [clients, setClients] = useState<Client[]>([]);
    const [filteredClients, setFilteredClients] = useState<Client[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const fetchClients = useCallback(async () => {
        setIsLoading(true);
        if (pt?.id) {
            const clientsList = await ptService.getAllClients(pt.id);
            setClients(clientsList);
            setFilteredClients(clientsList);
        }
        setIsLoading(false);
    }, [pt?.id]);

    useEffect(() => {
        fetchClients();
    }, [fetchClients]);

    useEffect(() => {
        const filtered = clients.filter(client => {
            const fullName = `${client.firstName} ${client.lastName}`.toLowerCase();
            return fullName.includes(searchQuery.toLowerCase());
        });
        setFilteredClients(filtered);
    }, [searchQuery, clients]);

    const handleClientAdded = () => {
        fetchClients();
    };

    if (isLoading) {
        return <div className="p-5 text-text-primary">Caricamento clienti...</div>;
    }

    if (!pt?.isEnabled) {
        return (
            <div className="p-5 text-center">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <p>Il tuo account non è abilitato.</p>
                    <p>Contatta <span className="font-bold">l&apos;amministratore</span>  per maggiori informazioni.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-5 flex flex-col items-center">
            <div className="flex w-full items-center justify-center gap-5">
                <div className="w-full max-w-2xl mb-5">
                    <SearchBar
                        placeholder="Cerca cliente per nome o cognome..."
                        value={searchQuery}
                        onChange={setSearchQuery}
                    />
                </div>
                <div className="mb-5">
                    <AddClientButton ptId={pt?.id} onClientAdded={handleClientAdded} />
                </div>
            </div>
            {filteredClients.length === 0 ? (
                <div className="text-center p-4 bg-bg-data rounded-lg">
                    <p className="text-text-primary">
                        {searchQuery
                            ? "Nessun cliente trovato per questa ricerca."
                            : "Non hai ancora nessun cliente."}
                    </p>
                    {!searchQuery && (
                        <p className="text-text-primary">Usa il pulsante sopra per aggiungere il tuo primo cliente!</p>
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-5">
                    {filteredClients.map((client) => (
                        <ClientCard
                            key={client.id}
                            id={client.id}
                            name={`${client.firstName} ${client.lastName}`}
                            email={client.email}
                            ptId={pt?.id || 0}
                            onClientDeleted={fetchClients}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}
