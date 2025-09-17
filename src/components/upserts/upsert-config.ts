import { z } from "zod";
import { Convenios, Sexo, StatusConsulta, TipoConsulta } from "@prisma/client";
import { FormFieldConfig } from "./generic-upsert";
import { CONVENIO_OPTIONS, SEX_OPTIONS } from "@/constants/paciente";
import { nativeEnum } from "zod/v3";
import { stat } from "fs";

// ===== PACIENTE =====
export const pacienteSchema = z.object({
    nome: z.string().trim().min(1, {
        message: "O nome é obrigatório.",
    }),
    cpf: z.string().trim().min(1, {
        message: "O CPF é obrigatório.",
    }),
    rg: z.string().trim().min(1, {
        message: "O RG é obrigatório.",
    }),
    email: z.string().trim().min(1, {
        message: "O email é obrigatório.",
    }).email("Formato de email inválido"),
    celular: z.string().trim().min(1, {
        message: "O celular é obrigatório.",
    }),
    idade: z.string().trim().min(1, {
        message: "A idade é obrigatória.",
    }),
    sexo: z.nativeEnum(Sexo),
    convenio: z.nativeEnum(Convenios),
    numeroConvenio: z.string().trim().min(1, {
        message: "O número do convênio é obrigatório.",
    }),
    contato_emergencia: z.string().trim().min(1, {
        message: "O contato de emergência é obrigatório.",
    }),
    criadoEm: z.string().optional(),
    atualizadoEm: z.string().optional(),
    id: z.string().optional(),
    ativo: z.boolean().optional()
});

export type PacienteFormData = z.infer<typeof pacienteSchema>;

export const pacienteDefaultValues: PacienteFormData = {
    nome: "",
    cpf: "",
    rg: "",
    email: "",
    celular: "",
    idade: "",
    sexo: "MASCULINO",
    convenio: "HAOC",
    numeroConvenio: "",
    contato_emergencia: "",
};

export const pacienteFields: FormFieldConfig[] = [
    {
        name: "nome",
        label: "Nome",
        type: "text",
        placeholder: "Digite o nome...",
        gridColumn: "half"
    },
    {
        name: "cpf",
        label: "CPF",
        type: "text",
        placeholder: "Digite o CPF...",
        gridColumn: "half"
    },
    {
        name: "rg",
        label: "RG",
        type: "text",
        placeholder: "Digite o RG...",
        gridColumn: "half"
    },
    {
        name: "idade",
        label: "Idade",
        type: "number",
        placeholder: "Digite a idade...",
        gridColumn: "half"
    },
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Digite o email...",
        gridColumn: "half"
    },
    {
        name: "celular",
        label: "Celular",
        type: "tel",
        placeholder: "Digite o celular...",
        gridColumn: "half"
    },
    {
        name: "sexo",
        label: "Sexo",
        type: "select",
        placeholder: "Selecione o sexo",
        options: SEX_OPTIONS,
        gridColumn: "half"
    },
    {
        name: "convenio",
        label: "Convênio",
        type: "select",
        placeholder: "Selecione o convênio",
        options: CONVENIO_OPTIONS,
        gridColumn: "half"
    },
    {
        name: "numeroConvenio",
        label: "Número do Convênio",
        type: "text",
        placeholder: "Digite o número do convênio...",
        gridColumn: "full"
    },
    {
        name: "contato_emergencia",
        label: "Contato de Emergência",
        type: "text",
        placeholder: "Digite o contato de emergência...",
        gridColumn: "full"
    }
];

// ===== AVALIAÇÃO (exemplo) =====
export const avaliacaoSchema = z.object({
    titulo: z.string().trim().min(1, {
        message: "O título é obrigatório.",
    }),
    descricao: z.string().trim().min(1, {
        message: "A descrição é obrigatória.",
    }),
    data: z.string().trim().min(1, {
        message: "A data é obrigatória.",
    }),
    pacienteId: z.string().trim().min(1, {
        message: "O paciente é obrigatório.",
    }),
    tipo: z.string().trim().min(1, {
        message: "O tipo é obrigatório.",
    }),
    id: z.string().optional(),
});

export type AvaliacaoFormData = z.infer<typeof avaliacaoSchema>;

export const avaliacaoDefaultValues: AvaliacaoFormData = {
    titulo: "",
    descricao: "",
    data: "",
    pacienteId: "",
    tipo: "",
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
        name: "data",
        label: "Data",
        type: "text", // você pode criar um campo de data customizado
        placeholder: "Digite a data...",
        gridColumn: "half"
    },
    {
        name: "tipo",
        label: "Tipo",
        type: "select",
        placeholder: "Selecione o tipo",
        options: [
            { value: "INICIAL", label: "Inicial" },
            { value: "FOLLOW_UP", label: "Follow-up" },
            { value: "ALTA", label: "Alta" }
        ],
        gridColumn: "half"
    },
    {
        name: "descricao",
        label: "Descrição",
        type: "text",
        placeholder: "Digite a descrição da avaliação...",
        gridColumn: "full"
    },
];

