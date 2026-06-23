import { z } from 'zod';
import { FormFieldConfig } from '../generic-upsert';

export const prontuarioInputSchema = z.object({
  queixaDoDia: z.string().trim().min(1, { message: 'A queixa do dia é obrigatória.' }),
  nivelDor: z.string().optional(),
  regiaoCorpo: z.string().trim().min(1, { message: 'A região do corpo é obrigatória.' }),
  tecnicas: z.string().trim().min(1, { message: 'As técnicas utilizadas são obrigatórias.' }),
  respostaTratamento: z.string().trim().min(1, { message: 'A resposta ao tratamento é obrigatória.' }),
  observacoes: z.string().trim().optional(),
});

export type ProntuarioInputData = z.infer<typeof prontuarioInputSchema>;

export const prontuarioInputDefaultValues: ProntuarioInputData = {
  queixaDoDia: '',
  nivelDor: '',
  regiaoCorpo: '',
  tecnicas: '',
  respostaTratamento: '',
  observacoes: '',
};

export const DOR_OPTIONS = Array.from({ length: 11 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? '0 - Sem dor' : i === 10 ? '10 - Dor máxima' : String(i),
}));

export const REGIAO_CORPO_OPTIONS = [
  { value: 'coluna_cervical', label: 'Coluna Cervical' },
  { value: 'coluna_toracica', label: 'Coluna Torácica' },
  { value: 'coluna_lombar', label: 'Coluna Lombar' },
  { value: 'ombro_direito', label: 'Ombro Direito' },
  { value: 'ombro_esquerdo', label: 'Ombro Esquerdo' },
  { value: 'cotovelo_direito', label: 'Cotovelo Direito' },
  { value: 'cotovelo_esquerdo', label: 'Cotovelo Esquerdo' },
  { value: 'punho_mao_direito', label: 'Punho/Mão Direito' },
  { value: 'punho_mao_esquerdo', label: 'Punho/Mão Esquerdo' },
  { value: 'quadril_direito', label: 'Quadril Direito' },
  { value: 'quadril_esquerdo', label: 'Quadril Esquerdo' },
  { value: 'joelho_direito', label: 'Joelho Direito' },
  { value: 'joelho_esquerdo', label: 'Joelho Esquerdo' },
  { value: 'tornozelo_pe_direito', label: 'Tornozelo/Pé Direito' },
  { value: 'tornozelo_pe_esquerdo', label: 'Tornozelo/Pé Esquerdo' },
  { value: 'mmii_bilateral', label: 'MMII Bilateral' },
  { value: 'mmss_bilateral', label: 'MMSS Bilateral' },
  { value: 'outro', label: 'Outro' },
];

export const RESPOSTA_TRATAMENTO_OPTIONS = [
  { value: 'excelente', label: 'Excelente' },
  { value: 'boa', label: 'Boa' },
  { value: 'parcial', label: 'Parcial' },
  { value: 'sem_resposta', label: 'Sem resposta' },
  { value: 'piora', label: 'Piora' },
];

export const prontuarioFields: FormFieldConfig[] = [
  {
    name: 'queixaDoDia',
    label: 'Queixa do Dia',
    type: 'textarea',
    placeholder: 'Ex: dor 4/10 ao elevar o ombro, sensação de cansaço nas costas...',
    gridColumn: 'full',
  },
  {
    name: 'regiaoCorpo',
    label: 'Região Trabalhada',
    type: 'select',
    placeholder: 'Selecione a região',
    options: REGIAO_CORPO_OPTIONS,
    gridColumn: 'half',
  },
  {
    name: 'nivelDor',
    label: 'Nível de Dor (EVA)',
    type: 'select',
    placeholder: 'Selecione 0-10',
    options: DOR_OPTIONS,
    gridColumn: 'half',
  },
  {
    name: 'tecnicas',
    label: 'Técnicas Utilizadas',
    type: 'textarea',
    placeholder: 'Ex: mobilização grau II, TENS, ultrassom pulsado, exercícios de manguito rotador...',
    gridColumn: 'full',
  },
  {
    name: 'respostaTratamento',
    label: 'Resposta ao Tratamento',
    type: 'select',
    placeholder: 'Selecione a resposta',
    options: RESPOSTA_TRATAMENTO_OPTIONS,
    gridColumn: 'full',
  },
  {
    name: 'observacoes',
    label: 'Observações Adicionais (opcional)',
    type: 'textarea',
    placeholder: 'Qualquer observação relevante para o prontuário...',
    gridColumn: 'full',
  },
];
