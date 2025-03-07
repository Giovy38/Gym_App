'use client'

import { useEffect, useState } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { FaUserCircle, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoBody } from "react-icons/io5";
import Link from 'next/link';
import SectionTitle from "./reusable_components/SectionTitle";
import NavbarButton from "./navbar_component/NavbarButton";
import LoadingSpinner from "./reusable_components/LoadingSpinner";
import Logo from '../assets/img/logo.png';
import Image from 'next/image'


export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const activePage = localStorage.getItem('activePage');
        if (activePage) {
            setActivePage(activePage);
        }
    }, [])

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleLinkClick = (page: string) => {
        setIsLoading(true);
        setActivePage(page);
        localStorage.setItem('activePage', page);
        setIsOpen(false);

        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div>
            {isLoading && <LoadingSpinner />}
            {/* Navbar for tablet and larger screens */}
            <div className="hidden md:flex justify-center items-center bg-bg-primary text-text-primary px-5">
                <Link href='/' onClick={() => handleLinkClick('home')}>
                    <div className='w-64 h-50 flex gap-5 items-center justify-center'>
                        <Image src={Logo} alt="logo" width={50} height={50} />
                        <SectionTitle title="super gym" />
                    </div>
                </Link>
                <div className='flex justify-around p-1 w-full'>
                    <Link href='/user/training-card' className="w-full" onClick={() => handleLinkClick('training-card')}>
                        <NavbarButton title="allenamenti" Icon={CgGym} isActive={activePage === 'training-card'} />
                    </Link>
                    <Link href='/user/body-check' className="w-full" onClick={() => handleLinkClick('body-check')}>
                        <NavbarButton title="misurazioni" Icon={IoBody} isActive={activePage === 'body-check'} />
                    </Link>
                    <Link href='/user/diet' className="w-full" onClick={() => handleLinkClick('diet')}>
                        <NavbarButton title="diete" Icon={FaBowlFood} isActive={activePage === 'diet'} />
                    </Link>
                    <Link href='/user/profile' className="w-full" onClick={() => handleLinkClick('profile')}>
                        <NavbarButton title="profilo" Icon={FaUserCircle} isActive={activePage === 'profile'} />
                    </Link>
                </div>
            </div>

            {/* Hamburger menu for mobile screens */}
            <div className="md:hidden bg-bg-primary text-text-primary p-3 z-40">
                <div className="flex justify-between items-center">
                    <Link href='/' onClick={() => handleLinkClick('home')}>
                        <div className='w-50 h-50 flex gap-5 items-center justify-center'>
                            <Image src={Logo} alt="logo" width={50} height={50} />
                            <SectionTitle title="super gym" />
                        </div>
                    </Link>
                    <button onClick={toggleMenu} className="text-text-primary z-50">
                        {isOpen ? <FaTimes size={24} className='z-50 text-text-secondary' /> : <FaBars size={24} />}
                    </button>
                </div>
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-gradient-to-t from-bg-data to-primary-color text-text-secondary p-5 flex flex-col items-center justify-center transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
                >
                    <Link href='/' onClick={() => handleLinkClick('home')} className="w-full mb-4">
                        <div className="border-2 border-border-secondary w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="home" Icon={FaHome} isActive={activePage === 'home'} />
                        </div>
                    </Link>
                    <Link href='/user/training-card' onClick={() => handleLinkClick('training-card')} className="w-full mb-4">
                        <div className="border-2 border-border-secondary w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="training card" Icon={CgGym} isActive={activePage === 'training-card'} />
                        </div>
                    </Link>
                    <Link href='/user/body-check' onClick={() => handleLinkClick('body-check')} className="w-full mb-4">
                        <div className="border-2 border-border-secondary w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="body check" Icon={IoBody} isActive={activePage === 'body-check'} />
                        </div>
                    </Link>
                    <Link href='/user/diet' onClick={() => handleLinkClick('diet')} className="w-full mb-4">
                        <div className="border-2 border-border-secondary w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="diet" Icon={FaBowlFood} isActive={activePage === 'diet'} />
                        </div>
                    </Link>
                    <Link href='/user/profile' onClick={() => handleLinkClick('profile')} className="w-full mb-4">
                        <div className="border-2 border-border-secondary w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="profile" Icon={FaUserCircle} isActive={activePage === 'profile'} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
