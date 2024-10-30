'use client'

import { useState } from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import { FaUserCircle, FaHome, FaBars, FaTimes } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoBody } from "react-icons/io5";
import Link from 'next/link';
import SectionTitle from "./reusable_components/SectionTitle";
import NavbarButton from "./navbar_component/NavbarButton";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div>
            {/* Navbar for tablet and larger screens */}
            <div className="hidden md:block bg-black text-white">
                <div className='overflow-hidden text-center p-3'>
                    <Link href='/'>
                        <SectionTitle title="super gym" />
                    </Link>
                </div>
                <div className='flex justify-around p-1'>
                    <Link href='/' className="w-full">
                        <NavbarButton title="home" Icon={FaHome} />
                    </Link>
                    <Link href='training-card' className="w-full">
                        <NavbarButton title="training card" Icon={CgGym} />
                    </Link>
                    <Link href='body-check' className="w-full">
                        <NavbarButton title="body check" Icon={IoBody} />
                    </Link>
                    <Link href='diet' className="w-full">
                        <NavbarButton title="diet" Icon={FaBowlFood} />
                    </Link>
                    <Link href='profile' className="w-full">
                        <NavbarButton title="profile" Icon={FaUserCircle} />
                    </Link>
                </div>
            </div>

            {/* Hamburger menu for mobile screens */}
            <div className="md:hidden bg-black text-white p-3">
                <div className="flex justify-between items-center">
                    <Link href='/'>
                        <SectionTitle title="super gym" />
                    </Link>
                    <button onClick={toggleMenu} className="text-white z-50">
                        {isOpen ? <FaTimes size={24} className='z-50 text-black' /> : <FaBars size={24} />}
                    </button>
                </div>
                <div
                    className={`fixed top-0 left-0 w-full h-full bg-[#f8c058e8] text-black p-5 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
                >
                    <Link href='/' onClick={toggleMenu}>
                        <NavbarButton title="home" Icon={FaHome} />
                    </Link>
                    <Link href='training-card' onClick={toggleMenu}>
                        <NavbarButton title="training card" Icon={CgGym} />
                    </Link>
                    <Link href='body-check' onClick={toggleMenu}>
                        <NavbarButton title="body check" Icon={IoBody} />
                    </Link>
                    <Link href='diet' onClick={toggleMenu}>
                        <NavbarButton title="diet" Icon={FaBowlFood} />
                    </Link>
                    <Link href='profile' onClick={toggleMenu}>
                        <NavbarButton title="profile" Icon={FaUserCircle} />
                    </Link>
                </div>
            </div>
        </div>
    );
}
