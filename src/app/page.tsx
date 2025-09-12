import MaxWidthWrapper from '@/components/max-width-wrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 via-green-100 to-blue-200">
      <div className="flex flex-col items-center justify-between gap-16 py-24 md:flex-row">
        <div className="max-w-xl flex-1">
          <h1 className="mb-6 text-5xl leading-tight font-extrabold md:text-6xl">
            Bem vindo ao
            <br />
            <span className="mt-2 inline-block rounded-2xl bg-gradient-to-br from-blue-400 to-green-300 px-3 py-1 text-white shadow-md">
              Fisio Control!
            </span>
          </h1>
          <h2 className="mb-8 text-2xl font-semibold text-gray-600">
            Sua plataforma para o controle da sua clínica.
          </h2>
          <Button
            size="lg"
            variant="link"
            className="w-[80%] px-8 py-4 text-lg shadow-lg"
          >
            Entrar
          </Button>
        </div>
        <div className="flex flex-1 justify-center">
          <Image
            src="/globe.svg"
            alt="Fisio Control Illustration"
            width={350}
            height={350}
            className="drop-shadow-xl"
          />
        </div>
      </div>
    </div>
  );
}
