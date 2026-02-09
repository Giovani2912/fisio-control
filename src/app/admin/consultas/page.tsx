import { DataTable } from './data/data-table';
import { columns, Consulta as ConsultaRow } from './data/columns';
import prisma from '@/lib/prisma';
import Title from '@/components/title';
import { CreateConsultaButton } from '@/components/upserts/consulta/consulta-buttons';
import { fetchPacientes } from '@/app/actions/pacientes/fetch';
import type { SelectOption } from '@/components/upserts/generic-upsert';

async function getData(): Promise<ConsultaRow[]> {
  const data = await prisma.consulta
    .findMany({
      orderBy: { data: 'desc' },
      include: { paciente: true },
    })
    .then(consultas =>
      consultas.map(consulta => ({
        id: consulta.id,
        paciente: consulta.paciente.nome,
        data: consulta.data.toISOString().split('T')[0],
        horaInicio: new Date(consulta.horaInicio).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        horaFim: new Date(consulta.horaFim).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
        }),
        tipo: consulta.tipo,
        status: consulta.status,
        valorConsulta: `R$ ${Number(consulta.valorConsulta).toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`,
      })),
    );
  return data;
}

export default async function Consultas() {
  const consultas: ConsultaRow[] = await getData();
  const pacientes = await fetchPacientes();
  const pacienteOptions: SelectOption[] = pacientes.map(p => ({
    value: p.id,
    label: `${p.nome}`,
  }));

  return (
    <>
      <Title title="Consultas" createButton={<CreateConsultaButton pacienteOptions={pacienteOptions} />} />

      <div className="mt-8 w-full rounded-2xl">
        <div className="mt-4 w-full space-y-2 rounded-2xl bg-white">
          <DataTable columns={columns} data={consultas} />
        </div>
      </div>
    </>
  );
}
