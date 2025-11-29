import { ColumnDef } from '@tanstack/react-table';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Paciente = {
  id: string;
  queixaPrincipal: string;
  historiaDoenca: string;
  exameFisico: string;
  diagnostico: string;
  objetivos: string;
  data: string;
  paciente: string;
};

export const columns: ColumnDef<Paciente>[] = [
  {
    accessorKey: 'paciente',
    header: 'Paciente',
  },
  {
    accessorKey: 'diagnostico',
    header: 'Diagnóstico',
  },
  {
    accessorKey: 'data',
    header: 'Data',
  },
  // {
  //   accessorKey: 'actions',
  //   header: 'Ações',
  //   cell: ({ row: { original: paciente } }) => {
  //     return <div className="flex items-center space-x-1"></div>;
  //   },
  // },
];
