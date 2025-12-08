import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Plus, Trash2, Check, User, Search, X } from 'lucide-react';
import Layout from '../components/Layout';
import { Button, Input, Select } from '../components/UI';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { Appointment } from '../types';

const Agenda: React.FC = () => {
  const { patients } = useApp();
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({
    type: 'Primeira Consulta',
    status: 'scheduled'
  });

  const [patientSearch, setPatientSearch] = useState('');

  useEffect(() => {
    refreshAgenda();
  }, []);

  const refreshAgenda = () => {
    const data = StorageService.getAppointments();
    // Ordenar por horário
    data.sort((a, b) => a.time.localeCompare(b.time));
    setAppointments(data);
  };

  const filteredAppointments = appointments.filter(a => a.date === selectedDate);
  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()));

  const handleSave = () => {
    if (!newAppointment.patientName || !newAppointment.time || !selectedDate) {
      alert("Preencha nome do paciente e horário.");
      return;
    }

    const appt: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: newAppointment.time!,
      patientName: newAppointment.patientName!,
      patientId: newAppointment.patientId,
      type: newAppointment.type as any,
      status: newAppointment.status as any,
      notes: newAppointment.notes
    };

    StorageService.saveAppointment(appt);
    refreshAgenda();
    setShowModal(false);
    setNewAppointment({ type: 'Primeira Consulta', status: 'scheduled' });
    setPatientSearch('');
  };

  const handleDelete = (id: string) => {
    if (confirm("Tem certeza que deseja cancelar este agendamento?")) {
      StorageService.deleteAppointment(id);
      refreshAgenda();
    }
  };

  const handleStatusChange = (appt: Appointment, status: Appointment['status']) => {
    StorageService.saveAppointment({ ...appt, status });
    refreshAgenda();
  };

  const selectExistingPatient = (p: { id: string, name: string }) => {
    setNewAppointment({ ...newAppointment, patientId: p.id, patientName: p.name });
    setPatientSearch(p.name);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'text-green-400 border-green-400 bg-green-900/20';
      case 'completed': return 'text-gray-400 border-gray-600 bg-gray-800 line-through';
      case 'canceled': return 'text-red-400 border-red-400 bg-red-900/20';
      default: return 'text-yellow-400 border-yellow-400 bg-yellow-900/20';
    }
  };

  const getStatusLabel = (status: string) => {
     switch (status) {
      case 'confirmed': return 'Confirmado';
      case 'completed': return 'Concluído';
      case 'canceled': return 'Cancelado';
      default: return 'Agendado';
    }
  };

  return (
    <Layout title="Agenda de Consultas">
      
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
        
        {/* Left: Date Picker & Mini Calendar Logic (Simplified) */}
        <div className="w-full md:w-80 flex flex-col gap-6">
           <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <label className="block text-primary text-xs font-bold mb-4 uppercase tracking-wide">Selecionar Data</label>
              <input 
                type="date" 
                className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white focus:border-primary focus:outline-none"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-800">
                 <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-bold text-white">Resumo do Dia</span>
                 </div>
                 <div className="space-y-2 text-sm text-gray-400">
                    <div className="flex justify-between">
                       <span>Total de Agendamentos:</span>
                       <span className="text-white font-bold">{filteredAppointments.length}</span>
                    </div>
                    <div className="flex justify-between">
                       <span>Confirmados:</span>
                       <span className="text-green-400 font-bold">{filteredAppointments.filter(a => a.status === 'confirmed').length}</span>
                    </div>
                 </div>
              </div>
           </div>
           
           <button 
             onClick={() => setShowModal(true)}
             className="w-full bg-primary text-black font-bold py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
           >
             <Plus size={20} /> Novo Agendamento
           </button>
        </div>

        {/* Right: Appointments List */}
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
           <div className="p-4 border-b border-gray-800 bg-gray-950/50 flex justify-between items-center">
              <h3 className="font-bold text-white flex items-center gap-2">
                 <CalendarDays className="text-primary" /> 
                 {new Date(selectedDate).toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </h3>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAppointments.length === 0 ? (
                 <div className="h-full flex flex-col items-center justify-center text-gray-500">
                    <Clock size={48} className="opacity-20 mb-2" />
                    <p>Nenhum agendamento para esta data.</p>
                 </div>
              ) : (
                 filteredAppointments.map(appt => (
                    <div key={appt.id} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-4 hover:border-gray-700 transition-colors group">
                       
                       {/* Time */}
                       <div className="flex flex-col items-center min-w-[60px] border-r border-gray-800 pr-4">
                          <span className="text-lg font-bold text-white">{appt.time}</span>
                       </div>

                       {/* Details */}
                       <div className="flex-1">
                          <h4 className="font-bold text-white text-lg flex items-center gap-2">
                             {appt.patientName}
                             {appt.patientId && <User size={14} className="text-primary" title="Paciente Cadastrado" />}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                             <span className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700">{appt.type}</span>
                             {appt.notes && <span className="text-xs text-gray-500 italic truncate max-w-[200px]">- {appt.notes}</span>}
                          </div>
                       </div>

                       {/* Status & Actions */}
                       <div className="flex items-center gap-3">
                          <div className={`text-xs px-2 py-1 rounded border font-bold uppercase ${getStatusColor(appt.status)}`}>
                             {getStatusLabel(appt.status)}
                          </div>
                          
                          {appt.status !== 'completed' && appt.status !== 'canceled' && (
                             <button 
                                onClick={() => handleStatusChange(appt, 'confirmed')}
                                className="p-2 bg-green-900/20 text-green-400 rounded-lg hover:bg-green-900/40 hover:text-white transition-colors"
                                title="Confirmar"
                             >
                                <Check size={18} />
                             </button>
                          )}
                          
                          <button 
                             onClick={() => handleDelete(appt.id)}
                             className="p-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                             title="Cancelar"
                          >
                             <Trash2 size={18} />
                          </button>
                       </div>
                    </div>
                 ))
              )}
           </div>
        </div>
      </div>

      {/* New Appointment Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
           <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg shadow-2xl">
              <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                 <h3 className="text-white font-bold text-lg">Novo Agendamento</h3>
                 <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-white"><X size={24}/></button>
              </div>
              
              <div className="p-6 space-y-4">
                 {/* Patient Search/Input */}
                 <div className="relative">
                    <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">Paciente</label>
                    <div className="relative">
                       <Input 
                          placeholder="Digite o nome do paciente..." 
                          value={newAppointment.patientName || patientSearch}
                          onChange={(e) => {
                             setPatientSearch(e.target.value);
                             setNewAppointment({ ...newAppointment, patientName: e.target.value, patientId: undefined });
                          }}
                          className="!mb-0"
                       />
                       {patientSearch && !newAppointment.patientId && (
                          <div className="absolute top-full left-0 w-full bg-gray-800 border border-gray-700 rounded-b-lg max-h-40 overflow-y-auto z-10">
                             {filteredPatients.map(p => (
                                <div 
                                   key={p.id} 
                                   onClick={() => selectExistingPatient(p)}
                                   className="p-2 hover:bg-primary/20 cursor-pointer text-sm text-gray-200"
                                >
                                   {p.name}
                                </div>
                             ))}
                          </div>
                       )}
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <Input 
                       type="time" 
                       label="Horário" 
                       value={newAppointment.time || ''} 
                       onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} 
                    />
                    <Select 
                       label="Tipo" 
                       value={newAppointment.type}
                       onChange={e => setNewAppointment({...newAppointment, type: e.target.value as any})}
                    >
                       <option>Primeira Consulta</option>
                       <option>Retorno</option>
                       <option>Bioimpedância</option>
                       <option>Online</option>
                    </Select>
                 </div>
                 
                 <div>
                    <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">Observações</label>
                    <textarea 
                       className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary"
                       rows={3}
                       value={newAppointment.notes || ''}
                       onChange={e => setNewAppointment({...newAppointment, notes: e.target.value})}
                    />
                 </div>

                 <Button onClick={handleSave} className="mt-4">Confirmar Agendamento</Button>
              </div>
           </div>
        </div>
      )}

    </Layout>
  );
};

export default Agenda;