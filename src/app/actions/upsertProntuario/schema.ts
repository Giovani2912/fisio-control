import { z } from 'zod';

export const generateSoapSchema = z.object({
  queixaDoDia: z.string().trim().min(1, { message: 'A queixa do dia é obrigatória.' }),
  nivelDor: z.coerce.number().int().min(0).max(10).optional(),
  regiaoCorpo: z.string().trim().min(1, { message: 'A região do corpo é obrigatória.' }),
  tecnicas: z.string().trim().min(1, { message: 'As técnicas utilizadas são obrigatórias.' }),
  respostaTratamento: z.string().trim().min(1, { message: 'A resposta ao tratamento é obrigatória.' }),
  observacoes: z.string().trim().optional(),
});

export const saveProntuarioSchema = generateSoapSchema.extend({
  pacienteId: z.string().trim().min(1, { message: 'O paciente é obrigatório.' }),
  evolucao: z.string().trim().min(1, { message: 'A evolução gerada é obrigatória.' }),
  id: z.string().optional(),
});
