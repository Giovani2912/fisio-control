'use client';

import { toast } from 'sonner';
import { useParams } from 'next/navigation';
import GenericUpsert from '../generic-upsert';
import { consultaDefaultValues, consultaFields, ConsultaFormData, consultaSchema } from './config';
import type { FormFieldConfig, SelectOption } from '../generic-upsert';
import { upsertConsulta } from '@/app/actions/upsertConsulta';

interface UpsertConsultaProps {
  isOpen: boolean;
  defaultValues?: ConsultaFormData;
  avaliacaoId?: string;
  setIsOpen: (isOpen: boolean) => void;
  fields?: FormFieldConfig[];
  pacienteOptions?: SelectOption[];
}

const UpsertConsulta = ({
  isOpen,
  defaultValues,
  avaliacaoId,
  setIsOpen,
  fields,
  pacienteOptions,
}: UpsertConsultaProps) => {
  const params = useParams();
  const pacienteId = params.id as string; // Pega o ID do paciente da URL

  const handleSubmit = async (data: ConsultaFormData) => {
    try {
      await upsertConsulta({
        ...data,
        id: avaliacaoId,
        pacienteId, // Adiciona o pacienteId da URL
      });
      setIsOpen(false);

      toast.success(
        avaliacaoId
          ? 'Consulta atualizada com sucesso!'
          : 'Consulta cadastrada com sucesso!',
      );
    } catch (error) {
      console.error('Erro ao salvar consulta:', error);
      toast.error('Erro ao salvar consulta. Tente novamente.');
      throw error;
    }
  };

  return (
    <GenericUpsert<ConsultaFormData>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="consulta"
      description="Insira as informações da consulta abaixo"
      schema={consultaSchema}
      defaultValues={defaultValues || consultaDefaultValues}
      fields={
        fields
          ? fields
          : pacienteOptions
          ? consultaFields.map(f =>
              f.name === 'paciente' ? { ...f, options: pacienteOptions } : f,
            )
          : consultaFields
      }
      onSubmit={handleSubmit}
      entityId={avaliacaoId}
    />
  );
};

export default UpsertConsulta;
