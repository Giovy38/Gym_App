import { AdminProvider } from '@/src/context/AdminProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function ProtectedAdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('connect.sid');

    if (!sessionCookie) {
        redirect('/admin/login');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_BE_URL}/about-me`, {
            headers: {
                Cookie: `connect.sid=${sessionCookie.value}`,
            },
        });

        if (!response.ok) {
            redirect('/admin/login');
        }

        const adminData = await response.json();

        return (
            <AdminProvider adminData={adminData}>
                {children}
            </AdminProvider>
        );

    } catch (error) {
        console.error('Errore durante la verifica della sessione:', error);
        redirect('/admin/login');
    }
} 