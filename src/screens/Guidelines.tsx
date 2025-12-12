
import React, { useState } from 'react';
import { Search, ChevronRight } from 'lucide-react';
import Layout from '../components/Layout';
import { Input } from '../components/UI';
import { GuidelinesDatabase } from '../data/guidelinesData';

const Guidelines: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filtered = GuidelinesDatabase.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <Layout title="Orientações" showBack>
      <div className="mb-6 relative"><Search className="absolute left-3 top-3 text-gray-500" /><Input placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" /></div>
      <div className="space-y-4">
        {filtered.map(g => (
            <div key={g.id} className="p-4 bg-gray-900 rounded-xl border border-gray-800">
                <h3 className="text-white font-bold">{g.title}</h3>
                <p className="text-gray-400 text-sm">{g.description}</p>
            </div>
        ))}
      </div>
    </Layout>
  );
};

export default Guidelines;
