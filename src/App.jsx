import { Link, Outlet } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { useToast } from './context/ToastContext';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const { isAuthenticated, logout, setIsAuthenticated, setLoading, auth } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, setIsAuthenticated, setLoading]);

  const handleLogout = async () => {
    try {
      await logout();
      showToast('¡Sesión cerrada exitosamente! 🔒', 'success');
    } catch (error) {
      showToast('Error al cerrar sesión: ' + error.message, 'error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <nav className="bg-blue-500 p-4 flex justify-between items-center text-white">
        <div className="flex gap-4">
          <Link to="/" className="font-bold text-lg">Mascotas 🐾</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
          )}
        </div>
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

      {/* Contenido dinámico */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

    </div>
  );
}

export { App };
