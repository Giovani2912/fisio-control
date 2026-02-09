import { StatusConsulta, TipoConsulta } from '@prisma/client';
import { FormFieldConfig } from '../generic-upsert';
import { z } from 'zod';
import { STATUS_OPTIONS, TIPO_CONSULTA } from '@/constants/consulta';

export const consultaSchema = z.object({
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
    tipo: z.nativeEnum(TipoConsulta, {
      message: 'O tipo é obrigatório.',
    }),
    status: z.nativeEnum(StatusConsulta, {
      message: 'O status é obrigatório.',
    }),
    observacoes: z.string().trim().optional(),
    valorConsulta: z.number().optional(),
    paciente: z.string().trim().min(1, {
      message: 'O paciente é obrigatório.',
    }),
});

export type ConsultaFormData = z.infer<typeof consultaSchema>;

export const consultaDefaultValues: ConsultaFormData = {
  data: new Date(),
  horaInicio: new Date(),
  horaFim: new Date(),
  tipo: 'AVALIACAO',
  status: 'AGENDADA',
  observacoes: '',
  valorConsulta: 0,
  paciente: '',
};

export const consultaFields: FormFieldConfig[] = [
    {
        name: 'paciente',
        label: 'Paciente',
        type: 'select',
        placeholder: 'Selecione o paciente...',
    },
    {
        name: 'data',
        label: 'Data',
        type: 'date',
        placeholder: 'Selecione a data da consulta...',
    },
    {
        name: 'horaInicio',
        label: 'Hora Início',
        type: 'time',
        placeholder: 'Selecione a hora de início...',   
    },
    {
        name: 'horaFim',
        label: 'Hora Fim',
        type: 'time',
        placeholder: 'Selecione a hora de fim...',
    },
    {
        name: 'tipo',
        label: 'Tipo',
        type: 'select',
        placeholder: 'Selecione o tipo da consulta...',
        options: TIPO_CONSULTA,
    },
    {
        name: 'status',
        label: 'Status',
        type: 'select',
        placeholder: 'Selecione o status da consulta...',
        options: STATUS_OPTIONS,
    },
    {
        name: 'valorConsulta',
        label: 'Valor da Consulta', 
        type: 'number',
        placeholder: 'Digite o valor da consulta...',
        gridColumn: 'half',
    },
    {
        name: 'observacoes',    
        label: 'Observações',
        type: 'textarea',
        placeholder: 'Digite observações adicionais...',
        gridColumn: 'half',
    },
];
