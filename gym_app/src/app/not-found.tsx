import Link from 'next/link';
import React from 'react';
import { GiGymBag } from "react-icons/gi";


export default function NotFound() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-bg-second">
            <p className='text-xl text-text-primary'>Error 404 - Page not found</p>
            <h1 className="text-4xl font-bold text-primary-color capitalize">Looks like this page skipped leg day!</h1>
            <Link href='/'>
                <div className='flex items-center gap-3 text-text-primary'>
                    <GiGymBag className='text-4xl cursor-grab' />
                    <p className='underline underline-offset-2'> {`Grab your bag and go back HOME, and don't skip the lag day`} </p>
                </div>
            </Link>
        </div>
    );
}
