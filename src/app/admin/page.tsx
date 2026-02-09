import Title from '@/components/title';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import { Users, Calendar, DollarSign, ArrowRight } from 'lucide-react';
import { CreatePacienteButton } from '@/components/upserts/paciente/paciente-buttons';
import { CreateAvaliacaoButton } from '@/components/upserts/avaliacao/avaliacao-buttons';
import { CreateConsultaButton } from '@/components/upserts/consulta/consulta-buttons';
import { fetchPacientes } from '@/app/actions/pacientes/fetch';
import type { SelectOption } from '@/components/upserts/generic-upsert';

export default async function Dashboard() {
  // Calcular datas
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);
  
  const amanhaInicio = new Date(hoje);
  amanhaInicio.setDate(hoje.getDate() + 1);

  const daqui7Dias = new Date(hoje);
  daqui7Dias.setDate(hoje.getDate() + 7);

  // Buscar dados
  const [
    totalConsultas,
    totalPacientes,
    pacientesAtivos,
    consultasHoje,
    consultasProximos7Dias,
    pagamentosPendentes,
    totalPagamentos,
    pacientesRecentes,
    consultasProximas,
  ] = await Promise.all([
    prisma.consulta.count(),
    prisma.paciente.count(),
    prisma.paciente.count({ where: { ativo: true } }),
    prisma.consulta.count({
      where: {
        data: {
          gte: hoje,
          lt: amanhaInicio,
        },
      },
    }),
    prisma.consulta.count({
      where: {
        data: {
          gte: amanhaInicio,
          lt: daqui7Dias,
        },
      },
    }),
    prisma.pagamento.count({
      where: { status: 'PENDENTE' },
    }),
    prisma.pagamento.aggregate({
      where: { status: 'PENDENTE' },
      _sum: { valor: true },
    }),
    prisma.paciente.findMany({
      take: 5,
      orderBy: { criadoEm: 'desc' },
    }),
    prisma.consulta.findMany({
      take: 5,
      where: { data: { gte: hoje } },
      orderBy: { data: 'asc' },
      include: { paciente: true },
    }),
  ]);

  const pacientes = await fetchPacientes();

  const pacienteOptions: SelectOption[] = pacientes.map(p => ({
    value: p.id,
    label: `${p.nome}`,
  }));

  console.log(totalConsultas)
  return (
    <>
      <Title title="Dashboard" />

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-4 mb-8">
        {/* Total Pacientes */}
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Total Pacientes</h3>
              <div className="bg-blue-500 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-blue-900">{totalPacientes}</p>
            <p className="text-xs text-blue-600 mt-2">{pacientesAtivos} ativos</p>
          </CardContent>
        </Card>

        {/* Consultas Hoje */}
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Consultas Hoje</h3>
              <div className="bg-green-500 p-2 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-900">{consultasHoje}</p>
            <p className="text-xs text-green-600 mt-2">
              {consultasProximos7Dias} nos próximos 7 dias
            </p>
          </CardContent>
        </Card>

        {/* Pagamentos Pendentes */}
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-700">Pagamentos Pendentes</h3>
              <div className="bg-orange-500 p-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-900">{pagamentosPendentes}</p>
            <p className="text-xs text-orange-600 mt-2">
              R$ {Number(totalPagamentos._sum.valor || 0).toLocaleString('pt-BR', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="pb-3">
            <h3 className="text-sm font-medium text-gray-700">Ações Rápidas</h3>
          </CardHeader>
          <CardContent className="space-y-2 flex flex-col">
            <CreatePacienteButton variant={"outline"}/>
            <CreateAvaliacaoButton variant={"ghost"}/>
            <CreateConsultaButton variant={"outline"} pacienteOptions={pacienteOptions}/>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pacientes Recentes */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Pacientes Recentes</h2>
              <Link href="/admin/pacientes">
                <Button variant="ghost" size="sm">
                  Ver Todos <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {pacientesRecentes.length > 0 ? (
              <div className="space-y-4">
                {pacientesRecentes.map(paciente => (
                  <div
                    key={paciente.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold">
                        {paciente.nome.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-sm truncate">
                          {paciente.nome}
                        </p>
                        <p className="text-xs text-gray-500">{paciente.celular}</p>
                      </div>
                    </div>
                    <Link href={`/admin/pacientes/${paciente.id}`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Nenhum paciente registrado</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Próximas Consultas */}
        <Card>
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Próximas Consultas</h2>
              <Link href="/admin/consultas">
                <Button variant="ghost" size="sm">
                  Ver Agenda <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="pt-6">
            {consultasProximas.length > 0 ? (
              <div className="space-y-4">
                {consultasProximas.map(consulta => (
                  <div
                    key={consulta.id}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition border-l-4 border-green-500"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-sm">{consulta.paciente.nome}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(consulta.data).toLocaleDateString('pt-BR', {
                          weekday: 'short',
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <span className="inline-block mt-1 text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                        {consulta.tipo}
                      </span>
                    </div>
                    <Link href={`/admin/consultas/${consulta.id}`}>
                      <Button variant="ghost" size="sm">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="h-12 w-12 mx-auto mb-2 opacity-20" />
                <p className="text-sm">Nenhuma consulta agendada</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}