import { columns, Paciente } from './data/columns';
import { DataTable } from './data/data-table';
import Title from '@/components/title';
import prisma from '@/lib/prisma';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import SearchInput from '@/components/search';
import { CreatePacienteButton } from '@/components/upserts/paciente/paciente-buttons';

interface PacientesProps {
  searchParams: {
    page?: string;
    search?: string;
  };
}

async function getData(
  page: number = 1,
  search?: string,
): Promise<{
  data: Paciente[];
  total: number;
  totalPages: number;
  currentPage: number;
}> {
  // Seu código atual de getData permanece igual...
  const pageSize = 10;
  const skip = (page - 1) * pageSize;

  const whereCondition = search
    ? {
        OR: [{ nome: { contains: search, mode: 'insensitive' as const } }],
      }
    : {};

  const [data, total] = await Promise.all([
    prisma.paciente.findMany({
      where: whereCondition,
      orderBy: { criadoEm: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.paciente.count({
      where: whereCondition,
    }),
  ]);

  const totalPages = Math.ceil(total / pageSize);

  return {
    data: (data || []).map((p: any) => ({
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
    })),
    total,
    totalPages,
    currentPage: page,
  };
}

export default async function Pacientes({ searchParams }: PacientesProps) {
  const currentPage = Number(searchParams.page) || 1;
  const searchTerm = searchParams.search || '';

  const {
    data,
    total,
    totalPages,
    currentPage: page,
  } = await getData(currentPage, searchTerm);

  // Gerar links de paginação (seu código atual)
  const generatePageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let startPage = Math.max(1, page - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <>
      <Title title="Pacientes" createButton={<CreatePacienteButton />} />

      {/* Componente de busca com sugestões */}
      <SearchInput initialSearch={searchTerm} />

      {/* Informações da paginação */}
      <div className="text-muted-foreground mt-4 text-sm font-bold">
        Mostrando {data.length} de {total} pacientes
        {searchTerm && ` (filtrados por "${searchTerm}")`}
      </div>

      {/* Tabela de dados */}
      <div className="mt-4 w-full rounded-2xl bg-white">
        <DataTable columns={columns} data={data} />

        {/* Sua paginação atual permanece igual... */}
        {totalPages > 1 && (
          <div className="p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href={
                      page > 1
                        ? `?page=${page - 1}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`
                        : '#'
                    }
                    className={
                      page <= 1 ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>

                {pageNumbers[0] > 1 && (
                  <>
                    <PaginationItem>
                      <PaginationLink
                        href={`?page=1${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    {pageNumbers[0] > 2 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                  </>
                )}

                {pageNumbers.map(pageNum => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href={`?page=${pageNum}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                {pageNumbers[pageNumbers.length - 1] < totalPages && (
                  <>
                    {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                      <PaginationItem>
                        <PaginationEllipsis />
                      </PaginationItem>
                    )}
                    <PaginationItem>
                      <PaginationLink
                        href={`?page=${totalPages}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`}
                      >
                        {totalPages}
                      </PaginationLink>
                    </PaginationItem>
                  </>
                )}

                <PaginationItem>
                  <PaginationNext
                    href={
                      page < totalPages
                        ? `?page=${page + 1}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`
                        : '#'
                    }
                    className={
                      page >= totalPages ? 'pointer-events-none opacity-50' : ''
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    </>
  );
}
