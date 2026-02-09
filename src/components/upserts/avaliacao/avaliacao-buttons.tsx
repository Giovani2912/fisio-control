'use client';

// Exemplo para avaliação

import { GenericCreateButton, GenericEditButton } from '../generic-buttons';
import UpsertAvaliacao from './avaliacao-upsert';
import { AvaliacaoFormData } from './config';

interface CreateAvaliacaoButtonProps {
  text?: string;
  variant?: "outline" | "ghost" | "default" | "link" | "destructive" | "secondary" | null | undefined;
}

export const CreateAvaliacaoButton = ({
  text = 'Nova Avaliação',
  variant="default"
}: CreateAvaliacaoButtonProps) => {
  return (
    <GenericCreateButton text={text} variant={variant}>
      {(isOpen, setIsOpen) => (
        <UpsertAvaliacao isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </GenericCreateButton>
  );
};

interface EditAvaliacaoButtonProps {
  avaliacao: AvaliacaoFormData & { id: string };
}

export const EditAvaliacaoButton = ({
  avaliacao,
}: EditAvaliacaoButtonProps) => {
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
