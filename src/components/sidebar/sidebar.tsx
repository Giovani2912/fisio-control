'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import SidebarContent from './sidebar-content';
import { Button } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button - Only visible on mobile */}
      <nav className='lg:hidden bg-white flex justify-between p-2'>
        <Button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          variant={'outline'}
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </Button>

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
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Sidebar - Slides in from left */}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-64 transform border-r border-gray-200 bg-white shadow-xl transition-transform duration-300 ease-in-out lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent pathname={pathname} onItemClick={closeMobileMenu} />
      </aside>

      {/* Desktop Sidebar - Only visible on large screens */}
      <aside className="hidden h-screen border-r border-gray-200 bg-white shadow-sm lg:block">
        <SidebarContent pathname={pathname} />
      </aside>
    </>
  );
}