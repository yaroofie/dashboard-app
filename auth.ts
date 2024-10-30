import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
// import GoogleProvider from 'next-auth/providers/google'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getUserWithUsernamePassword } from './prisma/helpers/user'

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data
          const user = await getUserWithUsernamePassword(email, password)
          return user
        }

        console.log('Invalid credentials')
        return null
      }
    }),
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET
    // })
  ]
})
