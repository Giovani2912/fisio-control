'use client';

import { EditConsultaButton } from '@/components/upserts/consulta/consulta-buttons';
import { DeleteConsultaDialog } from './delete-dialog';
import type { SelectOption } from '@/components/upserts/generic-upsert';
import type { ConsultaFormData } from '@/components/upserts/consulta/config';
import type { Consulta } from '../data/columns';
import { cn } from '@/lib/utils';

interface ConsultaActionsProps {
  consulta: Consulta;
  pacienteOptions: SelectOption[];
  className?: string;
}

export function ConsultaActions({
  consulta,
  pacienteOptions,
  className,
}: ConsultaActionsProps) {
  const editEntity: ConsultaFormData & { id: string } = {
    id: consulta.id,
    paciente: consulta.pacienteId,
    data: consulta.dataValue,
    horaInicio: consulta.horaInicioValue,
    horaFim: consulta.horaFimValue,
    tipo: consulta.tipo as ConsultaFormData['tipo'],
    status: consulta.status as ConsultaFormData['status'],
    valorConsulta: consulta.valorConsultaValue,
    observacoes: consulta.observacoes,
  };

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <EditConsultaButton
        consulta={editEntity}
        pacienteOptions={pacienteOptions}
      />
      <DeleteConsultaDialog
        id={consulta.id}
        paciente={consulta.paciente}
        data={consulta.data}
      />
    </div>
  );
}
