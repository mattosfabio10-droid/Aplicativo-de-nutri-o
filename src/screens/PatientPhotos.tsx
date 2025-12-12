
import React, { useState, useEffect, useRef } from 'react';
import { Camera, Upload, Trash2, ArrowLeftRight, Image as ImageIcon, X, AlertTriangle } from 'lucide-react';
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { StorageService } from '../services/storage';
import { PatientPhoto } from '../types';
import { Button, Input, Select } from '../components/UI';

const PatientPhotos: React.FC = () => {
  const { currentPatient } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photos, setPhotos] = useState<PatientPhoto[]>([]);
  const [activeTab, setActiveTab] = useState<'gallery' | 'compare'>('gallery');
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [photoA, setPhotoA] = useState<string>('');
  const [photoB, setPhotoB] = useState<string>('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPhotoDate, setNewPhotoDate] = useState(new Date().toISOString().split('T')[0]);
  const [newPhotoType, setNewPhotoType] = useState<'front' | 'side' | 'back' | 'face'>('front');
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    if (currentPatient) {
      loadPhotos();
    }
  }, [currentPatient]);

  const loadPhotos = () => {
    if (!currentPatient) return;
    const loaded = StorageService.getPatientPhotos(currentPatient.id);
    loaded.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setPhotos(loaded);
    if (loaded.length >= 2) {
        setPhotoB(loaded[0].id);
        setPhotoA(loaded[loaded.length - 1].id);
    } else if (loaded.length === 1) {
        setPhotoA(loaded[0].id);
    }
  };

  const compressImage = (base64: string, maxWidth = 600, quality = 0.5): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
    });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
            setPreviewUrl(event.target.result as string);
            setShowUploadModal(true);
            setErrorMsg('');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSavePhoto = async () => {
    if (!currentPatient || !previewUrl) return;
    setUploading(true);
    setErrorMsg('');
    try {
        const compressed = await compressImage(previewUrl);
        const newPhoto: PatientPhoto = { id: Date.now().toString(), patientId: currentPatient.id, date: newPhotoDate, type: newPhotoType, imageData: compressed };
        const success = StorageService.savePatientPhoto(newPhoto);
        if (success) {
            loadPhotos();
            setShowUploadModal(false);
            setPreviewUrl('');
        } else {
            setErrorMsg("Armazenamento cheio!");
        }
    } catch (error) {
        setErrorMsg("Erro ao processar imagem.");
    } finally {
        setUploading(false);
    }
  };

  const handleDelete = (photoId: string) => {
      if(!currentPatient) return;
      if(window.confirm("Tem certeza que deseja excluir esta foto?")) {
          StorageService.deletePatientPhoto(currentPatient.id, photoId);
          loadPhotos();
      }
  };

  const getPhotoLabel = (type: string) => {
      const map: Record<string, string> = { front: 'Frente', side: 'Perfil', back: 'Costas', face: 'Rosto' };
      return map[type] || type;
  };

  if (!currentPatient) return <Layout title="Fotos">Selecione um paciente.</Layout>;

  return (
    <Layout title="Evolução Fotográfica" showBack>
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
         <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-800 w-full md:w-auto">
            <button onClick={() => setActiveTab('gallery')} className={`flex-1 md:flex-none px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'gallery' ? 'bg-primary text-black' : 'text-gray-400'}`}><ImageIcon size={18} /> Galeria</button>
            <button onClick={() => setActiveTab('compare')} className={`flex-1 md:flex-none px-6 py-2 text-sm font-bold rounded-lg transition-all ${activeTab === 'compare' ? 'bg-primary text-black' : 'text-gray-400'}`}><ArrowLeftRight size={18} /> Comparativo</button>
         </div>
         <button onClick={() => fileInputRef.current?.click()} className="w-full md:w-auto px-6 py-3 bg-gray-800 border border-gray-700 text-white rounded-xl font-bold flex items-center justify-center gap-2"><Camera size={20} className="text-primary" /> Adicionar Foto</button>
         <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileSelect} />
      </div>

      {activeTab === 'gallery' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {photos.map(photo => (
                  <div key={photo.id} className="group relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-lg">
                      <img src={photo.imageData} alt="Paciente" className="w-full h-48 object-cover" />
                      <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                          <p className="text-white font-bold text-sm">{new Date(photo.date).toLocaleDateString('pt-BR')}</p>
                          <p className="text-primary text-xs uppercase font-bold">{getPhotoLabel(photo.type)}</p>
                          <button onClick={() => handleDelete(photo.id)} className="absolute top-2 right-2 p-2 bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={16} /></button>
                      </div>
                  </div>
              ))}
          </div>
      )}

      {activeTab === 'compare' && (
          <div className="flex flex-col md:flex-row gap-4 h-[500px]">
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col">
                  <select value={photoA} onChange={e => setPhotoA(e.target.value)} className="bg-black border border-gray-700 text-white text-xs rounded-lg px-2 py-1 mb-4">
                      <option value="">Selecione...</option>
                      {photos.map(p => <option key={p.id} value={p.id}>{new Date(p.date).toLocaleDateString('pt-BR')} - {getPhotoLabel(p.type)}</option>)}
                  </select>
                  <div className="flex-1 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">{photoA && <img src={photos.find(p => p.id === photoA)?.imageData} className="w-full h-full object-contain" />}</div>
              </div>
              <div className="flex-1 bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col">
                  <select value={photoB} onChange={e => setPhotoB(e.target.value)} className="bg-black border border-gray-700 text-white text-xs rounded-lg px-2 py-1 mb-4">
                      <option value="">Selecione...</option>
                      {photos.map(p => <option key={p.id} value={p.id}>{new Date(p.date).toLocaleDateString('pt-BR')} - {getPhotoLabel(p.type)}</option>)}
                  </select>
                  <div className="flex-1 bg-black/50 rounded-lg flex items-center justify-center overflow-hidden">{photoB && <img src={photos.find(p => p.id === photoB)?.imageData} className="w-full h-full object-contain" />}</div>
              </div>
          </div>
      )}

      {showUploadModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80">
              <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-sm p-4 space-y-4">
                  <div className="flex justify-between items-center"><h3 className="text-white font-bold">Salvar Foto</h3><button onClick={() => setShowUploadModal(false)}><X size={20} className="text-gray-500"/></button></div>
                  {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
                  <img src={previewUrl} className="w-full h-48 object-contain bg-black rounded-lg" />
                  <div className="grid grid-cols-2 gap-3">
                      <Input type="date" value={newPhotoDate} onChange={e => setNewPhotoDate(e.target.value)} />
                      <Select value={newPhotoType} onChange={e => setNewPhotoType(e.target.value as any)}>
                          <option value="front">Frente</option>
                          <option value="side">Perfil</option>
                          <option value="back">Costas</option>
                          <option value="face">Rosto</option>
                      </Select>
                  </div>
                  <Button onClick={handleSavePhoto} disabled={uploading}>{uploading ? 'Salvando...' : 'Confirmar'}</Button>
              </div>
          </div>
      )}
    </Layout>
  );
};

export default PatientPhotos;
