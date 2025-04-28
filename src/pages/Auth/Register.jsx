import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext'; // Importar el contexto de autenticación
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../context/ToastContext';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth(); // Usar el estado de autenticación
  const { showToast } = useToast();

  // Redirigir al Dashboard si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard'); // Redirigir al Dashboard
    }
  }, [isAuthenticated, navigate]);

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      showToast('Las contraseñas no coinciden', 'error');
      return;
    }

    // Validar longitud mínima de la contraseña
    if (password.length < 6) {
      showToast('La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    try {
      // Crear usuario con Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      showToast('¡Registro exitoso! 🎉', 'success');
      navigate('/login'); // Redirigir al login después del registro
    } catch (error) {
      // Manejo de errores de Firebase
      switch (error.code) {
        case 'auth/email-already-in-use':
          showToast('El correo ya está registrado', 'error');
          break;
        case 'auth/invalid-email':
          showToast('El correo no es válido', 'error');
          break;
        case 'auth/weak-password':
          showToast('La contraseña es demasiado débil', 'error');
          break;
        default:
          showToast('Error al registrar usuario: ' + error.message, 'error');
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <form className="flex flex-col gap-4 w-64" onSubmit={handleRegister}>
        <input
          className="border p-2 rounded"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          className="border p-2 rounded"
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          Registrarse
        </button>
      </form>
    </div>
  );
}