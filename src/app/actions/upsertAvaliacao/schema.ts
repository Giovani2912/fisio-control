import { z } from "zod";

export const upsertAvaliacaoSchema = z.object({
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
    tipo: z.string().trim().min(1, {
        message: "O tipo é obrigatório.",
    }),
    id: z.string().optional(),
});