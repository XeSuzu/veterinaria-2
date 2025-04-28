export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg">Página no encontrada</p>
      <a href="/" className="text-blue-500 hover:underline mt-4">
        Volver al inicio
      </a>
    </div>
  );
}