import Title from '@/components/title';
import { CreateAvaliacaoButton, EditAvaliacaoButton } from '@/components/upserts/generic-buttons';
import { Avaliacao } from "@prisma/client";



export default async function Avaliacoes() {
    const avaliacoes: Avaliacao[] = []

    return (
        <>
            <div className='mt-8 w-full rounded-2xl'>
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold text-gray-900">Avaliações</h1>
                    <CreateAvaliacaoButton text="Cadastrar Avaliação" />
                </div>

                <div className="space-y-2">
                    {avaliacoes.map((avaliacao) => (
                        <div key={avaliacao.id} className="flex justify-between items-center p-4 border rounded">
                            <span>{avaliacao.nome}</span>
                            <EditAvaliacaoButton avaliacao={avaliacao} />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
