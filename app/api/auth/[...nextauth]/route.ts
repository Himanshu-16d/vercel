import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import LinkedInProvider from "next-auth/providers/linkedin"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/drive.file'
        }
      }
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "r_emailaddress r_liteprofile r_basicprofile w_member_social"
        }
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.localizedFirstName + " " + profile.localizedLastName,
          email: profile.emailAddress,
          image: profile.profilePicture?.["displayImage~"]?.elements?.[0]?.identifiers?.[0]?.identifier || null,
        }
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email }
          })

          if (!user) return null

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          }
        } catch (error) {
          console.error("Error in authorize callback:", error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id
      }
      return session
    },
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      if (profile) {
        token.profile = profile
      }
      return token
    }
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
