import Link from 'next/link';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 shadow-sm backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              src="/globe.svg"
              alt="Fisio Control Logo"
              width={36}
              height={36}
            />
          </Link>
          <span className="text-xl font-bold tracking-tight text-green-700">
            Fisio Control
          </span>
        </div>
        <div className="hidden items-center gap-8 md:flex">
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
        <div className="flex items-center gap-2">
          <Link href="/login">
            <button className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white shadow transition hover:bg-green-700">
              Entrar
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
