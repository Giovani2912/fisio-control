import MaxWidthWrapper from '@/components/max-width-wrapper';
import Navbar from '@/components/navbar';

import { columns, Consulta } from "./data/columns"
import { DataTable } from "./data/data-table"
import Title from '@/components/title';

async function getData(): Promise<Consulta[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      dia: "2024-07-01",
      hora: "14:30",
      paciente: "Maria Silva",
    },
  ]
}


export default async function Consultas() {
  const data = await getData()
  return (
    <>

      <Title title="Consultas" createButton={true} />

      <div className='mt-8 w-full bg-white rounded-2xl'>
        <DataTable columns={columns} data={data} />
      </div>
    </>
  );
}
