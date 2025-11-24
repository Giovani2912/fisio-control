'use server';
import db from '../../../lib/prisma';
import { Convenios, Sexo } from '@prisma/client';
import { upsertPacienteSchema } from './schema';
import { revalidatePath } from 'next/cache';

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
  upsertPacienteSchema.parse(params);

  if (params.id) {
    await db.paciente.update({
      where: { id: params.id },
      data: { ...params },
    });
  } else {
    await db.paciente.create({
      data: { ...params },
    });
  }

  revalidatePath('/admin/pacientes');
};

export const deletePaciente = async (id: string) => {
  await db.paciente.delete({
    where: { id },
  });
  revalidatePath('/admin/pacientes');
};

export const searchPacientesByName = async (nome: string) => {
  if (!nome.trim() || nome.length < 3) {
    return [];
  }

  try {
    const pacientes = await db.paciente.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
      orderBy: {
        nome: 'asc',
      },
    });

    return pacientes;
  } catch (error) {
    console.error('Erro ao buscar pacientes:', error);
    return [];
  }
};
