import FetchFunction from "./FetchFunction";

export interface PT {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    isEnabled: boolean;
    gender: string;
}

interface Admin {
    id: number;
    username: string;
    email: string;
}

interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

interface TogglePTStatusRequest {
    isEnabled: boolean;
}

class AdminService {
    private ADMIN_BE_URL = `${process.env.NEXT_PUBLIC_ADMIN_BE_URL}`;
    private ADMIN_AUTH_URL = `${process.env.NEXT_PUBLIC_ADMIN_AUTH_BE_URL}`;

    isAdminLoggedIn(): boolean {
        return localStorage.getItem('userType') === 'admin';
    }

    private redirectToLogin() {
        window.location.replace('/admin/login');
    }

    async changePassword(data: ChangePasswordRequest): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.ADMIN_BE_URL}/change-password`, 'POST', data);
            if (!res.ok) {
                if (res.error.status === 400) {
                    return { success: false, message: 'Password attuale errata' };
                }
                throw new Error('Errore durante il cambio password');
            }

            // Se la risposta è ok, consideriamo il cambio password come successo
            return { success: true, message: 'Password modificata con successo' };
        } catch (error) {
            console.error('Errore durante il cambio password:', error);
            return { success: false, message: 'Errore durante il cambio password' };
        }
    }

    async togglePTStatus(ptId: number, data: TogglePTStatusRequest): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.ADMIN_BE_URL}/pt/${ptId}/toggle-status`, 'PATCH', data);
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante la modifica dello stato del PT');
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante la modifica dello stato del PT:', error);
            return null;
        }
    }

    async getPTs(): Promise<PT[]> {
        try {
            const res = await FetchFunction(`${this.ADMIN_BE_URL}/pts`, 'GET', {});
            if (!res.ok) {
                if (res.error.status === 400) return [];
                throw new Error('Errore durante il recupero dei PT');
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante il recupero dei PT:', error);
            return [];
        }
    }

    async adminLogin(email: string, password: string): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.ADMIN_AUTH_URL}/login`, 'POST', { email, password });
            if (!res.ok) {
                if (res.error.status === 400) return null;
                throw new Error('Errore durante il login dell\'admin');
            }
            const data = await res.value.json();
            localStorage.setItem('userType', 'admin');
            window.location.href = '/';
            return data;
        } catch (error) {
            console.error('Errore durante il login dell\'admin:', error);
            return null;
        }
    }

    async adminLogout(): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.ADMIN_AUTH_URL}/logout`, 'POST', {});
            if (!res.ok) {
                throw new Error('Errore durante il logout dell\'admin');
            }

            localStorage.removeItem('userType');
            document.cookie = 'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

            return { success: true, message: 'Logout effettuato con successo' };
        } catch (error) {
            console.error('Errore durante il logout dell\'admin:', error);
            return { success: false, message: 'Errore durante il logout' };
        }
    }

    async getAdminInfo(): Promise<{ success: boolean; message: string } | null> {
        try {
            const res = await FetchFunction(`${this.ADMIN_BE_URL}/about-me`, 'GET', {});
            if (!res.ok) {
                return null;
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante il recupero dei dati dell\'admin:', error);
            return null;
        }
    }

    async getAllAdmins(): Promise<Admin[]> {
        try {
            const res = await FetchFunction(`${this.ADMIN_BE_URL}`, 'GET', {});
            if (!res.ok) {
                if (res.error.status === 400) return [];
                throw new Error('Errore durante il recupero degli admin');
            }
            return await res.value.json();
        } catch (error) {
            console.error('Errore durante il recupero degli admin:', error);
            return [];
        }
    }
}

export const adminService = new AdminService();
