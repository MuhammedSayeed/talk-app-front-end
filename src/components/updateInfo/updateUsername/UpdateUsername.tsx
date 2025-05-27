"use client"

import { AuthContext } from "@/context/auth/AuthContext";
import { useContext } from "react";
import UpdateUsernameForCredentialsUsers from "./UpdateUsernameForCredentialsUsers";
import UpdateUsernameForSocialUsers from "./UpdateUsernameForSocialUsers";


const UpdateUsername = () => {
    const { user } = useContext(AuthContext);

    if (user?.provider === "credentials") return <UpdateUsernameForCredentialsUsers />

    return <UpdateUsernameForSocialUsers />
}

export default UpdateUsername