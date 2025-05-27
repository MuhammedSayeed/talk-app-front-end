/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface IBaseInput<NameType extends string, LabelType extends string> {
    name: NameType;
    label: LabelType;
    type: "text" | "password" | "number";
    id: string;
}

// REGISTER INPUTS
export interface IREGISTER_INPUTS extends IBaseInput<"username" | "name" | "email" | "password", "Username" | "Name" | "Email" | "Password"> { }

// LOGIN INPUTS
export interface ILOGIN_INPUTS extends IBaseInput<"emailOrUsername" | "password", "Username or Email" | "Password"> {
}

// UPDATE NAME INPUTS
export interface IUPDATE_NAME_INPUTS extends IBaseInput<"name" | "password", "Name" | "Password"> { }
export interface IUPDATE_NAME_SOCIAL_USERS_INPUTS extends IBaseInput<"name", "Name"> { }

// UPDATE USERNAME INPUTS
export interface IUPDATE_USERNAME_INPUTS extends IBaseInput<"username" | "password", "Username" | "Password"> { }
export interface IUPDATE_USERNAME_SOCIAL_USERS_INPUTS extends IBaseInput<"username", "Username"> { }

// UPDATE EMAIL INPUTS
export interface IUPDATE_EMAIL_INPUTS extends IBaseInput<"email" | "password", "Email" | "Password"> { }

// VERIFY EMAIL INPUTS
export interface IVERIFY_EMAIL_INPUTS extends IBaseInput<"code" | "password", "Code" | "Password"> { }

// UPDATE PASSWORD INPUTS
export interface IUPDATE_PASSWORD_INPUTS extends IBaseInput<"password" | "newPassword", "Current password" | "New password"> { }



export interface IRegisterFormData {
    username: string;
    email: string;
    password: string;
}

export interface ILoginFormData {
    emailOrUsername: string;
    password: string;
}

export interface IUpdateNameFormData {
    name: string;
    password?: string;
}

export interface IUpdateUsernameFormData {
    username: string;
    password?: string;
}
export interface IUpdateEmailFormData {
    email: string;
    password: string;
}
export interface IUpdatePasswordFormData {
    password: string;
    newPassword: string;
}
export interface IVerifyEmailFormData {
    code: string;
    password: string;
}
