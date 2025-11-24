'use server';
import db from '../../../lib/prisma';
import { upsertAvaliacaoSchema } from './schema';
import { revalidatePath } from 'next/cache';

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
  const validatedData = upsertAvaliacaoSchema.parse(params);

  if (validatedData.id) {
    await db.avaliacao.update({
      where: { id: validatedData.id },
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

  revalidatePath('/admin/avaliacoes');
};

export const deleteAvaliacao = async (id: string) => {
  await db.avaliacao.delete({
    where: { id },
  });
  revalidatePath('/admin/avaliacoes');
};
