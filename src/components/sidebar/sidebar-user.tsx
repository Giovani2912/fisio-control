'use client';
import { Show, SignOutButton, UserButton, useUser } from '@clerk/nextjs';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

export default function SidebarUser() {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 border-t border-gray-200 p-3 lg:p-4">
      <div className="flex items-center gap-2 px-2 py-2 lg:gap-3 lg:px-4">
        <UserButton appearance={{ elements: { avatarBox: 'h-9 w-9' } }} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {isLoaded
              ? (user?.fullName ?? user?.username)
              : 'Carregando...'}
          </p>
          <p className="truncate text-xs text-gray-500">
            {user?.primaryEmailAddress?.emailAddress ?? ''}
          </p>
        </div>
      </div>

      <Show when="signed-in">
        <SignOutButton>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start gap-2 text-gray-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Sair
          </Button>
        </SignOutButton>
      </Show>
    </div>
  );
}
