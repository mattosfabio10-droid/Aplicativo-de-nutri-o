
import React from 'react';
import Layout from '../components/Layout';
import { Button } from '../components/UI';
import { StorageService } from '../services/storage';

const Settings: React.FC = () => {
  return (
    <Layout title="Configurações">
      <div className="space-y-4">
        <div className="p-6 bg-gray-900 rounded-xl border border-gray-800">
            <h3 className="text-white font-bold mb-4">Dados</h3>
            <Button onClick={() => { localStorage.clear(); window.location.reload(); }}>Resetar Tudo</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
