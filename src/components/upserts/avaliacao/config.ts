import { TipoConsulta } from "@prisma/client";
import { FormFieldConfig } from "../generic-upsert";
import { z } from "zod";

// ===== AVALIAÇÃO (exemplo) =====
export const avaliacaoSchema = z.object({
    titulo: z.string().trim().min(1, {
        message: "O título é obrigatório.",
    }),
    descricao: z.string().trim().min(1, {
        message: "A descrição é obrigatória.",
    }),
    diagnostico: z.string().trim().min(1, {
        message: "O diagnóstico é obrigatório.",
    }),
    condutas: z.string().trim().min(1, {
        message: "O campo condutas é obrigatório.",
    }),
    objetivos: z.string().trim().min(1, {
        message: "O campo objetivos é obrigatório.",
    }),
    data: z.string().trim().min(1, {
        message: "A data é obrigatória.",
    }),
    pacienteId: z.string().trim().min(1, {
        message: "O paciente é obrigatório.",
    }),
    tipo: z.nativeEnum(TipoConsulta, {
        message: "O tipo é obrigatório.",
    }),
    id: z.string().optional(),
});

export type AvaliacaoFormData = z.infer<typeof avaliacaoSchema>;

export const avaliacaoDefaultValues: AvaliacaoFormData = {
    titulo: "",
    descricao: "",
    diagnostico: "",
    condutas: "",
    objetivos: "",
    data: "",
    pacienteId: "",
    tipo: "AVALIACAO",
};

export const avaliacaoFields: FormFieldConfig[] = [
    {
        name: "titulo",
        label: "Título",
        type: "text",
        placeholder: "Digite o título da avaliação...",
        gridColumn: "full"
    },
    {
        name: "descricao",
        label: "Descrição",
        type: "textarea",
        placeholder: "Digite a descrição da avaliação...",
        gridColumn: "full"
    },
    {
        name: "diagnostico",
        label: "Diagnóstico",
        type: "textarea",
        placeholder: "Digite o diagnóstico da avaliação...",
        gridColumn: "full"
    },
    {
        name: "condutas",
        label: "Condutas",
        type: "textarea",
        placeholder: "Digite as condutas da avaliação...",
        gridColumn: "full"
    },
    {
        name: "objetivos",
        label: "Objetivos",
        type: "textarea",
        placeholder: "Digite os objetivos da avaliação...",
        gridColumn: "full"
    },
    {
        name: "data",
        label: "Data",
        type: "date", // você pode criar um campo de data customizado
        placeholder: "Digite a data...",
        gridColumn: "half"
    },
    {
        name: "tipo",
        label: "Tipo",
        type: "select",
        placeholder: "Selecione o tipo",
        options: [
            { label: "Avaliação Inicial", value: TipoConsulta.AVALIACAO },
            { label: "Retorno", value: TipoConsulta.RETORNO },
            { label: "Sessão", value: TipoConsulta.SESSAO },
            { label: "Reavaliação", value: TipoConsulta.REAVALIACAO },
        ],
        gridColumn: "half"
    },
];