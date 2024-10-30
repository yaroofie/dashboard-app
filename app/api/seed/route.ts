
import { admins } from '@/prisma/seed/users'
import prisma from '@/prisma/client'
import { hashPassword } from '@/utils/security';

async function seedUsers() {
  const insertedUsers = await Promise.all(
    admins.map(async (user) => {
      const hashedPassword = await hashPassword(user.password)
      return prisma.user.create({ data: { ...user, password: hashedPassword, isAdmin: true } })
    })
  )

  return insertedUsers
}

export async function GET() {
  return Response.json({
    message: 'Database seeded already!'
  })
  try {
    await seedUsers()

    return Response.json({ message: 'Database seeded successfully' })
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
