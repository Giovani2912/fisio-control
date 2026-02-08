import { ColumnDef } from '@tanstack/react-table';

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
  },
  {
    accessorKey: 'horaInicio',
    header: 'Hora Início',
  },
  {
    accessorKey: 'tipo',
    header: 'Tipo',
  },
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'valorConsulta',
    header: 'Valor',
  },
];
