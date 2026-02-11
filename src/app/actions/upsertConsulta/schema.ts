import { StatusConsulta, TipoConsulta } from '@prisma/client';
import { z } from 'zod';

export const upsertConsultaSchema = z.object({
  id: z.string().optional(),
  data: z.date({
    message: 'A data é obrigatória.',
  }),
  horaInicio: z.date({
    message: 'A hora de início é obrigatória.',
  }),
  horaFim: z.date({
    message: 'A hora de fim é obrigatória.',
  }),
  tipo: z.nativeEnum(TipoConsulta).optional().default('AVALIACAO'),
  status: z.nativeEnum(StatusConsulta).optional().default('AGENDADA'),
  observacoes: z.string().trim().optional(),
  valorConsulta: z.number().positive('O valor deve ser positivo'),
  paciente: z.string().trim().min(1, {
    message: 'O paciente é obrigatório.',
  }),
});
