'use client';

import { useState } from 'react';
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
import { deleteAvaliacao } from '@/app/actions/upsertAvaliacao';
import { AvaliacaoFormData } from '@/components/upserts/avaliacao/config';

// Componente separado para o Dialog de exclusão
export const DeleteAvaliacaoDialog = ({ avaliacao }: { avaliacao: AvaliacaoFormData }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        setIsDeleting(true);
        try {
            if (!avaliacao.id) {
                toast.error('ID da avaliação não encontrado.');
                return;
            }
            await deleteAvaliacao(avaliacao.id);
            setIsOpen(false);
            toast.success('Avaliação excluída com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir avaliação:', error);
            toast.error('Erro ao excluir avaliação. Tente novamente.');
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
                    className="text-muted-foreground transition-colors hover:border-red-200 hover:text-red-700 cursor-pointer"
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
                        Você tem certeza que deseja excluir essa avaliação{' '}
                        <span className="text-foreground font-semibold">
                            {avaliacao.queixaPrincipal}
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