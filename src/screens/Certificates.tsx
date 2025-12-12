
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { Button, Input } from '../components/UI';
import { useApp } from '../context/AppContext';

const Certificates: React.FC = () => {
  const { patients, currentPatient } = useApp();
  const [selectedPatientId, setSelectedPatientId] = useState(currentPatient?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [purpose, setPurpose] = useState('Trabalho');

  const handleEmit = () => {
    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) return alert("Selecione um paciente");
    const doc = new jsPDF();
    doc.setFontSize(22);
    doc.text("ATESTADO", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text(`Atesto que ${patient.name} compareceu na data ${new Date(date).toLocaleDateString()}.`, 20, 50);
    doc.text(`Fins de: ${purpose}`, 20, 60);
    doc.save("Atestado.pdf");
  };

  return (
    <Layout title="Emissão de Atestados" showBack>
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-xl border border-gray-800">
         <div className="grid gap-4">
            <div>
               <label className="block text-gray-400 text-xs font-bold mb-2">Paciente</label>
               <select className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={selectedPatientId} onChange={e => setSelectedPatientId(e.target.value)}>
                  <option value="">Selecione...</option>
                  {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
               </select>
            </div>
            <Input type="date" label="Data" value={date} onChange={e => setDate(e.target.value)} />
            <Input label="Finalidade" value={purpose} onChange={e => setPurpose(e.target.value)} />
            <Button onClick={handleEmit} className="flex items-center justify-center gap-2"><Download size={18}/> Emitir PDF</Button>
         </div>
      </div>
    </Layout>
  );
};

export default Certificates;
