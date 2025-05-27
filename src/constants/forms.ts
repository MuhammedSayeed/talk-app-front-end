import { ILOGIN_INPUTS, IREGISTER_INPUTS, IUPDATE_EMAIL_INPUTS, IUPDATE_NAME_INPUTS, IUPDATE_NAME_SOCIAL_USERS_INPUTS, IUPDATE_PASSWORD_INPUTS, IUPDATE_USERNAME_INPUTS, IUPDATE_USERNAME_SOCIAL_USERS_INPUTS, IVERIFY_EMAIL_INPUTS } from "@/interfaces/forms";


// register inputs
const REGISTER_INPUTS_FORM : IREGISTER_INPUTS[] = [
    {
        name : "username",
        label : "Username",
        type : "text",
        id : "username-register",
    },
    {
        name : "name",
        label : "Name",
        type : "text",
        id : "name-register",
    },
    {
        name : "email",
        label : "Email",
        type : "text",
        id : "email-register",
    },
    {
        name : "password",
        label : "Password",
        type : "password",
        id : "password-register",
    }
]
// login inputs
const LOGIN_INPUTS_FORM : ILOGIN_INPUTS[] = [
    {
        id : "email-login",
        label : "Username or Email",
        name : "emailOrUsername",
        type : "text",
    },
    {
        id : "password-login",
        label : "Password",
        name : "password",
        type : "password",
    }
]

// update name
const UPDATE_NAME_INPUTS_FORM : IUPDATE_NAME_INPUTS[] = [
    {
        name : "name",
        label : "Name",
        type : "text",
        id : "name-update",
    },
    {
        name : "password",
        label : "Password",
        type : "password",
        id : "password-update"
    }
]
const UPDATE_NAME_SOCIAL_USERS_INPUTS_FORM : IUPDATE_NAME_SOCIAL_USERS_INPUTS[] = [
    {
        name : "name",
        label : "Name",
        type : "text",
        id : "name-update-social-users",
    }

]
// update username
const UPDATE_USERNAME_INPUTS_FORM : IUPDATE_USERNAME_INPUTS[] = [
    {
        name : "username",
        label : "Username",
        type : "text",
        id : "name-update",
    },
    {
        name : "password",
        label : "Password",
        type : "password",
        id : "password-update"
    }
]
const UPDATE_USERNAME_SOCIAL_USERS_INPUTS_FORM : IUPDATE_USERNAME_SOCIAL_USERS_INPUTS[] = [
    {
        name : "username",
        label : "Username",
        type : "text",
        id : "username-update-social-users",
    }

]
// update email
const UPDATE_EMAIL_INPUTS_FORM : IUPDATE_EMAIL_INPUTS[] = [
    {
        name : "email",
        label : "Email",
        type : "text",
        id : "name-update",
    },
    {
        name : "password",
        label : "Password",
        type : "password",
        id : "password-update"
    }
]

// verify email
const VERIFY_EMAIL_INPUTS_FORM : IVERIFY_EMAIL_INPUTS[] = [
    {
        id : "code",
        label : "Code",
        name : "code",
        type : "text" ,
    },
    {
        id : "password",
        label : "Password",
        name : "password",
        type : "password",
    }
]
// update password
const UPDATE_PASSWORD_INPUTS_FORM : IUPDATE_PASSWORD_INPUTS[] = [
    {
        name : "password",
        label : "Current password",
        type : "password",
        id : "current-password",
    },
    {
        name : "newPassword",
        label : "New password",
        type : "password",
        id : "new-password",
    },
]

export {
    REGISTER_INPUTS_FORM,
    LOGIN_INPUTS_FORM,
    UPDATE_NAME_INPUTS_FORM,
    UPDATE_USERNAME_INPUTS_FORM,
    UPDATE_EMAIL_INPUTS_FORM,
    VERIFY_EMAIL_INPUTS_FORM,
    UPDATE_PASSWORD_INPUTS_FORM,
    UPDATE_USERNAME_SOCIAL_USERS_INPUTS_FORM,
    UPDATE_NAME_SOCIAL_USERS_INPUTS_FORM
}