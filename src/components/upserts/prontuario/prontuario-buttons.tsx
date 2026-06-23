'use client';

import { useState } from 'react';
import { Sparkles, PencilIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import UpsertProntuario, { ProntuarioEditData } from './prontuario-upsert';

export const CreateProntuarioButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)} size="sm">
        <Sparkles className="mr-2 h-4 w-4" />
        Gerar Prontuário
      </Button>
      <UpsertProntuario isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export const EditProntuarioButton = ({ prontuario }: { prontuario: ProntuarioEditData }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 text-muted-foreground hover:text-gray-900 hover:bg-gray-100"
        onClick={() => setIsOpen(true)}
      >
        <PencilIcon className="h-3.5 w-3.5" />
      </Button>
      <UpsertProntuario isOpen={isOpen} setIsOpen={setIsOpen} initialData={prontuario} />
    </>
  );
};
