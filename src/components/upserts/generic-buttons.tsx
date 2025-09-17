"use client";

import { PlusIcon, PencilIcon } from "lucide-react";
import { useState, ReactNode } from "react";
import UpsertAvaliacao from "./avaliacao-upsert";
import { AvaliacaoFormData, SessaoFormData } from "./upsert-config";
import { Button } from "../ui/button";
import UpsertSessao from "./sessao-upsert";

// ===== BOTÃO DE CRIAR GENÉRICO =====
interface GenericCreateButtonProps {
    text?: string;
    children: (isOpen: boolean, setIsOpen: (open: boolean) => void) => ReactNode;
}

export const GenericCreateButton = ({ text, children }: GenericCreateButtonProps) => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Button
                className="cursor-pointer font-bold"
                onClick={() => setDialogIsOpen(true)}
            >
                <span className="hidden md:block">{text}</span>
                <PlusIcon />
            </Button>
            {children(dialogIsOpen, setDialogIsOpen)}
        </>
    );
};

// ===== BOTÃO DE EDITAR GENÉRICO =====
interface GenericEditButtonProps<T> {
    entity: T;
    children: (isOpen: boolean, setIsOpen: (open: boolean) => void, entity: T) => ReactNode;
    variant?: "outline" | "ghost" | "default";
    size?: "default" | "sm" | "lg" | "icon";
    iconColor?: string;
}

export function GenericEditButton<T>({
    entity,
    children,
    variant = "outline",
    size = "icon",
    iconColor = "text-green-600"
}: GenericEditButtonProps<T>) {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    return (
        <>
            <Button
                variant={variant}
                size={size}
                className="cursor-pointer"
                onClick={() => setDialogIsOpen(true)}
            >
                <PencilIcon className={iconColor} />
            </Button>
            {children(dialogIsOpen, setDialogIsOpen, entity)}
        </>
    );
}

// ===== BOTÕES ESPECÍFICOS (usando os genéricos) =====

// Exemplo para avaliação

interface CreateAvaliacaoButtonProps {
    text?: string;
}

export const CreateAvaliacaoButton = ({ text = "Nova Avaliação" }: CreateAvaliacaoButtonProps) => {
    return (
        <GenericCreateButton text={text}>
            {(isOpen, setIsOpen) => (
                <UpsertAvaliacao
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </GenericCreateButton>
    );
};

interface EditAvaliacaoButtonProps {
    avaliacao: AvaliacaoFormData & { id: string };
}

export const EditAvaliacaoButton = ({ avaliacao }: EditAvaliacaoButtonProps) => {
    return (
        <GenericEditButton entity={avaliacao}>
            {(isOpen, setIsOpen, entity) => (
                <UpsertAvaliacao
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    defaultValues={entity}
                    avaliacaoId={entity.id}
                />
            )}
        </GenericEditButton>
    );
};


// ===== BOTÕES ESPECÍFICOS (usando os genéricos) =====

// Exemplo para sessão
interface CreateSessaoButtonProps {
    text?: string;
}

export const CreateSessaoButton = ({ text = "Nova Sessão" }: CreateSessaoButtonProps) => {
    return (
        <GenericCreateButton text={text}>
            {(isOpen, setIsOpen) => (
                <UpsertSessao
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </GenericCreateButton>
    );
};

interface EditSessaoButtonProps {
    sessao: SessaoFormData & { id: string };
}

export const EditSessaoButton = ({ sessao }: EditSessaoButtonProps) => {
    return (
        <GenericEditButton entity={sessao}>
            {(isOpen, setIsOpen, entity) => (
                <UpsertSessao
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    defaultValues={entity}
                    sessaoId={entity.id}
                />
            )}
        </GenericEditButton>
    );
};