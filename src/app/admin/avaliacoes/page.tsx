import { DataTable } from './data/data-table';
import { columns, Paciente as AvaliacaoRow } from './data/columns';
import prisma from '@/lib/prisma';
import { auth } from '@clerk/nextjs/server';

async function getData(userId: string): Promise<AvaliacaoRow[]> {
  const data = await prisma.avaliacao
    .findMany({
      where: { paciente: { clerkUserId: userId } },
      orderBy: { criadoEm: 'desc' },
      include: { paciente: true },
    })
    .then(avaliacoes =>
      avaliacoes.map(avaliacao => ({
        id: avaliacao.id,
        queixaPrincipal: avaliacao.queixaPrincipal,
        historiaDoenca: avaliacao.historiaDoenca ?? '',
        exameFisico: avaliacao.exameFisico ?? '',
        diagnostico: avaliacao.diagnostico ?? '',
        objetivos: avaliacao.objetivos ?? '',
        data: avaliacao.data.toISOString().split('T')[0], // Formata a data como 'YYYY-MM-DD'
        paciente: avaliacao.paciente.nome, // Acessa o nome do paciente relacionado
      })),
    );
  return data;
}

export default async function Avaliacoes() {
  const { userId } = await auth();
  const avaliacoes: AvaliacaoRow[] = await getData(userId!);

  return (
    <>
      <div className="mt-8 w-full rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
        </div>

        <div className="mt-4 w-full space-y-2 rounded-2xl bg-white">
          <DataTable columns={columns} data={avaliacoes} />
        </div>
      </div>
    </>
  );
}
