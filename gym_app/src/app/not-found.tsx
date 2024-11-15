import Link from 'next/link';
import React from 'react';
import { GiGymBag } from "react-icons/gi";


export default function NotFound() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center min-h-screen bg-[#0b0b0b]">
            <h1 className="text-4xl font-bold text-[#f8bf58] capitalize">Looks like this page skipped leg day!</h1>
            <p className='text-xl text-white'>Error 404 - Page not found</p>
            <Link href='/'>
                <div className='flex items-center gap-3 text-white'>
                    <GiGymBag className='text-4xl cursor-grab' />
                    <p> {`Grab your bag and go back HOME, and don't skip the lag day`} </p>
                </div>
            </Link>
        </div>
    );
}
