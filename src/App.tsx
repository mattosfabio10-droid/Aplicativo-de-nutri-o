import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppRoutes } from './types';

// Screens (Imports simplificados, assumindo que os arquivos existem conforme XML)
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PatientList from './screens/PatientList';
import Agenda from './screens/Agenda';
import AIMealPlan from './screens/AIMealPlan';
import Bioimpedance from './screens/Bioimpedance';
// ... outros imports seriam necessários na versão final completa

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path={AppRoutes.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path={AppRoutes.PATIENTS} element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
      <Route path={AppRoutes.AGENDA} element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
      <Route path={AppRoutes.MEAL_PLAN_AI} element={<ProtectedRoute><AIMealPlan /></ProtectedRoute>} />
      <Route path={AppRoutes.BIOIMPEDANCE} element={<ProtectedRoute><Bioimpedance /></ProtectedRoute>} />
      {/* Fallbacks para telas não implementadas neste XML massivo mas citadas */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <AppRoutesComponent />
      </HashRouter>
    </AppProvider>
  );
};

export default App;