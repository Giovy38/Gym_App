'use client';

import { createContext, useContext } from 'react';

interface AdminData {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
}

const AdminContext = createContext<AdminData | null>(null);

export function AdminProvider({ children, adminData }: { children: React.ReactNode, adminData: AdminData }) {
    return (
        <AdminContext.Provider value={adminData}>
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext); 