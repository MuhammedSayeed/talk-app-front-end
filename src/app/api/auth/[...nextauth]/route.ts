import axiosInstance from '@/config/axios';
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from "next-auth/providers/github";
declare module "next-auth" {
    interface Session {
        tempToken?: string;
        user: {
            tempToken?: string;
        } & DefaultSession["user"];
    }

    interface User extends DefaultUser {
        tempToken?: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        tempToken?: string;
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
        })
    ],
    pages: {
        signIn: "/",
        error: "/login"
    },
    callbacks: {
        async signIn({ user, account }) {
            try {
                const { data } = await axiosInstance.post("users/social-auth", {
                    email: user.email,
                    name: user.name,
                    image: user.image,
                    provider: account?.provider,
                    providerId: account?.providerAccountId,
                })

                if (data?.tempToken) {
                    user.tempToken = data.tempToken;
                }
                return true;
            } catch {
                throw new Error("ANOTHER_PROVIDER");
            }
        },
        async jwt({ token, user }) {
            if (user && user.tempToken) {
                token.tempToken = user.tempToken;
            }
            return token;
        },
        async session({ session, token }) {
            session.tempToken = token.tempToken;
            return session;
        },
        async redirect({ baseUrl }) {
            return `${baseUrl}/complete-auth`;
        }
    }
})

export { handler as GET, handler as POST };