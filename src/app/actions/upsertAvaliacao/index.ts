'use server';
import db from '../../../lib/prisma';
import { upsertAvaliacaoSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { requireUserId, assertPacienteOwnership } from '@/lib/auth-guards';

interface UpsertAvaliacaoParams {
  id?: string;
  pacienteId: string;
  queixaPrincipal: string;
  historiaDoenca?: string;
  exameFisico?: string;
  diagnostico?: string;
  objetivos?: string;
  data: Date;
}

export const upsertAvaliacao = async (params: UpsertAvaliacaoParams) => {
  const userId = await requireUserId();
  const validatedData = upsertAvaliacaoSchema.parse(params);

  await assertPacienteOwnership(validatedData.pacienteId, userId);

  if (validatedData.id) {
    await db.avaliacao.update({
      where: { id: validatedData.id, paciente: { clerkUserId: userId } },
      data: {
        pacienteId: validatedData.pacienteId,
        queixaPrincipal: validatedData.queixaPrincipal,
        historiaDoenca: validatedData.historiaDoenca,
        exameFisico: validatedData.exameFisico,
        diagnostico: validatedData.diagnostico,
        objetivos: validatedData.objetivos,
        data: validatedData.data,
      },
    });
  } else {
    await db.avaliacao.create({
      data: {
        pacienteId: validatedData.pacienteId,
        queixaPrincipal: validatedData.queixaPrincipal,
        historiaDoenca: validatedData.historiaDoenca,
        exameFisico: validatedData.exameFisico,
        diagnostico: validatedData.diagnostico,
        objetivos: validatedData.objetivos,
        data: validatedData.data,
      },
    });
  }

  // Revalida tanto a página de avaliações quanto a do paciente específico
  revalidatePath('/admin/avaliacoes');
  revalidatePath(`/admin/pacientes/${validatedData.pacienteId}`);
};

export const deleteAvaliacao = async (id: string) => {
  const userId = await requireUserId();

  const avaliacao = await db.avaliacao.findFirst({
    where: { id, paciente: { clerkUserId: userId } },
    select: { pacienteId: true },
  });
  if (!avaliacao) throw new Error('Avaliação não encontrada');

  await db.avaliacao.delete({ where: { id } });
  revalidatePath('/admin/avaliacoes');
  revalidatePath(`/admin/pacientes/${avaliacao.pacienteId}`);
};
