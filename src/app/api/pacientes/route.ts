import prisma from '@/lib/prisma'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createPacienteSchema = z.object({
    nome: z.string().min(2),
    cpf: z.string().length(11),
    rg: z.string().min(5).optional(),
    email: z.string().email().optional(),
    celular: z.string().min(10),
    idade: z.string(), // Corrigido para string
    sexo: z.enum(['MASCULINO', 'FEMININO', 'OUTRO']),
    convenio: z.enum(['HAOC', 'UNIMED', 'SAMARITANO', 'BRADESCO', 'SULAMERICA', 'AMIL', 'PORTOSEGURO', 'NOTREDAME']).optional(),
    numeroConvenio: z.string().optional(),
    contato_emergencia: z.string().min(2).optional(),
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)
        const page = parseInt(searchParams.get('page') || '1')
        const limit = parseInt(searchParams.get('limit') || '10')
        const search = searchParams.get('search') || ''

        const skip = (page - 1) * limit

        const where = search ? {
            OR: [
                { nome: { contains: search, mode: 'insensitive' as const } },
                { cpf: { contains: search } },
                { email: { contains: search, mode: 'insensitive' as const } }
            ]
        } : {}

        const [pacientes, total] = await Promise.all([
            prisma.paciente.findMany({
                where,
                include: {
                    _count: {
                        select: {
                            consultas: true,
                            pagamentos: true
                        }
                    }
                },
                skip,
                take: limit,
                orderBy: { nome: 'asc' }
            }),
            prisma.paciente.count({ where })
        ])

        return NextResponse.json({
            data: pacientes,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        })
    } catch (error) {
        return NextResponse.json(
            { error: 'Erro ao buscar pacientes' },
            { status: 500 }
        )
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const validatedData = createPacienteSchema.parse(body)

        const paciente = await prisma.paciente.create({
            data: {
                ...validatedData,
            },
        })

        return NextResponse.json(paciente, { status: 201 })
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: 'Dados inválidos' },
                { status: 400 }
            )
        }

        return NextResponse.json(
            { error: 'Erro ao criar paciente' },
            { status: 500 }
        )
    }
}