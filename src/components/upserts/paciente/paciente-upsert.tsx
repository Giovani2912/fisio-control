'use client';

import { toast } from 'sonner';
import GenericUpsert from '../generic-upsert';
import {
  pacienteSchema,
  PacienteFormData,
  pacienteDefaultValues,
  pacienteFields,
} from './config';
import { upsertPaciente } from '@/app/actions/upsertPaciente';

interface UpsertPacienteProps {
  isOpen: boolean;
  defaultValues?: PacienteFormData;
  pacienteId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertPaciente = ({
  isOpen,
  defaultValues,
  pacienteId,
  setIsOpen,
}: UpsertPacienteProps) => {
  const handleSubmit = async (data: PacienteFormData) => {
    try {
      await upsertPaciente({ ...data, id: pacienteId });
      setIsOpen(false);
      toast.success(
        pacienteId
          ? 'Paciente atualizado com sucesso!'
          : 'Paciente cadastrado com sucesso!',
      );
    } catch (error) {
      console.error('Erro ao salvar paciente:', error);
      toast.error('Erro ao salvar paciente. Tente novamente.');
      throw error;
    }
  };

  return (
    <GenericUpsert<PacienteFormData>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="Paciente"
      description="Insira as informações da paciente abaixo"
      schema={pacienteSchema}
      defaultValues={defaultValues || pacienteDefaultValues}
      fields={pacienteFields}
      onSubmit={handleSubmit}
      entityId={pacienteId}
    />
  );
};

export default UpsertPaciente;
