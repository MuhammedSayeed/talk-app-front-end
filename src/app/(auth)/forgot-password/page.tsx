import ForgotPasswordForm from '@/components/ForgotPasswordForm'
import React from 'react'

const ForgotPasswordPage = () => {
    return (
        <div className='flex justify-center items-center h-full'>
            <div className="rounded-md border w-md p-7 space-y-6">
                <div className="space-y-2">
                    <h1 className='text-white/90 text-4xl font-medium'>Reset Password</h1>
                    <p className='text-sm text-white/60'>{`Enter your email address and we'll send you a link to reset your password`}</p>
                </div>
                <ForgotPasswordForm />
            </div>
        </div>
    )
}

export default ForgotPasswordPage