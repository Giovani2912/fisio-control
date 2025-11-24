'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { Pen, TrashIcon } from 'lucide-react';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Consulta = {
  id: string;
  dia: string;
  hora: string;
  paciente: string;
};

export const columns: ColumnDef<Consulta>[] = [
  {
    accessorKey: 'dia',
    header: 'Dia',
  },
  {
    accessorKey: 'hora',
    header: 'Hora',
  },
  {
    accessorKey: 'paciente',
    header: 'Paciente',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center space-x-1">
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground cursor-pointer"
          >
            <Pen className="text-green-700" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-muted-foreground cursor-pointer"
          >
            <TrashIcon className="text-red-700" />
          </Button>
        </div>
      );
    },
  },
];
