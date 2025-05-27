import LoginForm from "@/components/LoginForm"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to access our platform talk",
}

interface LoginPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  // Await the searchParams promise before accessing its properties
  const resolvedParams = await searchParams;
  const error = typeof resolvedParams.error === "string" ? resolvedParams.error : undefined;

  const errorMessages: Record<string, string> = {
    ANOTHER_PROVIDER: "You have register with another provider before.",
    OAuthAccountNotLinked: "Email already exists with a different provider.",
    AccessDenied: "Access denied.",
  }

  const errorMessage = error && errorMessages[error]

  return <LoginForm error={errorMessage ?? undefined} />
}

export default LoginPage