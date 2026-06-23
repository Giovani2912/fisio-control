'use server';
import db from '../../../lib/prisma';
import { Convenios, Sexo } from '@prisma/client';
import { upsertPacienteSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { auth } from '@clerk/nextjs/server';

interface UpsertPacienteParams {
  id?: string;
  nome: string;
  cpf: string;
  rg: string;
  email: string;
  celular: string;
  idade: string;
  sexo: Sexo;
  convenio: Convenios;
  numeroConvenio: string;
  contato_emergencia: string;
}

export const upsertPaciente = async (params: UpsertPacienteParams) => {
  const { userId } = await auth();
  if (!userId) throw new Error('Não autenticado');

  upsertPacienteSchema.parse(params);

  if (params.id) {
    await db.paciente.update({
      where: { id: params.id, clerkUserId: userId },
      data: { ...params },
    });
  } else {
    await db.paciente.create({
      data: { ...params, clerkUserId: userId },
    });
  }

  revalidatePath('/admin/pacientes');
};

export const deletePaciente = async (id: string) => {
  const { userId } = await auth();
  if (!userId) throw new Error('Não autenticado');

  const paciente = await db.paciente.findFirst({
    where: { id, clerkUserId: userId },
    select: { id: true },
  });
  if (!paciente) throw new Error('Paciente não encontrado');

  await db.avaliacao.deleteMany({
    where: { pacienteId: id },
  });

  await db.paciente.delete({
    where: { id, clerkUserId: userId },
  });

  revalidatePath('/admin/pacientes');
};

export const searchPacientesByName = async (nome: string) => {
  const { userId } = await auth();
  if (!userId || !nome.trim() || nome.length < 3) return [];

  try {
    const pacientes = await db.paciente.findMany({
      where: {
        clerkUserId: userId,
        nome: { contains: nome, mode: 'insensitive' },
      },
      orderBy: { nome: 'asc' },
    });

    return pacientes;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return [];
  }
};
