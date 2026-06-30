import { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Global state for preserving UI when navigating tabs
  
  // Gallery active filter
  const [activeGalleryFilter, setActiveGalleryFilter] = useState('All Collections');
  
  // Projects active category
  const [activeProjectCategory, setActiveProjectCategory] = useState('All Projects');
  
  // Appointment form data persistence
  const [appointmentFormData, setAppointmentFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    location: '',
    serviceType: '',
    appointmentDate: '',
    referral: '',
    message: ''
  });

  const value = {
    activeGalleryFilter,
    setActiveGalleryFilter,
    activeProjectCategory,
    setActiveProjectCategory,
    appointmentFormData,
    setAppointmentFormData
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
