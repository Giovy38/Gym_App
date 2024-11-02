'use client'

import SigninForm from '../../components/signin_page_component/SigninForm'
import backgroundImg from '../../assets/img/gym_background.jpg'

export default function SigninPage() {
    return (
        <div
            className="min-h-[82vh] flex justify-center items-center bg-cover bg-left bg-opacity-50"
            style={{ backgroundImage: `url(${backgroundImg.src})` }}
        >
            <div className="bg-black bg-opacity-50 p-5 rounded-lg">
                <SigninForm />
            </div>
        </div>
    )
}
