import Link from 'next/link';
import React from 'react';
import { GiGymBag } from "react-icons/gi";


export default function NotFound() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-bg-second">
            <p className='text-xl text-text-primary'>Error 404 - Pagina non trovata</p>
            <div className='p-3'>
                <h1 className="text-4xl font-bold text-primary-color text-center">Sembra che questa pagina abbia saltato il Leg Day!</h1>
            </div>
            <Link href='/'>
                <div className='flex items-center gap-3 text-text-primary p-3'>
                    <GiGymBag className='text-4xl cursor-grab' />
                    <p className='underline underline-offset-2'> {`Prendi il tuo zaino e torna alla schermata iniziale, corri ad allenarti!`} </p>
                </div>
            </Link>
        </div>
    );
}
