import { Convenios, Sexo } from '@prisma/client';
import { FormFieldConfig } from '../generic-upsert';
import { z } from 'zod';
import { CONVENIO_OPTIONS, SEX_OPTIONS } from '@/constants/paciente';

// ===== PACIENTE =====
export const pacienteSchema = z.object({
  nome: z.string().trim().min(1, {
    message: 'O nome é obrigatório.',
  }),
  cpf: z.string().trim().min(1, {
    message: 'O CPF é obrigatório.',
  }),
  rg: z.string().trim().min(1, {
    message: 'O RG é obrigatório.',
  }),
  email: z
    .string()
    .trim()
    .min(1, {
      message: 'O email é obrigatório.',
    })
    .email('Formato de email inválido'),
  celular: z.string().trim().min(1, {
    message: 'O celular é obrigatório.',
  }),
  idade: z.string().trim().min(1, {
    message: 'A idade é obrigatória.',
  }),
  sexo: z.nativeEnum(Sexo),
  convenio: z.nativeEnum(Convenios),
  numeroConvenio: z.string().trim().min(1, {
    message: 'O número do convênio é obrigatório.',
  }),
  contato_emergencia: z.string().trim().min(1, {
    message: 'O contato de emergência é obrigatório.',
  }),
  criadoEm: z.string().optional(),
  atualizadoEm: z.string().optional(),
  id: z.string().optional(),
  ativo: z.boolean().optional(),
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;

export const pacienteDefaultValues: PacienteFormData = {
  id: '',
  nome: '',
  cpf: '',
  rg: '',
  email: '',
  celular: '',
  idade: '',
  sexo: 'MASCULINO',
  convenio: 'HAOC',
  numeroConvenio: '',
  contato_emergencia: '',
};

export const pacienteFields: FormFieldConfig[] = [
  {
    name: 'nome',
    label: 'Nome',
    type: 'text',
    placeholder: 'Digite o nome...',
    gridColumn: 'half',
  },
  {
    name: 'cpf',
    label: 'CPF',
    type: 'text',
    placeholder: 'Digite o CPF...',
    gridColumn: 'half',
  },
  {
    name: 'rg',
    label: 'RG',
    type: 'text',
    placeholder: 'Digite o RG...',
    gridColumn: 'half',
  },
  {
    name: 'idade',
    label: 'Idade',
    type: 'number',
    placeholder: 'Digite a idade...',
    gridColumn: 'half',
  },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'Digite o email...',
    gridColumn: 'half',
  },
  {
    name: 'celular',
    label: 'Celular',
    type: 'tel',
    placeholder: 'Digite o celular...',
    gridColumn: 'half',
  },
  {
    name: 'sexo',
    label: 'Sexo',
    type: 'select',
    placeholder: 'Selecione o sexo',
    options: SEX_OPTIONS,
    gridColumn: 'half',
  },
  {
    name: 'convenio',
    label: 'Convênio',
    type: 'select',
    placeholder: 'Selecione o convênio',
    options: CONVENIO_OPTIONS,
    gridColumn: 'half',
  },
  {
    name: 'numeroConvenio',
    label: 'Número do Convênio',
    type: 'text',
    placeholder: 'Digite o número do convênio...',
    gridColumn: 'full',
  },
  {
    name: 'contato_emergencia',
    label: 'Contato de Emergência',
    type: 'text',
    placeholder: 'Digite o contato de emergência...',
    gridColumn: 'full',
  },
];
