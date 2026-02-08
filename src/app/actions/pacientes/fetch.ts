import prisma from '@/lib/prisma';

export async function fetchPacientes() {
  return prisma.paciente.findMany({
    where: { ativo: true },
    select: { id: true, nome: true },
    orderBy: { criadoEm: 'asc' },
  });
}
