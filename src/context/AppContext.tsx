
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Patient, User } from '../types';
import { StorageService } from '../services/storage';
import { AuthorizedUsers } from '../data/authData';

interface AppContextType {
  currentUser: User | null;
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  patients: Patient[];
  refreshPatients: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Define o usuário padrão (Dr. Fábio) fixo, eliminando a necessidade de login
  const [currentUser] = useState<User | null>(AuthorizedUsers[0]);
  
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const refreshPatients = () => {
    setPatients(StorageService.getPatients());
  };

  useEffect(() => {
    refreshPatients();
  }, []);

  return (
    <AppContext.Provider value={{ 
      currentUser,
      currentPatient, 
      setCurrentPatient, 
      patients, 
      refreshPatients
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
