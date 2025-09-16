import { Convenios, Sexo } from "@prisma/client";
import { z } from "zod";

export const upsertPacienteSchema = z.object({
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
    convenio: z.nativeEnum(Convenios).optional(),
    numeroConvenio: z.string().trim().min(1, {
        message: "O número do convênio é obrigatório.",
    }),
    contato_emergencia: z.string().trim().min(1, {
        message: "O contato de emergência é obrigatório.",
    }),
});