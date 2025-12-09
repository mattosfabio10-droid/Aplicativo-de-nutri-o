
import React, { useState } from 'react';
import { FlaskConical, Download, Sparkles, FileText, Check, AlertCircle, Loader2 } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { Button, Input } from '../components/UI';
import { useApp } from '../context/AppContext';
import { analyzeLabResults } from '../services/aiNutrition';

// Helper de imagem robusto
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

const examCategories = [
    {
        name: "Metabolismo & Glicemia",
        exams: ["Hemograma Completo", "Glicemia de Jejum", "Insulina Basal", "Hemoglobina Glicada (HbA1c)", "HOMA-IR / HOMA-BETA"]
    },
    {
        name: "Perfil Lipídico (Colesterol)",
        exams: ["Colesterol Total", "HDL Colesterol", "LDL Colesterol", "VLDL Colesterol", "Triglicerídeos", "Lipoproteína (a)", "Apolipoproteína A1", "Apolipoproteína B"]
    },
    {
        name: "Função Hepática e Renal",
        exams: ["TGO (AST)", "TGP (ALT)", "Gama GT", "Bilirrubinas Totais e Frações", "Ureia", "Creatinina", "Ácido Úrico", "CPK (Creatinofosfoquinase)"]
    },
    {
        name: "Vitaminas e Minerais",
        exams: ["Ferritina", "Ferro Sérico", "Vitamina B12", "Ácido Fólico", "Vitamina D (25-OH)", "Magnésio", "Zinco", "Cálcio Iônico", "Fósforo", "Potássio", "Sódio"]
    },
    {
        name: "Tireoide e Hormônios",
        exams: ["TSH", "T4 Livre", "T3 Livre", "T3 Reverso", "Cortisol Basal", "Testosterona Total", "Testosterona Livre", "Estradiol", "Progesterona", "SHBG", "Prolactina"]
    },
    {
        name: "Inflamatórios e Diversos",
        exams: ["Proteína C Reativa (PCR-US)", "Homocisteína", "Fibrinogênio", "Urina Tipo 1 (EAS)", "Parasitológico de Fezes", "Sangue Oculto nas Fezes"]
    }
];

