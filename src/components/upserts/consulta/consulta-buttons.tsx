'use client';

// Exemplo para avaliação

import { GenericCreateButton, GenericEditButton } from '../generic-buttons';
import UpsertConsulta from './consulta-upsert';
import { ConsultaFormData } from './config';

interface CreateConsultaButtonProps {
  text?: string;
  variant?: "outline" | "ghost" | "default" | "link" | "destructive" | "secondary" | null | undefined;
  pacienteOptions?: { value: string; label: string }[];
}

export const CreateConsultaButton = ({
  text = 'Nova Consulta',
  variant="default",
  pacienteOptions,
}: CreateConsultaButtonProps) => {
  return (
    <GenericCreateButton text={text} variant={variant}>
      {(isOpen, setIsOpen) => (
        <UpsertConsulta isOpen={isOpen} setIsOpen={setIsOpen} pacienteOptions={pacienteOptions} />
      )}
    </GenericCreateButton>
  );
};

interface EditConsultaButtonProps {
  avaliacao: ConsultaFormData & { id: string };
}

export const EditConsultaButton = ({
  avaliacao,
}: EditConsultaButtonProps) => {
  return (
    <GenericEditButton entity={avaliacao}>
      {(isOpen, setIsOpen, entity) => (
        <UpsertConsulta
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          defaultValues={entity}
          avaliacaoId={entity.id}
        />
      )}
    </GenericEditButton>
  );
};
