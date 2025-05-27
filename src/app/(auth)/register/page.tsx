import RegisterForm from '@/components/RegisterForm'
import { Metadata } from 'next'
import React from 'react'



export const metadata : Metadata = {
  title : "Register",
  description: "Create a new account to get started with our platform talk"

}

const RegisterPage = () => {
  return (
    <RegisterForm/>
  )
}

export default RegisterPage