const LabAnalysis: React.FC = () => {
  const { currentPatient, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<'request' | 'analysis'>('request');

  // --- States for Request ---
  const [selectedExams, setSelectedExams] = useState<string[]>([]);
  const [customExams, setCustomExams] = useState('');
  const [clinicalIndication, setClinicalIndication] = useState('Avaliação Nutricional de Rotina');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // --- States for Analysis ---
  const [analysisInput, setAnalysisInput] = useState('');
  const [aiResult, setAiResult] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);

  // --- Handlers for Request ---
  const toggleExam = (exam: string) => {
    if (selectedExams.includes(exam)) {
        setSelectedExams(prev => prev.filter(e => e !== exam));
    } else {
        setSelectedExams(prev => [...prev, exam]);
    }
  };

  const handleGenerateRequestPDF = async () => {
    if (!currentPatient) return;
    
    setIsGeneratingPdf(true);

    try {
        const doc = new jsPDF();
        const primaryColor = [166, 206, 113];

        // Borda
        doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setLineWidth(1);
        doc.rect(10, 10, 190, 277);

        // Cabeçalho (Tentativa de imagem)
        try {
            const logoUrl = "https://i.imgur.com/JrGn2f5.png";
            const logoData = await getBase64ImageFromURL(logoUrl);
            doc.addImage(logoData, 'PNG', 20, 15, 30, 30);
        } catch (e) {
            console.warn("Falha ao carregar logo, gerando sem imagem.");
        }

        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text("MATTOS NUTRICARE", 105, 25, { align: "center" });
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text("NUTRICIONISTA ORTOMOLECULAR", 105, 30, { align: "center" });
        // Dynamic CRN
        doc.text(`CRN: ${currentUser?.crn || '33174'}`, 105, 35, { align: "center" });

        // Título
        doc.setFontSize(24);
        doc.setTextColor(0, 0, 0);
        doc.setFont("helvetica", "bold");
        doc.text("SOLICITAÇÃO DE EXAMES", 105, 60, { align: "center" });
        doc.setLineWidth(0.5);
        doc.line(40, 65, 170, 65);

        let y = 80;

        // Dados Paciente
        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");
        doc.text(`Paciente: ${currentPatient.name}`, 20, y);
        doc.text(`Data: ${new Date().toLocaleDateString('pt-BR')}`, 150, y);
        y += 10;
        doc.text(`Indicação Clínica: ${clinicalIndication}`, 20, y);
        y += 15;

        // Lista de Exames
        doc.setFont("helvetica", "bold");
        doc.text("Solicito a realização dos seguintes exames laboratoriais:", 20, y);
        y += 10;

        doc.setFont("helvetica", "normal");
        
        const allExams = [...selectedExams];
        if (customExams) {
            const extras = customExams.split(',').map(s => s.trim()).filter(Boolean);
            allExams.push(...extras);
        }

        if (allExams.length === 0) {
            doc.text("- Nenhum exame selecionado.", 25, y);
        }

        allExams.forEach(exam => {
            if (y > 250) {
                doc.addPage();
                // Redraw border on new page
                doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
                doc.setLineWidth(1);
                doc.rect(10, 10, 190, 277);
                y = 30;
            }
            doc.text(`- ${exam}`, 25, y);
            y += 7;
        });

        // Assinatura Dinâmica
        const pageHeight = doc.internal.pageSize.height;
        doc.setLineWidth(0.5);
        doc.line(60, pageHeight - 60, 150, pageHeight - 60);
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.text(currentUser?.name || "Dr. Fábio Mattos", 105, pageHeight - 54, { align: "center" });
        doc.setFontSize(9);
        doc.setFont("helvetica", "normal");
        doc.text(`Nutricionista - CRN: ${currentUser?.crn || '33174'}`, 105, pageHeight - 49, { align: "center" });

        doc.save(`Pedido_Exames_${currentPatient.name.replace(/\s+/g, '_')}.pdf`);
    } catch (err) {
        console.error("Erro ao gerar PDF:", err);
        alert("Ocorreu um erro ao gerar o PDF. Tente novamente.");
    } finally {
        setIsGeneratingPdf(false);
    }
  };

  // --- Handlers for Analysis ---
  const handleAnalyze = async () => {
    if (!analysisInput || !currentPatient) return;
    setLoadingAi(true);
    setAiResult('');
    
    try {
        const result = await analyzeLabResults(analysisInput, currentPatient);
        setAiResult(result);
    } catch (error) {
        setAiResult("Erro na análise. Tente novamente.");
    } finally {
        setLoadingAi(false);
    }
  };

  if (!currentPatient) return <Layout title="Laboratório">Selecione um paciente.</Layout>;

  return (
    <Layout title="Exames Laboratoriais" showBack>
      {/* Tabs */}
      <div className="flex bg-gray-900 p-1 rounded-xl mb-6 border border-gray-800">
        <button 
          onClick={() => setActiveTab('request')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'request' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          <FileText size={18} /> Emitir Pedido
        </button>
        <button 
          onClick={() => setActiveTab('analysis')}
          className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'analysis' ? 'bg-primary text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
        >
          <Sparkles size={18} /> Analisar com IA
        </button>
      </div>

      {activeTab === 'request' && (
        <div className="animate-fade-in space-y-6">
            {/* Clinical Indication */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <Input 
                    label="Indicação Clínica" 
                    value={clinicalIndication}
                    onChange={e => setClinicalIndication(e.target.value)}
                    placeholder="Ex: Avaliação de rotina, Investigação de fadiga..."
                />
            </div>

            {/* Exam Selector */}
            <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                    <FlaskConical className="text-primary" /> Seleção de Exames
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {examCategories.map((cat, idx) => (
                        <div key={idx} className="bg-gray-950/50 p-4 rounded-lg border border-gray-800">
                            <h4 className="text-primary text-xs font-bold uppercase mb-3 tracking-wider">{cat.name}</h4>
                            <div className="space-y-2">
                                {cat.exams.map(exam => (
                                    <label key={exam} className="flex items-center gap-2 cursor-pointer group">
                                        <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedExams.includes(exam) ? 'bg-primary border-primary' : 'border-gray-600 bg-transparent group-hover:border-gray-400'}`}>
                                            {selectedExams.includes(exam) && <Check size={12} className="text-black" />}
                                        </div>
                                        <input type="checkbox" className="hidden" checked={selectedExams.includes(exam)} onChange={() => toggleExam(exam)} />
                                        <span className={`text-sm ${selectedExams.includes(exam) ? 'text-white font-medium' : 'text-gray-400 group-hover:text-gray-300'}`}>{exam}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-6">
                    <label className="block text-primary text-xs font-bold mb-2 uppercase tracking-wide">Outros Exames (Separar por vírgula)</label>
                    <textarea 
                        className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary min-h-[60px]"
                        placeholder="Ex: Cortisol Salivar, Coprocultura..."
                        value={customExams}
                        onChange={e => setCustomExams(e.target.value)}
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end pt-4 pb-12">
                <Button onClick={handleGenerateRequestPDF} disabled={isGeneratingPdf} className="!w-auto flex items-center gap-2 px-8 shadow-xl">
                    {isGeneratingPdf ? <Loader2 size={20} className="animate-spin" /> : <Download size={20} />}
                    {isGeneratingPdf ? 'Gerando PDF...' : 'Gerar Pedido PDF'}
                </Button>
            </div>
        </div>
      )}

      {activeTab === 'analysis' && (
        <div className="animate-fade-in space-y-6">
             <div className="bg-blue-900/10 border border-blue-900/30 p-4 rounded-xl flex items-start gap-3">
                <AlertCircle className="text-blue-400 shrink-0 mt-0.5" size={20} />
                <div>
                    <h4 className="text-blue-400 font-bold text-sm">Como usar a IA Funcional</h4>
                    <p className="text-blue-200/70 text-xs mt-1">
                        Copie o texto do PDF do laboratório e cole abaixo. A IA irá interpretar os valores com base na Nutrição Funcional (não apenas valores de referência) e sugerir correlações.
                    </p>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
                {/* Input Area */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex flex-col h-[500px]">
                    <label className="text-gray-400 text-xs font-bold uppercase mb-2 block">Cole os resultados aqui</label>
                    <textarea 
                        className="flex-1 w-full bg-black border border-gray-700 rounded-lg p-4 text-gray-300 focus:outline-none focus:border-primary font-mono text-sm resize-none"
                        placeholder={`EXEMPLO:\n\nGlicose: 98 mg/dL\nInsulina: 15 uUI/mL\nFerritina: 20 ng/mL...`}
                        value={analysisInput}
                        onChange={e => setAnalysisInput(e.target.value)}
                    />
                    <div className="pt-4">
                        <Button onClick={handleAnalyze} disabled={loadingAi || !analysisInput} className="w-full">
                            {loadingAi ? (
                                <span className="flex items-center gap-2"><Sparkles className="animate-spin" /> Analisando...</span>
                            ) : (
                                <span className="flex items-center gap-2"><Sparkles /> Interpretar Exames</span>
                            )}
                        </Button>
                    </div>
                </div>

                {/* Output Area */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 h-[500px] overflow-y-auto relative">
                    {!aiResult && !loadingAi && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 opacity-50">
                            <FlaskConical size={48} className="mb-2" />
                            <p>O resultado da análise aparecerá aqui</p>
                        </div>
                    )}
                    
                    {loadingAi && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-primary animate-pulse">
                            <Sparkles size={48} className="mb-2" />
                            <p>Consultando conhecimento bioquímico...</p>
                        </div>
                    )}

                    {aiResult && (
                        <div className="prose prose-invert prose-sm max-w-none">
                            <div className="whitespace-pre-line text-gray-300 leading-relaxed">
                                {aiResult}
                            </div>
                        </div>
                    )}
                </div>
             </div>
        </div>
      )}
    </Layout>
  );
};

export default LabAnalysis;
