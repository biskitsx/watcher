import prisma from '@/prisma';
import { connectToDatabase } from '@/prisma/connect';
import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth/next';
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
      CredentialsProvider({
        name: 'Credentials',
        credentials: {
          email: { label: 'Email', type: 'email', placeholder: 'john@doe.com' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials, req) {
          if (!credentials) return null
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          })
  
          if (
            user &&
            (await bcrypt.compare(credentials.password, user.password || ''))
          ) {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role
            }
          } else {
            throw new Error('Invalid email or password')
          }
        },
      }),
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        profile(profile) {
          return {
            id: profile.sub,
            name: `${profile.given_name} ${profile.family_name}`,
            email: profile.email,
            image: profile.picture,
          }
        },
      })
    ],
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: 'jwt',
    },
    callbacks: {
      jwt: async ({ token, user }: {token: any, user: any}) => {
        if (user) {
          token.id = user.id
          token.role = user.role
        }
        return token
      },
      session: async ({ session, token }: {token: any, session: any}) => {
        if (session.user) {
          session.user.id = token.id
          session.user.role = token.role
        }
        return session
      },
    },
  }
  
  const handler = NextAuth(authOptions)
  
  export { handler as GET, handler as POST }