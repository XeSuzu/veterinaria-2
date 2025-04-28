import { createContext, useContext, useState } from 'react';

const ToastContext = createContext();

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState('bg-black'); // Color por defecto

  const showToast = (text, type = 'default') => {
    setMessage(text);
    setVisible(true);

    // Definir color según el tipo de mensaje
    switch (type) {
      case 'success':
        setColor('bg-green-500'); // Éxito (verde)
        break;
      case 'error':
        setColor('bg-red-500'); // Error (rojo)
        break;
      case 'warning':
        setColor('bg-yellow-500'); // Advertencia (amarillo)
        break;
      default:
        setColor('bg-black'); // Default
        break;
    }

    setTimeout(() => setVisible(false), 3000); // El toast dura 3 segundos
  };

  const handleClose = () => {
    setVisible(false); // Cerrar el toast manualmente
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* El Toast en pantalla con animación */}
      {visible && (
        <div
          className={`fixed bottom-5 right-5 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in ${color}`}
          onAnimationEnd={() => setTimeout(() => setVisible(false), 3000)} // Espera la animación de salida
        >
          <div className="flex items-center justify-between">
            <span>{message}</span>
            <button onClick={handleClose} className="ml-4 text-lg">&times;</button>
          </div>
        </div>
      )}
    </ToastContext.Provider>
  );
}
