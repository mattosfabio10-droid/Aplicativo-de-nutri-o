
import React, { useState, useEffect } from 'react';
import { FileCheck, Download, Clock, MapPin, X, Check } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { Button, Input, Select } from '../components/UI';
import { useApp } from '../context/AppContext';

// Helper de imagem (reutilizado)
const getBase64ImageFromURL = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/png");
      resolve(dataURL);
    };
    img.onerror = (error) => {
      console.warn("Erro ao carregar imagem para PDF", error);
      reject(error);
    };
  });
};

const Certificates: React.FC = () => {
  const { patients, currentPatient, currentUser } = useApp();
  
  // Form States
  const [selectedPatientId, setSelectedPatientId] = useState(currentPatient?.id || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [whatsapp, setWhatsapp] = useState(currentPatient?.phone || '');
  const [showHours, setShowHours] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [purpose, setPurpose] = useState('Trabalho');
  const [observations, setObservations] = useState('');

  // Update whatsapp when patient changes
  useEffect(() => {
    const p = patients.find(pat => pat.id === selectedPatientId);
    if (p) {
      setWhatsapp(p.phone || '');
    }
  }, [selectedPatientId, patients]);

  const handleEmit = async () => {
    const patient = patients.find(p => p.id === selectedPatientId);
    if (!patient) {
      alert("Selecione um paciente.");
      return;
    }

    const doc = new jsPDF();
    const primaryColor = [166, 206, 113]; // #A6CE71
    
    // --- LAYOUT DO ATESTADO ---
    
    // Borda decorativa
    doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277);
    
    // Cabeçalho
    try {
        const logoUrl = "https://i.imgur.com/JrGn2f5.png"; 
        const logoData = await getBase64ImageFromURL(logoUrl);
        doc.addImage(logoData, 'PNG', 20, 15, 30, 30);
    } catch (e) {
        // Fallback
    }

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("MATTOS NUTRICARE", 105, 25, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text("NUTRICIONISTA ORTOMOLECULAR", 105, 30, { align: "center" });
    // Dynamic CRN based on login
    doc.text(`CRN: ${currentUser?.crn || '33174'}`, 105, 35, { align: "center" });

    // Título Principal
    doc.setFontSize(24);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    doc.text("ATESTADO DE COMPARECIMENTO", 105, 70, { align: "center" });
    doc.setLineWidth(0.5);
    doc.line(40, 75, 170, 75);

    // Texto do Corpo
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    
    const formattedDate = new Date(date).toLocaleDateString('pt-BR');
    let text = `Atesto para os devidos fins que o(a) Sr(a). ${patient.name} esteve sob meus cuidados profissionais neste consultório no dia ${formattedDate}`;

    if (showHours && startTime && endTime) {
        text += `, no período das ${startTime} às ${endTime} horas`;
    }

    text += `, para fins de ${purpose.toLowerCase()}.`;

    const lines = doc.splitTextToSize(text, 160);
    doc.text(lines, 25, 100);

    // Observações (se houver)
    let yPos = 130;
    if (observations) {
        doc.setFont("helvetica", "bold");
        doc.text("Observações:", 25, yPos);
        doc.setFont("helvetica", "normal");
        const obsLines = doc.splitTextToSize(observations, 160);
        doc.text(obsLines, 25, yPos + 6);
        yPos += 30;
    } else {
        yPos += 20;
    }

    // Assinatura Dinâmica
    doc.setLineWidth(0.5);
    doc.line(60, 220, 150, 220); // Linha
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(currentUser?.name || "Dr. Fábio Mattos", 105, 226, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Nutricionista - CRN: ${currentUser?.crn || '33174'}`, 105, 231, { align: "center" });

    // Rodapé removido conforme solicitado (Endereço e Data)

    doc.save(`Atestado_${patient.name.replace(/\s+/g, '_')}.pdf`);
  };

  return (
    <Layout title="Emissão de Atestados" showBack>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        
        {/* Card Principal */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in">
          
          {/* Header do Card */}
          <div className="bg-gray-800/50 p-6 border-b border-gray-800 flex justify-between items-center">
             <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <FileCheck className="text-primary" /> Novo Atestado
                </h3>
                <p className="text-gray-400 text-xs mt-1">Preencha os dados para gerar o documento PDF.</p>
             </div>
             <div className="text-right hidden sm:block">
                <p className="text-xs text-gray-500 font-bold uppercase">Data de Emissão</p>
                <p className="text-white font-mono">{new Date().toLocaleDateString('pt-BR')}</p>
             </div>
          </div>

          <div className="p-6 md:p-8 space-y-6">
             {/* Linha 1: Paciente e Data */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Paciente</label>
                   <select 
                      className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary"
                      value={selectedPatientId}
                      onChange={(e) => setSelectedPatientId(e.target.value)}
                   >
                      <option value="">Selecione um paciente</option>
                      {patients.map(p => (
                         <option key={p.id} value={p.id}>{p.name}</option>
                      ))}
                   </select>
                </div>
                <Input type="date" label="Data do Atendimento" value={date} onChange={e => setDate(e.target.value)} />
             </div>

             {/* Linha 2: WhatsApp */}
             <Input 
                label="WhatsApp (Opcional)" 
                placeholder="(00) 00000-0000" 
                value={whatsapp} 
                onChange={e => setWhatsapp(e.target.value)} 
             />

             {/* Linha 3: Horários */}
             <div>
                <label className="flex items-center gap-2 cursor-pointer mb-4 select-none w-fit">
                   <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${showHours ? 'bg-primary border-primary' : 'border-gray-600 bg-transparent'}`}>
                      {showHours && <Check size={14} className="text-black" />}
                   </div>
                   <input type="checkbox" className="hidden" checked={showHours} onChange={() => setShowHours(!showHours)} />
                   <span className="text-sm font-bold text-gray-300">Informar horários de comparecimento</span>
                </label>

                {showHours && (
                   <div className="grid grid-cols-3 gap-4 bg-black/30 p-4 rounded-lg border border-gray-800 animate-fade-in">
                      <Input type="time" label="Início" value={startTime} onChange={e => setStartTime(e.target.value)} className="!mb-0" />
                      <Input type="time" label="Término" value={endTime} onChange={e => setEndTime(e.target.value)} className="!mb-0" />
                      <div className="flex flex-col justify-end">
                         <div className="bg-gray-800 h-[46px] rounded-lg border border-gray-700 flex items-center justify-center text-gray-500 text-sm italic">
                            Automático
                         </div>
                      </div>
                   </div>
                )}
             </div>

             {/* Linha 4: Finalidade */}
             <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Finalidade</label>
                <select 
                   className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary"
                   value={purpose}
                   onChange={e => setPurpose(e.target.value)}
                >
                   <option value="Trabalho">Fins de Trabalho</option>
                   <option value="Escola">Fins Escolares</option>
                   <option value="Faculdade">Fins Acadêmicos</option>
                   <option value="Justiça">Fins Judiciais</option>
                   <option value="Esporte">Fins Esportivos</option>
                </select>
             </div>

             {/* Linha 5: Observações */}
             <div>
                <label className="block text-gray-400 text-xs font-bold mb-2 uppercase">Observações Adicionais</label>
                <textarea 
                   className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary min-h-[80px]"
                   placeholder="Adicione observações se necessário..."
                   value={observations}
                   onChange={e => setObservations(e.target.value)}
                />
             </div>

          </div>

          {/* Footer Actions */}
          <div className="bg-gray-950 p-4 flex justify-end gap-3 border-t border-gray-800">
             <Button variant="ghost" className="!w-auto text-gray-400" onClick={() => window.history.back()}>Cancelar</Button>
             <Button className="!w-auto flex items-center gap-2 px-8" onClick={handleEmit}>
                <Download size={18} /> Emitir Atestado PDF
             </Button>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Certificates;
