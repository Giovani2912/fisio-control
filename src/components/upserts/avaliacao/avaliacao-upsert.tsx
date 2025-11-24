'use client';

import { toast } from 'sonner';
import GenericUpsert from '../generic-upsert';
import {
  avaliacaoSchema,
  AvaliacaoFormData,
  avaliacaoDefaultValues,
  avaliacaoFields,
} from './config';
import { upsertAvaliacao } from '@/app/actions/upsertAvaliacao';
// import { upsertAvaliacao } from "@/app/actions/upsertAvaliacao"; // Você precisará criar essa action

interface UpsertAvaliacaoProps {
  isOpen: boolean;
  defaultValues?: AvaliacaoFormData;
  avaliacaoId?: string;
  setIsOpen: (isOpen: boolean) => void;
}

const UpsertAvaliacao = ({
  isOpen,
  defaultValues,
  avaliacaoId,
  setIsOpen,
}: UpsertAvaliacaoProps) => {
  const handleSubmit = async (data: AvaliacaoFormData, isUpdate: boolean) => {
    try {
      await upsertAvaliacao({ ...data, id: avaliacaoId });
      setIsOpen(false);

      toast.success(
        avaliacaoId
          ? 'Avaliação atualizada com sucesso!'
          : 'Avaliação cadastrada com sucesso!',
      );
    } catch (error) {
      console.error('Erro ao salvar avaliação:', error);
      toast.error('Erro ao salvar avaliação. Tente novamente.');
      throw error;
    }
  };

  return (
    <GenericUpsert<AvaliacaoFormData>
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      title="avaliação"
      description="Insira as informações da avaliação abaixo"
      schema={avaliacaoSchema}
      defaultValues={defaultValues || avaliacaoDefaultValues}
      fields={avaliacaoFields}
      onSubmit={handleSubmit}
      entityId={avaliacaoId}
    />
  );
};

export default UpsertAvaliacao;
