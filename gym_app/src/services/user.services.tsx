import { UserData } from "../type/UserData.type";
import FetchFunction from "./FetchFunction";

class UserService {

    // backend url 
    private USER_BE_URL = 'http://localhost:3001/user';
    private LOGIN_BE_URL = 'http://localhost:3001/auth/login';
    private LOGOUT_BE_URL = 'http://localhost:3001/auth/logout';

    async createNewUser(userData: UserData): Promise<{ createdUser: UserData } | null> {

        const data = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email.toLowerCase(),
            password: userData.password,
            gender: userData.gender
        }
        try {
            const res = await FetchFunction(this.USER_BE_URL, 'POST', data);

            if (!res.ok) {
                if (res.error.status === 400) {
                    return null;
                }
                throw new Error('Error during the user creation');
            }

            const createdUser: UserData = await res.value.json();
            return { createdUser };
        } catch (error) {
            console.error('Error during the user creation:', error);
            return null;
        }
    }

    async getUsers(): Promise<UserData[]> {
        try {
            const res = await FetchFunction(this.USER_BE_URL, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the user fetching');
            }
            const data: UserData[] = await res.value.json();

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the user fetching:', error);
            return [];
        }
    }

    async getUserInfo(): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/about-me`, 'GET', {});

            console.log('cookies presenti', document.cookie);

            if (!res.ok) {
                console.log('dettagli errore: ', {
                    status: res.error.status,
                    statusText: res.error.statusText,
                    headers: [...res.error.headers.entries()]
                });

                try {
                    const errorBody = await res.error.json();
                    console.log('dettagli errore: ', errorBody);
                } catch (error) {
                    console.error('Errore durante il parsing del corpo dell\'errore:', error);
                }

                return null;
            }

            const data = await res.value.json();
            return data;
        } catch (error) {
            console.error('Error during the user info fetching:', error);
            return null;
        }
    }

    async getUserById(id: number): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'GET', {});
            if (res.ok) {
                const data: UserData = await res.value.json();
                return data;
            }

            if (res.error.status === 404) {
                return null;
            }

            if (res.error.status === 500) {
                return null;
            }

            throw new Error('Error during the user fetching');

        } catch (error) {
            console.error('Error during the user fetching:', error);
            return null;
        }
    }

    async deleteUser(id: number): Promise<UserData[] | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during the user deletion');
            }
            const data: UserData[] = await res.value.json();

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the user deletion:', error);
            return null;
        }
    }

    async editUserPassword(id: number, currentPassword: string, newPassword: string): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'PATCH', { currentPassword, newPassword });
            if (res.ok) {
                const data: UserData = await res.value.json();
                return data;
            }

            if (res.error.status === 400) {
                return null;
            }

            throw new Error('Error during the user password editing');

        } catch (error) {
            console.error('Error during the user password editing:', error);
            return null;
        }
    }

    async userLogin(email: string, password: string): Promise<{ message: string, userId?: number } | null> {
        try {
            const res = await FetchFunction(`${this.LOGIN_BE_URL}`, 'POST', { email, password });
            if (res.ok) {
                console.log('login ok ', res);
                const data: { message: string, userId: number } = await res.value.json();
                window.location.reload();
                return data;
            }

            if (res.error.status === 401) {
                return null;
            }

            if (res.error.status === 404) {
                return null;
            }

            throw new Error('Error during the user login');
        } catch (error) {
            console.error('Error during the user login:', error);
            return null;
        }
    }

    async userLogout(): Promise<{ message: string } | null> {
        try {
            const res = await FetchFunction(`${this.LOGOUT_BE_URL}`, 'POST', {});
            if (res.ok) {
                const data: { message: string } = await res.value.json();
                setTimeout(() => window.location.reload(), 2000);
                return data;
            }

            throw new Error('Error during the user logout');
        } catch (error) {
            console.error('Error during the user logout:', error);
            return null;
        }
    }



}

export const userService = new UserService();