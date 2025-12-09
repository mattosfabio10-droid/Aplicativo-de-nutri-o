
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AppRoutes } from './types';

// Screens
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
import FormManager from './screens/FormManager';
import Calculators from './screens/Calculators';
import Login from './screens/Login';

const AppRoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={AppRoutes.DASHBOARD} replace />} />
      <Route path="/login" element={<Login />} />
      
      <Route path={AppRoutes.DASHBOARD} element={<Dashboard />} />
      <Route path={AppRoutes.AGENDA} element={<Agenda />} />
      <Route path={AppRoutes.PATIENTS} element={<PatientList />} />
      <Route path={AppRoutes.MEAL_PLAN_AI} element={<AIMealPlan />} />
      <Route path={AppRoutes.ANTHROPOMETRY} element={<Anthropometry />} />
      <Route path={AppRoutes.BIOIMPEDANCE} element={<Bioimpedance />} />
      <Route path={AppRoutes.SUBSTITUTIONS} element={<SubstitutionList />} />
      <Route path={AppRoutes.ANAMNESIS} element={<Anamnesis />} />
      <Route path={AppRoutes.PROTOCOLS} element={<Protocols />} />
      <Route path={AppRoutes.GUIDELINES} element={<Guidelines />} />
      <Route path={AppRoutes.CERTIFICATES} element={<Certificates />} />
      <Route path={AppRoutes.LAB_ANALYSIS} element={<LabAnalysis />} />
      <Route path={AppRoutes.FORM_MANAGER} element={<FormManager />} />
      <Route path={AppRoutes.CALCULATORS} element={<Calculators />} />
      
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
