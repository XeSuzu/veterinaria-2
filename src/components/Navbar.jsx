import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error.message);
    }
  };

  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
      <Link to="/" className="font-bold text-lg">Mascotas 🐾</Link>
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <>
            <Link to="/login" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        ) : (
          <button onClick={handleLogout} className="hover:underline">
            Cerrar sesión
          </button>
        )}
      </div>
    </nav>
  );
}