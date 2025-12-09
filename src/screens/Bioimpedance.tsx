
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, LineChart, Line } from 'recharts';
import { Plus, Scale, AlertCircle, Activity, Edit2, FileText, Info } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { AnthropometryRecord, Patient } from '../types';
import { Button, Input } from '../components/UI';

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

const Bioimpedance: React.FC = () => {
  const { currentPatient, setCurrentPatient, refreshPatients, currentUser } = useApp();
  const [data, setData] = useState<AnthropometryRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [newEntry, setNewEntry] = useState<Partial<AnthropometryRecord>>({
    date: new Date().toISOString().split('T')[0]
  });

  const [bmiCalc, setBmiCalc] = useState(0);

  const getBMIStatus = (bmi: number) => {
    if (bmi < 18.5) return { label: 'Abaixo do Peso', color: 'text-blue-400' };
    if (bmi < 24.9) return { label: 'Eutrofia (Normal)', color: 'text-green-400' };
    if (bmi < 29.9) return { label: 'Sobrepeso', color: 'text-yellow-400' };
    if (bmi < 34.9) return { label: 'Obesidade Grau I', color: 'text-orange-400' };
    if (bmi < 39.9) return { label: 'Obesidade Grau II', color: 'text-red-400' };
    return { label: 'Obesidade Grau III', color: 'text-red-600' };
  };

  const getBodyFatReference = (age: number, gender: 'male' | 'female') => {
      if (gender === 'female') {
          if (age < 30) return { min: 16, max: 23, high: 30 };
          if (age < 50) return { min: 19, max: 26, high: 33 };
          return { min: 22, max: 30, high: 36 };
      } else {
          if (age < 30) return { min: 11, max: 20, high: 24 };
          if (age < 50) return { min: 14, max: 22, high: 27 };
          return { min: 17, max: 25, high: 30 };
      }
  };

  const getBodyFatStatus = (fat: number) => {
      if (!currentPatient) return { label: '', color: '' };
      const ref = getBodyFatReference(currentPatient.age, currentPatient.gender);
      
      if (fat < ref.min) return { label: 'Baixo (Atleta)', color: 'text-blue-400' };
      if (fat <= ref.max) return { label: 'Normal / Adequado', color: 'text-green-400' };
      if (fat < ref.high) return { label: 'Alto (Sobrepeso)', color: 'text-yellow-400' };
      return { label: 'Muito Alto (Obesidade)', color: 'text-red-400' };
  };

  useEffect(() => {
    if (currentPatient) {
      const records = StorageService.getAnthropometry(currentPatient.id);
      setData(records);
      
      if (!showForm && !isEditing) {
          setNewEntry(prev => ({
              ...prev,
              weight: currentPatient.weight || 0,
              height: currentPatient.height || 0
          }));
      }
    }
  }, [currentPatient, showForm, isEditing]);

  useEffect(() => {
    if (newEntry.weight && newEntry.height && currentPatient) {
        const h = newEntry.height / 100;
        const bmi = newEntry.weight / (h * h);
        setBmiCalc(parseFloat(bmi.toFixed(1)));

        if (!newEntry.restingMetabolism) {
            let bmr = 0;
            if (currentPatient.gender === 'male') {
                bmr = (10 * newEntry.weight) + (6.25 * newEntry.height) - (5 * currentPatient.age) + 5;
            } else {
                bmr = (10 * newEntry.weight) + (6.25 * newEntry.height) - (5 * currentPatient.age) - 161;
            }
            setNewEntry(prev => ({ ...prev, restingMetabolism: Math.round(bmr) }));
        }

        if (!newEntry.bodyAge) {
            setNewEntry(prev => ({ ...prev, bodyAge: currentPatient.age }));
        }
    }
  }, [newEntry.weight, newEntry.height, currentPatient]);

  const handleEdit = (record: AnthropometryRecord) => {
      const [day, month, year] = record.date.split('/');
      const formattedDate = `${year}-${month}-${day}`;

      setNewEntry({
          ...record,
          date: formattedDate
      });
      setIsEditing(true);
      setShowForm(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancel = () => {
      setShowForm(false);
      setIsEditing(false);
      setNewEntry({ 
          date: new Date().toISOString().split('T')[0],
          weight: currentPatient?.weight || 0,
          height: currentPatient?.height || 0
      });
  };

  const handleSave = () => {
      if (!currentPatient) return;
      
      if (!newEntry.weight || !newEntry.height) {
          alert("Peso e Altura são obrigatórios.");
          return;
      }

      const record: AnthropometryRecord = {
          id: newEntry.id || Date.now().toString(),
          date: new Date(newEntry.date!).toLocaleDateString('pt-BR'),
          weight: Number(newEntry.weight),
          height: Number(newEntry.height),
          bmi: bmiCalc,
          
          bodyFat: Number(newEntry.bodyFat) || 0,
          visceralFat: Number(newEntry.visceralFat) || 0,
          skeletalMuscle: Number(newEntry.skeletalMuscle) || 0,
          bodyAge: Number(newEntry.bodyAge) || 0,
          restingMetabolism: Number(newEntry.restingMetabolism) || 0,

          waist: 0, hip: 0, abdomen: 0,
          armRight: 0, thighRight: 0, calfRight: 0
      };

      StorageService.saveAnthropometry(currentPatient.id, record);

      const updatedPatient: Patient = {
        ...currentPatient,
        weight: record.weight,
        height: record.height
      };
      StorageService.savePatient(updatedPatient);
      setCurrentPatient(updatedPatient);
      refreshPatients();

      handleCancel();
  };

  const handleExportPDF = async () => {
    if (!currentPatient || data.length === 0) return;

    const doc = new jsPDF();
    const primaryColor = [166, 206, 113];
    const latest = data[data.length - 1];

    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, 210, 35, 'F');
    
    try {
        const logoUrl = "https://i.imgur.com/JrGn2f5.png"; 
        const logoData = await getBase64ImageFromURL(logoUrl);
        doc.addImage(logoData, 'PNG', 10, 2, 30, 30);
    } catch (e) {}

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("AVALIAÇÃO DE BIOIMPEDÂNCIA", 105, 18, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Paciente: ${currentPatient.name}`, 105, 26, { align: "center" });
    doc.text(`Data da Avaliação: ${latest.date}`, 105, 31, { align: "center" });

    let y = 50;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
    doc.text("Resultados da Última Avaliação", 15, y);
    doc.line(15, y + 2, 195, y + 2);
    y += 15;

    const cardWidth = 40;
    const gap = 5;
    const startXRow1 = (210 - (4 * cardWidth + 3 * gap)) / 2;
    const startXRow2 = (210 - (3 * cardWidth + 2 * gap)) / 2;

    const drawCard = (title: string, value: string, unit: string, x: number, y: number) => {
        doc.setFillColor(245, 245, 245);
        doc.roundedRect(x, y, cardWidth, 25, 2, 2, 'F');
        doc.setFontSize(8);
        doc.setTextColor(100, 100, 100);
        doc.setFont("helvetica", "normal");
        doc.text(title, x + (cardWidth / 2), y + 7, { align: "center" });
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text(value, x + (cardWidth / 2), y + 16, { align: "center" });
        doc.setFontSize(7);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(120, 120, 120);
        doc.text(unit, x + (cardWidth / 2), y + 22, { align: "center" });
    };

    let cx = startXRow1;
    drawCard("PESO", latest.weight.toString(), "kg", cx, y);
    cx += cardWidth + gap;
    drawCard("IMC", latest.bmi.toString(), "kg/m²", cx, y);
    cx += cardWidth + gap;
    drawCard("GORDURA", latest.bodyFat?.toString() || "-", "%", cx, y);
    cx += cardWidth + gap;
    drawCard("MÚSCULO", latest.skeletalMuscle?.toString() || "-", "%", cx, y);
    y += 32;
    cx = startXRow2;
    drawCard("G. VISCERAL", latest.visceralFat?.toString() || "-", "nível", cx, y);
    cx += cardWidth + gap;
    drawCard("ID. CORPORAL", latest.bodyAge?.toString() || "-", "anos", cx, y);
    cx += cardWidth + gap;
    drawCard("METABOLISMO", latest.restingMetabolism?.toString() || "-", "kcal", cx, y);
    
    y += 40;

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
    doc.text("Histórico de Evolução (Últimas avaliações)", 15, y);
    doc.line(15, y + 2, 195, y + 2);
    y += 10;

    const headers = ["Data", "Peso (kg)", "IMC", "Gordura (%)", "Músculo (%)", "Visceral"];
    const colWidths = [35, 30, 30, 30, 30, 30];
    let startX = 15;

    doc.setFillColor(230, 230, 230);
    doc.rect(startX, y, 185, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "bold");
    let currentX = startX;
    headers.forEach((header, i) => {
        doc.text(header, currentX + 2, y + 5.5);
        currentX += colWidths[i];
    });
    y += 8;

    doc.setFont("helvetica", "normal");
    const historyData = data.slice().reverse().slice(0, 10);

    historyData.forEach((row, index) => {
        if (y > 270) {
            doc.addPage();
            y = 20;
        }
        if (index % 2 === 0) doc.setFillColor(250, 250, 250);
        else doc.setFillColor(255, 255, 255);
        doc.rect(startX, y, 185, 8, 'F');
        currentX = startX;
        doc.text(row.date, currentX + 2, y + 5.5);
        currentX += colWidths[0];
        doc.text(row.weight.toString(), currentX + 2, y + 5.5);
        currentX += colWidths[1];
        doc.text(row.bmi.toString(), currentX + 2, y + 5.5);
        currentX += colWidths[2];
        doc.text(row.bodyFat?.toString() || "-", currentX + 2, y + 5.5);
        currentX += colWidths[3];
        doc.text(row.skeletalMuscle?.toString() || "-", currentX + 2, y + 5.5);
        currentX += colWidths[4];
        doc.text(row.visceralFat?.toString() || "-", currentX + 2, y + 5.5);
        y += 8;
    });

    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Nutricionista: ${currentUser?.name || "Dr. Fábio Mattos"} - CRN: ${currentUser?.crn || "33174"}`, 105, pageHeight - 10, { align: "center" });

    doc.save(`Bioimpedancia_${currentPatient.name.replace(/\s+/g, '_')}.pdf`);
  };

  const getVisceralStatus = (level: number) => {
      if (level === 0) return { label: '-', color: 'text-gray-500' };
      if (level <= 9) return { label: 'Normal (0-9)', color: 'text-green-400' };
      if (level <= 14) return { label: 'Alto (10-14)', color: 'text-yellow-400' };
      return { label: 'Muito Alto (15+)', color: 'text-red-400' };
  };

  const latest = data.length > 0 ? data[data.length - 1] : null;

  if (!currentPatient) return <Layout title="Bioimpedância">Selecione um paciente.</Layout>;
  const fatRef = getBodyFatReference(currentPatient.age, currentPatient.gender);

  return (
    <Layout title="Bioimpedância Omron" showBack>
      <div className="flex justify-end mb-6">
         {latest && (
             <Button onClick={handleExportPDF} className="!w-auto flex items-center gap-2 bg-gray-800 border border-gray-700 hover:bg-gray-700 text-white shadow-lg">
                 <FileText size={18} /> Exportar Relatório PDF
             </Button>
         )}
      </div>

      {latest ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Peso</span>
                  <span className="text-xl font-bold text-white">{latest.weight} <small className="text-xs">kg</small></span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">IMC</span>
                  <span className={`text-xl font-bold ${getBMIStatus(latest.bmi).color}`}>{latest.bmi}</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Gordura %</span>
                  <span className={`text-xl font-bold ${getBodyFatStatus(latest.bodyFat || 0).color}`}>{latest.bodyFat || '-'}%</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Músculo %</span>
                  <span className="text-xl font-bold text-primary">{latest.skeletalMuscle || '-'}%</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center relative overflow-hidden">
                  <span className="text-[10px] uppercase text-gray-500 font-bold relative z-10">Visceral</span>
                  <span className={`text-xl font-bold relative z-10 ${getVisceralStatus(latest.visceralFat || 0).color}`}>{latest.visceralFat || '-'}</span>
              </div>
               <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Idade Corp.</span>
                  <span className={`text-xl font-bold ${latest.bodyAge && latest.bodyAge > currentPatient.age ? 'text-red-400' : 'text-green-400'}`}>{latest.bodyAge || '-'}</span>
              </div>
              <div className="bg-gray-900 border border-gray-800 p-3 rounded-xl flex flex-col items-center justify-center">
                  <span className="text-[10px] uppercase text-gray-500 font-bold">Metabolismo</span>
                  <span className="text-xl font-bold text-gray-300">{latest.restingMetabolism || '-'}</span>
              </div>
          </div>
      ) : (
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl mb-8 text-center text-gray-400">
              Nenhum registro de bioimpedância encontrado.
          </div>
      )}

      {showForm ? (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 animate-slide-in shadow-2xl">
            <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                <Scale className="text-primary" />
                <h3 className="font-bold text-white text-lg">
                    {isEditing ? 'Editar Leitura Omron' : 'Nova Leitura Omron'}
                </h3>
                <span className="text-xs text-gray-500 ml-auto bg-gray-950 px-2 py-1 rounded">
                    {isEditing ? 'Editando registro existente' : `Dados sincronizados de ${currentPatient.name}`}
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Input type="date" label="Data" value={newEntry.date} onChange={e => setNewEntry({...newEntry, date: e.target.value})} />
                <Input type="number" label="Peso (kg)" value={newEntry.weight || ''} onChange={e => setNewEntry({...newEntry, weight: Number(e.target.value)})} autoFocus />
                <Input type="number" label="Altura (cm)" value={newEntry.height || ''} onChange={e => setNewEntry({...newEntry, height: Number(e.target.value)})} />
                
                <div className="bg-gray-950 rounded-lg p-3 border border-gray-800 flex flex-col justify-center">
                    <span className="text-[10px] uppercase text-gray-500 font-bold">IMC Calculado</span>
                    <span className="text-2xl font-bold text-white">{bmiCalc > 0 ? bmiCalc : '--'}</span>
                    {bmiCalc > 0 && <span className={`text-[10px] ${getBMIStatus(bmiCalc).color} font-bold`}>{getBMIStatus(bmiCalc).label}</span>}
                </div>

                <div className="col-span-full h-px bg-gray-800 my-2"></div>

                <div className="relative">
                    <Input type="number" label="Gordura Corporal (%)" value={newEntry.bodyFat || ''} onChange={e => setNewEntry({...newEntry, bodyFat: Number(e.target.value)})} className="text-blue-400 font-bold" />
                    {newEntry.bodyFat ? (
                        <div className="absolute right-0 top-9 flex flex-col items-end pointer-events-none pr-3">
                            <span className={`text-xs font-bold ${getBodyFatStatus(newEntry.bodyFat).color}`}>
                                {getBodyFatStatus(newEntry.bodyFat).label}
                            </span>
                            <span className="text-[9px] text-gray-500">Ideal: {fatRef.min}% - {fatRef.max}%</span>
                        </div>
                    ) : (
                        <span className="absolute right-3 top-10 text-[9px] text-gray-600">Ideal: {fatRef.min}-{fatRef.max}%</span>
                    )}
                </div>

                <Input type="number" label="Músculo Esquelético (%)" value={newEntry.skeletalMuscle || ''} onChange={e => setNewEntry({...newEntry, skeletalMuscle: Number(e.target.value)})} className="text-primary font-bold" />
                
                <div className="relative">
                    <Input type="number" label="Gordura Visceral (Nível)" value={newEntry.visceralFat || ''} onChange={e => setNewEntry({...newEntry, visceralFat: Number(e.target.value)})} />
                    {newEntry.visceralFat ? (
                         <span className={`absolute right-3 top-9 text-xs font-bold ${getVisceralStatus(newEntry.visceralFat).color}`}>
                             {getVisceralStatus(newEntry.visceralFat).label}
                         </span>
                    ) : null}
                </div>
                
                <Input 
                    type="number" 
                    label="Idade Corporal (Anos)" 
                    value={newEntry.bodyAge || ''} 
                    onChange={e => setNewEntry({...newEntry, bodyAge: Number(e.target.value)})}
                    placeholder={`Real: ${currentPatient.age}`} 
                />
                
                <Input 
                    type="number" 
                    label="Metabolismo Basal (kcal)" 
                    value={newEntry.restingMetabolism || ''} 
                    onChange={e => setNewEntry({...newEntry, restingMetabolism: Number(e.target.value)})} 
                />
            </div>

            <div className="bg-black/20 p-3 rounded-lg border border-gray-800 mt-4 flex items-center gap-2">
                <Info size={16} className="text-gray-500" />
                <p className="text-[10px] text-gray-400">
                    O Metabolismo Basal foi estimado automaticamente por Mifflin-St Jeor.
                </p>
            </div>

            <div className="flex justify-end gap-3 mt-6">
                <Button variant="ghost" onClick={handleCancel} className="!w-auto">Cancelar</Button>
                <Button onClick={handleSave} className="!w-auto px-8">
                    {isEditing ? 'Atualizar Leitura' : 'Salvar Leitura'}
                </Button>
            </div>
        </div>
      ) : (
        <button 
            onClick={() => { setShowForm(true); setIsEditing(false); setNewEntry({ date: new Date().toISOString().split('T')[0], weight: currentPatient.weight, height: currentPatient.height }); }}
            className="w-full py-4 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:text-primary hover:border-primary hover:bg-gray-900/50 transition-all flex items-center justify-center gap-2 font-bold mb-8 group"
        >
            <Plus size={20} className="group-hover:scale-125 transition-transform" /> Nova Leitura
        </button>
      )}

      {data.length > 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 animate-fade-in">
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2">
                      <Activity size={16} className="text-primary" /> Composição Corporal (%)
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorMuscle" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#A6CE71" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#A6CE71" stopOpacity={0}/>
                                </linearGradient>
                                <linearGradient id="colorFat" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} />
                            <Legend verticalAlign="top" height={36} iconType="circle" />
                            <Area type="monotone" name="Músculo %" dataKey="skeletalMuscle" stroke="#A6CE71" fillOpacity={1} fill="url(#colorMuscle)" strokeWidth={2} />
                            <Area type="monotone" name="Gordura %" dataKey="bodyFat" stroke="#60A5FA" fillOpacity={1} fill="url(#colorFat)" strokeWidth={2} />
                        </AreaChart>
                    </ResponsiveContainer>
                  </div>
              </div>

              <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
                  <h4 className="text-white font-bold text-sm uppercase mb-4 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400" /> Gordura Visceral (Nível)
                  </h4>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#222" vertical={false} />
                            <XAxis dataKey="date" stroke="#666" fontSize={10} tickLine={false} axisLine={false} />
                            <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false} domain={[0, 15]} />
                            <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333', borderRadius: '8px' }} />
                            <Line type="step" name="Nível Visceral" dataKey="visceralFat" stroke="#F87171" strokeWidth={3} dot={{r: 4, fill: '#F87171'}} />
                        </LineChart>
                    </ResponsiveContainer>
                  </div>
              </div>
          </div>
      )}

      {data.length > 0 && (
          <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
             <div className="overflow-x-auto">
                 <table className="w-full text-left text-sm whitespace-nowrap">
                     <thead className="bg-black/40 text-gray-500 text-xs uppercase font-bold tracking-wider">
                         <tr>
                             <th className="p-4">Data</th>
                             <th className="p-4">Peso</th>
                             <th className="p-4">IMC</th>
                             <th className="p-4 text-blue-400">% Gordura</th>
                             <th className="p-4 text-primary">% Músculo</th>
                             <th className="p-4 text-red-400">Visceral</th>
                             <th className="p-4">Idade Corp.</th>
                             <th className="p-4">Meta. Basal</th>
                             <th className="p-4 text-center">Ações</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-gray-800">
                         {data.slice().reverse().map((record, i) => (
                             <tr key={i} className="hover:bg-gray-800/50 transition-colors">
                                 <td className="p-4 text-gray-300 font-medium">{record.date}</td>
                                 <td className="p-4 font-bold text-white">{record.weight} kg</td>
                                 <td className="p-4 text-gray-400">
                                     {record.bmi}
                                     <span className={`block text-[9px] ${getBMIStatus(record.bmi).color}`}>{getBMIStatus(record.bmi).label.split('(')[0]}</span>
                                 </td>
                                 <td className="p-4 font-bold text-blue-400">{record.bodyFat}%</td>
                                 <td className="p-4 font-bold text-primary">{record.skeletalMuscle}%</td>
                                 <td className={`p-4 font-bold ${getVisceralStatus(record.visceralFat || 0).color}`}>{record.visceralFat}</td>
                                 <td className="p-4 text-gray-400">{record.bodyAge} anos</td>
                                 <td className="p-4 text-gray-400">{record.restingMetabolism} kcal</td>
                                 <td className="p-4 text-center">
                                     <button 
                                        onClick={() => handleEdit(record)}
                                        className="text-gray-500 hover:text-primary p-2 rounded-lg hover:bg-primary/10 transition-colors"
                                        title="Editar"
                                     >
                                         <Edit2 size={16} />
                                     </button>
                                 </td>
                             </tr>
                         ))}
                     </tbody>
                 </table>
             </div>
          </div>
      )}
    </Layout>
  );
};

export default Bioimpedance;
