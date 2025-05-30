import ResetPasswordForm from '@/components/ResetPasswordForm'
import { Metadata } from 'next';
import React from 'react'

interface PageProps {
  params: Promise<{ token: string }>
}
export const metadata: Metadata = {
  title: 'Reset Password',
  description: 'Create a new password for your account to regain access.',
  openGraph: {
    title: 'Reset Password',
    description: 'Securely reset your password and protect your account.',
  },
  twitter: {
    card: 'summary',
    title: 'Reset Password',
    description: 'Create a new password for your account to regain access.',
  },
};

const ResetPasswordPage = async ({ params }: PageProps) => {
  const { token } = await params;

  return (
    <main className='h-full flex flex-col items-center justify-center'>
      <div className="rounded-md border w-full max-w-md p-6 sm:p-7 space-y-6">

        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Reset Password</h1>
          <p className="text-sm text-muted-foreground">Create a new password for your account.</p>
        </div>
        <ResetPasswordForm token={token} />
      </div>
    </main>
  )
}

export default ResetPasswordPage