
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { History, Utensils, Ruler, ClipboardList, Scale, Trash2, Calendar, ArrowRight, User, Camera, Image as ImageIcon } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';

type EventType = 'diet' | 'anthro' | 'bio' | 'anamnesis' | 'photo';

interface TimelineEvent {
  id: string;
  date: string;
  type: EventType;
  title: string;
  description: string;
  raw: any;
}

const PatientHistory: React.FC = () => {
  const { currentPatient } = useApp();
  const navigate = useNavigate();
  const [events, setEvents] = useState<TimelineEvent[]>([]);

  useEffect(() => {
    if (currentPatient) {
        try {
            loadHistory();
        } catch(e) {
            console.error("Erro ao carregar histórico", e);
        }
    }
  }, [currentPatient]);

  const parseDate = (dateStr: string) => {
      if (dateStr && dateStr.includes('/')) {
          const parts = dateStr.split('/');
          if (parts.length === 3) return `${parts[2]}-${parts[1]}-${parts[0]}`;
      }
      return dateStr || new Date().toISOString();
  };

  const loadHistory = () => {
    if (!currentPatient) return;
    const timeline: TimelineEvent[] = [];

    const plans = StorageService.getMealPlans(currentPatient.id);
    plans.forEach(plan => {
      timeline.push({ id: plan.id, date: plan.createdAt, type: 'diet', title: 'Plano Alimentar', description: `${plan.totalCalories} kcal • ${plan.goal || 'Objetivo Geral'}`, raw: plan });
    });

    const anthro = StorageService.getAnthropometry(currentPatient.id);
    anthro.forEach(record => {
      let isoDate = parseDate(record.date);
      const isBio = (record.bodyFat || 0) > 0 || (record.visceralFat || 0) > 0;
      timeline.push({ id: record.id || `anthro-${isoDate}-${Math.random()}`, date: isoDate, type: isBio ? 'bio' : 'anthro', title: isBio ? 'Bioimpedância' : 'Antropometria', description: `Peso: ${record.weight}kg • IMC: ${record.bmi}`, raw: record });
    });

    const anamnesis = StorageService.getAnamnesis(currentPatient.id);
    if (anamnesis && anamnesis.updatedAt) {
      timeline.push({ id: 'anamnesis-latest', date: anamnesis.updatedAt, type: 'anamnesis', title: 'Atualização de Anamnese', description: 'Dados clínicos e comportamentais.', raw: anamnesis });
    }

    const photos = StorageService.getPatientPhotos(currentPatient.id);
    if (photos && Array.isArray(photos)) {
        photos.forEach(photo => {
            timeline.push({ id: photo.id, date: photo.date, type: 'photo', title: 'Registro Fotográfico', description: photo.type === 'front' ? 'Foto de Frente' : photo.type === 'side' ? 'Foto de Perfil' : photo.type === 'back' ? 'Foto de Costas' : 'Foto de Rosto', raw: photo });
        });
    }

    timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setEvents(timeline);
  };

  const handleDelete = (e: React.MouseEvent, event: TimelineEvent) => {
    e.stopPropagation();
    if (!currentPatient) return;
    if (window.confirm("ATENÇÃO: Deseja excluir este registro do prontuário?")) {
        if (event.type === 'diet') StorageService.deleteMealPlan(event.id);
        else if (event.type === 'anthro' || event.type === 'bio') StorageService.deleteAnthropometry(currentPatient.id, event.id);
        else if (event.type === 'photo') StorageService.deletePatientPhoto(currentPatient.id, event.id);
        loadHistory(); 
    }
  };

  const handleNavigate = (event: TimelineEvent) => {
      switch(event.type) {
          case 'diet': navigate('/meal-plan-ai', { state: { planId: event.id } }); break;
          case 'anthro': navigate('/anthropometry'); break;
          case 'bio': navigate('/bioimpedance'); break;
          case 'anamnesis': navigate('/anamnesis'); break;
          case 'photo': navigate('/patient-photos'); break;
      }
  };

  const getIcon = (type: EventType) => {
      switch(type) {
          case 'diet': return <Utensils size={18} />;
          case 'anthro': return <Ruler size={18} />;
          case 'bio': return <Scale size={18} />;
          case 'anamnesis': return <ClipboardList size={18} />;
          case 'photo': return <Camera size={18} />;
      }
  };

  const getColor = (type: EventType) => {
      switch(type) {
          case 'diet': return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
          case 'anthro': return 'text-blue-400 bg-blue-400/10 border-blue-400/30';
          case 'bio': return 'text-green-400 bg-green-400/10 border-green-400/30';
          case 'anamnesis': return 'text-pink-400 bg-pink-400/10 border-pink-400/30';
          case 'photo': return 'text-purple-400 bg-purple-400/10 border-purple-400/30';
      }
  };

  if (!currentPatient) return <Layout title="Prontuário"><div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-6"><User size={48} className="text-gray-600" /><h2>Nenhum Paciente Selecionado</h2><button onClick={() => navigate('/patients')} className="bg-primary text-black font-bold py-3 px-8 rounded-xl">Selecionar Paciente</button></div></Layout>;

  return (
    <Layout title="Prontuário e Histórico" showBack>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-primary border-2 border-gray-700"><User size={32} /></div>
            <div><h2 className="text-2xl font-bold text-white">{currentPatient.name}</h2><div className="flex flex-wrap gap-4 text-sm text-gray-400 mt-1"><span>{currentPatient.age} anos</span><span>•</span><span className="text-primary font-bold">{currentPatient.goal}</span><span>•</span><span>{currentPatient.weight} kg</span></div></div>
         </div>
      </div>
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 min-h-[600px]">
         <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-800"><History size={24} className="text-primary" /><h2>Linha do Tempo</h2></div>
         {events.length === 0 ? <div className="text-center py-20 text-gray-500"><p>Nenhum registro encontrado.</p></div> : (
             <div className="relative border-l-2 border-gray-800 ml-4 space-y-8 pl-8">
                 {events.map((evt, idx) => (
                     <div key={`${evt.type}-${evt.id}-${idx}`} className="relative group animate-fade-in">
                         <div className={`absolute -left-[41px] top-0 w-5 h-5 rounded-full border-2 bg-gray-900 flex items-center justify-center z-10 ${getColor(evt.type).split(' ')[2].replace('bg-','border-')}`}><div className={`w-2 h-2 rounded-full ${getColor(evt.type).split(' ')[0].replace('text-', 'bg-')}`}></div></div>
                         <div onClick={() => handleNavigate(evt)} className="bg-black/40 border border-gray-800 rounded-xl p-4 hover:bg-gray-800 hover:border-gray-600 transition-all cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4 group-hover:translate-x-1">
                             <div className="flex items-start gap-4 flex-1">
                                <div className={`p-3 rounded-lg shrink-0 ${getColor(evt.type)}`}>{getIcon(evt.type)}</div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1"><h3 className="font-bold text-white">{evt.title}</h3><span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded border border-gray-700 font-mono">{new Date(evt.date).toLocaleDateString('pt-BR')}</span></div>
                                    <p className="text-sm text-gray-400">{evt.description}</p>
                                    {evt.type === 'photo' && evt.raw.imageData && <div className="mt-3 w-24 h-24 rounded-lg overflow-hidden border border-gray-700 relative group/img"><img src={evt.raw.imageData} alt="Preview" className="w-full h-full object-cover" /></div>}
                                </div>
                             </div>
                             <div className="flex items-center gap-2 justify-end">
                                 {evt.type !== 'anamnesis' && <button onClick={(e) => handleDelete(e, evt)} className="p-2 text-gray-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"><Trash2 size={18} /></button>}
                                 <ArrowRight size={20} className="text-gray-500 group-hover:text-primary transition-colors" />
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
         )}
      </div>
    </Layout>
  );
};

export default PatientHistory;
