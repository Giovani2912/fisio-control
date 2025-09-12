import { PrismaClient, Sexo, Convenios, TipoConsulta, StatusConsulta, StatusTratamento, StatusPagamento, FormaPagamento } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    // Pacientes
    const pacientes = await Promise.all([
        prisma.paciente.create({ data: { nome: 'Ana Souza', cpf: '11111111111', rg: 'MG123', email: 'ana@email.com', celular: '31999990001', idade: '30', sexo: 'FEMININO', convenio: 'UNIMED', numeroConvenio: 'UN123', contato_emergencia: 'Carlos' } }),
        prisma.paciente.create({ data: { nome: 'Bruno Lima', cpf: '22222222222', rg: 'MG124', email: 'bruno@email.com', celular: '31999990002', idade: '28', sexo: 'MASCULINO', convenio: 'HAOC', numeroConvenio: 'HA456', contato_emergencia: 'Ana' } }),
        prisma.paciente.create({ data: { nome: 'Carla Dias', cpf: '33333333333', rg: 'MG125', email: 'carla@email.com', celular: '31999990003', idade: '35', sexo: 'FEMININO', convenio: 'SULAMERICA', numeroConvenio: 'SU789', contato_emergencia: 'Bruno' } }),
        prisma.paciente.create({ data: { nome: 'Diego Alves', cpf: '44444444444', rg: 'MG126', email: 'diego@email.com', celular: '31999990004', idade: '40', sexo: 'MASCULINO', convenio: 'BRADESCO', numeroConvenio: 'BR101', contato_emergencia: 'Carla' } }),
        prisma.paciente.create({ data: { nome: 'Elisa Martins', cpf: '55555555555', rg: 'MG127', email: 'elisa@email.com', celular: '31999990005', idade: '32', sexo: 'FEMININO', convenio: 'NOTREDAME', numeroConvenio: 'NO202', contato_emergencia: 'Diego' } }),
    ]);

    // Consultas
    const consultas = await Promise.all([
        prisma.consulta.create({ data: { data: new Date('2025-09-15'), horaInicio: new Date('2025-09-15T08:00:00'), horaFim: new Date('2025-09-15T09:00:00'), tipo: 'AVALIACAO', status: 'CONFIRMADA', valorConsulta: 150.00, pacienteId: pacientes[0].id } }),
        prisma.consulta.create({ data: { data: new Date('2025-09-16'), horaInicio: new Date('2025-09-16T10:00:00'), horaFim: new Date('2025-09-16T11:00:00'), tipo: 'SESSAO', status: 'AGENDADA', valorConsulta: 120.00, pacienteId: pacientes[1].id } }),
        prisma.consulta.create({ data: { data: new Date('2025-09-17'), horaInicio: new Date('2025-09-17T09:30:00'), horaFim: new Date('2025-09-17T10:30:00'), tipo: 'RETORNO', status: 'FINALIZADA', valorConsulta: 100.00, pacienteId: pacientes[2].id } }),
        prisma.consulta.create({ data: { data: new Date('2025-09-18'), horaInicio: new Date('2025-09-18T11:00:00'), horaFim: new Date('2025-09-18T12:00:00'), tipo: 'REAVALIACAO', status: 'CANCELADA', valorConsulta: 130.00, pacienteId: pacientes[3].id } }),
        prisma.consulta.create({ data: { data: new Date('2025-09-19'), horaInicio: new Date('2025-09-19T14:00:00'), horaFim: new Date('2025-09-19T15:00:00'), tipo: 'SESSAO', status: 'EM_ANDAMENTO', valorConsulta: 110.00, pacienteId: pacientes[4].id } }),
    ]);

    // Avaliações
    const avaliacoes = await Promise.all([
        prisma.avaliacao.create({ data: { queixaPrincipal: 'Dor lombar', pacienteId: pacientes[0].id } }),
        prisma.avaliacao.create({ data: { queixaPrincipal: 'Torcicolo', pacienteId: pacientes[1].id } }),
        prisma.avaliacao.create({ data: { queixaPrincipal: 'Lesão no joelho', pacienteId: pacientes[2].id } }),
        prisma.avaliacao.create({ data: { queixaPrincipal: 'Tendinite', pacienteId: pacientes[3].id } }),
        prisma.avaliacao.create({ data: { queixaPrincipal: 'Bursite', pacienteId: pacientes[4].id } }),
    ]);

    // Planos de Tratamento
    const planos = await Promise.all([
        prisma.planoTratamento.create({ data: { objetivos: 'Alívio da dor', numeroSessoes: 10, frequenciaSemanal: 2, duracaoSessao: 60, status: 'ATIVO', pacienteId: pacientes[0].id, avaliacaoId: avaliacoes[0].id } }),
        prisma.planoTratamento.create({ data: { objetivos: 'Melhora da mobilidade', numeroSessoes: 8, frequenciaSemanal: 2, duracaoSessao: 50, status: 'PAUSADO', pacienteId: pacientes[1].id, avaliacaoId: avaliacoes[1].id } }),
        prisma.planoTratamento.create({ data: { objetivos: 'Fortalecimento', numeroSessoes: 12, frequenciaSemanal: 3, duracaoSessao: 45, status: 'FINALIZADO', pacienteId: pacientes[2].id, avaliacaoId: avaliacoes[2].id } }),
        prisma.planoTratamento.create({ data: { objetivos: 'Reabilitação', numeroSessoes: 15, frequenciaSemanal: 2, duracaoSessao: 60, status: 'CANCELADO', pacienteId: pacientes[3].id, avaliacaoId: avaliacoes[3].id } }),
        prisma.planoTratamento.create({ data: { objetivos: 'Prevenção', numeroSessoes: 6, frequenciaSemanal: 1, duracaoSessao: 40, status: 'ATIVO', pacienteId: pacientes[4].id, avaliacaoId: avaliacoes[4].id } }),
    ]);

    // Prontuários
    await Promise.all([
        prisma.prontuario.create({ data: { evolucao: 'Evolução 1', pacienteId: pacientes[0].id } }),
        prisma.prontuario.create({ data: { evolucao: 'Evolução 2', pacienteId: pacientes[1].id } }),
        prisma.prontuario.create({ data: { evolucao: 'Evolução 3', pacienteId: pacientes[2].id } }),
        prisma.prontuario.create({ data: { evolucao: 'Evolução 4', pacienteId: pacientes[3].id } }),
        prisma.prontuario.create({ data: { evolucao: 'Evolução 5', pacienteId: pacientes[4].id } }),
    ]);

    // Pagamentos
    await Promise.all([
        prisma.pagamento.create({ data: { valor: 150.00, formaPagamento: 'PIX', status: 'PAGO', dataVencimento: new Date('2025-09-15'), dataPagamento: new Date('2025-09-15'), pacienteId: pacientes[0].id } }),
        prisma.pagamento.create({ data: { valor: 120.00, formaPagamento: 'DINHEIRO', status: 'PENDENTE', dataVencimento: new Date('2025-09-16'), pacienteId: pacientes[1].id } }),
        prisma.pagamento.create({ data: { valor: 100.00, formaPagamento: 'CARTAO_CREDITO', status: 'CANCELADO', dataVencimento: new Date('2025-09-17'), pacienteId: pacientes[2].id } }),
        prisma.pagamento.create({ data: { valor: 130.00, formaPagamento: 'CARTAO_DEBITO', status: 'VENCIDO', dataVencimento: new Date('2025-09-18'), pacienteId: pacientes[3].id } }),
        prisma.pagamento.create({ data: { valor: 110.00, formaPagamento: 'PIX', status: 'PAGO', dataVencimento: new Date('2025-09-19'), dataPagamento: new Date('2025-09-19'), pacienteId: pacientes[4].id } }),
    ]);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
