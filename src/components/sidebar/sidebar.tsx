'use client';
import { usePathname } from 'next/navigation';

import SidebarContent from './sidebar-content';

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar - Só aparece em telas grandes */}
      <aside className="hidden h-screen overflow-hidden border-r border-gray-200 bg-white shadow-sm lg:block">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}
