import {
    Home,
    Users,
    Calendar,
    FileText,
    Settings,
    TimerIcon,
    Info,
    MessageSquareText,
    ArmchairIcon
} from 'lucide-react'

import { cn } from "@/lib/utils"
import Link from "next/link"
import Image from 'next/image'

interface SidebarContentProps {
    pathname: string
    onItemClick?: () => void
}
const menuItems = [
    {
        href: '/',
        icon: Home,
        label: 'Dashboard'
    },
    {
        href: '/admin/pacientes',
        icon: Users,
        label: 'Pacientes'
    },
    {
        href: '/admin/avaliacoes',
        icon: Info,
        label: 'Avaliações'
    },
    {
        href: '/admin/sessoes',
        icon: MessageSquareText,
        label: 'Sessões'
    },
    {
        href: '/admin/consultas',
        icon: Calendar,
        label: 'Consultas'
    },
    {
        href: '/admin/horarios',
        icon: TimerIcon,
        label: 'Horários'
    },
    {
        href: '/admin/relatorios',
        icon: FileText,
        label: 'Relatórios'
    },
    {
        href: '/admin/equipamentos',
        icon: ArmchairIcon,
        label: 'Equipamentos'
    },
    {
        href: '/configuracoes',
        icon: Settings,
        label: 'Configurações'
    }
]
export default function SidebarContent({ pathname, onItemClick }: SidebarContentProps) {
    return (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
                {/* Logo - Ajustado para mobile com margem left */}
                <div className="flex items-center gap-3 ml-14 lg:ml-0">
                    <Link href="/">
                        <Image
                            src="/globe.svg"
                            alt="Fisio Control Logo"
                            width={36}
                            height={36}
                        />
                    </Link>
                    <span className="text-xl font-bold tracking-tight text-green-700">
                        Fisio Control
                    </span>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive = pathname === item.href

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onItemClick}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-green-100 text-green-700 border border-green-200"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                            )}
                        >
                            <Icon size={20} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200">
                <div className="flex items-center gap-3 px-4 py-2">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-sm font-medium">U</span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                            Usuário
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                            usuario@email.com
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}