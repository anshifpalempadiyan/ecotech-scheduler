

import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import prisma from "./prismadb"
import { NextAuthOptions } from "next-auth"

export const authOptions : NextAuthOptions = {
    adapter : PrismaAdapter( prisma ),
    providers : [
        GoogleProvider ({
            clientId : process.env.GOOGLE_CLIENT_ID!,
            clientSecret : process.env.GOOGLE_CLIENT_SECRET!,
            allowDangerousEmailAccountLinking: true,
        }),
    ],
    pages: {
        signIn: '/auth/signin', 
    },
    session : {
        strategy: "jwt", // Keeping this as JWT is the right move for stability
    }, 
    callbacks: {
        // When using JWT strategy, you MUST handle the token first
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        // Then pass that token data to the session
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
            }
            return session;
        },
    },
    secret : process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",
}