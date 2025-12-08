import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Patient } from '../types';
import { StorageService } from '../services/storage';

interface AppContextType {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  patients: Patient[];
  refreshPatients: () => void;
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const refreshPatients = () => {
    setPatients(StorageService.getPatients());
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AppContext.Provider value={{ 
      currentPatient, 
      setCurrentPatient, 
      patients, 
      refreshPatients,
      isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};