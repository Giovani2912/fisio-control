import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                const fisioterapeuta = await prisma.fisioterapeuta.findUnique({
                    where: { email: credentials.email }
                })

                if (!fisioterapeuta || !fisioterapeuta.senha) {
                    return null
                }

                const isPasswordValid = await bcrypt.compare(
                    credentials.password,
                    fisioterapeuta.senha
                )

                if (!isPasswordValid) {
                    return null
                }

                return {
                    id: fisioterapeuta.id,
                    name: fisioterapeuta.nome,
                    email: fisioterapeuta.email,
                    role: fisioterapeuta.role
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login'
    }
}

export default NextAuth(authOptions)