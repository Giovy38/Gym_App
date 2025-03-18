// app/user/layout.tsx
import { PTProvider } from '@/src/context/PtProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function PtLayout({
    children
}: {
    children: React.ReactNode
}) {

    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('connect.sid');
    console.log('Cookie di sessione:', sessionCookie);

    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ABOUT_ME_PT_URL}`, {
            headers: {
                Cookie: `connect.sid=${sessionCookie.value}`,
            },
        });
        console.log('Risposta dal server:', response.status);

        if (!response.ok) {
            console.log('Risposta non ok, reindirizzamento al login');
            redirect('/login');
        }

        // Se vuoi i dati dell'utente
        const ptData = await response.json();

        return (
            <PTProvider ptData={ptData}>
                {children}
            </PTProvider>)

    } catch (error) {
        console.log(error)
        redirect('/login');
    }
}