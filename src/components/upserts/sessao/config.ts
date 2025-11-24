import { StatusConsulta, TipoConsulta } from '@prisma/client';
import { FormFieldConfig } from '../generic-upsert';
import { z } from 'zod';

// ===== Sessão (exemplo) =====
export const sessaoSchema = z.object({
  data: z.string().trim().min(1, {
    message: 'A data é obrigatória.',
  }),
  horaInicio: z.string().trim().min(1, {
    message: 'A hora de início é obrigatória.',
  }),
  horaFim: z.string().trim().min(1, {
    message: 'A hora de fim é obrigatória.',
  }),
  tipo: z.nativeEnum(TipoConsulta),
  pacienteId: z.string().trim().min(1, {
    message: 'O paciente é obrigatório.',
  }),
  status: z.nativeEnum(StatusConsulta),
  observacoes: z.string().optional(),
  id: z.string().optional(),
  criadoEm: z.string().optional(),
  atualizadoEm: z.string().optional(),
  ativo: z.boolean().optional(),
});
export type SessaoFormData = z.infer<typeof sessaoSchema>;
export const sessaoDefaultValues: SessaoFormData = {
  data: '',
  horaInicio: '',
  horaFim: '',
  tipo: 'AVALIACAO',
  pacienteId: '',
  status: 'AGENDADA',
  observacoes: '',
  ativo: true,
};
export const sessaoFields: FormFieldConfig[] = [
  {
    name: 'data',
    label: 'Data',
    type: 'text', // você pode usar um date picker
    placeholder: 'Digite a data...',
    gridColumn: 'half',
  },
  {
    name: 'horaInicio',
    label: 'Hora Início',
    type: 'text', // você pode usar um time picker
    placeholder: 'Digite a hora de início...',
    gridColumn: 'half',
  },
  {
    name: 'horaFim',
    label: 'Hora Fim',
    type: 'text', // você pode usar um time picker
    placeholder: 'Digite a hora de fim...',
    gridColumn: 'half',
  },
  {
    name: 'tipo',
    label: 'Tipo',
    type: 'select',
    options: [
      { value: 'CONSULTA', label: 'Consulta' },
      { value: 'EXAME', label: 'Exame' },
      { value: 'RETORNO', label: 'Retorno' },
    ],
    gridColumn: 'half',
  },
  {
    name: 'status',
    label: 'Status',
    type: 'select',
    options: [
      { value: 'AGENDADA', label: 'Agendada' },
      { value: 'CONFIRMADA', label: 'Confirmada' },
      { value: 'REALIZADA', label: 'Realizada' },
      { value: 'CANCELADA', label: 'Cancelada' },
    ],
    gridColumn: 'half',
  },
  {
    name: 'observacoes',
    label: 'Observações',
    type: 'text',
    placeholder: 'Digite as observações...',
    gridColumn: 'full',
  },
  {
    name: 'ativo',
    label: 'Ativo',
    type: 'text',
    gridColumn: 'half',
  },
  {
    name: 'pacienteId',
    label: 'Paciente ID',
    type: 'text',
    placeholder: 'Digite o ID do paciente...',
    gridColumn: 'half',
  },
  {
    name: 'valorConsulta',
    label: 'Valor da Consulta',
    type: 'number',
    placeholder: 'Digite o valor da consulta...',
    gridColumn: 'half',
  },
];
