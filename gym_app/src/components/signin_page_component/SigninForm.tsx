'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";
import Switch from "../reusable_components/Switch";
import { useState } from "react";
import { FaMale, FaFemale } from "react-icons/fa";




export default function LoginForm() {

    const [bodyCheckImageIsMan, setBodyCheckImageIsMan] = useState(true);


    return (
        <div className="bg-black flex flex-col p-5 rounded-lg">
            <SectionTitle title="signin" />
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputText label="first name" type="text" placeholder='First Name' />
                    <InputText label="last name" type="text" placeholder='Last Name' />
                </div>

                <InputText label="e-mail" type="email" placeholder='E-mail' />
                <InputText label="password" type="password" placeholder='Password' />
                <InputText label="repeat password" type="password" placeholder='Password' />
                <div className="w-full flex flex-col justify-around items-center gap-2 bg-[#131313] mt-5 p-2 rounded-md">
                    <h4 className="uppercase font-bold text-xl text-white">body check image*</h4>
                    <div className="flex gap-20">
                        <FaFemale className={`${bodyCheckImageIsMan ? 'text-2xl text-white' : 'text-3xl text-pink-400'}`} />
                        <Switch
                            checked={bodyCheckImageIsMan}
                            onChange={() => { setBodyCheckImageIsMan(!bodyCheckImageIsMan) }}
                            activeColor="bg-blue-400"
                            inactiveColor="bg-pink-400"
                        />
                        <FaMale className={`${bodyCheckImageIsMan ? 'text-3xl text-blue-400' : 'text-2xl text-white'}`} />

                    </div>
                </div>

                <Link href="/login">
                    <h4 className="text-[#f8bf58] mt-3 underline underline-offset-2 text-center">Have an account? Login now</h4>
                </Link>

                <PrimaryButton text="Signin" onClick={() => { }} />
            </div>
        </div>
    )
}