
import { UserData } from "../type/UserData.type";
import FetchFunction from "./FetchFunction";

class UserService {

    // backend url 
    private USER_BE_URL = 'http://localhost:3001/user';

    async CreateNewUser(userData: UserData) {

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

            const createdUser = await res.value.json();
            return { createdUser };
        } catch (error) {
            console.error('Error during the user creation:', error);
            return null;
        }
    }

    async GetAllUsers() {
        try {
            const res = await FetchFunction(this.USER_BE_URL, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the user fetching');
            }
            const data = await res.value.json();

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the user fetching:', error);
            return [];
        }
    }

    async GetUserById(id: number) {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'GET', {});
            if (!res.ok) {
                throw new Error('Error during the user fetching');
            }
            const data = await res.value.json();

            return data;
        } catch (error) {
            console.error('Error during the user fetching:', error);
            return null;
        }
    }

    async DeleteUser(id: number) {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}`, 'DELETE', {});
            if (!res.ok) {
                throw new Error('Error during the user deletion');
            }
            const data = await res.value.json();

            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error during the user deletion:', error);
            return null;
        }
    }

    async EditUserPassword(id: number, newPassword: string) {
        try {
            const res = await FetchFunction(`${this.USER_BE_URL}/${id}/password`, 'PATCH', { newPassword });
            if (!res.ok) {
                throw new Error('Error during the user password editing');
            }
            const data = await res.value.json();

            return data;
        } catch (error) {
            console.error('Error during the user password editing:', error);
            return null;
        }
    }

}

export const userService = new UserService();