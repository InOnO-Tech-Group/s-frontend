import React from 'react'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import SEO from '../../components/re-usable/SEO'

const ForgotPassword = () => {
    return (
        <>
            <SEO title="Forgot your password - ES Gishoma" />
            <div className=" min-h-screen bg-primary">
            <div className="flex flex-col p-5">
                    <AuthHeader />
                    <ForgotPasswordForm />
                    <AuthFooter />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
