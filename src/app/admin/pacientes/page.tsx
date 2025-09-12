import MaxWidthWrapper from '@/components/max-width-wrapper';

import { columns, Paciente } from "./data/columns"
import { DataTable } from "./data/data-table"
import Title from '@/components/title';


async function getData(): Promise<Paciente[]> {
  const response = await fetch('http://localhost:3000/api/pacientes');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const data = await response.json();
  const pacientes = Array.isArray(data) ? data : data.data;
  return (pacientes || []).map((p: any) => ({
    id: p.id,
    nome: p.nome,
    cpf: p.cpf,
    rg: p.rg,
    email: p.email,
    celular: p.celular,
    idade: p.idade,
    sexo: p.sexo,
    convenio: p.convenio,
    numeroConvenio: p.numeroConvenio,
    contato_emergencia: p.contato_emergencia,
  }));
}

export default async function Pacientes() {
  const data = await getData()
  return (
    <>
      <MaxWidthWrapper>
        <Title title="Pacientes" createButton={true} />

        <div className='mt-8 w-full bg-white rounded-2xl'>
          <DataTable columns={columns} data={data} />
        </div>
      </MaxWidthWrapper>
    </>
  );
}
