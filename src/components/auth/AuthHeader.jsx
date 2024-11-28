import React from 'react'
import logo from "/es gishoma logo.svg";
import { Link } from 'react-router-dom';
const AuthHeader = () => {
    return (
        <div className="flex items-center p-4">
            <Link to={"/"}>
                <img src={logo} alt="Logo" className="bg-white w-24 h-auto" />
            </Link>
            <div className="ml-auto rtl">
                <Link to="/" className="text-white hover:underline font-bold">
                    Public Website
                </Link>
            </div>
        </div>

    )
}

export default AuthHeader
