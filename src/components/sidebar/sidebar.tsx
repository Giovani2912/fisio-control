'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogIn, LogOut, Menu, X } from 'lucide-react';
import SidebarContent from './sidebar-content';
import { Button } from '../ui/button';
import {
  Show,
  SignInButton,
  SignOutButton,
  SignUpButton,
} from '@clerk/nextjs';

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

        <div className="flex items-center gap-2">
          <Show when="signed-in">
            <SignOutButton>
              <Button variant="outline" size="sm">
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </SignOutButton>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="outline" size="sm">
                <LogIn className="h-4 w-4" />
                Entrar
              </Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button
                size="sm"
                className="bg-green-600 text-white hover:bg-green-700"
              >
                Criar conta
              </Button>
            </SignUpButton>
          </Show>
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