import Title from '@/components/title';
import {
  CreateSessaoButton,
  EditSessaoButton,
} from '@/components/upserts/sessao/sessao-buttons';
import { Consulta } from '@prisma/client';

export default async function Sessoes() {
  const sessoes: Consulta[] = [];

  return (
    <>
      <div className="mt-8 w-full rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Sessões</h1>

          <CreateSessaoButton text="Cadastrar Sessão" />
        </div>

        <div className="space-y-2">
          {sessoes.map(sessao => (
            <div
              key={sessao.id}
              className="flex items-center justify-between rounded border p-4"
            >
              <span>{sessao.nome}</span>
              <EditSessaoButton sessao={sessao} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
