export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f1f1f1]">
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
        </div>
      </div>
    </div>
  );
}
