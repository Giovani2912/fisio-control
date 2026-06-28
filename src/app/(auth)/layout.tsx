import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12">
      <div className="w-full max-w-sm">
        <Link
          href="/"
          className="mb-10 flex items-center gap-2 text-lg font-bold text-gray-900"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          Fisio<span className="text-emerald-600">Control</span>
        </Link>

        {children}
      </div>
    </div>
  );
}
