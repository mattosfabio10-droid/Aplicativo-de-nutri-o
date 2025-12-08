import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppRoutes } from './types';

// Screens
import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PatientList from './screens/PatientList';
import AIMealPlan from './screens/AIMealPlan';
import Anthropometry from './screens/Anthropometry';
import Bioimpedance from './screens/Bioimpedance';
import SubstitutionList from './screens/SubstitutionList';
import Anamnesis from './screens/Anamnesis';
import Protocols from './screens/Protocols';
import Guidelines from './screens/Guidelines';
import Certificates from './screens/Certificates';
import LabAnalysis from './screens/LabAnalysis';
import Agenda from './screens/Agenda';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
};

const AppRoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/patient-area" element={<Login />} /> {/* Placeholder for patient area login */}
      
      <Route path={AppRoutes.DASHBOARD} element={
        <ProtectedRoute><Dashboard /></ProtectedRoute>
      } />
      <Route path={AppRoutes.AGENDA} element={
        <ProtectedRoute><Agenda /></ProtectedRoute>
      } />
      <Route path={AppRoutes.PATIENTS} element={
        <ProtectedRoute><PatientList /></ProtectedRoute>
      } />
      <Route path={AppRoutes.MEAL_PLAN_AI} element={
        <ProtectedRoute><AIMealPlan /></ProtectedRoute>
      } />
      <Route path={AppRoutes.ANTHROPOMETRY} element={
        <ProtectedRoute><Anthropometry /></ProtectedRoute>
      } />
      <Route path={AppRoutes.BIOIMPEDANCE} element={
        <ProtectedRoute><Bioimpedance /></ProtectedRoute>
      } />
      <Route path={AppRoutes.SUBSTITUTIONS} element={
        <ProtectedRoute><SubstitutionList /></ProtectedRoute>
      } />
      <Route path={AppRoutes.ANAMNESIS} element={
        <ProtectedRoute><Anamnesis /></ProtectedRoute>
      } />
      <Route path={AppRoutes.PROTOCOLS} element={
        <ProtectedRoute><Protocols /></ProtectedRoute>
      } />
      <Route path={AppRoutes.GUIDELINES} element={
        <ProtectedRoute><Guidelines /></ProtectedRoute>
      } />
      <Route path={AppRoutes.CERTIFICATES} element={
        <ProtectedRoute><Certificates /></ProtectedRoute>
      } />
      <Route path={AppRoutes.LAB_ANALYSIS} element={
        <ProtectedRoute><LabAnalysis /></ProtectedRoute>
      } />
      
      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
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