import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

export async function fetchPacientes() {
  const { userId } = await auth();
  if (!userId) return [];

  return prisma.paciente.findMany({
    where: { ativo: true, clerkUserId: userId },
    select: { id: true, nome: true },
    orderBy: { criadoEm: 'asc' },
  });
}
