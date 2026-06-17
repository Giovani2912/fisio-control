import prisma from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CreateAvaliacaoButton, EditAvaliacaoButton } from '@/components/upserts/avaliacao/avaliacao-buttons';
import { EditPacienteButton } from '@/components/upserts/paciente/paciente-buttons';
import { DeleteAvaliacaoDialog } from '../../avaliacoes/components/delete-dialog';
import { CreateProntuarioButton } from '@/components/upserts/prontuario/prontuario-buttons';
import { ProntuarioTimeline } from '@/components/prontuario-timeline';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export default async function PacienteInfo({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const paciente = await prisma.paciente.findUnique({
    where: { id },
    include: {
      avaliacoes: true,
      consultas: true,
      planosTratamento: true,
      prontuarios: { orderBy: { criadoEm: 'desc' } },
      pagamentos: true,
    },
  });

  if (!paciente) {
    return <div className="text-muted-foreground mt-8">Paciente não encontrado.</div>;
  }

  const prontuariosSerializados = paciente.prontuarios.map((p) => ({
    id: p.id,
    criadoEm: p.criadoEm.toISOString(),
    regiaoCorpo: p.regiaoCorpo,
    nivelDor: p.nivelDor,
    respostaTratamento: p.respostaTratamento,
    evolucao: p.evolucao,
    queixaDoDia: p.queixaDoDia,
    tecnicas: p.tecnicas,
    observacoes: p.observacoes,
  }));

  return (
    <div className="space-y-6 mt-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{paciente.nome}</h1>
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

      {/* Dados + Resumo */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Dados do Paciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                { label: 'CPF', value: paciente.cpf },
                { label: 'RG', value: paciente.rg || '-' },
                { label: 'Email', value: paciente.email || '-' },
                { label: 'Celular', value: paciente.celular },
                { label: 'Idade', value: paciente.idade },
                { label: 'Sexo', value: paciente.sexo },
                { label: 'Convênio', value: paciente.convenio || '-' },
                { label: 'Nº Convênio', value: paciente.numeroConvenio || '-' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <div className="text-xs text-muted-foreground">{label}</div>
                  <div className="text-sm font-medium text-gray-900">{value}</div>
                </div>
              ))}
              <div className="col-span-2">
                <div className="text-xs text-muted-foreground">Contato de Emergência</div>
                <div className="text-sm font-medium text-gray-900">
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
              {[
                { label: 'Consultas', value: paciente.consultas.length },
                { label: 'Avaliações', value: paciente.avaliacoes.length },
                { label: 'Planos', value: paciente.planosTratamento.length },
                { label: 'Prontuários', value: paciente.prontuarios.length },
                { label: 'Pagamentos', value: paciente.pagamentos.length },
              ].map(({ label, value }) => (
                <div key={label} className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{label}</span>
                  <span className="text-sm font-semibold">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Evolução Clínica — full width */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Evolução Clínica</CardTitle>
              <p className="text-sm text-muted-foreground mt-0.5">
                {paciente.prontuarios.length === 0
                  ? 'Nenhuma sessão registrada ainda'
                  : `${paciente.prontuarios.length} sessão${paciente.prontuarios.length > 1 ? 'ões' : ''} registrada${paciente.prontuarios.length > 1 ? 's' : ''}`}
              </p>
            </div>
            {paciente.prontuarios.length > 0 && <CreateProntuarioButton />}
          </div>
        </CardHeader>
        <CardContent>
          <ProntuarioTimeline prontuarios={prontuariosSerializados} />
        </CardContent>
      </Card>

      {/* Avaliação Inicial */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Avaliação Inicial</CardTitle>
            <CreateAvaliacaoButton text="Nova Avaliação" />
          </div>
        </CardHeader>
        <CardContent>
          {paciente.avaliacoes.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhuma avaliação registrada.</p>
          ) : (
            <div className="space-y-4">
              {paciente.avaliacoes.map((avaliacao) => (
                <div key={avaliacao.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-start justify-between mb-3">
                    <span className="text-sm text-muted-foreground">
                      {format(avaliacao.data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
                    </span>
                    <div className="flex gap-1">
                      <EditAvaliacaoButton
                        avaliacao={{
                          id: avaliacao.id,
                          data: avaliacao.data,
                          historiaDoenca: avaliacao.historiaDoenca ?? undefined,
                          queixaPrincipal: avaliacao.queixaPrincipal,
                          exameFisico: avaliacao.exameFisico ?? undefined,
                          diagnostico: avaliacao.diagnostico ?? undefined,
                          objetivos: avaliacao.objetivos ?? undefined,
                        }}
                      />
                      <DeleteAvaliacaoDialog
                        avaliacao={{
                          id: avaliacao.id,
                          data: avaliacao.data,
                          queixaPrincipal: avaliacao.queixaPrincipal,
                          historiaDoenca: avaliacao.historiaDoenca ?? undefined,
                          exameFisico: avaliacao.exameFisico ?? undefined,
                          diagnostico: avaliacao.diagnostico ?? undefined,
                          objetivos: avaliacao.objetivos ?? undefined,
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {[
                      { label: 'Queixa Principal', value: avaliacao.queixaPrincipal },
                      { label: 'Diagnóstico', value: avaliacao.diagnostico },
                      { label: 'História da Doença', value: avaliacao.historiaDoenca },
                      { label: 'Exame Físico', value: avaliacao.exameFisico },
                      { label: 'Objetivos', value: avaliacao.objetivos },
                    ]
                      .filter(({ value }) => value)
                      .map(({ label, value }) => (
                        <div key={label} className="md:col-span-2 last:md:col-span-2">
                          <div className="text-xs text-muted-foreground mb-0.5">{label}</div>
                          <div className="text-sm text-gray-800">{value}</div>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
}
