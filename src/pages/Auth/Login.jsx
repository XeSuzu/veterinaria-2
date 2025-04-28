import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      showToast('¡Bienvenido! 🐾', 'success');
      navigate('/dashboard');
    } catch (error) {
      // Manejo de errores específicos
      if (error.code === 'auth/user-not-found') {
        showToast('Usuario no encontrado', 'error');
      } else if (error.code === 'auth/wrong-password') {
        showToast('Contraseña incorrecta', 'error');
      } else {
        showToast('Error al iniciar sesión: ' + error.message, 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>
      <form className="flex flex-col gap-4 w-64" onSubmit={handleLogin}>
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Entrar</button>
      </form>
    </div>
  );
}
