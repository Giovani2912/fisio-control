import { auth } from '@clerk/nextjs/server';
import db from './prisma';

export async function requireUserId(): Promise<string> {
  const { userId } = await auth();
  if (!userId) throw new Error('Não autenticado');
  return userId;
}

export async function assertPacienteOwnership(pacienteId: string, userId: string) {
  const paciente = await db.paciente.findFirst({
    where: { id: pacienteId, clerkUserId: userId },
    select: { id: true },
  });
  if (!paciente) throw new Error('Paciente não encontrado');
}
