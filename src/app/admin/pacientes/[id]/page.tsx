import prisma from '@/lib/prisma';
import Title from '@/components/title';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateAvaliacaoButton } from '@/components/upserts/avaliacao/avaliacao-buttons';
import { EditPacienteButton } from '@/components/upserts/paciente/paciente-buttons';

export default async function PacienteInfo({
  params,
}: {
  params: { id: string };
}) {
  const paciente = await prisma.paciente.findUnique({
    where: { id: params.id },
    include: {
      avaliacoes: true,
      consultas: true,
      planosTratamento: true,
      prontuarios: true,
      pagamentos: true,
    },
  });

  if (!paciente) {
    return (
      <>
        <Title title="Paciente" createButton={null} />
        <div className="text-muted-foreground">Paciente não encontrado.</div>
      </>
    );
  }

  return (
    <>
      <div className="mt-8 mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{paciente.nome}</h1>
        <div className="flex gap-2">
          <CreateAvaliacaoButton text="Cadastrar Avaliação" />
          <EditPacienteButton
            paciente={{
              id: paciente.id,
              nome: paciente.nome,
              cpf: paciente.cpf,
              rg: paciente.rg || '',
              email: paciente.email || '',
              celular: paciente.celular,
              idade: String(paciente.idade),
              sexo: paciente.sexo,
              convenio: paciente.convenio ?? 'HAOC',
              numeroConvenio: paciente.numeroConvenio || '',
              contato_emergencia: paciente.contato_emergencia || '',
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <div className="text-muted-foreground text-sm">CPF</div>
                <div className="font-medium">{paciente.cpf}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">RG</div>
                <div className="font-medium">{paciente.rg || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Email</div>
                <div className="font-medium">{paciente.email || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Celular</div>
                <div className="font-medium">{paciente.celular}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Idade</div>
                <div className="font-medium">{paciente.idade}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Sexo</div>
                <div className="font-medium">{paciente.sexo}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">Convênio</div>
                <div className="font-medium">{paciente.convenio || '-'}</div>
              </div>
              <div>
                <div className="text-muted-foreground text-sm">
                  Número do Convênio
                </div>
                <div className="font-medium">
                  {paciente.numeroConvenio || '-'}
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="text-muted-foreground text-sm">
                  Contato de Emergência
                </div>
                <div className="font-medium">
                  {paciente.contato_emergencia || '-'}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">Consultas</span>
                <span className="font-semibold">
                  {paciente.consultas.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Avaliações
                </span>
                <span className="font-semibold">
                  {paciente.avaliacoes.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Planos de Tratamento
                </span>
                <span className="font-semibold">
                  {paciente.planosTratamento.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Prontuários
                </span>
                <span className="font-semibold">
                  {paciente.prontuarios.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-sm">
                  Pagamentos
                </span>
                <span className="font-semibold">
                  {paciente.pagamentos.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 md:col-span-2">
        <CardHeader>
          <CardTitle>Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paciente.avaliacoes.map(avaliacao => (
              <div
                key={avaliacao.id}
                className="rounded-md border border-gray-200 p-4"
              >
                <div className="text-muted-foreground text-sm">Data</div>
                <div className="font-medium">
                  {avaliacao.data?.toLocaleDateString() || '-'}
                </div>

                <div className="text-muted-foreground text-sm">Diagnóstico</div>
                <div className="font-medium">
                  {avaliacao.diagnostico || '-'}
                </div>

                <div className="text-muted-foreground text-sm">Objetivos</div>
                <div className="font-medium">{avaliacao.objetivos || '-'}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
