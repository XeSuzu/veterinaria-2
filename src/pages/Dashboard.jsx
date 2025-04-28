import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Bienvenido al Dashboard</h1>
      <p className="mb-4">Este es un contenido exclusivo para usuarios autenticados.</p>
      <div className="flex gap-4">
        <Link
          to="/"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Ir a la página principal
        </Link>
        <Link
          to="/profile"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Ver perfil
        </Link>
      </div>
    </div>
  );
}
