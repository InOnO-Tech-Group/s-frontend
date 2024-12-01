import React from 'react'
import SEO from '../../components/re-usable/SEO'
import AuthHeader from '../../components/auth/AuthHeader'
import AuthFooter from '../../components/auth/AuthFooter'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'

const ResetPassword = () => {
    return (
        <>
            <SEO title="Reset your password - ES Gishoma" />
            <div className=" min-h-screen bg-primary">
                <div className="flex flex-col p-5">
                    <AuthHeader />
                    <ResetPasswordForm />
                    <AuthFooter />
                </div>
            </div>
        </>
    )
}

export default ResetPassword
