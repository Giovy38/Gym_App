
import { UserData } from "../type/UserData.type";
import FetchFunction from "./FetchFunction";

class UserService {

    // backend url 
    private USER_BE_URL = 'http://localhost:3001/user';

    async createNewUser(userData: UserData): Promise<{ createdUser: UserData } | null> {

        const data = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            confirmPassword: userData.confirmPassword,
            gender: userData.gender
        }
        try {
            const res = await FetchFunction(this.USER_BE_URL, 'POST', data);

            if (!res.ok) {
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

    async getUserById(id: number): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the user fetching');
            }
            const data: UserData = await res.value.json();

            return data;
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

    async editUserPassword(id: number, newPassword: string): Promise<UserData | null> {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'PATCH', { password: newPassword });
            if (!res.ok) {
                throw new Error('Error during the user password editing');
            }
            const data: UserData = await res.value.json();

            return data;
        } catch (error) {
            console.error('Error during the user password editing:', error);
            return null;
        }
    }

}

export const userService = new UserService();