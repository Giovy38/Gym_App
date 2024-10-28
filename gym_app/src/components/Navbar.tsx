import NavbarButton from "./reusable_components/NavbarButton";
import { FaBowlFood } from "react-icons/fa6";
import { FaUserCircle, FaHome } from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { IoBody } from "react-icons/io5";
import Link from 'next/link'
import SectionTitle from "./reusable_components/SectionTitle";


export default function Navbar() {
    return (
        <div className="bg-black text-white ">
            <div className=' overflow-hidden text-center p-3'>
                <Link href='/'>
                    <SectionTitle title="super gym" />
                </Link>
            </div>
            {/* buttons  */}
            <div className='flex justify-around p-1'>
                {/* homepage */}
                <Link href='/' className="w-full">
                    <NavbarButton title="home" Icon={FaHome} />
                </Link>
                {/* training card */}
                <Link href='training-card' className="w-full">
                    <NavbarButton title="training card" Icon={CgGym} />
                </Link>
                {/* body check */}
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
    )
}