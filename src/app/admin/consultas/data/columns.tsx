'use client';

import { ColumnDef } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Consulta = {
  id: string;
  paciente: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  tipo: string;
  status: string;
  valorConsulta: string;
};

export const columns: ColumnDef<Consulta>[] = [
  {
    accessorKey: 'paciente',
    header: 'Paciente',
  },
  {
    accessorKey: 'data',
    header: 'Data',
    cell: ({ row }) => {
      const dateString = row.getValue('data') as string;
      if (!dateString) return '-';
      // Parse YYYY-MM-DD as local date to avoid UTC midnight shifting the day (e.g. Brazil)
      const [y, m, d] = dateString.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return formatDate(date);
    },
  },
  {
    accessorKey: 'horaInicio',
    header: 'Hora Início',
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    cell: ({ row }) => {
      const value = row.getValue('tipo') as string | null;
      if (!value) return '-';

      // Different pill colors for each TipoConsulta
      const tipo = value.toUpperCase();

      const tipoClasses: Record<string, string> = {
        AVALIACAO:
          'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
        SESSAO:
          'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
        RETORNO:
          'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        REAVALIACAO:
          'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
      };

      const tipoLabel: Record<string, string> = {
        AVALIACAO: 'Avaliação',
        SESSAO: 'Sessão',
        RETORNO: 'Retorno',
        REAVALIACAO: 'Reavaliação',
      };

      return (
        <Badge variant="outline" className={tipoClasses[tipo] ?? ''}>
          {tipoLabel[tipo] ?? value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const value = row.getValue('status') as string | null;
      if (!value) return '-';

      const normalized = value.toLowerCase();

      const variant =
        normalized === 'concluída' ||
        normalized === 'concluida' ||
        normalized === 'confirmada'
          ? 'success'
          : normalized === 'agendada' || normalized === 'pendente'
            ? 'warning'
            : normalized === 'cancelada' || normalized === 'finalizada'
              ? 'destructive'
              : 'secondary';

      return (
        <Badge variant={variant} className="capitalize">
          {value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'valorConsulta',
    header: 'Valor',
  },
];
