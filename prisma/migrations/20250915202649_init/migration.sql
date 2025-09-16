-- CreateEnum
CREATE TYPE "public"."Sexo" AS ENUM ('MASCULINO', 'FEMININO', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."Convenios" AS ENUM ('HAOC', 'UNIMED', 'SAMARITANO', 'BRADESCO', 'SULAMERICA', 'AMIL', 'PORTOSEGURO', 'NOTREDAME');

-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('ADMIN', 'FISIOTERAPEUTA', 'RECEPCIONISTA');

-- CreateEnum
CREATE TYPE "public"."TipoConsulta" AS ENUM ('AVALIACAO', 'SESSAO', 'RETORNO', 'REAVALIACAO');

-- CreateEnum
CREATE TYPE "public"."StatusConsulta" AS ENUM ('AGENDADA', 'CONFIRMADA', 'EM_ANDAMENTO', 'FINALIZADA', 'CANCELADA', 'FALTA');

-- CreateEnum
CREATE TYPE "public"."StatusTratamento" AS ENUM ('ATIVO', 'PAUSADO', 'FINALIZADO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."StatusPagamento" AS ENUM ('PENDENTE', 'PAGO', 'VENCIDO', 'CANCELADO');

-- CreateEnum
CREATE TYPE "public"."FormaPagamento" AS ENUM ('DINHEIRO', 'CARTAO_CREDITO', 'CARTAO_DEBITO', 'PIX', 'TRANSFERENCIA', 'CONVENIO');

-- CreateEnum
CREATE TYPE "public"."DiaSemana" AS ENUM ('SEGUNDA', 'TERCA', 'QUARTA', 'QUINTA', 'SEXTA', 'SABADO', 'DOMINGO');

-- CreateTable
CREATE TABLE "public"."pacientes" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "rg" TEXT,
    "email" TEXT,
    "celular" TEXT NOT NULL,
    "idade" TEXT NOT NULL,
    "sexo" "public"."Sexo" NOT NULL,
    "convenio" "public"."Convenios",
    "numeroConvenio" TEXT,
    "contato_emergencia" TEXT,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "pacientes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."consultas" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "horaInicio" TIMESTAMP(3) NOT NULL,
    "horaFim" TIMESTAMP(3) NOT NULL,
    "tipo" "public"."TipoConsulta" NOT NULL,
    "status" "public"."StatusConsulta" NOT NULL DEFAULT 'AGENDADA',
    "observacoes" TEXT,
    "valorConsulta" DECIMAL(8,2) NOT NULL,
    "pacienteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "consultas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."avaliacoes" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "queixaPrincipal" TEXT NOT NULL,
    "historiaDoenca" TEXT,
    "exameFisico" TEXT,
    "diagnostico" TEXT,
    "objetivos" TEXT,
    "pacienteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "avaliacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."planos_tratamento" (
    "id" TEXT NOT NULL,
    "objetivos" TEXT NOT NULL,
    "numeroSessoes" INTEGER NOT NULL,
    "frequenciaSemanal" INTEGER NOT NULL,
    "duracaoSessao" INTEGER NOT NULL,
    "descricao" TEXT,
    "status" "public"."StatusTratamento" NOT NULL DEFAULT 'ATIVO',
    "pacienteId" TEXT NOT NULL,
    "avaliacaoId" TEXT NOT NULL,
    "dataInicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dataFim" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "planos_tratamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."prontuarios" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "evolucao" TEXT NOT NULL,
    "procedimentos" TEXT,
    "observacoes" TEXT,
    "pacienteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "prontuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."pagamentos" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL(8,2) NOT NULL,
    "formaPagamento" "public"."FormaPagamento" NOT NULL,
    "status" "public"."StatusPagamento" NOT NULL DEFAULT 'PENDENTE',
    "dataVencimento" TIMESTAMP(3) NOT NULL,
    "dataPagamento" TIMESTAMP(3),
    "descricao" TEXT,
    "pacienteId" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamentos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "pacientes_cpf_key" ON "public"."pacientes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "planos_tratamento_avaliacaoId_key" ON "public"."planos_tratamento"("avaliacaoId");

-- AddForeignKey
ALTER TABLE "public"."consultas" ADD CONSTRAINT "consultas_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."avaliacoes" ADD CONSTRAINT "avaliacoes_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."planos_tratamento" ADD CONSTRAINT "planos_tratamento_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."planos_tratamento" ADD CONSTRAINT "planos_tratamento_avaliacaoId_fkey" FOREIGN KEY ("avaliacaoId") REFERENCES "public"."avaliacoes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."prontuarios" ADD CONSTRAINT "prontuarios_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."pagamentos" ADD CONSTRAINT "pagamentos_pacienteId_fkey" FOREIGN KEY ("pacienteId") REFERENCES "public"."pacientes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
