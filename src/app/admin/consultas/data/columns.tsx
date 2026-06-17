'use client';

import { ColumnDef, Column } from '@tanstack/react-table';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { DeleteConsultaDialog } from '../components/delete-dialog';
import { ArrowDownIcon, ArrowUpDownIcon, ArrowUpIcon } from 'lucide-react';
import { TIPO_COLORS, TIPO_LABELS } from '@/constants/consulta';

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

function SortableHeader({
  column,
  label,
}: {
  column: Column<Consulta, unknown>;
  label: string;
}) {
  const sorted = column.getIsSorted();
  return (
    <button
      className="flex items-center gap-1 hover:text-foreground"
      onClick={() => column.toggleSorting(sorted === 'asc')}
    >
      {label}
      {sorted === 'asc' ? (
        <ArrowUpIcon className="h-3 w-3" />
      ) : sorted === 'desc' ? (
        <ArrowDownIcon className="h-3 w-3" />
      ) : (
        <ArrowUpDownIcon className="h-3 w-3 opacity-40" />
      )}
    </button>
  );
}

export const columns: ColumnDef<Consulta>[] = [
  {
    accessorKey: 'paciente',
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} label="Paciente" />,
  },
  {
    accessorKey: 'data',
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} label="Data" />,
    cell: ({ row }) => {
      const dateString = row.getValue('data') as string;
      if (!dateString) return '-';
      const [y, m, d] = dateString.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return formatDate(date);
    },
  },
  {
    accessorKey: 'horaInicio',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} label="Hora Início" />
    ),
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
    filterFn: 'equalsString',
    cell: ({ row }) => {
      const value = row.getValue('tipo') as string | null;
      if (!value) return '-';

      const tipo = value.toUpperCase() as keyof typeof TIPO_COLORS;

      return (
        <Badge variant="outline" className={TIPO_COLORS[tipo] ?? ''}>
          {TIPO_LABELS[tipo] ?? value}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    filterFn: 'equalsString',
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
  {
    id: 'actions',
    header: '',
    cell: ({ row }) => (
      <DeleteConsultaDialog
        id={row.original.id}
        paciente={row.original.paciente}
        data={row.original.data}
      />
    ),
  },
];
