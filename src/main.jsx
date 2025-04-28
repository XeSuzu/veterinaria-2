import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import { AppRouter } from './router/router';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { AppointmentProvider } from './context/AppointmentContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <AppointmentProvider>
          <AppRouter />
        </AppointmentProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>
);
