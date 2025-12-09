
import React, { useState } from 'react';
import { BookOpen, Clock, ChevronRight, Info } from 'lucide-react';
import Layout from '../components/Layout';

interface Protocol {
  id: string;
  title: string;
  description: string;
  indication: string;
  details: string;
}

const protocols: Protocol[] = [
  { id: 'jejum', title: 'Jejum Intermitente (16:8)', description: 'Janela de 8h.', indication: 'Resistência à insulina.', details: 'Jejum de 16h com janela de 8h.' },
  { id: 'lowcarb', title: 'Low Carb', description: '<130g carb/dia.', indication: 'Controle glicêmico.', details: 'Foco em vegetais e proteínas.' },
  { id: 'cetogenica', title: 'Cetogênica', description: 'Indução de cetose.', indication: 'Epilepsia/SOP.', details: 'Alta gordura, baixa proteína/carb.' },
  { id: 'fodmap', title: 'Low FODMAP', description: 'Restrição de fermentáveis.', indication: 'SII.', details: 'Retirar fermentáveis por 6 semanas.' },
  { id: 'dash', title: 'DASH', description: 'Baixo sódio.', indication: 'Hipertensão.', details: 'Foco em potássio e magnésio.' }
];

const Protocols: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Layout title="Protocolos Nutricionais" showBack>
      <div className="space-y-4">
        {protocols.map(protocol => (
          <div key={protocol.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button onClick={() => setSelected(selected === protocol.id ? null : protocol.id)} className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary"><BookOpen size={20} /></div>
                <div><h3 className="font-bold text-white">{protocol.title}</h3><p className="text-xs text-gray-500">{protocol.indication}</p></div>
              </div>
              <ChevronRight size={20} className={`text-gray-600 transition-transform ${selected === protocol.id ? 'rotate-90' : ''}`} />
            </button>
            {selected === protocol.id && (
              <div className="p-4 pt-0 border-t border-gray-800 bg-black/20">
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2 items-start"><Info size={16} className="text-primary mt-0.5 shrink-0" /><p className="text-sm text-gray-300">{protocol.description}</p></div>
                  <div className="bg-gray-800 p-3 rounded-lg"><p className="text-xs text-gray-400 uppercase font-bold mb-1 flex items-center gap-1"><Clock size={12} /> Detalhes</p><p className="text-sm text-white leading-relaxed">{protocol.details}</p></div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Protocols;
