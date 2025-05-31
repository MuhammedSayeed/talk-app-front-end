import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
declare module "next-auth" {
    interface Session {
        tempToken?: string
        user: {
            tempToken?: string
        } & DefaultSession["user"]
    }

    interface User extends DefaultUser {
        tempToken?: string
    }
}
declare module "next-auth/jwt" {
    interface JWT {
        tempToken?: string
    }
}

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/",
        error: "/login"
    },
    callbacks: {
        async signIn({ user, account }) {
            console.log("SignIn callback triggered for:", user.email)
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_ONLINE_API}/api/v1/users/social-auth`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        provider: account?.provider,
                        providerId: account?.providerAccountId,
                    })
                })

                if (!res.ok) {
                    console.error("Backend response error:", res.status, res.statusText)
                    throw new Error(`Backend error: ${res.status}`)
                }

                const data = await res.json()
                console.log("Backend response:", data)

                if (data?.tempToken) {
                    user.tempToken = data.tempToken
                }
                return true
            } catch {
                throw new Error("ANOTHER_PROVIDER");
            }
        },
        async jwt({ token, user }) {
            if (user && user.tempToken) {
                token.tempToken = user.tempToken
            }
            return token
        },
        async session({ session, token }) {
            if (token.tempToken) {
                session.tempToken = token.tempToken
            }
            return session
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/complete-auth`;
        }
    },
    debug : process.env.NODE_ENV === "development"
})

export { handler as GET, handler as POST };