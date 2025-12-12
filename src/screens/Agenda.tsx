
import React, { useState, useEffect } from 'react';
import { CalendarDays, Clock, Plus, Trash2, Check, User, X } from 'lucide-react';
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
  const [newAppointment, setNewAppointment] = useState<Partial<Appointment>>({ type: 'Primeira Consulta', status: 'scheduled' });
  const [patientSearch, setPatientSearch] = useState('');

  useEffect(() => { refreshAgenda(); }, []);

  const refreshAgenda = () => {
    const data = StorageService.getAppointments();
    data.sort((a, b) => a.time.localeCompare(b.time));
    setAppointments(data);
  };

  const filteredAppointments = appointments.filter(a => a.date === selectedDate);
  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(patientSearch.toLowerCase()));

  const handleSave = () => {
    if (!newAppointment.patientName || !newAppointment.time || !selectedDate) { alert("Preencha nome e horário."); return; }
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

  const handleDelete = (id: string) => { if (confirm("Cancelar agendamento?")) { StorageService.deleteAppointment(id); refreshAgenda(); } };
  const handleStatusChange = (appt: Appointment, status: Appointment['status']) => { StorageService.saveAppointment({ ...appt, status }); refreshAgenda(); };

  return (
    <Layout title="Agenda">
      <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-140px)]">
        <div className="w-full md:w-80 flex flex-col gap-6">
           <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <input type="date" className="w-full bg-black border border-gray-700 rounded-lg p-3 text-white" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
           </div>
           <button onClick={() => setShowModal(true)} className="w-full bg-primary text-black font-bold py-4 rounded-xl flex items-center justify-center gap-2"><Plus size={20} /> Novo Agendamento</button>
        </div>
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
           <div className="p-4 border-b border-gray-800 flex justify-between items-center"><h3 className="font-bold text-white flex items-center gap-2"><CalendarDays className="text-primary" /> {new Date(selectedDate).toLocaleDateString('pt-BR')}</h3></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredAppointments.length === 0 ? <div className="text-center text-gray-500 py-10">Nenhum agendamento.</div> : filteredAppointments.map(appt => (
                 <div key={appt.id} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex gap-4 items-center">
                    <div className="font-bold text-white w-16 text-center">{appt.time}</div>
                    <div className="flex-1"><h4 className="font-bold text-white">{appt.patientName}</h4><span className="text-xs text-gray-400">{appt.type}</span></div>
                    <div className="flex gap-2">
                        {appt.status !== 'confirmed' && <button onClick={() => handleStatusChange(appt, 'confirmed')} className="p-2 text-green-400 bg-green-900/20 rounded"><Check size={16}/></button>}
                        <button onClick={() => handleDelete(appt.id)} className="p-2 text-red-400 bg-red-900/20 rounded"><Trash2 size={16}/></button>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
           <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
              <div className="flex justify-between"><h3 className="text-white font-bold">Novo Agendamento</h3><button onClick={() => setShowModal(false)}><X size={24}/></button></div>
              <div className="relative">
                 <Input placeholder="Nome do paciente" value={newAppointment.patientName || patientSearch} onChange={(e) => { setPatientSearch(e.target.value); setNewAppointment({ ...newAppointment, patientName: e.target.value }); }} />
                 {patientSearch && !newAppointment.patientId && <div className="absolute w-full bg-gray-800 border border-gray-700 rounded-b-lg max-h-40 overflow-y-auto z-10">{filteredPatients.map(p => <div key={p.id} onClick={() => { setNewAppointment({ ...newAppointment, patientId: p.id, patientName: p.name }); setPatientSearch(p.name); }} className="p-2 hover:bg-gray-700 cursor-pointer">{p.name}</div>)}</div>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <Input type="time" label="Horário" value={newAppointment.time || ''} onChange={e => setNewAppointment({...newAppointment, time: e.target.value})} />
                 <Select label="Tipo" value={newAppointment.type} onChange={e => setNewAppointment({...newAppointment, type: e.target.value as any})}><option>Primeira Consulta</option><option>Retorno</option><option>Bioimpedância</option></Select>
              </div>
              <Button onClick={handleSave}>Confirmar</Button>
           </div>
        </div>
      )}
    </Layout>
  );
};

export default Agenda;
