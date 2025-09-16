import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
    console.log('Iniciando seed do banco de dados...')

    // ===== CRIAÇÃO DOS PACIENTES =====
    console.log('Criando pacientes...')

    const pacientes = await Promise.all([
        prisma.paciente.create({
            data: {
                nome: 'Maria Silva Santos',
                cpf: '12345678901',
                rg: 'MG1234567',
                email: 'maria.santos@email.com',
                celular: '(31) 99999-1111',
                idade: '45',
                sexo: 'FEMININO',
                convenio: 'UNIMED',
                numeroConvenio: 'UN123456789',
                contato_emergencia: 'João Santos - (31) 99999-2222'
            }
        }),

        prisma.paciente.create({
            data: {
                nome: 'Carlos Eduardo Lima',
                cpf: '98765432101',
                rg: 'SP9876543',
                email: 'carlos.lima@email.com',
                celular: '(11) 88888-3333',
                idade: '32',
                sexo: 'MASCULINO',
                convenio: 'BRADESCO',
                numeroConvenio: 'BR987654321',
                contato_emergencia: 'Ana Lima - (11) 88888-4444'
            }
        }),

        prisma.paciente.create({
            data: {
                nome: 'Ana Paula Oliveira',
                cpf: '45678912301',
                rg: 'RJ4567891',
                email: 'ana.oliveira@email.com',
                celular: '(21) 77777-5555',
                idade: '28',
                sexo: 'FEMININO',
                convenio: 'SULAMERICA',
                numeroConvenio: 'SA456789123',
                contato_emergencia: 'Pedro Oliveira - (21) 77777-6666'
            }
        }),

        prisma.paciente.create({
            data: {
                nome: 'Roberto Ferreira Costa',
                cpf: '78912345601',
                rg: 'BA7891234',
                email: 'roberto.costa@email.com',
                celular: '(71) 66666-7777',
                idade: '58',
                sexo: 'MASCULINO',
                convenio: 'AMIL',
                numeroConvenio: 'AM789123456',
                contato_emergencia: 'Marcia Costa - (71) 66666-8888'
            }
        }),

        prisma.paciente.create({
            data: {
                nome: 'Juliana Rodrigues Alves',
                cpf: '32165498701',
                rg: 'PR3216549',
                email: 'juliana.alves@email.com',
                celular: '(41) 55555-9999',
                idade: '35',
                sexo: 'FEMININO',
                convenio: 'HAOC',
                numeroConvenio: 'HA321654987',
                contato_emergencia: 'Marcos Alves - (41) 55555-1010'
            }
        })
    ])

    console.log(`✓ ${pacientes.length} pacientes criados`)

    // ===== CRIAÇÃO DAS CONSULTAS =====
    console.log('Criando consultas...')

    const dataBase = new Date()

    const consultas = await Promise.all([
        prisma.consulta.create({
            data: {
                data: new Date(dataBase.getTime() + 1 * 24 * 60 * 60 * 1000), // +1 dia
                horaInicio: new Date(dataBase.getTime() + 1 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000), // 9h
                horaFim: new Date(dataBase.getTime() + 1 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 10h
                tipo: 'AVALIACAO',
                status: 'AGENDADA',
                observacoes: 'Primeira consulta - avaliação inicial',
                valorConsulta: 120.00,
                pacienteId: pacientes[0].id
            }
        }),

        prisma.consulta.create({
            data: {
                data: new Date(dataBase.getTime() + 2 * 24 * 60 * 60 * 1000), // +2 dias
                horaInicio: new Date(dataBase.getTime() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000), // 14h
                horaFim: new Date(dataBase.getTime() + 2 * 24 * 60 * 60 * 1000 + 15 * 60 * 60 * 1000), // 15h
                tipo: 'SESSAO',
                status: 'CONFIRMADA',
                observacoes: 'Sessão de fortalecimento muscular',
                valorConsulta: 80.00,
                pacienteId: pacientes[1].id
            }
        }),

        prisma.consulta.create({
            data: {
                data: new Date(dataBase.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 dias
                horaInicio: new Date(dataBase.getTime() + 3 * 24 * 60 * 60 * 1000 + 10 * 60 * 60 * 1000), // 10h
                horaFim: new Date(dataBase.getTime() + 3 * 24 * 60 * 60 * 1000 + 11 * 60 * 60 * 1000), // 11h
                tipo: 'RETORNO',
                status: 'EM_ANDAMENTO',
                observacoes: 'Acompanhamento da evolução',
                valorConsulta: 90.00,
                pacienteId: pacientes[2].id
            }
        }),

        prisma.consulta.create({
            data: {
                data: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000), // -1 dia (passado)
                horaInicio: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000 + 16 * 60 * 60 * 1000), // 16h
                horaFim: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000 + 17 * 60 * 60 * 1000), // 17h
                tipo: 'REAVALIACAO',
                status: 'FINALIZADA',
                observacoes: 'Reavaliação após 1 mês de tratamento',
                valorConsulta: 110.00,
                pacienteId: pacientes[3].id
            }
        }),

        prisma.consulta.create({
            data: {
                data: new Date(dataBase.getTime() + 5 * 24 * 60 * 60 * 1000), // +5 dias
                horaInicio: new Date(dataBase.getTime() + 5 * 24 * 60 * 60 * 1000 + 8 * 60 * 60 * 1000), // 8h
                horaFim: new Date(dataBase.getTime() + 5 * 24 * 60 * 60 * 1000 + 9 * 60 * 60 * 1000), // 9h
                tipo: 'SESSAO',
                status: 'AGENDADA',
                observacoes: 'Sessão de alongamento e mobilização',
                valorConsulta: 75.00,
                pacienteId: pacientes[4].id
            }
        })
    ])

    console.log(`✓ ${consultas.length} consultas criadas`)

    // ===== CRIAÇÃO DAS AVALIAÇÕES =====
    console.log('Criando avaliações...')

    const avaliacoes = await Promise.all([
        prisma.avaliacao.create({
            data: {
                data: new Date(dataBase.getTime() - 7 * 24 * 60 * 60 * 1000), // -7 dias
                queixaPrincipal: 'Dor lombar crônica há 6 meses',
                historiaDoenca: 'Paciente relata início da dor após episódio de levantamento de peso incorreto. Dor piora com movimentos de flexão e melhora com repouso.',
                exameFisico: 'Tensão muscular em paravertebrais L3-L5, amplitude de movimento limitada em flexão (50% do normal), teste de Lasègue negativo.',
                diagnostico: 'Lombalgia mecânica com contratura muscular',
                objetivos: 'Reduzir dor, melhorar amplitude de movimento, fortalecer musculatura do core',
                pacienteId: pacientes[0].id
            }
        }),

        prisma.avaliacao.create({
            data: {
                data: new Date(dataBase.getTime() - 10 * 24 * 60 * 60 * 1000), // -10 dias
                queixaPrincipal: 'Lesão no joelho direito pós-cirurgia de menisco',
                historiaDoenca: 'Paciente submetido à artroscopia de joelho há 3 semanas para correção de lesão de menisco medial.',
                exameFisico: 'Edema leve em joelho direito, amplitude de movimento: flexão 90°, extensão completa. Força muscular grau 4/5 em quadríceps.',
                diagnostico: 'Pós-operatório de meniscectomia parcial',
                objetivos: 'Recuperar amplitude de movimento completa, fortalecer quadríceps, retorno às atividades esportivas',
                pacienteId: pacientes[1].id
            }
        }),

        prisma.avaliacao.create({
            data: {
                data: new Date(dataBase.getTime() - 5 * 24 * 60 * 60 * 1000), // -5 dias
                queixaPrincipal: 'Dor cervical e cefaleia tensional',
                historiaDoenca: 'Trabalha muitas horas no computador, postura inadequada. Sintomas iniciaram há 3 meses e têm piorado.',
                exameFisico: 'Anteriorização da cabeça, elevação dos ombros, tensão em trapézio superior bilateral, amplitude cervical limitada em rotação.',
                diagnostico: 'Síndrome da postura anterior da cabeça',
                objetivos: 'Corrigir postura, reduzir tensão muscular, eliminar cefaleia, orientar ergonomia',
                pacienteId: pacientes[2].id
            }
        }),

        prisma.avaliacao.create({
            data: {
                data: new Date(dataBase.getTime() - 14 * 24 * 60 * 60 * 1000), // -14 dias
                queixaPrincipal: 'Rigidez e dor em ombro esquerdo',
                historiaDoenca: 'Início gradual há 4 meses, sem trauma. Dor noturna intensa, dificuldade para pentear cabelos e vestir roupas.',
                exameFisico: 'Amplitude de movimento severamente limitada em todas as direções. Flexão: 80°, abdução: 70°, rotação interna e externa muito limitadas.',
                diagnostico: 'Capsulite adesiva (ombro congelado) - fase de congelamento',
                objetivos: 'Manter amplitude existente, prevenir maior perda de movimento, controlar dor',
                pacienteId: pacientes[3].id
            }
        }),

        prisma.avaliacao.create({
            data: {
                data: new Date(dataBase.getTime() - 3 * 24 * 60 * 60 * 1000), // -3 dias
                queixaPrincipal: 'Dor no pé direito e dificuldade para caminhar',
                historiaDoenca: 'Corredora recreacional, aumentou volume de treino recentemente. Dor na região plantar, especialmente pela manhã.',
                exameFisico: 'Dor à palpação do calcâneo medial, teste de dorsiflexão do hálux positivo, encurtamento de gastrocnêmio.',
                diagnostico: 'Fascite plantar',
                objetivos: 'Reduzir inflamação, alongar fáscia plantar, fortalecer musculatura intrínseca do pé, orientar calçados adequados',
                pacienteId: pacientes[4].id
            }
        })
    ])

    console.log(`✓ ${avaliacoes.length} avaliações criadas`)

    // ===== CRIAÇÃO DOS PLANOS DE TRATAMENTO =====
    console.log('Criando planos de tratamento...')

    const planosTratamento = await Promise.all([
        prisma.planoTratamento.create({
            data: {
                objetivos: 'Reduzir dor lombar, melhorar amplitude de movimento e fortalecer musculatura do core',
                numeroSessoes: 20,
                frequenciaSemanal: 3,
                duracaoSessao: 60,
                descricao: 'Programa de fortalecimento do core, alongamentos específicos para coluna lombar, técnicas de relaxamento muscular e orientações posturais',
                status: 'ATIVO',
                pacienteId: pacientes[0].id,
                avaliacaoId: avaliacoes[0].id
            }
        }),

        prisma.planoTratamento.create({
            data: {
                objetivos: 'Recuperação completa pós-cirúrgica, retorno ao esporte',
                numeroSessoes: 24,
                frequenciaSemanal: 3,
                duracaoSessao: 50,
                descricao: 'Protocolo de reabilitação pós-meniscectomia: fortalecimento progressivo de quadríceps, treino proprioceptivo, retorno gradual às atividades',
                status: 'ATIVO',
                pacienteId: pacientes[1].id,
                avaliacaoId: avaliacoes[1].id
            }
        }),

        prisma.planoTratamento.create({
            data: {
                objetivos: 'Correção postural e eliminação da cefaleia tensional',
                numeroSessoes: 16,
                frequenciaSemanal: 2,
                duracaoSessao: 45,
                descricao: 'Programa de correção postural: fortalecimento de musculatura cervical profunda, alongamento de cadeia anterior, orientações ergonômicas',
                status: 'ATIVO',
                pacienteId: pacientes[2].id,
                avaliacaoId: avaliacoes[2].id
            }
        }),

        prisma.planoTratamento.create({
            data: {
                objetivos: 'Recuperar amplitude de movimento do ombro gradualmente',
                numeroSessoes: 30,
                frequenciaSemanal: 2,
                duracaoSessao: 40,
                descricao: 'Tratamento conservador para capsulite adesiva: mobilizações articulares graduais, exercícios pendulares, termoterapia',
                status: 'ATIVO',
                dataFim: new Date(dataBase.getTime() + 90 * 24 * 60 * 60 * 1000), // +90 dias
                pacienteId: pacientes[3].id,
                avaliacaoId: avaliacoes[3].id
            }
        }),

        prisma.planoTratamento.create({
            data: {
                objetivos: 'Eliminar dor plantar e retorno seguro à corrida',
                numeroSessoes: 12,
                frequenciaSemanal: 2,
                duracaoSessao: 45,
                descricao: 'Protocolo específico para fascite plantar: alongamentos, fortalecimento, técnicas manuais, orientação sobre calçados e pisada',
                status: 'ATIVO',
                pacienteId: pacientes[4].id,
                avaliacaoId: avaliacoes[4].id
            }
        })
    ])

    console.log(`✓ ${planosTratamento.length} planos de tratamento criados`)

    // ===== CRIAÇÃO DOS PRONTUÁRIOS =====
    console.log('Criando prontuários...')

    const prontuarios = await Promise.all([
        prisma.prontuario.create({
            data: {
                data: new Date(dataBase.getTime() - 2 * 24 * 60 * 60 * 1000), // -2 dias
                evolucao: 'Paciente refere melhora de 40% da dor lombar. Amplitude de movimento em flexão aumentou para 70%. Consegue permanecer sentada por mais tempo.',
                procedimentos: 'Alongamento de cadeia posterior, fortalecimento de transverso do abdome, liberação miofascial em paravertebrais',
                observacoes: 'Paciente muito colaborativa. Realizando exercícios domiciliares conforme orientado.',
                pacienteId: pacientes[0].id
            }
        }),

        prisma.prontuario.create({
            data: {
                data: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000), // -1 dia
                evolucao: 'Excelente evolução pós-operatória. Amplitude de movimento: flexão 120°, extensão completa. Força muscular grau 5/5.',
                procedimentos: 'Fortalecimento de quadríceps e isquiotibiais, treino proprioceptivo em superfície instável, exercícios funcionais',
                observacoes: 'Paciente ansioso para retornar ao futebol. Orientado sobre progressão gradual.',
                pacienteId: pacientes[1].id
            }
        }),

        prisma.prontuario.create({
            data: {
                data: new Date(dataBase.getTime() - 3 * 24 * 60 * 60 * 1000), // -3 dias
                evolucao: 'Redução significativa da cefaleia (frequência diminuiu de diária para 2x/semana). Melhora da postura cervical.',
                procedimentos: 'Mobilização cervical, fortalecimento de flexores cervicais profundos, exercícios de consciência postural',
                observacoes: 'Paciente implementou pausas no trabalho conforme orientado. Adquiriu suporte para monitor.',
                pacienteId: pacientes[2].id
            }
        }),

        prisma.prontuario.create({
            data: {
                data: new Date(dataBase.getTime() - 4 * 24 * 60 * 60 * 1000), // -4 dias
                evolucao: 'Discreta melhora da amplitude de movimento. Flexão: 90°, abdução: 85°. Dor noturna menos intensa.',
                procedimentos: 'Mobilizações articulares graduais, exercícios pendulares, aplicação de calor superficial',
                observacoes: 'Processo lento conforme esperado para capsulite adesiva. Paciente orientada sobre cronologia da patologia.',
                pacienteId: pacientes[3].id
            }
        }),

        prisma.prontuario.create({
            data: {
                data: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000), // -1 dia
                evolucao: 'Dor matinal eliminou completamente. Consegue caminhar longas distâncias sem dor. Retornará à corrida progressivamente.',
                procedimentos: 'Alongamento específico de fáscia plantar, fortalecimento de músculos intrínsecos do pé, orientação sobre tênis',
                observacoes: 'Alta da fisioterapia na próxima sessão. Orientações para prevenção de recidivas fornecidas.',
                pacienteId: pacientes[4].id
            }
        })
    ])

    console.log(`✓ ${prontuarios.length} prontuários criados`)

    // ===== CRIAÇÃO DOS PAGAMENTOS =====
    console.log('Criando pagamentos...')

    const pagamentos = await Promise.all([
        prisma.pagamento.create({
            data: {
                valor: 360.00, // 3 sessões x 120
                formaPagamento: 'CONVENIO',
                status: 'PAGO',
                dataVencimento: new Date(dataBase.getTime() - 5 * 24 * 60 * 60 * 1000), // -5 dias
                dataPagamento: new Date(dataBase.getTime() - 3 * 24 * 60 * 60 * 1000), // -3 dias
                descricao: 'Pagamento referente às sessões de fisioterapia - março/2025',
                pacienteId: pacientes[0].id
            }
        }),

        prisma.pagamento.create({
            data: {
                valor: 240.00, // 3 sessões x 80
                formaPagamento: 'CARTAO_CREDITO',
                status: 'PAGO',
                dataVencimento: new Date(dataBase.getTime() - 7 * 24 * 60 * 60 * 1000), // -7 dias
                dataPagamento: new Date(dataBase.getTime() - 7 * 24 * 60 * 60 * 1000), // -7 dias
                descricao: 'Pagamento à vista - desconto de 5% aplicado',
                pacienteId: pacientes[1].id
            }
        }),

        prisma.pagamento.create({
            data: {
                valor: 180.00, // 2 sessões x 90
                formaPagamento: 'PIX',
                status: 'PENDENTE',
                dataVencimento: new Date(dataBase.getTime() + 3 * 24 * 60 * 60 * 1000), // +3 dias
                dataPagamento: null,
                descricao: 'Pagamento referente às sessões da semana 10-14/09',
                pacienteId: pacientes[2].id
            }
        }),

        prisma.pagamento.create({
            data: {
                valor: 440.00, // 4 sessões x 110
                formaPagamento: 'TRANSFERENCIA',
                status: 'VENCIDO',
                dataVencimento: new Date(dataBase.getTime() - 10 * 24 * 60 * 60 * 1000), // -10 dias
                dataPagamento: null,
                descricao: 'Pagamento em atraso - entrar em contato com paciente',
                pacienteId: pacientes[3].id
            }
        }),

        prisma.pagamento.create({
            data: {
                valor: 300.00, // 4 sessões x 75
                formaPagamento: 'CARTAO_DEBITO',
                status: 'PAGO',
                dataVencimento: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000), // -1 dia
                dataPagamento: new Date(dataBase.getTime() - 1 * 24 * 60 * 60 * 1000), // -1 dia
                descricao: 'Pagamento pontual - paciente fiel',
                pacienteId: pacientes[4].id
            }
        })
    ])

    console.log(`✓ ${pagamentos.length} pagamentos criados`)

    console.log('\n🎉 Seed concluído com sucesso!')
    console.log('\nResumo dos dados criados:')
    console.log(`• ${pacientes.length} pacientes`)
    console.log(`• ${consultas.length} consultas`)
    console.log(`• ${avaliacoes.length} avaliações`)
    console.log(`• ${planosTratamento.length} planos de tratamento`)
    console.log(`• ${prontuarios.length} prontuários`)
    console.log(`• ${pagamentos.length} pagamentos`)
}

main()
    .catch((e) => {
        console.error('❌ Erro durante o seed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })