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

  const handleFieldChange = (
    name: string,
    value: unknown,
    setValue: (name: string, value: unknown) => void,
  ) => {
    if (name === 'horaInicio' && value instanceof Date) {
      const rounded = new Date(value);
      rounded.setMinutes(0);
      rounded.setSeconds(0);
      rounded.setMilliseconds(0);
      setValue('horaInicio', rounded);
      const fim = new Date(rounded);
      fim.setHours(fim.getHours() + 1);
      setValue('horaFim', fim);
    }
  };

  const handleSubmit = async (data: ConsultaFormData) => {
    try {
      await upsertConsulta({
        ...data,
        id: avaliacaoId,
        paciente: pacienteId ?? data.paciente, // URL (página do paciente) ou form (página de consultas)
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
      onFieldChange={handleFieldChange}
    />
  );
};

export default UpsertConsulta;
