'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import { CiSquareCheck } from "react-icons/ci";
import { FaCheckSquare } from "react-icons/fa";
import { useState } from "react";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";


export default function LoginForm() {

    const [isRemember, setIsRemember] = useState(false)

    const remember = () => {
        setIsRemember(!isRemember)
    }

    return (
        <div className="bg-black flex flex-col p-5 rounded-lg">
            <SectionTitle title="login" />
            <div className="flex flex-col">
                <InputText label="e-mail" type="email" placeholder='E-mail' />
                <InputText label="password" type="password" placeholder='Password' />
                <div className="flex gap-5 mt-5">
                    <div
                        onClick={remember}
                        className="flex justify-center items-center gap-1 cursor-pointer">
                        {isRemember ? <FaCheckSquare className="text-white" /> : <CiSquareCheck className="text-white" />}
                        <h4 className="text-white">Remember me </h4>
                    </div>
                    <a href="#" className=" underline underline-offset-2 text-white">Forgot password</a>
                </div>
                <Link href="/signin">
                    <h4 className="text-[#f8bf58] mt-3 underline underline-offset-2">Dont have an account? Register now</h4>
                </Link>
                <PrimaryButton text="Login" />
            </div>
        </div>
    )
}