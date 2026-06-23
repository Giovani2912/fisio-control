import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const CLERK_USER_ID = 'user_3FHOHyg61wZazKAEa9O0aVCkyYS'

const result = await prisma.paciente.updateMany({
  where: { clerkUserId: null },
  data: { clerkUserId: CLERK_USER_ID },
})

console.log(`Pacientes atualizados: ${result.count}`)
await prisma.$disconnect()
