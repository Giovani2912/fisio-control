"use client"

import EditPacienteButton from "@/components/edit-button"
import { Button } from "@/components/ui/button"
import { Sexo, Convenios } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, TrashIcon } from "lucide-react"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Paciente = {
    id: string
    nome: string
    cpf: string
    rg: string
    email: string
    celular: string
    idade: number | undefined
    sexo: Sexo
    convenio: Convenios
    numeroConvenio: string
    contato_emergencia: string
}

export const columns: ColumnDef<Paciente>[] = [
    {
        accessorKey: "nome",
        header: "Nome",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "telefone",
        header: "Telefone",
    },
    {
        accessorKey: "convenio",
        header: "Convênio",
    },
    {
        accessorKey: "actions",
        header: "Ações",
        cell: ({ row: { original: paciente } }) => {
            return (
                <div className="flex items-center space-x-1">
                    <EditPacienteButton paciente={paciente} />
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
]