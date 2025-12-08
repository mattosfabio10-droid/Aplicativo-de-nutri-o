
import React, { useState } from 'react';
import { Search, FileHeart, ChevronRight, FileText, CheckCircle, XCircle, ArrowLeft } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { Input, Button } from '../components/UI';
import { GuidelinesDatabase, Guideline } from '../data/guidelinesData';

// Reutilizar o helper de imagem da AIMealPlan se possível, mas vou redeclarar aqui para isolamento
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

const Guidelines: React.FC = () => {
  const { currentPatient } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideline, setSelectedGuideline] = useState<Guideline | null>(null);

  const filteredGuidelines = GuidelinesDatabase.filter(g => 
    g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExportPDF = async () => {
    if (!selectedGuideline) return;
    
    const doc = new jsPDF();
    const primaryColor = [166, 206, 113]; // #A6CE71
    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - (margin * 2);

    // 1. Cabeçalho Colorido
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 35, 'F');

    // 2. Logo e Títulos
    try {
        const logoUrl = "https://i.imgur.com/JrGn2f5.png"; 
        const logoData = await getBase64ImageFromURL(logoUrl);
        doc.addImage(logoData, 'PNG', 10, 2, 30, 30);
    } catch (e) {
       // Fallback circle if image fails
       doc.setFillColor(255, 255, 255);
       doc.circle(25, 17, 12, 'F');
    }

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("ORIENTAÇÃO NUTRICIONAL", 105, 18, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Patologia: ${selectedGuideline.title.toUpperCase()}`, 105, 26, { align: "center" });

    let y = 50;

    // 3. Dados do Paciente (Se houver)
    if (currentPatient) {
        doc.setDrawColor(200, 200, 200);
        doc.setFillColor(250, 250, 250);
        doc.roundedRect(margin, y - 5, contentWidth, 15, 3, 3, 'FD');
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(`Paciente: ${currentPatient.name}`, margin + 5, y + 4);
        y += 25;
    } else {
        y += 10;
    }

    // 4. Introdução
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
    doc.text(selectedGuideline.title, margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    const introLines = doc.splitTextToSize(selectedGuideline.intro, contentWidth);
    doc.text(introLines, margin, y);
    y += (introLines.length * 5) + 10;

    // 5. Recomendações Gerais
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
    doc.text("Recomendações Gerais", margin, y);
    y += 8;

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    
    selectedGuideline.recommendations.forEach(rec => {
        const bulletText = `• ${rec}`;
        const lines = doc.splitTextToSize(bulletText, contentWidth);
        doc.text(lines, margin, y);
        y += (lines.length * 5) + 2;
    });
    y += 10;

    // 6. Alimentos Preferidos vs Evitados (Duas Colunas ou Blocos)
    
    // Check page break
    if (y > 200) { doc.addPage(); y = 20; }

    // Preferir
    doc.setFillColor(236, 253, 245); // Light green bg
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 100, 0);
    doc.text("PREFERIR", margin + 5, y + 5.5);
    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    selectedGuideline.foodsToPrefer.forEach(food => {
         const text = `✓ ${food}`;
         doc.text(text, margin + 5, y);
         y += 6;
    });
    y += 8;

    // Check page break
    if (y > 250) { doc.addPage(); y = 20; }

    // Evitar
    doc.setFillColor(254, 242, 242); // Light red bg
    doc.roundedRect(margin, y, contentWidth, 8, 2, 2, 'F');
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 0, 0);
    doc.text("EVITAR", margin + 5, y + 5.5);
    y += 12;

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);
    selectedGuideline.foodsToAvoid.forEach(food => {
         const text = `X ${food}`;
         doc.text(text, margin + 5, y);
         y += 6;
    });

    // Rodapé
    const pageHeight = doc.internal.pageSize.height;
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Mattos NutriCare - Nutrição Ortomolecular e Emagrecimento - CRN: 33174", 105, pageHeight - 10, { align: "center" });

    doc.save(`Orientacao_${selectedGuideline.id}_${currentPatient ? currentPatient.name : 'Geral'}.pdf`);
  };

  return (
    <Layout title="Orientações Nutricionais" showBack>
      {selectedGuideline ? (
        <div className="animate-fade-in">
          <button 
            onClick={() => setSelectedGuideline(null)}
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} /> Voltar para lista
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
             <div>
                <h2 className="text-2xl font-bold text-white mb-2">{selectedGuideline.title}</h2>
                <p className="text-gray-400 max-w-2xl">{selectedGuideline.description}</p>
             </div>
             <Button onClick={handleExportPDF} className="!w-auto flex items-center gap-2 shadow-lg shadow-primary/20">
                <FileText size={18} /> Baixar PDF
             </Button>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 md:p-8 space-y-8">
             {/* Intro */}
             <div className="bg-black/20 p-4 rounded-lg border border-gray-800">
                <p className="text-gray-300 leading-relaxed">{selectedGuideline.intro}</p>
             </div>

             {/* Recommendations */}
             <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                   <span className="w-1.5 h-6 bg-primary rounded-full"></span>
                   Recomendações Gerais
                </h3>
                <ul className="space-y-3">
                   {selectedGuideline.recommendations.map((rec, idx) => (
                      <li key={idx} className="flex gap-3 text-gray-300">
                         <span className="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shrink-0 block"></span>
                         {rec}
                      </li>
                   ))}
                </ul>
             </div>

             {/* Foods Grid */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-900/10 border border-green-900/30 rounded-xl p-5">
                   <h4 className="font-bold text-green-400 mb-4 flex items-center gap-2 uppercase text-sm tracking-wider">
                      <CheckCircle size={18} /> Alimentos Preferidos
                   </h4>
                   <ul className="space-y-2">
                      {selectedGuideline.foodsToPrefer.map((food, i) => (
                         <li key={i} className="text-sm text-gray-300 flex gap-2">
                            <span>✓</span> {food}
                         </li>
                      ))}
                   </ul>
                </div>

                <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-5">
                   <h4 className="font-bold text-red-400 mb-4 flex items-center gap-2 uppercase text-sm tracking-wider">
                      <XCircle size={18} /> Alimentos a Evitar
                   </h4>
                   <ul className="space-y-2">
                      {selectedGuideline.foodsToAvoid.map((food, i) => (
                         <li key={i} className="text-sm text-gray-300 flex gap-2">
                            <span>X</span> {food}
                         </li>
                      ))}
                   </ul>
                </div>
             </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6 relative">
            <Search className="absolute left-3 top-3.5 text-gray-500" size={18} />
            <Input 
              placeholder="Buscar patologia (ex: Diabetes, Gastrite)..." 
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="!pl-10 !mb-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGuidelines.map(guideline => (
              <div 
                key={guideline.id}
                onClick={() => setSelectedGuideline(guideline)}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer hover:bg-gray-800 hover:border-primary/50 transition-all group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-primary/10 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-3 relative z-10">
                   <div className="bg-gray-800 p-2.5 rounded-lg text-primary group-hover:scale-110 transition-transform">
                      <FileHeart size={24} />
                   </div>
                   <ChevronRight className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                
                <h3 className="font-bold text-white text-lg mb-1 relative z-10">{guideline.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 relative z-10">{guideline.description}</p>
              </div>
            ))}

            {filteredGuidelines.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-500">
                    <p>Nenhuma diretriz encontrada para "{searchTerm}".</p>
                </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
};

export default Guidelines;
