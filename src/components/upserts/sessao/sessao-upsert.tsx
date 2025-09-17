"use client";

import { toast } from "sonner";
import GenericUpsert from "../generic-upsert";
import {
    sessaoSchema,
    SessaoFormData,
    sessaoDefaultValues,
    sessaoFields
} from "./config";
// import { UpsertSessao } from "@/app/actions/UpsertSessao"; // Você precisará criar essa action

interface UpsertSessaoProps {
    isOpen: boolean;
    defaultValues?: SessaoFormData;
    sessaoId?: string;
    setIsOpen: (isOpen: boolean) => void;
}

const UpsertSessao = ({
    isOpen,
    defaultValues,
    sessaoId,
    setIsOpen,
}: UpsertSessaoProps) => {

    const handleSubmit = async (data: SessaoFormData, isUpdate: boolean) => {
        try {
            // await UpsertSessao(data);
            // Simulando a chamada da API por enquanto
            console.log("Salvando sessão:", data);

            toast.success(
                isUpdate
                    ? "Sessão atualizada com sucesso!"
                    : "Sessão cadastrada com sucesso!"
            );
        } catch (error) {
            console.error("Erro ao salvar sessão:", error);
            toast.error("Erro ao salvar sessão. Tente novamente.");
            throw error;
        }
    };

    return (
        <GenericUpsert<SessaoFormData>
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            title="Sessão"
            description="Insira as informações da sessão abaixo"
            schema={sessaoSchema}
            defaultValues={defaultValues || sessaoDefaultValues}
            fields={sessaoFields}
            onSubmit={handleSubmit}
            entityId={sessaoId}
        />
    );
};

export default UpsertSessao;