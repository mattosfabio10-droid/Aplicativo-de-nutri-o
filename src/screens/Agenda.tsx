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
  const [newAppt, setNewAppt] = useState<Partial<Appointment>>({ type: 'Primeira Consulta', status: 'scheduled' });

  useEffect(() => { refreshAgenda(); }, []);
  const refreshAgenda = () => {
    const data = StorageService.getAppointments();
    setAppointments(data.sort((a, b) => a.time.localeCompare(b.time)));
  };

  const handleSave = () => {
    if (!newAppt.patientName || !newAppt.time) return alert("Preencha nome e horário.");
    const appt: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: newAppt.time!,
      patientName: newAppt.patientName!,
      type: newAppt.type as any,
      status: 'scheduled',
      notes: newAppt.notes
    };
    StorageService.saveAppointment(appt);
    refreshAgenda();
    setShowModal(false);
    setNewAppt({ type: 'Primeira Consulta' });
  };

  const handleDelete = (id: string) => { if(confirm("Cancelar?")) { StorageService.deleteAppointment(id); refreshAgenda(); } };
  const filtered = appointments.filter(a => a.date === selectedDate);

  return (
    <Layout title="Agenda">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-80 flex flex-col gap-6">
           <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
              <label className="text-primary text-xs font-bold uppercase">Data</label>
              <input type="date" className="w-full bg-black border-gray-700 rounded-lg p-3 text-white mt-2" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} />
           </div>
           <button onClick={() => setShowModal(true)} className="w-full bg-primary text-black font-bold py-4 rounded-xl flex justify-center gap-2"><Plus /> Novo Agendamento</button>
        </div>
        <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-3">
           {filtered.length === 0 ? <p className="text-gray-500 text-center py-10">Vazio.</p> : filtered.map(a => (
              <div key={a.id} className="bg-black/40 border border-gray-800 rounded-xl p-4 flex justify-between items-center">
                 <div className="flex gap-4 items-center">
                    <span className="text-lg font-bold text-white w-16 text-center">{a.time}</span>
                    <div><h4 className="font-bold text-white">{a.patientName}</h4><span className="text-xs text-gray-400">{a.type}</span></div>
                 </div>
                 <button onClick={() => handleDelete(a.id)} className="text-red-400 hover:text-white"><Trash2 size={18} /></button>
              </div>
           ))}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
           <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-lg p-6 space-y-4">
              <h3 className="text-white font-bold text-lg">Novo Agendamento</h3>
              <Input placeholder="Nome do Paciente" value={newAppt.patientName || ''} onChange={e => setNewAppt({...newAppt, patientName: e.target.value})} />
              <Input type="time" value={newAppt.time || ''} onChange={e => setNewAppt({...newAppt, time: e.target.value})} />
              <Select value={newAppt.type} onChange={e => setNewAppt({...newAppt, type: e.target.value as any})}><option>Primeira Consulta</option><option>Retorno</option></Select>
              <div className="flex gap-2"><Button onClick={handleSave}>Salvar</Button><Button variant="ghost" onClick={() => setShowModal(false)}>Cancelar</Button></div>
           </div>
        </div>
      )}
    </Layout>
  );
};
export default Agenda;