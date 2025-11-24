// import { TipoConsulta } from '@prisma/client';
import { FormFieldConfig } from '../generic-upsert';
import { z } from 'zod';

export const avaliacaoSchema = z.object({
  queixaPrincipal: z.string().trim().min(1, {
    message: 'A queixa principal é obrigatória.',
  }),
  historiaDoenca: z.string().trim().optional(),
  exameFisico: z.string().trim().optional(),
  diagnostico: z.string().trim().optional(),
  objetivos: z.string().trim().optional(),
  data: z.date({
    message: 'A data é obrigatória.',
  }),
  pacienteId: z.string().trim().min(1, {
    message: 'O paciente é obrigatório.',
  }),
  id: z.string().optional(),
});

export type AvaliacaoFormData = z.infer<typeof avaliacaoSchema>;

export const avaliacaoDefaultValues: AvaliacaoFormData = {
  queixaPrincipal: '',
  historiaDoenca: '',
  exameFisico: '',
  diagnostico: '',
  objetivos: '',
  data: new Date(),
  pacienteId: '',
};

export const avaliacaoFields: FormFieldConfig[] = [
  {
    name: 'queixaPrincipal',
    label: 'Queixa Principal',
    type: 'textarea',
    placeholder: 'Digite a queixa principal...',
    gridColumn: 'full',
  },
  {
    name: 'historiaDoenca',
    label: 'História da Doença',
    type: 'textarea',
    placeholder: 'Digite a história da doença...',
    gridColumn: 'full',
  },
  {
    name: 'exameFisico',
    label: 'Exame Físico',
    type: 'textarea',
    placeholder: 'Digite o exame físico...',
    gridColumn: 'full',
  },
  {
    name: 'diagnostico',
    label: 'Diagnóstico',
    type: 'textarea',
    placeholder: 'Digite o diagnóstico...',
    gridColumn: 'full',
  },
  {
    name: 'objetivos',
    label: 'Objetivos',
    type: 'textarea',
    placeholder: 'Digite os objetivos...',
    gridColumn: 'full',
  },
  {
    name: 'data',
    label: 'Data',
    type: 'date',
    placeholder: 'Digite a data...',
    gridColumn: 'half',
  },
  {
    name: 'pacienteId',
    label: 'Paciente',
    type: 'select',
    placeholder: 'Selecione o paciente',
    options: [
      { label: 'Paciente 2', value: 'cmic1g7780000l40cvc0cj8bm' },
      { label: 'Paciente 3', value: 'cmic1g7780000l40cvc0cj8b' },
    ],
    gridColumn: 'half',
  },
];
