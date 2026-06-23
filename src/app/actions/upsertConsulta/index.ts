'use server';
import db from '../../../lib/prisma';
import { upsertConsultaSchema } from './schema';
import { revalidatePath } from 'next/cache';
import { requireUserId, assertPacienteOwnership } from '@/lib/auth-guards';

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
  const userId = await requireUserId();
  const validatedData = upsertConsultaSchema.parse(params);

  await assertPacienteOwnership(validatedData.paciente, userId);

  if (validatedData.id) {
    await db.consulta.update({
      where: { id: validatedData.id, paciente: { clerkUserId: userId } },
      data: {
        data: validatedData.data,
        horaInicio: validatedData.horaInicio,
        horaFim: validatedData.horaFim,
        tipo: validatedData.tipo,
        status: validatedData.status,
        observacoes: validatedData.observacoes,
        valorConsulta: validatedData.valorConsulta,
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
        valorConsulta: validatedData.valorConsulta,
        paciente: { connect: { id: validatedData.paciente } },
      },
    });
  }

  // Revalida tanto a página de avaliações quanto a do paciente específico
  revalidatePath('/admin/consultas');
  revalidatePath(`/admin/pacientes/${validatedData.paciente}`);
};

export const deleteConsulta = async (id: string) => {
  const userId = await requireUserId();

  const consulta = await db.consulta.findFirst({
    where: { id, paciente: { clerkUserId: userId } },
    select: { pacienteId: true },
  });
  if (!consulta) throw new Error('Consulta não encontrada');

  await db.consulta.delete({ where: { id } });
  revalidatePath('/admin/consultas');
  revalidatePath(`/admin/pacientes/${consulta.pacienteId}`);
};