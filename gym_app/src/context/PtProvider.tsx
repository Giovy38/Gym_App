'use client';

import { createContext, useContext } from 'react';

interface PTData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    gender: "male" | "female";
}

const PTContext = createContext<PTData | null>(null);

export function PTProvider({ children, ptData }: { children: React.ReactNode, ptData: PTData }) {
    return (
        <PTContext.Provider value={ptData}>
            {children}
        </PTContext.Provider>
    );
}

export const usePT = () => useContext(PTContext);