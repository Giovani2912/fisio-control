'use client';
import { buttonVariants } from '@/components/ui/button';
import { PacienteFormData } from '@/components/upserts/paciente/config';

import { Sexo, Convenios } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import { List } from 'lucide-react';
// import { EditPacienteButton } from '@/components/upserts/paciente/paciente-buttons';
import Link from 'next/link';
import { DeletePacienteDialog } from '../components/delete-dialog';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Paciente = {
  id: string;
  nome: string;
  cpf: string;
  rg: string | null;
  email: string | null;
  celular: string;
  idade: string;
  sexo: Sexo;
  convenio: Convenios | null;
  numeroConvenio: string | null;
  contato_emergencia: string | null;
};

export const columns: ColumnDef<PacienteFormData>[] = [
  {
    accessorKey: 'nome',
    header: 'Nome',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'celular',
    header: 'Celular',
  },
  {
    accessorKey: 'convenio',
    header: 'Convênio',
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: paciente } }) => {
      return (
        <div className="flex items-center space-x-1">
          <Link
            href={`/admin/pacientes/${paciente.id}`}
            className={buttonVariants({
              size: 'icon',
              variant: 'outline',
              className:
                'text-foreground hover:text-foreground/90 transition-colors',
            })}
          >
            <List className="text-foreground h-4 w-4" />
          </Link>
          {/* <EditPacienteButton paciente={paciente} /> */}
          <DeletePacienteDialog paciente={paciente} />
        </div>
      );
    },
  },
];
