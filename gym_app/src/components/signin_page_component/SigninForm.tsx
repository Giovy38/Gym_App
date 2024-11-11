'use client'

import InputText from "../reusable_components/InputText";
import SectionTitle from "../reusable_components/SectionTitle";
import PrimaryButton from "../reusable_components/PrimaryButton";
import Link from "next/link";



export default function LoginForm() {



    return (
        <div className="bg-black flex flex-col p-5 rounded-lg">
            <SectionTitle title="signin" />
            <div className="flex flex-col">
                <div className="flex flex-col md:flex-row gap-3">
                    <InputText label="name" type="text" placeholder='Name' />
                    <InputText label="surname" type="text" placeholder='Surname' />
                </div>

                <InputText label="e-mail" type="email" placeholder='E-mail' />
                <InputText label="password" type="password" placeholder='Password' />
                <InputText label="repeat password" type="password" placeholder='Password' />
                <div className="w-full flex flex-col justify-around items-center gap-2 bg-[#94928f] mt-5 p-2 rounded-md">
                    <h4 className="uppercase font-bold text-xl">select a gender for body check image*</h4>
                    <div className="flex gap-20">
                        <div className="flex gap-2 text-lg italic font-bold">
                            <input type="radio" name="gender" value="man" />man
                        </div>
                        <div className="flex gap-2 uppe text-lg italic font-bold">
                            <input type="radio" name="gender" value="woman" /> woman
                        </div>
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