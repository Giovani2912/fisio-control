'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { TrashIcon } from 'lucide-react';
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
import { deleteProntuario } from '@/app/actions/upsertProntuario';

export const DeleteProntuarioDialog = ({ id }: { id: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteProntuario(id);
      setIsOpen(false);
      toast.success('Prontuário excluído com sucesso!');
    } catch {
      toast.error('Erro ao excluir prontuário. Tente novamente.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-muted-foreground hover:text-red-600 hover:bg-red-50"
        >
          <TrashIcon className="h-3.5 w-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TrashIcon className="h-5 w-5 text-red-600" />
            Excluir prontuário
          </DialogTitle>
          <DialogDescription className="pt-2 text-left">
            Tem certeza que deseja excluir este prontuário?{' '}
            <span className="font-medium text-red-600">Esta ação não pode ser desfeita.</span>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
            {isDeleting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                Excluindo...
              </>
            ) : (
              <>
                <TrashIcon className="h-4 w-4 mr-2" />
                Sim, excluir
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
