import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <p className="text-3xl font-semibold text-indigo-600">Error 404</p>
      <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">Pagina no encontrada</h1>
      <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">Lo sentimos, la pagina que buscas no existe.</p>
      <div className="mt-10 flex items-center justify-center gap-x-6">
        <Link href="/">
          Volver a la página de inicio
        </Link>
      </div>
    </div>
  );
}