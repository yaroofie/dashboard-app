import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { authConfig } from './auth.config'
import { z } from 'zod'
import { getUserWithUsernamePassword } from './prisma/helpers/user'
import { hashPassword } from './utils/security';

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
          const hashedPassword = await hashPassword(password)
          const user = await getUserWithUsernamePassword( email, hashedPassword )
          
          return user;
        }

        console.log('Invalid credentials')
        return null
      }
    })
  ]
})
