import { CreateAvaliacaoButton, EditAvaliacaoButton } from '@/components/upserts/avaliacao/avaliacao-buttons';
import { Avaliacao } from "@prisma/client";
import { DataTable } from './data/data-table';
import { columns } from './data/columns';
import prisma from '@/lib/prisma';

async function getData(): Promise<Avaliacao[]> {
    const data = await prisma.avaliacao.findMany({
        orderBy: { criadoEm: 'desc' },
        include: { paciente: true },
    }).then(avaliacoes => avaliacoes.map(avaliacao => ({
        id: avaliacao.id,
        queixaPrincipal: avaliacao.queixaPrincipal,
        historiaDoenca: avaliacao.historiaDoenca,
        exameFisico: avaliacao.exameFisico,
        diagnostico: avaliacao.diagnostico,
        objetivos: avaliacao.objetivos,
        data: avaliacao.data.toISOString().split('T')[0], // Formata a data como 'YYYY-MM-DD'
        paciente: avaliacao.paciente.nome, // Acessa o nome do paciente relacionado
    })));
    return data;
}

export default async function Avaliacoes() {
    const avaliacoes: Avaliacao[] = await getData();

    return (
        <>
            <div className='mt-8 w-full rounded-2xl'>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
                    <CreateAvaliacaoButton text="Cadastrar Avaliação" />
                </div>

                <div className='mt-4 w-full bg-white rounded-2xl space-y-2'>
                    <DataTable columns={columns} data={avaliacoes} />
                </div>
            </div>
        </>
    );
}
