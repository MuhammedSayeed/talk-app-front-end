import * as yup from "yup";

// reusable schemas
const nameValidation = yup.string()
    .min(2, "Name must be at least 3 characters long")
    .max(32, "Name must be at most 32 characters long")
    .required("Name is required");

const usernameValidation = yup.string()
    .min(3, "Username must be at least 3 characters long")
    .max(16, "Username must be at least 16 characters long")

const emailValidation = yup.string()
    .email("Invalid email format");

const passwordValidation = yup
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(32, "Password must be at most 32 characters long")
    .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one lowercase letter, one uppercase letter, and one digit."
    )



// register
const registerSchema = yup.object({
    username: usernameValidation.required("Username is required"),
    name: nameValidation,
    email: emailValidation.required("Email is required"),
    password: passwordValidation.required("Password is required")
})
// login
const loginSchema = yup.object({
    emailOrUsername: yup.string().test("email-or-username", "Invalid email or username", (value) => {
        if (!value) return false;
        try {
            // Try validating as email
            const isEmail = emailValidation.isValidSync(value);

            // Try validating as username
            const isUsername = usernameValidation.isValidSync(value);

            return isEmail || isUsername;
        } catch {
            return false;
        }
    }).required("Email or Username is required"),
    password: passwordValidation.required("Password is required")
})
// bio
const bioSchema = yup.object({
    bio: yup.string().min(1, "Bio must be at least 1 character long").max(139, "Bio must be at most 139 characters long").required("Bio is required")
})
// name
const updateNameSchema = yup.object({
    name: nameValidation.required("Name is required"),
    password: passwordValidation.required("Password is required")
})
const updateNameSchemaForSocialUsers = yup.object({
    name: nameValidation.required("Name is required"),
})
// username
const updateUsernameSchema = yup.object({
    username: usernameValidation.required("Username is required"),
    password: passwordValidation.required("Password is required")
})
const updateUsernameSchemaForSocialUsers = yup.object({
    username: usernameValidation.required("Username is required"),
})
// email
const updateEmailSchema = yup.object({
    email: emailValidation.required("Email is required"),
    password: passwordValidation.required("Password is required")
})
// verify email
const verifyEmailSchema = yup.object({
    code: yup.string().min(6, "Code length must be 6 digits").max(6, "Code length must be 6 digits").required("Code is required"),
    password: passwordValidation.required("Password is required")
})
// password
const updatePasswordSchema = yup.object({
    password: passwordValidation.required("Current password is required"),
    newPassword: passwordValidation.required("New Password is required")
})
// forgot passwod
const forgotPasswordSchema = yup.object({
    email : emailValidation.required("Email is required.")
})

const resetPasswordSchema = yup.object({
    newPassword: passwordValidation.required("Password is required"),
})


export {
    registerSchema,
    loginSchema,
    bioSchema,
    updateNameSchema,
    updateUsernameSchema,
    updateEmailSchema,
    verifyEmailSchema,
    updatePasswordSchema,
    updateUsernameSchemaForSocialUsers,
    updateNameSchemaForSocialUsers,
    forgotPasswordSchema,
    resetPasswordSchema
}