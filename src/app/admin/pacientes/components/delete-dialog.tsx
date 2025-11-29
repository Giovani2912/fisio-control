'use client';

import { useState } from 'react';
import { deletePaciente } from '@/app/actions/upsertPaciente';
import { toast } from 'sonner';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrashIcon } from 'lucide-react';
import { PacienteFormData } from '@/components/upserts/paciente/config';

// Componente separado para o Dialog de exclusão
export const DeletePacienteDialog = ({ paciente }: { paciente: PacienteFormData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            if (!paciente.id) {
                toast.error('ID do paciente não encontrado.');
                return;
            }
            await deletePaciente(paciente.id);
            setIsOpen(false);
            toast.success('Paciente excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir paciente:', error);
            toast.error('Erro ao excluir paciente. Tente novamente.');
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="text-muted-foreground transition-colors hover:border-red-200 hover:text-red-700 hover:cursor-pointer"
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
                    <DialogDescription className="pt-2 text-left">
                        Você tem certeza que deseja excluir o paciente{' '}
                        <span className="text-foreground font-semibold">
                            {paciente.nome}
                        </span>
                        ?
                        <br />
                        <span className="font-medium text-red-600">
                            Esta ação não pode ser desfeita.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="flex gap-4 sm:gap-2">
                    <DialogClose asChild>
                        <Button variant="outline" disabled={isDeleting} className="hover:bg-red-50 hover:text-red-700 hover:cursor-pointer">
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="gap-2 hover:bg-red-400 hover:text-white hover:cursor-pointer"
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
    );
};