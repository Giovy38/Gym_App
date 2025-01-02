'use client'


import LoginForm from '@/src/components/login_page_component/LoginForm'
import backgroundImg from '../../assets/img/gym_background.jpg'
import { useState, useEffect } from 'react';

export default function LoginPage() {

    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <div
            className={`min-h-[82vh] flex justify-center items-center bg-cover bg-left bg-opacity-50 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${backgroundImg.src})` }}
        >
            <div className="bg-black bg-opacity-50 p-5 rounded-lg">
                <LoginForm />
            </div>
        </div>
    )
}

