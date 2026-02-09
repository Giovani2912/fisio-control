import {
  Home,
  Users,
  Calendar,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

interface SidebarContentProps {
  pathname: string;
  onItemClick?: () => void;
}

const menuItems = [
  {
    href: '/admin',
    icon: Home,
    label: 'Dashboard',
  },
  {
    href: '/admin/pacientes',
    icon: Users,
    label: 'Pacientes',
  },
  {
    href: '/admin/consultas',
    icon: Calendar,
    label: 'Consultas',
  },
  // {
  //   href: '/admin/avaliacoes',
  //   icon: Info,
  //   label: 'Avaliações',
  // },
];

export default function SidebarContent({
  pathname,
  onItemClick,
}: SidebarContentProps) {
  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="border-b border-gray-200 p-4 lg:p-6">
        <div className="flex items-center gap-2 lg:gap-3">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/globe.svg"
              alt="Fisio Control Logo"
              width={32}
              height={32}
              className="lg:w-9 lg:h-9"
            />
          </Link>
          <span className="text-lg font-bold tracking-tight text-green-700 lg:text-xl truncate">
            Fisio Control
          </span>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden space-y-1 p-3 lg:space-y-2 lg:p-4">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onItemClick}
              className={cn(
                'flex items-center gap-2 lg:gap-3 rounded-lg px-3 py-2.5 lg:px-4 lg:py-3 text-sm font-medium transition-colors',
                isActive
                  ? 'border border-green-200 bg-green-100 text-green-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
              )}
            >
              <Icon size={18} className="flex-shrink-0 lg:w-5 lg:h-5" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3 lg:p-4">
        <div className="flex items-center gap-2 lg:gap-3 px-2 py-2 lg:px-4">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500 lg:h-9 lg:w-9">
            <span className="text-sm font-medium text-white">U</span>
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">
              Usuário
            </p>
            <p className="truncate text-xs text-gray-500">usuario@email.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}