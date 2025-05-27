import RegisterForm from '@/components/RegisterForm'
import { Metadata } from 'next'
import React from 'react'



export const metadata: Metadata = {
  title: 'Register',
  description: 'Create a new account to get started with our platform Talk',
  openGraph: {
    title: 'Register | Talk',
    description: 'Join Talk today and start connecting with people.',
  },
  twitter: {
    card: 'summary',
    title: 'Register | Talk',
    description: 'Create your Talk account and join the conversation.',
  },
}

const RegisterPage = () => {
  return (
    <RegisterForm/>
  )
}

export default RegisterPage