// ===== CONSULTA (exemplo) =====
export const consultaSchema = z.object({
    data: z.string().trim().min(1, {
        message: "A data é obrigatória.",
    }),
    hora: z.string().trim().min(1, {
        message: "A hora é obrigatória.",
    }),
    pacienteId: z.string().trim().min(1, {
        message: "O paciente é obrigatório.",
    }),
    observacoes: z.string().optional(),
    status: z.string().trim().min(1, {
        message: "O status é obrigatório.",
    }),
    id: z.string().optional(),
});

export type ConsultaFormData = z.infer<typeof consultaSchema>;

export const consultaDefaultValues: ConsultaFormData = {
    data: "",
    hora: "",
    pacienteId: "",
    observacoes: "",
    status: "AGENDADA",
};

export const consultaFields: FormFieldConfig[] = [
    {
        name: "data",
        label: "Data",
        type: "text", // você pode usar um date picker
        placeholder: "Digite a data...",
        gridColumn: "half"
    },
    {
        name: "hora",
        label: "Hora",
        type: "text", // você pode usar um time picker
        placeholder: "Digite a hora...",
        gridColumn: "half"
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        placeholder: "Selecione o status",
        options: [
            { value: "AGENDADA", label: "Agendada" },
            { value: "CONFIRMADA", label: "Confirmada" },
            { value: "REALIZADA", label: "Realizada" },
            { value: "CANCELADA", label: "Cancelada" }
        ],
        gridColumn: "half"
    },
    {
        name: "observacoes",
        label: "Observações",
        type: "text",
        placeholder: "Digite as observações...",
        gridColumn: "full"
    },
];

// ===== Sessão (exemplo) =====
export const sessaoSchema = z.object({
    data: z.string().trim().min(1, {
        message: "A data é obrigatória.",
    }),
    horaInicio: z.string().trim().min(1, {
        message: "A hora de início é obrigatória.",
    }),
    horaFim: z.string().trim().min(1, {
        message: "A hora de fim é obrigatória.",
    }),
    tipo: nativeEnum(TipoConsulta),
    pacienteId: z.string().trim().min(1, {
        message: "O paciente é obrigatório.",
    }),
    status: nativeEnum(StatusConsulta),
    observacoes: z.string().optional(),
    id: z.string().optional(),
    criadoEm: z.string().optional(),
    atualizadoEm: z.string().optional(),
    ativo: z.boolean().optional()
});
export type SessaoFormData = z.infer<typeof sessaoSchema>;
export const sessaoDefaultValues: SessaoFormData = {
    data: "",
    horaInicio: "",
    horaFim: "",
    tipo: "CONSULTA",
    pacienteId: "",
    status: "AGENDADA",
    observacoes: "",
    ativo: true
};
export const sessaoFields: FormFieldConfig[] = [
    {
        name: "data",
        label: "Data",
        type: "text", // você pode usar um date picker
        placeholder: "Digite a data...",
        gridColumn: "half"
    },
    {
        name: "horaInicio",
        label: "Hora Início",
        type: "text", // você pode usar um time picker
        placeholder: "Digite a hora de início...",
        gridColumn: "half"
    },
    {
        name: "horaFim",
        label: "Hora Fim",
        type: "text", // você pode usar um time picker
        placeholder: "Digite a hora de fim...",
        gridColumn: "half"
    },
    {
        name: "tipo",
        label: "Tipo",
        type: "select",
        options: [
            { value: "CONSULTA", label: "Consulta" },
            { value: "EXAME", label: "Exame" },
            { value: "RETORNO", label: "Retorno" }
        ],
        gridColumn: "half"
    },
    {
        name: "status",
        label: "Status",
        type: "select",
        options: [
            { value: "AGENDADA", label: "Agendada" },
            { value: "CONFIRMADA", label: "Confirmada" },
            { value: "REALIZADA", label: "Realizada" },
            { value: "CANCELADA", label: "Cancelada" }
        ],
        gridColumn: "half"
    },
    {
        name: "observacoes",
        label: "Observações",
        type: "text",
        placeholder: "Digite as observações...",
        gridColumn: "full"
    },
    {
        name: "ativo",
        label: "Ativo",
        type: "text",
        gridColumn: "half"
    },
    {
        name: "pacienteId",
        label: "Paciente ID",
        type: "text",
        placeholder: "Digite o ID do paciente...",
        gridColumn: "half"
    },
    {
        name: "valorConsulta",
        label: "Valor da Consulta",
        type: "number",
        placeholder: "Digite o valor da consulta...",
        gridColumn: "half"
    }
];
