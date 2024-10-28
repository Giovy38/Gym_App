'use client'

import InputText from "./InputText";
import SectionTitle from "./SectionTitle";
import PrimaryButton from "./PrimaryButton";
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

                <Link href="/login">
                    <h4 className="text-[#f8bf58] mt-3 underline underline-offset-2 text-center">Have an account? Login now</h4>
                </Link>

                <PrimaryButton text="Signin" />
            </div>
        </div>
    )
}