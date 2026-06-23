import { buttonVariants } from '@/components/ui/button';
import { List } from 'lucide-react';
import Link from 'next/link';

async function ViewPacienteButton({ pacienteId }: { pacienteId: string }) {
  return (
    <Link
      href={`/admin/pacientes/${pacienteId}`}
      className={buttonVariants({
        size: 'icon',
        variant: 'outline',
        className:
          'text-blue-700 transition-colors hover:border-blue-300 hover:text-blue-600',
      })}
    >
      <List className="h-4 w-4" />
    </Link>
  );
}

export default ViewPacienteButton;
