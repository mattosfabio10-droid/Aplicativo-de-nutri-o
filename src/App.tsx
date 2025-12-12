
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { AppRoutes } from './types';

import Login from './screens/Login';
import Dashboard from './screens/Dashboard';
import PatientList from './screens/PatientList';
import PatientHistory from './screens/PatientHistory';
import PatientPhotos from './screens/PatientPhotos';
import Agenda from './screens/Agenda';
import AIMealPlan from './screens/AIMealPlan';
import Anthropometry from './screens/Anthropometry';
import Bioimpedance from './screens/Bioimpedance';
import Calculators from './screens/Calculators';
import LabAnalysis from './screens/LabAnalysis';
import Anamnesis from './screens/Anamnesis';
import Certificates from './screens/Certificates';
import SubstitutionList from './screens/SubstitutionList';
import Guidelines from './screens/Guidelines';
import Protocols from './screens/Protocols';
import Settings from './screens/Settings';
import FormManager from './screens/FormManager';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useApp();
  if (!isAuthenticated) {
    return <Navigate to={AppRoutes.LOGIN} replace />;
  }
  return <>{children}</>;
};

const AppRoutesComponent = () => {
  return (
    <Routes>
      {/* Redirecionamento da Raiz */}
      <Route path="/" element={<Navigate to={AppRoutes.DASHBOARD} replace />} />
      
      {/* Rota Pública */}
      <Route path={AppRoutes.LOGIN} element={<Login />} />

      {/* Rotas Protegidas */}
      <Route path={AppRoutes.DASHBOARD} element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path={AppRoutes.PATIENTS} element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
      <Route path={AppRoutes.PATIENT_NEW} element={<ProtectedRoute><PatientList /></ProtectedRoute>} />
      <Route path={AppRoutes.PATIENT_HISTORY} element={<ProtectedRoute><PatientHistory /></ProtectedRoute>} />
      <Route path={AppRoutes.PATIENT_PHOTOS} element={<ProtectedRoute><PatientPhotos /></ProtectedRoute>} />
      <Route path={AppRoutes.AGENDA} element={<ProtectedRoute><Agenda /></ProtectedRoute>} />
      <Route path={AppRoutes.MEAL_PLAN_AI} element={<ProtectedRoute><AIMealPlan /></ProtectedRoute>} />
      <Route path={AppRoutes.ANTHROPOMETRY} element={<ProtectedRoute><Anthropometry /></ProtectedRoute>} />
      <Route path={AppRoutes.BIOIMPEDANCE} element={<ProtectedRoute><Bioimpedance /></ProtectedRoute>} />
      <Route path={AppRoutes.CALCULATORS} element={<ProtectedRoute><Calculators /></ProtectedRoute>} />
      <Route path={AppRoutes.LAB_ANALYSIS} element={<ProtectedRoute><LabAnalysis /></ProtectedRoute>} />
      <Route path={AppRoutes.ANAMNESIS} element={<ProtectedRoute><Anamnesis /></ProtectedRoute>} />
      <Route path={AppRoutes.CERTIFICATES} element={<ProtectedRoute><Certificates /></ProtectedRoute>} />
      <Route path={AppRoutes.SUBSTITUTIONS} element={<ProtectedRoute><SubstitutionList /></ProtectedRoute>} />
      <Route path={AppRoutes.GUIDELINES} element={<ProtectedRoute><Guidelines /></ProtectedRoute>} />
      <Route path={AppRoutes.PROTOCOLS} element={<ProtectedRoute><Protocols /></ProtectedRoute>} />
      <Route path={AppRoutes.SETTINGS} element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path={AppRoutes.FORM_MANAGER} element={<ProtectedRoute><FormManager /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to={AppRoutes.DASHBOARD} />} />
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
