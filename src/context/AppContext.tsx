
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
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);

  const refreshPatients = () => {
    setPatients(StorageService.getPatients());
  };

  useEffect(() => {
    refreshPatients();
    const savedUser = localStorage.getItem('nutri_session');
    if (savedUser) {
        try {
            let user = JSON.parse(savedUser);
            const settings = StorageService.getProfessionalSettings();
            if (settings) {
                user = { ...user, ...settings };
            }
            setCurrentUser(user);
        } catch (e) {
            localStorage.removeItem('nutri_session');
        }
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    const user = AuthorizedUsers.find(u => u.email === email && u.password === pass);
    if (user) {
        const settings = StorageService.getProfessionalSettings();
        const userToSave = settings ? { ...user, ...settings } : user;
        setCurrentUser(userToSave);
        localStorage.setItem('nutri_session', JSON.stringify(userToSave));
        return true;
    }
    return false;
  };

  const logout = () => {
      setCurrentUser(null);
      localStorage.removeItem('nutri_session');
      setCurrentPatient(null);
  };

  return (
    <AppContext.Provider value={{ 
      currentUser,
      currentPatient, 
      setCurrentPatient, 
      patients, 
      refreshPatients,
      isAuthenticated: !!currentUser,
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
