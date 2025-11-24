'use client';
// ===== BOTÕES ESPECÍFICOS (usando os genéricos) =====

import { GenericCreateButton, GenericEditButton } from '../generic-buttons';
import { PacienteFormData } from './config';
import UpsertPaciente from './paciente-upsert';

// Exemplo para paciente
interface CreatePacienteButtonProps {
  text?: string;
}

export const CreatePacienteButton = ({
  text = 'Novo Paciente',
}: CreatePacienteButtonProps) => {
  return (
    <GenericCreateButton text={text}>
      {(isOpen, setIsOpen) => (
        <UpsertPaciente isOpen={isOpen} setIsOpen={setIsOpen} />
      )}
    </GenericCreateButton>
  );
};

interface EditPacienteButtonProps {
  paciente: PacienteFormData & { id: string };
}

export const EditPacienteButton = ({ paciente }: EditPacienteButtonProps) => {
  return (
    <GenericEditButton entity={paciente}>
      {(isOpen, setIsOpen, entity) => (
        <UpsertPaciente
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          defaultValues={entity}
          pacienteId={entity.id}
        />
      )}
    </GenericEditButton>
  );
};
