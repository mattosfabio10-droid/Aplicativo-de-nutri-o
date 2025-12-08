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
  {
    id: 'jejum',
    title: 'Jejum Intermitente (16:8)',
    description: 'Janela de alimentação de 8 horas e jejum de 16 horas.',
    indication: 'Resistência à insulina, perda de peso.',
    details: 'Durante o jejum, permitido: Água, café sem açúcar, chá. Quebra de jejum ideal com proteínas e gorduras boas. Evitar pico glicêmico imediato.'
  },
  {
    id: 'lowcarb',
    title: 'Low Carb Tradicional',
    description: 'Redução de carboidratos para <130g/dia.',
    indication: 'Controle glicêmico, Síndrome Metabólica.',
    details: 'Foco em vegetais de baixo amido, proteínas e gorduras naturais. Evitar: Pães, massas, açúcar refinado, tubérculos em excesso.'
  },
  {
    id: 'cetogenica',
    title: 'Dieta Cetogênica',
    description: 'Indução de cetose (<30g carb/dia).',
    indication: 'Epilepsia, obesidade mórbida, SOP.',
    details: '70-75% Gorduras, 20% Proteína, 5-10% Carbo. Necessário monitoramento de eletrólitos e hidratação redobrada.'
  },
  {
    id: 'fodmap',
    title: 'Low FODMAP',
    description: 'Restrição de carboidratos fermentáveis.',
    indication: 'Síndrome do Intestino Irritável (SII).',
    details: 'Retirar: Trigo, Leite (lactose), Alho, Cebola, Feijões. Reintrodução gradual após 6-8 semanas para identificar gatilhos.'
  },
  {
    id: 'dash',
    title: 'Dieta DASH',
    description: 'Dietary Approaches to Stop Hypertension.',
    indication: 'Hipertensão Arterial.',
    details: 'Baixo sódio (<2g/dia), alto potássio, magnésio e cálcio. Foco em frutas, verduras, grãos integrais e laticínios magros.'
  }
];

const Protocols: React.FC = () => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <Layout title="Protocolos Nutricionais" showBack>
      <div className="space-y-4">
        {protocols.map(protocol => (
          <div key={protocol.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <button 
              onClick={() => setSelected(selected === protocol.id ? null : protocol.id)}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-800/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <BookOpen size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white">{protocol.title}</h3>
                  <p className="text-xs text-gray-500">{protocol.indication}</p>
                </div>
              </div>
              <ChevronRight size={20} className={`text-gray-600 transition-transform ${selected === protocol.id ? 'rotate-90' : ''}`} />
            </button>
            
            {selected === protocol.id && (
              <div className="p-4 pt-0 border-t border-gray-800 bg-black/20">
                <div className="mt-3 space-y-3">
                  <div className="flex gap-2 items-start">
                     <Info size={16} className="text-primary mt-0.5 shrink-0" />
                     <p className="text-sm text-gray-300">{protocol.description}</p>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-xs text-gray-400 uppercase font-bold mb-1 flex items-center gap-1">
                      <Clock size={12} /> Detalhes Clínicos
                    </p>
                    <p className="text-sm text-white leading-relaxed">{protocol.details}</p>
                  </div>
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