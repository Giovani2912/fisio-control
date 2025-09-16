"use client"

import { useState } from "react"
import { deletePaciente } from "@/app/actions/upsertPaciente"
import EditPacienteButton from "@/components/edit-button"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Sexo, Convenios } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, TrashIcon } from "lucide-react"
import { toast } from "sonner"

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

// Componente separado para o Dialog de exclusão
const DeletePacienteDialog = ({ paciente }: { paciente: Paciente }) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const handleDelete = async () => {
        setIsDeleting(true)
        try {
            await deletePaciente(paciente.id)
            setIsOpen(false)
            toast.success("Paciente excluído com sucesso!")
        } catch (error) {
            console.error("Erro ao excluir paciente:", error)
            toast.error("Erro ao excluir paciente. Tente novamente.")
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="text-muted-foreground hover:text-red-700 hover:border-red-200 transition-colors"
                >
                    <TrashIcon className="h-4 w-4 text-red-600" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <TrashIcon className="h-5 w-5 text-red-600" />
                        Confirmar exclusão
                    </DialogTitle>
                    <DialogDescription className="text-left pt-2">
                        Você tem certeza que deseja excluir o paciente{" "}
                        <span className="font-semibold text-foreground">
                            {paciente.nome}
                        </span>
                        ?
                        <br />
                        <span className="text-red-600 font-medium">
                            Esta ação não pode ser desfeita.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2 sm:gap-0">
                    <DialogClose asChild>
                        <Button
                            variant="outline"
                            disabled={isDeleting}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="gap-2"
                    >
                        {isDeleting ? (
                            <>
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                Excluindo...
                            </>
                        ) : (
                            <>
                                <TrashIcon className="h-4 w-4" />
                                Sim, excluir
                            </>
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
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
                    <DeletePacienteDialog paciente={paciente} />
                </div>
            );
        },
    },
]