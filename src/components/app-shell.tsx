'use client';

import { usePathname } from 'next/navigation';
import Sidebar from '@/components/sidebar/sidebar';
import { Button } from '@/components/ui/button';
import { Show, SignInButton, SignUpButton } from '@clerk/nextjs';
import { LogIn } from 'lucide-react';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith('/sign-in') || pathname?.startsWith('/sign-up');

  // Páginas de autenticação: tela cheia, centralizada e sem o chrome do app.
  if (isAuthPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1] p-4">
        {children}
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#f1f1f1] lg:grid lg:grid-cols-[1fr_7fr]">
      <Sidebar />
      <div className="overflow-y-auto lg:col-start-2">
        <Show when="signed-out">
          <div className="hidden justify-end gap-2 px-4 py-3 sm:px-6 lg:flex">
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
          </div>
        </Show>
        <div className="px-4 py-4 sm:px-6">{children}</div>
      </div>
    </div>
  );
}
