'use client'

import { useEffect, useState } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { FaUserCircle, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoBody } from "react-icons/io5";
import Link from 'next/link';
import SectionTitle from "./reusable_components/SectionTitle";
import NavbarButton from "./navbar_component/NavbarButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activePage, setActivePage] = useState('');

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
        setActivePage(page);
        localStorage.setItem('activePage', page);
        setIsOpen(false);
    };

    return (
        <div>
            {/* Navbar for tablet and larger screens */}
            <div className="hidden md:block bg-black text-white">
                <div className='overflow-hidden text-center p-3'>
                    <Link href='/' onClick={() => handleLinkClick('home')}>
                        <SectionTitle title="super gym" />
                    </Link>
                </div>
                <div className='flex justify-around p-1'>
                    <Link href='/' className="w-full" onClick={() => handleLinkClick('home')}>
                        <NavbarButton title="home" Icon={FaHome} isActive={activePage === 'home'} />
                    </Link>
                    <Link href='/training-card' className="w-full" onClick={() => handleLinkClick('training-card')}>
                        <NavbarButton title="training card" Icon={CgGym} isActive={activePage === 'training-card'} />
                    </Link>
                    <Link href='/body-check' className="w-full" onClick={() => handleLinkClick('body-check')}>
                        <NavbarButton title="body check" Icon={IoBody} isActive={activePage === 'body-check'} />
                    </Link>
                    <Link href='/diet' className="w-full" onClick={() => handleLinkClick('diet')}>
                        <NavbarButton title="diet" Icon={FaBowlFood} isActive={activePage === 'diet'} />
                    </Link>
                    <Link href='/profile' className="w-full" onClick={() => handleLinkClick('profile')}>
                        <NavbarButton title="profile" Icon={FaUserCircle} isActive={activePage === 'profile'} />
                    </Link>
                </div>
            </div>

            {/* Hamburger menu for mobile screens */}
            <div className="md:hidden bg-black text-white p-3 z-40">
                <div className="flex justify-between items-center">
                    <Link href='/' onClick={() => handleLinkClick('home')}>
                        <SectionTitle title="super gym" />
                    </Link>
                    <button onClick={toggleMenu} className="text-white z-50">
                        {isOpen ? <FaTimes size={24} className='z-50 text-black' /> : <FaBars size={24} />}
                    </button>
                </div>
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-[#f8c058] text-black p-5 flex flex-col items-center justify-center transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} z-40`}
                >
                    <Link href='/' onClick={() => handleLinkClick('home')} className="w-full mb-4">
                        <div className="bg-[#d79418] w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="home" Icon={FaHome} isActive={activePage === 'home'} />
                        </div>
                    </Link>
                    <Link href='/training-card' onClick={() => handleLinkClick('training-card')} className="w-full mb-4">
                        <div className="bg-[#d79418] w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="training card" Icon={CgGym} isActive={activePage === 'training-card'} />
                        </div>
                    </Link>
                    <Link href='/body-check' onClick={() => handleLinkClick('body-check')} className="w-full mb-4">
                        <div className="bg-[#d79418] w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="body check" Icon={IoBody} isActive={activePage === 'body-check'} />
                        </div>
                    </Link>
                    <Link href='/diet' onClick={() => handleLinkClick('diet')} className="w-full mb-4">
                        <div className="bg-[#d79418] w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="diet" Icon={FaBowlFood} isActive={activePage === 'diet'} />
                        </div>
                    </Link>
                    <Link href='/profile' onClick={() => handleLinkClick('profile')} className="w-full mb-4">
                        <div className="bg-[#d79418] w-full text-center py-2 rounded-2xl ">
                            <NavbarButton title="profile" Icon={FaUserCircle} isActive={activePage === 'profile'} />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
