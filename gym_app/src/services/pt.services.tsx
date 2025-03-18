import { PersonalTrainerData } from "../type/PersonalTrainer.type";
import { WorkoutTemplate, WorkoutDay } from "../type/WorkoutTemplate.type";
import { TrainingCard, TrainingCardData } from "../type/TrainingCard.type";
import FetchFunction from "./FetchFunction";
import { UserData } from "../type/UserData.type";

type Client = {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    gender: 'male' | 'female';
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
        const data = {
            firstName: ptData.firstName,
            lastName: ptData.lastName,
            email: ptData.email,
            password: ptData.password,
            gender: ptData.gender
        }

        try {
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
        workoutDays: WorkoutDay[]
    ): Promise<WorkoutTemplate | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/templates`, 'POST', { templateName, workoutDays });
            if (!res.ok) throw new Error('Errore durante la creazione del template');
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la creazione del template:', error);
            return null;
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
            if (!res.ok) throw new Error('Errore durante il recupero dei clienti');
            const data = await res.value.json();
            return data.clients || [];
        } catch (error) {
            console.error('Errore durante il recupero dei clienti:', error);
            return [];
        }
    }

    async createTrainingCard(ptId: number, trainingData: TrainingCardData): Promise<TrainingCard | null> {
        try {
            const res = await FetchFunction(`${this.PT_BE_URL}/${ptId}/training-cards`, 'POST', trainingData);
            if (!res.ok) throw new Error('Errore durante la creazione della scheda di allenamento');
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la creazione della scheda di allenamento:', error);
            return null;
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
