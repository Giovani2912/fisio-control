'use server';
import db from '../../../lib/prisma';
import { upsertConsultaSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';

interface UpsertConsultaParams {
  id?: string;
  data: Date;
  horaInicio: Date;
  horaFim: Date;
  tipo: "AVALIACAO" | "SESSAO" | "RETORNO" | "REAVALIACAO" | undefined;
  status: string;
  observacoes?: string;
  valorConsulta?: number;
  paciente: string;
}

export const upsertConsulta = async (params: UpsertConsultaParams) => {
  const validatedData = upsertConsultaSchema.parse(params);

  // Converte valorConsulta de number para Decimal
  const valorConsultaDecimal = validatedData.valorConsulta 
    ? new Prisma.Decimal(validatedData.valorConsulta)
    : undefined;

  if (validatedData.id) {
    await db.consulta.update({
      where: { id: validatedData.id },
      data: {
        data: validatedData.data,
        horaInicio: validatedData.horaInicio,
        horaFim: validatedData.horaFim,
        tipo: validatedData.tipo,
        status: validatedData.status,
        observacoes: validatedData.observacoes,
        valorConsulta: valorConsultaDecimal,
      },
    });
  } else {
    await db.consulta.create({
      data: {
        data: validatedData.data,
        horaInicio: validatedData.horaInicio,
        horaFim: validatedData.horaFim,
        tipo: validatedData.tipo,
        status: validatedData.status,
        observacoes: validatedData.observacoes,
        valorConsulta: valorConsultaDecimal,
        paciente: { connect: { id: validatedData.paciente } },
      },
    });
  }

  // Revalida tanto a página de avaliações quanto a do paciente específico
  revalidatePath('/admin/consultas');
  revalidatePath(`/admin/pacientes/${validatedData.paciente}`);
};

export const deleteConsulta = async (id: string) => {
  // Revalida a página do paciente específico
  const deleted = await db.consulta.delete({
    where: { id },
  });
  revalidatePath(`/admin/pacientes/${deleted.pacienteId}`);
};