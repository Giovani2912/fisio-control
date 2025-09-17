"use client"
import { usePathname } from 'next/navigation'

import SidebarContent from './sidebar-content'

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <>
            {/* Desktop Sidebar - Só aparece em telas grandes */}
            <aside className="hidden lg:block bg-white border-r border-gray-200 shadow-sm">
                <SidebarContent pathname={pathname} />
            </aside>
        </>
    )
}