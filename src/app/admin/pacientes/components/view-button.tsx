import { buttonVariants } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import { List } from 'lucide-react';
import Link from 'next/link';

async function ViewPacienteButton({ pacienteId }: { pacienteId: string }) {
  const paciente = await prisma.paciente.findUnique({
    where: { id: pacienteId },
  });
  return (
    <Link
      href={`/admin/pacientes/${paciente.id}`}
      className={buttonVariants({
        size: 'icon',
        variant: 'outline',
        className:
          'hover:text-muted-foreground cursor-pointer text-blue-700 transition-colors hover:border-blue-200',
      })}
    >
      <List className="h-4 w-4" />
    </Link>
  );
}

export default ViewPacienteButton;
