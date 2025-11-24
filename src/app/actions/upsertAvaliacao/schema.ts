import { z } from 'zod';

export const upsertAvaliacaoSchema = z.object({
  queixaPrincipal: z.string().trim().min(1, {
    message: 'A queixa principal é obrigatória.',
  }),
  historiaDoenca: z.string().trim().optional(),
  exameFisico: z.string().trim().optional(),
  diagnostico: z.string().trim().optional(),
  objetivos: z.string().trim().optional(),
  data: z.coerce.date({
    message: 'A data é obrigatória.',
  }),
  pacienteId: z.string().trim().min(1, {
    message: 'O paciente é obrigatório.',
  }),
  id: z.string().optional(),
});
