import ResetPasswordForm from '@/components/ResetPasswordForm'
import React from 'react'

interface PageProps {
  params: Promise<{ token: string }>
}

const ResetPasswordPage = async ({ params }: PageProps) => {
  const { token } = await params;
  
  return (
    <main className='h-full flex flex-col items-center justify-center'>
      <div className="w-md rounded-md border p-7 space-y-6">
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