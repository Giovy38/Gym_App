import { PersonalTrainerData } from "../type/PersonalTrainer.type";
import { WorkoutTemplate, WorkoutDay } from "../type/WorkoutTemplate.type";
import { TrainingCard, TrainingCardData } from "../type/TrainingCard.type";
import FetchFunction from "./FetchFunction";
import { UserData } from "../type/UserData.type";
import { adminService } from "./admin.services";

type Client = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
}

interface ServerExercise {
    name: string;
    sets: number;
    repetitions: number;
    restTimeSeconds: number;
    notes: string[];
    exerciseType: string;
    barbellWeightKg: number | null;
    durationSeconds: number | null;
    distanceKm: number | null;
}

interface ServerWorkoutDay {
    workoutName: string;
    exercises: ServerExercise[];
}

interface ServerTemplate {
    id: number;
    name: string;
    type: string;
    trainerId: number;
    workoutDays: ServerWorkoutDay[];
}

interface ServerResponse {
    template: ServerTemplate;
}

class PTService {
    private PT_BE_URL = `${process.env.NEXT_PUBLIC_PT_BE_URL}`;
    private PT_AUTH_URL = `${process.env.NEXT_PUBLIC_PT_AUTH_BE_URL}`;

    async getPTInfo(): Promise<PersonalTrainerData | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/about-me`, 'GET', {});
            if (!res.ok) {
                return null;
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante il recupero dei dati del PT:', error);
            return null;
        }
    }

    async createNewPT(ptData: PersonalTrainerData): Promise<{ createdPT: PersonalTrainerData } | null> {
        try {
            // Prima otteniamo tutti gli admin
            const admins = await adminService.getAllAdmins();

            if (admins.length === 0) {
                console.error('Nessun admin trovato nel sistema');
                return null;
            }

            // Prendiamo l'ID del primo admin
            const adminId = admins[0].id;

            const data = {
                firstName: ptData.firstName,
                lastName: ptData.lastName,
                email: ptData.email,
                password: ptData.password,
                gender: ptData.gender,
                isEnabled: false, // Il PT viene creato disabilitato di default
                adminId: adminId // Aggiungiamo l'ID dell'admin
            }

            const res = await FetchFunction(this.PT_BE_URL, 'POST', data);
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante la creazione del PT');
            }

            const createdPT: PersonalTrainerData = await res.value.json();
            return { createdPT };
        } catch (error) {
            console.error('Errore durante la creazione del PT:', error);
            return null;
        }
    }

    async editPTPassword(id: number, currentPassword: string, newPassword: string): Promise<PersonalTrainerData | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${id}/password`, 'PATCH', { currentPassword, newPassword });
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante la modifica della password');
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la modifica della password:', error);
            return null;
        }
    }

    async addClient(ptId: number, clientId: number): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/clients`, 'POST', { clientId });
            if (!res.ok) {
                if (res.error.status === 404) {
                    console.warn('Cliente non trovato');
                    return null;
                }
                if (res.error.status === 409) {
                    console.warn('Cliente già presente');
                    return null;
                }
                console.warn('Errore generico durante l\'aggiunta del cliente');
                return null;
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante l\'aggiunta del cliente:', error);
            return null;
        }
    }

    async createWorkoutTemplate(
        ptId: number,
        templateName: string,
        templateType: string,
        workoutDays: WorkoutDay[]
    ): Promise<WorkoutTemplate | null> {
        try {
            const requestData = {
                templateName: templateName.trim(),
                type: templateType.trim(),
                creationDate: new Date().toISOString(),
                trainerId: ptId,
                workoutDays: workoutDays.map(day => ({
                    workoutName: day.dayName?.trim() || 'Giorno di allenamento',
                    exercises: day.exercises.map(ex => ({
                        name: ex.name.trim(),
                        sets: ex.sets ? Math.max(1, Number(ex.sets)) : null,
                        repetitions: ex.reps ? Math.max(1, Number(ex.reps)) : null,
                        restTimeSeconds: ex.rest ? Math.max(0, Number(ex.rest)) : null,
                        notes: ex.notes ? [ex.notes.trim()] : [],
                        exerciseType: ex.exerciseType || 'withWeight',
                        barbellWeightKg: ex.exerciseType === 'withBarbell' && ex.barbellWeightKg ?
                            Number(ex.barbellWeightKg) : null,
                        durationSeconds: ['cardio', 'stretching'].includes(ex.exerciseType || '') && ex.durationSeconds ?
                            Math.max(0, Number(ex.durationSeconds)) : null,
                        distanceKm: ['cardio', 'stretching'].includes(ex.exerciseType || '') && ex.distanceKm ?
                            Math.max(0, Number(ex.distanceKm)) : null
                    }))
                }))
            };

            console.log('Dati template da inviare:', JSON.stringify(requestData, null, 2));

            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/templates`, 'POST', requestData);

            if (!res.ok) {
                const errorData = await res.error.json().catch(() => ({ message: 'Errore sconosciuto' }));
                console.error('Errore dettagliato dal server:', errorData);
                throw new Error(errorData?.message || 'Errore durante la creazione del template');
            }

            const data = await res.value.json();
            if (!data) {
                throw new Error('Dati template non validi');
            }

            console.log('Template creato con successo:', data);
            return data;
        } catch (error) {
            console.error('Errore dettagliato durante la creazione del template:', error);
            throw error;
        }
    }

    async deleteClient(ptId: number, clientId: number): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/clients/${clientId}`, 'DELETE', {});
            if (!res.ok) throw new Error('Errore durante la rimozione del cliente');
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la rimozione del cliente:', error);
            return null;
        }
    }

    async deletePT(id: number): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) throw new Error('Errore durante l\'eliminazione del PT');
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante l\'eliminazione del PT:', error);
            return null;
        }
    }

    async deleteTemplate(ptId: number, templateId: number): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/templates/${templateId}`, 'DELETE', {});
            if (!res.ok) throw new Error('Errore durante l\'eliminazione del template');
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante l\'eliminazione del template:', error);
            return null;
        }
    }

    async getAllClients(ptId: number): Promise<Client[]> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/clients`, 'GET', {});
            if (!res.ok) {
                if (res.error.status === 403) {
                    console.warn('PT non abilitato');
                    return [];
                }
                console.warn('Errore durante il recupero dei clienti:', res.error);
                return [];
            }
            const data = await res.value.json();
            return data.clients || [];
        } catch (error) {
            console.warn('Errore durante il recupero dei clienti:', error);
            return [];
        }
    }

    async getAllTemplates(ptId: number): Promise<WorkoutTemplate[]> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/templates`, 'GET', {});
            if (!res.ok) {
                if (res.error.status === 403) {
                    console.warn('PT non abilitato');
                    return [];
                }
                console.warn('Errore durante il recupero dei template:', res.error);
                return [];
            }
            const data = await res.value.json();
            return data.templates || [];
        } catch (error) {
            console.warn('Errore durante il recupero dei template:', error);
            return [];
        }
    }

    async getSingleTemplate(ptId: number, templateId: number): Promise<WorkoutTemplate | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/templates/${templateId}`, 'GET', {});
            if (!res.ok) {
                console.error('Errore durante il recupero del template:', res.error);
                return null;
            }
            const data = await res.value.json() as ServerResponse;
            console.log('Risposta grezza dal server:', data);

            if (!data || !data.template) {
                console.error('Dati template non validi:', data);
                return null;
            }

            const template: WorkoutTemplate = {
                id: data.template.id,
                name: data.template.name,
                type: data.template.type,
                trainerId: data.template.trainerId,
                workoutDays: data.template.workoutDays.map(day => ({
                    dayName: day.workoutName,
                    exercises: day.exercises.map(ex => ({
                        name: ex.name,
                        sets: ex.sets || 1,
                        reps: ex.repetitions || 1,
                        rest: ex.restTimeSeconds || 0,
                        notes: ex.notes?.join(', ') || '',
                        exerciseType: (ex.exerciseType === 'cardio' || ex.exerciseType === 'stretching' ||
                            ex.exerciseType === 'withBarbell' || ex.exerciseType === 'withWeight')
                            ? ex.exerciseType as 'cardio' | 'stretching' | 'withBarbell' | 'withWeight'
                            : 'withWeight',
                        barbellWeightKg: ex.barbellWeightKg || undefined,
                        durationSeconds: ex.durationSeconds || undefined,
                        distanceKm: ex.distanceKm || undefined
                    }))
                }))
            };

            return template;
        } catch (error) {
            console.error('Errore durante il recupero del template:', error);
            return null;
        }
    }

    async createTrainingCard(ptId: number, trainingData: TrainingCardData): Promise<TrainingCard | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/training-cards`, 'POST', trainingData);
            if (!res.ok) {
                console.error('Risposta del server:', res.error);
                const errorData = await res.error.json();
                throw new Error(`Errore durante la creazione della scheda di allenamento: ${errorData?.message || 'Errore sconosciuto'}`);
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore dettagliato durante la creazione della scheda:', error);
            throw error;
        }
    }

    async ptLogin(email: string, password: string): Promise<PersonalTrainerData | null> {
        console.log('URL di login:', `${this.PT_AUTH_URL}/login`);
        try {
            const res = await FetchFunction(`${this.PT_AUTH_URL}/login`, 'POST', { email, password });
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante il login del PT');
            }
            const data = await res.value.json();
            localStorage.setItem('userType', 'pt');
            window.location.reload();
            return data;
        } catch (error) {
            console.error('Errore durante il login del PT:', error);
            return null;
        }
    }

    async ptSignin(ptData: PersonalTrainerData): Promise<PersonalTrainerData | null> {
        try {
            const res = await FetchFunction(`${this.PT_AUTH_URL}/signin`, 'POST', ptData);
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante la registrazione del PT');
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la registrazione del PT:', error);
            return null;
        }
    }

    async ptLogout(): Promise<{ success: boolean; message: string } | null> {
        try {
            localStorage.removeItem('userType');
            const res = await FetchFunction(`${this.PT_BE_URL}/logout`, 'POST', {});
            if (!res.ok) throw new Error('Errore durante il logout del PT');
            setTimeout(() => window.location.reload(), 2000);
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante il logout del PT:', error);
            return null;
        }
    }
}

export const ptService = new PTService();
