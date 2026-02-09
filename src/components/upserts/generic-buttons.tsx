'use client';

import { PlusIcon, PencilIcon } from 'lucide-react';
import { useState, ReactNode } from 'react';
import { Button } from '../ui/button';

// ===== BOTÃO DE CRIAR GENÉRICO =====
interface GenericCreateButtonProps {
  text?: string;
  variant?: "outline" | "ghost" | "default" | "link" | "destructive" | "secondary" | null | undefined;
  children: (isOpen: boolean, setIsOpen: (open: boolean) => void) => ReactNode;
}

export const GenericCreateButton = ({
  text,
  variant,
  children,
}: GenericCreateButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        className="cursor-pointer font-bold"
        onClick={() => setDialogIsOpen(true)}
        variant={variant}
      >
        <span className="hidden md:block">{text}</span>
        <PlusIcon />
      </Button>
      {children(dialogIsOpen, setDialogIsOpen)}
    </>
  );
};

// ===== BOTÃO DE EDITAR GENÉRICO =====
interface GenericEditButtonProps<T> {
  entity: T;
  children: (
    isOpen: boolean,
    setIsOpen: (open: boolean) => void,
    entity: T,
  ) => ReactNode;
  variant?: 'outline' | 'ghost' | 'default';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  iconColor?: string;
}

export function GenericEditButton<T>({
  entity,
  children,
  variant = 'outline',
  size = 'icon',
  iconColor = 'text-green-600',
}: GenericEditButtonProps<T>) {
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className="cursor-pointer"
        onClick={() => setDialogIsOpen(true)}
      >
        <PencilIcon className={iconColor} />
      </Button>
      {children(dialogIsOpen, setDialogIsOpen, entity)}
    </>
  );
}
