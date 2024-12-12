// app/user/layout.tsx
import { UserProvider } from '@/src/context/UserProvider';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function UserLayout({
    children
}: {
    children: React.ReactNode
}) {

    const cookieStore = cookies();
    const sessionCookie = (await cookieStore).get('connect.sid');

    if (!sessionCookie) {
        redirect('/login');
    }

    try {
        const response = await fetch('http://localhost:3001/user/about-me', {
            headers: {
                Cookie: `connect.sid=${sessionCookie.value}`,
            },
        });


        if (!response.ok) {
            redirect('/login');
        }

        // Se vuoi i dati dell'utente
        const userData = await response.json();

        return (
            <UserProvider userData={userData}>
                {children}
            </UserProvider>)

    } catch (error) {
        console.log(error)
        redirect('/login');
    }
}