
import React, { useState } from 'react';
import { Search, FileHeart, ChevronRight, FileText, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Input, Button } from '../components/UI';
import { GuidelinesDatabase, Guideline } from '../data/guidelinesData';

const Guidelines: React.FC = () => {
  const { currentPatient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideline, setSelectedGuideline] = useState<Guideline | null>(null);

  const filteredGuidelines = GuidelinesDatabase.filter(g => g.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleExportPDF = () => {
    if (!selectedGuideline) return;
    const doc = new jsPDF();
    doc.setFillColor(166, 206, 113);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.text("ORIENTAÇÃO NUTRICIONAL", 105, 18, { align: "center" });
    doc.setFontSize(14);
    doc.text(selectedGuideline.title, 20, 50);
    doc.setFontSize(10);
    const lines = doc.splitTextToSize(selectedGuideline.intro, 170);
    doc.text(lines, 20, 60);
    doc.save(`Guideline_${selectedGuideline.title}.pdf`);
  };

  return (
    <Layout title="Orientações Nutricionais" showBack>
      {selectedGuideline ? (
        <div className="animate-fade-in">
          <button onClick={() => setSelectedGuideline(null)} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"><ArrowLeft size={20} /> Voltar</button>
          <div className="flex justify-between items-center mb-6">
             <h2 className="text-2xl font-bold text-white">{selectedGuideline.title}</h2>
             <Button onClick={handleExportPDF} className="!w-auto flex items-center gap-2"><FileText size={18} /> PDF</Button>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-6">
             <p className="text-gray-300">{selectedGuideline.intro}</p>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/10 border border-green-900/30 rounded-xl p-5">
                   <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2"><CheckCircle size={18} /> Preferir</h4>
                   <ul className="space-y-2">{selectedGuideline.foodsToPrefer.map((f, i) => <li key={i} className="text-sm text-gray-300">✓ {f}</li>)}</ul>
                </div>
                <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-5">
                   <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2"><XCircle size={18} /> Evitar</h4>
                   <ul className="space-y-2">{selectedGuideline.foodsToAvoid.map((f, i) => <li key={i} className="text-sm text-gray-300">X {f}</li>)}</ul>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <Input placeholder="Buscar..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="!pl-10 !mb-0" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuidelines.map(guideline => (
              <div key={guideline.id} onClick={() => setSelectedGuideline(guideline)} className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-800 transition-all group">
                <div className="flex justify-between items-start mb-3">
                   <div className="bg-gray-800 p-2.5 rounded-lg text-primary"><FileHeart size={24} /></div>
                   <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">{guideline.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{guideline.description}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Guidelines;
