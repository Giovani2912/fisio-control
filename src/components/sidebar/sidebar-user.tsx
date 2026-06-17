'use client';
import { UserButton, useUser } from '@clerk/nextjs';

export default function SidebarUser() {
  const { user, isLoaded } = useUser();

  return (
    <div className="border-t border-gray-200 p-3 lg:p-4">
      <div className="flex items-center gap-2 lg:gap-3 px-2 py-2 lg:px-4">
        <UserButton
          appearance={{ elements: { avatarBox: 'h-9 w-9' } }}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-gray-900">
            {isLoaded
              ? (user?.fullName ?? user?.username ?? 'Usuário')
              : 'Carregando...'}
          </p>
          <p className="truncate text-xs text-gray-500">
            {user?.primaryEmailAddress?.emailAddress ?? ''}
          </p>
        </div>
      </div>
    </div>
  );
}
