import prisma from '@/prisma/client'
import { hashCompare } from '@/utils/security'

export const USER_PRIVATE_FIELDS = {
  id: true,
  password: true,
  createdAt: true,
  updatedAt: true
} as const

export async function getUser(email: string) {
  try {
    const user = await prisma.user.findUnique({
      omit: USER_PRIVATE_FIELDS,
      where: {
        email
      }
    })
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

export async function getUserWithUsernamePassword(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email
      },
      select: {
        password: true
      }
    })
    if (!user) return null
    const isSame = await hashCompare(password, user.password)
    if (!isSame) return null
    return await getUser(email)
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}
