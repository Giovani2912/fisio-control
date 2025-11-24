'use client';

// Exemplo para avaliação

import { GenericCreateButton, GenericEditButton } from '../generic-buttons';
import { AvaliacaoFormData } from '../upsert-config';
import UpsertAvaliacao from './avaliacao-upsert';

interface CreateAvaliacaoButtonProps {
  text?: string;
}

export const CreateAvaliacaoButton = ({
  text = 'Nova Avaliação',
}: CreateAvaliacaoButtonProps) => {
  return (
    <GenericCreateButton text={text}>
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
