'use client';
import { buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
    cell: ({ row }) => {
      const value = row.getValue('convenio') as Convenios | null;
      if (!value) return '-';

      const convenioClasses: Record<Convenios, string> = {
        HAOC: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
        UNIMED: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
        SAMARITANO:
          'bg-violet-100 text-violet-800 dark:bg-violet-500/15 dark:text-violet-300',
        BRADESCO:
          'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        SULAMERICA:
          'bg-indigo-100 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300',
        AMIL: 'bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300',
        PORTOSEGURO:
          'bg-slate-100 text-slate-800 dark:bg-slate-500/15 dark:text-slate-300',
        NOTREDAME:
          'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
      };

      const label = value.replace(/_/g, ' ').toLowerCase();

      return (
        <Badge
          variant="outline"
          className={`uppercase ${convenioClasses[value] ?? ''}`}
        >
          {label}
        </Badge>
      );
    },
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
