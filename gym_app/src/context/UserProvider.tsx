// app/user/UserProvider.tsx
'use client';

import { createContext, useContext } from 'react';

// Definisci un tipo per i dati dell'utente
interface UserData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: "male" | "female";
}

const UserContext = createContext<UserData | null>(null);

export function UserProvider({ children, userData }: { children: React.ReactNode, userData: UserData }) {
    return (
        <UserContext.Provider value={userData}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => useContext(UserContext);