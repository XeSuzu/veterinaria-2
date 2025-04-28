import { createContext, useContext, useState } from 'react';

const AppointmentContext = createContext();

export function useAppointments() {
  return useContext(AppointmentContext);
}

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);

  const addAppointment = (appointment) => {
    setAppointments((prev) => [...prev, appointment]);
  };

  const removeAppointment = (id) => {
    setAppointments((prev) => prev.filter((appt) => appt.id !== id));
  };

  return (
    <AppointmentContext.Provider value={{ appointments, addAppointment, removeAppointment }}>
      {children}
    </AppointmentContext.Provider>
  );
}