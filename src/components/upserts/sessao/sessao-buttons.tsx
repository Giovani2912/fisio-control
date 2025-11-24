'use client';

import { GenericCreateButton, GenericEditButton } from '../generic-buttons';
import { SessaoFormData } from './config';
import UpsertSessao from './sessao-upsert';

// Exemplo para sessão
interface CreateSessaoButtonProps {
  text?: string;
}

export const CreateSessaoButton = ({
  text = 'Nova Sessão',
}: CreateSessaoButtonProps) => {
  return (
    <GenericCreateButton text={text}>
      {(isOpen, setIsOpen) => (
        <UpsertSessao isOpen={isOpen} setIsOpen={setIsOpen} />
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
