"use client"

import { AuthContext } from "@/context/auth/AuthContext"
import { useContext } from "react"
import UpdateNameForCredentialsUsers from "./UpdateNameForCredentialsUsers";
import UpdateNameForSocialUsers from "./UpdateNameForSocialUsers";


const UpdateName = () => {
    const { user } = useContext(AuthContext);


    if (user?.provider === "credentials") return <UpdateNameForCredentialsUsers />

    return <UpdateNameForSocialUsers />
}

export default UpdateName