import React from 'react'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'
import SEO from '../../components/re-usable/SEO'

const ForgotPassword = () => {
    return (
        <>
            <SEO title="Forgot your password - ES Gishoma" />
            <div className="bg-[#00B5E2] h-screen">
                <div className="w-4/5 mx-auto">
                    <AuthHeader />
                    <ResetPasswordForm />
                    <AuthFooter />
                </div>
            </div>
        </>
    )
}

export default ForgotPassword
