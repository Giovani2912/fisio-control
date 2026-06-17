'use server';

import Anthropic from '@anthropic-ai/sdk';
import db from '../../../lib/prisma';
import { generateSoapSchema, saveProntuarioSchema } from './schema';
import { revalidatePath } from 'next/cache';

const REGIOES_CORPO = {
  coluna_cervical: 'Coluna Cervical',
  coluna_toracica: 'Coluna Torácica',
  coluna_lombar: 'Coluna Lombar',
  ombro_direito: 'Ombro Direito',
  ombro_esquerdo: 'Ombro Esquerdo',
  cotovelo_direito: 'Cotovelo Direito',
  cotovelo_esquerdo: 'Cotovelo Esquerdo',
  punho_mao_direito: 'Punho/Mão Direito',
  punho_mao_esquerdo: 'Punho/Mão Esquerdo',
  quadril_direito: 'Quadril Direito',
  quadril_esquerdo: 'Quadril Esquerdo',
  joelho_direito: 'Joelho Direito',
  joelho_esquerdo: 'Joelho Esquerdo',
  tornozelo_pe_direito: 'Tornozelo/Pé Direito',
  tornozelo_pe_esquerdo: 'Tornozelo/Pé Esquerdo',
  mmii_bilateral: 'MMII Bilateral',
  mmss_bilateral: 'MMSS Bilateral',
  outro: 'Outro',
} as const;

export type GenerateSoapParams = {
  queixaDoDia: string;
  nivelDor?: number;
  regiaoCorpo: string;
  tecnicas: string;
  respostaTratamento: string;
  observacoes?: string;
};

export const generateSoapNote = async (params: GenerateSoapParams): Promise<string> => {
  const validatedData = generateSoapSchema.parse(params);

  const regiaoLabel =
    REGIOES_CORPO[validatedData.regiaoCorpo as keyof typeof REGIOES_CORPO] ??
    validatedData.regiaoCorpo;

  const nivelDorTexto =
    validatedData.nivelDor !== undefined
      ? `Nível de dor: ${validatedData.nivelDor}/10`
      : 'Sem relato de dor significativa';

  const prompt = `Você é um assistente clínico especializado em fisioterapia. Com base nos dados fornecidos pelo fisioterapeuta, redija uma evolução clínica no formato SOAP (Subjetivo, Objetivo, Avaliação, Plano) em português do Brasil, com linguagem técnica profissional.

DADOS DA SESSÃO:
- Queixa do paciente na sessão: ${validatedData.queixaDoDia}
- ${nivelDorTexto}
- Região trabalhada: ${regiaoLabel}
- Técnicas e procedimentos utilizados: ${validatedData.tecnicas}
- Resposta ao tratamento: ${validatedData.respostaTratamento}
${validatedData.observacoes ? `- Observações adicionais: ${validatedData.observacoes}` : ''}

INSTRUÇÕES:
- Siga rigorosamente o formato SOAP com os títulos EXATOS (sem formatação markdown/negrito): "S (Subjetivo):", "O (Objetivo):", "A (Avaliação):", "P (Plano):" — cada seção começa com esse cabeçalho em uma nova linha, seguido do conteúdo na próxima linha
- Use terminologia clínica adequada à fisioterapia
- Seja objetivo e conciso em cada seção
- Não inclua dados identificadores do paciente (nome, CPF, etc.)
- Escreva em 3ª pessoa (ex: "Paciente refere...")
- Retorne APENAS o texto do prontuário, sem explicações adicionais, sem título "EVOLUÇÃO CLÍNICA" ou similar

⚠️ AVISO: Este texto é gerado por IA como copiloto clínico e necessita da revisão e validação do profissional fisioterapeuta portador do CREFITO.`;

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });

  const textBlock = message.content.find((b) => b.type === 'text');
  if (!textBlock || textBlock.type !== 'text') {
    throw new Error('Resposta inesperada da IA.');
  }

  return textBlock.text;
};

export type SaveProntuarioParams = GenerateSoapParams & {
  pacienteId: string;
  evolucao: string;
  id?: string;
};

export const saveProntuario = async (params: SaveProntuarioParams) => {
  const validatedData = saveProntuarioSchema.parse(params);

  const data = {
    pacienteId: validatedData.pacienteId,
    evolucao: validatedData.evolucao,
    queixaDoDia: validatedData.queixaDoDia,
    nivelDor: validatedData.nivelDor,
    regiaoCorpo: validatedData.regiaoCorpo,
    tecnicas: validatedData.tecnicas,
    respostaTratamento: validatedData.respostaTratamento,
    observacoes: validatedData.observacoes,
  };

  if (validatedData.id) {
    await db.prontuario.update({ where: { id: validatedData.id }, data });
  } else {
    await db.prontuario.create({ data });
  }

  revalidatePath(`/admin/pacientes/${validatedData.pacienteId}`);
};

export const deleteProntuario = async (id: string) => {
  const deleted = await db.prontuario.delete({ where: { id } });
  revalidatePath(`/admin/pacientes/${deleted.pacienteId}`);
};
