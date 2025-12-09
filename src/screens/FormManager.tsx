
import React from 'react';
import { FileText } from 'lucide-react';
import Layout from '../components/Layout';

const FormManager: React.FC = () => {
  return (
    <Layout title="Formulários">
      <div className="text-center py-20 text-gray-500">
         <FileText size={48} className="mx-auto mb-4 opacity-20"/>
         <p>Módulo de gerenciamento de formulários em desenvolvimento.</p>
      </div>
    </Layout>
  );
};

export default FormManager;
