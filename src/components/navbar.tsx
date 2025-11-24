'use client';
import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import SidebarContent from './sidebar/sidebar-content';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Trigger Button - Fixed position, separate from navbar */}
      <div className="fixed top-4 left-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="bg-white shadow-md"
            >
              <Menu size={20} />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <SheetHeader className="sr-only">
              <SheetTitle>Menu de Navegação</SheetTitle>
            </SheetHeader>
            <SidebarContent
              pathname={pathname}
              onItemClick={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Desktop Navigation - Hidden on mobile since we have sidebar */}
          <div className="hidden items-center gap-8 lg:flex">
            <Link
              href="/"
              className="font-medium text-gray-700 transition hover:text-green-600"
            >
              Home
            </Link>
            <Link
              href="/admin/consultas"
              className="font-medium text-gray-700 transition hover:text-green-600"
            >
              Consultas
            </Link>
            <Link
              href="/admin/pacientes"
              className="font-medium text-gray-700 transition hover:text-green-600"
            >
              Pacientes
            </Link>
          </div>

          {/* Action Button */}
          <div className="flex items-center gap-2">
            <Link href="/login">
              <button className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-green-700">
                Entrar
              </button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
