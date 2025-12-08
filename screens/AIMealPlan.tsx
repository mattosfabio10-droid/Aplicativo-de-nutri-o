
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Download, Check, AlertTriangle, ChevronDown, ChevronUp, FileText, Settings, PieChart, Edit2, Save, X, Plus, Trash2, Search, BookOpen, Clock, Calculator, RefreshCw, Scale, Info, LayoutTemplate } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { generateMealPlanWithAI } from '../services/aiNutrition';
import { Button, Input } from '../components/UI';
import { MealPlan, MealItem, Macros } from '../types';
import { StorageService } from '../services/storage';
import { FoodDatabase, FoodDbItem, findFoodByName, getSmartMeasures, calculateCaloriesForMeasure, calculateSmartSubstitutions, calculateMacrosForMeasure } from '../data/foodDatabase';
import { MealPlanTemplates, MealPlanTemplate } from '../data/mealPlanTemplates';

// Helper para converter imagem URL para Base64 (para o PDF)
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

// Helper para gerar um logo fallback via Canvas se a imagem externa falhar
const generateFallbackLogo = (): string => {
  const canvas = document.createElement("canvas");
  canvas.width = 200;
  canvas.height = 200;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    // Fundo Verde #A6CE71
    ctx.fillStyle = "#A6CE71";
    ctx.beginPath();
    ctx.arc(100, 100, 90, 0, Math.PI * 2);
    ctx.fill();

    // Texto "FM"
    ctx.fillStyle = "#000000";
    ctx.font = "bold 80px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("FM", 100, 105);
    
    // Borda
    ctx.strokeStyle = "#FFFFFF";
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(100, 100, 86, 0, Math.PI * 2);
    ctx.stroke();
  }
  return canvas.toDataURL("image/png");
};

// Helper de IMC
const calculateBMI = (weight: number, height: number) => {
    if (!weight || !height) return { value: 0, label: '', color: '' };
    const h = height / 100;
    const bmi = parseFloat((weight / (h * h)).toFixed(1));
    
    let label = '';
    let color = ''; // Para uso na UI

    if (bmi < 18.5) { label = 'Abaixo do Peso'; color = 'text-blue-400 border-blue-400'; }
    else if (bmi < 24.9) { label = 'Eutrofia (Normal)'; color = 'text-green-400 border-green-400'; }
    else if (bmi < 29.9) { label = 'Sobrepeso'; color = 'text-yellow-400 border-yellow-400'; }
    else if (bmi < 34.9) { label = 'Obesidade Grau I'; color = 'text-orange-400 border-orange-400'; }
    else if (bmi < 39.9) { label = 'Obesidade Grau II'; color = 'text-red-400 border-red-400'; }
    else { label = 'Obesidade Grau III'; color = 'text-red-600 border-red-600'; }

    return { value: bmi, label, color };
};

const AIMealPlan: React.FC = () => {
  const { currentPatient } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);
  const [error, setError] = useState('');
  const [expandedMeal, setExpandedMeal] = useState<string | null>(null);
  
  // Estado de Edição
  const [isEditing, setIsEditing] = useState(false);
  const [tempPlan, setTempPlan] = useState<MealPlan | null>(null);

  // Estados da Modal de Alimentos
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [mealIndexToAdd, setMealIndexToAdd] = useState<number | null>(null);
  const [itemIndexToReplace, setItemIndexToReplace] = useState<number | null>(null);
  const [foodSearch, setFoodSearch] = useState('');
  const [activeFoodCategory, setActiveFoodCategory] = useState(FoodDatabase[0].id);

  // Estado da Modal de Templates
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Estados de configuração da geração
  const [targetGoal, setTargetGoal] = useState<string>('Manutenção');
  const [customCalories, setCustomCalories] = useState<string>('');

  useEffect(() => {
    if (currentPatient) {
      setTargetGoal(currentPatient.goal || 'Manutenção');
      setCustomCalories('');
      const savedPlans = StorageService.getMealPlans(currentPatient.id);
      if (savedPlans.length > 0) {
          const lastPlan = savedPlans[savedPlans.length - 1];
          setGeneratedPlan(lastPlan);
          if (lastPlan.meals.length > 0) {
            setExpandedMeal(lastPlan.meals[0].id);
          }
      } else {
          setGeneratedPlan(null);
      }
    }
  }, [currentPatient]);

  useEffect(() => {
    if (isEditing && generatedPlan) {
        setTempPlan(JSON.parse(JSON.stringify(generatedPlan))); 
    }
  }, [isEditing, generatedPlan]);

  const handleGenerate = async () => {
    if (!currentPatient) return;
    setLoading(true);
    setError('');
    setIsEditing(false);
    setTempPlan(null);
    
    try {
      const patientForGeneration = {
        ...currentPatient,
        goal: targetGoal,
        customCalories: customCalories ? Number(customCalories) : undefined
      };

      const plan = await generateMealPlanWithAI(patientForGeneration);
      if (plan) {
        setGeneratedPlan(plan);
        StorageService.saveMealPlan(plan);
        if (plan.meals.length > 0) setExpandedMeal(plan.meals[0].id);
      } else {
        setError('Não foi possível gerar o plano. Tente novamente.');
      }
    } catch (err) {
      setError('Erro de conexão com a IA. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleLoadTemplate = (template: MealPlanTemplate) => {
      if (!currentPatient) return;

      const newPlan: MealPlan = {
          id: Date.now().toString(),
          patientId: currentPatient.id,
          createdAt: new Date().toISOString(),
          totalCalories: template.totalCalories,
          macros: template.macros,
          meals: template.meals, // Refeições já vêm estruturadas
          shoppingList: [], // Pode ser gerado depois ou deixado vazio
          generalAdvice: template.generalAdvice
      };

      setGeneratedPlan(newPlan);
      StorageService.saveMealPlan(newPlan);
      if (newPlan.meals.length > 0) setExpandedMeal(newPlan.meals[0].id);
      setShowTemplateModal(false);
  };

  // --- Funções Auxiliares de Recálculo ---

  const recalculatePlanTotals = (plan: MealPlan): MealPlan => {
      let totalCals = 0;
      let totalProtein = 0;
      let totalCarbs = 0;
      let totalFats = 0;

      plan.meals.forEach(meal => {
          meal.items.forEach(item => {
              const cals = Number(item.calories) || 0;
              totalCals += cals;

              const dbItem = findFoodByName(item.name);
              if (dbItem && dbItem.kcal > 0) {
                  const ratio = cals / dbItem.kcal;
                  totalProtein += dbItem.protein * ratio;
                  totalCarbs += dbItem.carbs * ratio;
                  totalFats += dbItem.fats * ratio;
              }
          });
      });

      return {
          ...plan,
          totalCalories: Math.round(totalCals),
          macros: {
              protein: Math.round(totalProtein),
              carbs: Math.round(totalCarbs),
              fats: Math.round(totalFats)
          }
      };
  };

  // --- Funções de Edição e Manipulação de Dados ---

  const handleUpdateItem = (mealIndex: number, itemIndex: number, field: keyof MealItem, value: any) => {
    if (!tempPlan) return;
    let newPlan = { ...tempPlan };
    
    if (field === 'substitutions') {
        newPlan.meals[mealIndex].items[itemIndex].substitutions = value.split(',').map((s: string) => s.trim());
    } else if (field === 'calories') {
        const newCals = Number(value) || 0;
        newPlan.meals[mealIndex].items[itemIndex].calories = newCals;
        // Recalcular totais
        newPlan = recalculatePlanTotals(newPlan);
    } else {
        newPlan.meals[mealIndex].items[itemIndex] = {
            ...newPlan.meals[mealIndex].items[itemIndex],
            [field]: value
        };
    }
    setTempPlan(newPlan);
  };

  const handleMeasureChange = (mealIndex: number, itemIndex: number, measureAmountStr: string, foodName: string) => {
      if (!tempPlan) return;
      const measureAmount = Number(measureAmountStr);
      if (isNaN(measureAmount)) return;

      const dbItem = findFoodByName(foodName);
      if (!dbItem) return;

      const measures = getSmartMeasures(dbItem);
      const selectedMeasure = measures.find(m => m.amount === measureAmount);
      const label = selectedMeasure ? selectedMeasure.label : `${measureAmount}${dbItem.baseUnit}`;

      const newCalories = calculateCaloriesForMeasure(dbItem, measureAmount);
      const newSubstitutions = calculateSmartSubstitutions(dbItem.name, newCalories);

      let newPlan = { ...tempPlan };
      
      newPlan.meals[mealIndex].items[itemIndex] = {
          ...newPlan.meals[mealIndex].items[itemIndex],
          quantity: label,
          calories: newCalories,
          substitutions: newSubstitutions
      };

      newPlan = recalculatePlanTotals(newPlan);

      setTempPlan(newPlan);
  };

  const handleUpdateMealName = (mealIndex: number, newName: string) => {
    if (!tempPlan) return;
    const newPlan = { ...tempPlan };
    newPlan.meals[mealIndex].name = newName;
    setTempPlan(newPlan);
  };

  const handleUpdateMealTime = (mealIndex: number, newTime: string) => {
    if (!tempPlan) return;
    const newPlan = { ...tempPlan };
    newPlan.meals[mealIndex].time = newTime;
    setTempPlan(newPlan);
  };

  const handleAddMeal = () => {
    if (!tempPlan) return;
    const newPlan = { ...tempPlan };
    newPlan.meals.push({
      id: Date.now().toString(),
      name: 'Nova Refeição',
      time: '00:00',
      items: []
    });
    setTempPlan(newPlan);
  };

  const handleRemoveMeal = (mealIndex: number) => {
    if (!tempPlan) return;
    let newPlan = { ...tempPlan };
    newPlan.meals.splice(mealIndex, 1);
    newPlan = recalculatePlanTotals(newPlan);
    setTempPlan(newPlan);
  };

  const handleAddItemManual = (mealIndex: number) => {
      if (!tempPlan) return;
      const newPlan = { ...tempPlan };
      newPlan.meals[mealIndex].items.push({
          name: 'Novo Alimento',
          quantity: '1 porção',
          calories: 0,
          substitutions: []
      });
      setTempPlan(newPlan);
  };

  const openFoodDatabaseModal = (mealIndex: number, itemIndexToReplace: number | null = null) => {
      setMealIndexToAdd(mealIndex);
      setItemIndexToReplace(itemIndexToReplace);
      setFoodSearch('');
      setShowFoodModal(true);
  };

  const handleAddFromDatabase = (food: FoodDbItem) => {
      if (!tempPlan || mealIndexToAdd === null) return;
      
      let newPlan = { ...tempPlan };
      
      const autoSubstitutions = calculateSmartSubstitutions(food.name, food.kcal);
      
      const newItem: MealItem = {
          name: food.name,
          quantity: food.qty,
          calories: food.kcal, 
          substitutions: autoSubstitutions
      };

      if (itemIndexToReplace !== null) {
          newPlan.meals[mealIndexToAdd].items[itemIndexToReplace] = newItem;
      } else {
          newPlan.meals[mealIndexToAdd].items.push(newItem);
      }

      newPlan = recalculatePlanTotals(newPlan);

      setTempPlan(newPlan);
      setShowFoodModal(false);
      setItemIndexToReplace(null);
  };

  const handleRemoveItem = (mealIndex: number, itemIndex: number) => {
      if (!tempPlan) return;
      let newPlan = { ...tempPlan };
      newPlan.meals[mealIndex].items.splice(itemIndex, 1);
      newPlan = recalculatePlanTotals(newPlan);
      setTempPlan(newPlan);
  };

  const handleSaveEdits = () => {
      if (tempPlan) {
          setGeneratedPlan(tempPlan);
          StorageService.saveMealPlan(tempPlan);
          setIsEditing(false);
          setTempPlan(null);
      }
  };

  const handleCancelEdits = () => {
      setIsEditing(false);
      setTempPlan(null);
  };

  const handleExportPDF = async () => {
      if (!generatedPlan || !currentPatient) return;
      const doc = new jsPDF();
      const primaryColor = [166, 206, 113]; // #A6CE71
      
      // CONFIGURAÇÕES GERAIS DE LAYOUT
      const pageWidth = 210; // A4 width in mm
      const margin = 15;
      const contentWidth = pageWidth - (margin * 2);
      const rightMarginX = pageWidth - margin;
      
      // Header Background
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, pageWidth, 35, 'F');
      
      // LOGO HANDLING
      try {
          const logoUrl = "https://i.imgur.com/JrGn2f5.png"; 
          const logoData = await getBase64ImageFromURL(logoUrl);
          doc.addImage(logoData, 'PNG', 10, 2, 30, 30);
      } catch (e) {
          try {
            const fallbackLogo = generateFallbackLogo();
            doc.addImage(fallbackLogo, 'PNG', 10, 2, 30, 30);
          } catch (err2) {
             // Fallback simples
          }
      }

      // Título do PDF
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("PLANO ALIMENTAR", 105, 18, { align: "center" });
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Gerado em: ${new Date().toLocaleDateString('pt-BR')}`, 105, 26, { align: "center" });
      
      let y = 50;
      
      // IMC Calc
      const bmiInfo = calculateBMI(currentPatient.weight, currentPatient.height);

      // Bloco de Informações do Paciente
      doc.setDrawColor(200, 200, 200);
      doc.setFillColor(250, 250, 250);
      doc.roundedRect(margin, y - 5, contentWidth, 30, 3, 3, 'FD');
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Paciente:", margin + 5, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text(currentPatient.name, margin + 30, y + 5);
      
      doc.setFont("helvetica", "bold");
      doc.text("Objetivo:", margin + 5, y + 12);
      doc.setFont("helvetica", "normal");
      doc.text(targetGoal, margin + 30, y + 12); 

      // IMC no PDF
      doc.setFont("helvetica", "bold");
      doc.text("Diagnóstico:", margin + 5, y + 19);
      doc.setFont("helvetica", "normal");
      if (bmiInfo.value > 0) {
          doc.text(`IMC ${bmiInfo.value} kg/m² - ${bmiInfo.label}`, margin + 35, y + 19);
      } else {
          doc.text("Dados insuficientes para cálculo", margin + 35, y + 19);
      }
      
      doc.setFont("helvetica", "bold");
      doc.text("Calorias:", 120, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text(`${generatedPlan.totalCalories} kcal`, 145, y + 5);
      
      if (generatedPlan.macros) {
          doc.setFontSize(9);
          doc.text(`PTN: ${generatedPlan.macros.protein}g | CHO: ${generatedPlan.macros.carbs}g | GORD: ${generatedPlan.macros.fats}g`, 120, y + 12);
      }
      
      y += 35;
      
      // Título da Seção
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50); 
      doc.text("Refeições do Dia", margin, y);
      y += 10;
      
      // Loop das Refeições
      generatedPlan.meals.forEach((meal) => {
        if (y > 260) { doc.addPage(); y = 20; }
        
        doc.setFillColor(240, 240, 240);
        doc.rect(margin, y - 6, contentWidth, 8, 'F');
        
        doc.setFontSize(11);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0, 0, 0);
        doc.text(meal.name.toUpperCase(), margin + 3, y);
        
        if(meal.time) {
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(80, 80, 80);
            doc.text(meal.time, rightMarginX - 3, y, { align: "right" });
            doc.setTextColor(0, 0, 0);
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
        }

        y += 8; 
        
        meal.items.forEach((item) => {
           if (y > 275) { doc.addPage(); y = 20; }
           
           doc.setFontSize(10);
           const qtyX = rightMarginX; 
           const maxNameWidth = 125; 
           const bulletName = `• ${item.name}`;
           const splitName = doc.splitTextToSize(bulletName, maxNameWidth);
           
           doc.setFont("helvetica", "normal");
           doc.text(splitName, margin + 5, y);
           
           doc.setFont("helvetica", "bold");
           doc.text(`${item.quantity}`, qtyX, y, { align: 'right' });
           
           const lineHeight = 5; 
           const blockHeight = splitName.length * lineHeight;
           
           y += blockHeight; 
           
           if (item.substitutions && item.substitutions.length > 0) {
              doc.setFontSize(9);
              doc.setTextColor(100, 100, 100);
              doc.setFont("helvetica", "italic");
              
              const subLabel = "Substituições: ";
              const subText = item.substitutions.join(', ');
              const fullSubText = `${subLabel}${subText}`;
              
              const splitSub = doc.splitTextToSize(fullSubText, contentWidth - 10); 
              doc.text(splitSub, margin + 7, y); 
              
              y += (splitSub.length * 4) + 2; 
              doc.setTextColor(0, 0, 0);
              doc.setFontSize(10);
           } else {
              y += 2; 
           }
        });
        
        y += 4; 
      });
      
      if (y > 230) { doc.addPage(); y = 20; } else { y += 10; }
      
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, y, rightMarginX, y);
      y += 10;
      
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(primaryColor[0] - 50, primaryColor[1] - 50, primaryColor[2] - 50);
      doc.text("Orientações Gerais", margin, y);
      y += 7;
      
      doc.setFontSize(10);
      doc.setTextColor(50, 50, 50);
      doc.setFont("helvetica", "normal");
      
      const adviceLines = doc.splitTextToSize(generatedPlan.generalAdvice, contentWidth);
      doc.text(adviceLines, margin, y);
      
      doc.save(`Plano_Nutricional_${currentPatient.name.replace(/\s+/g, '_')}.pdf`);
  };

  const getPercentage = (grams: number, caloriesPerGram: number, totalCalories: number) => {
    if (!totalCalories) return 0;
    return Math.round(((grams * caloriesPerGram) / totalCalories) * 100);
  };

  const getMacroStatus = (type: 'protein' | 'carbs' | 'fats', percentage: number) => {
    if (type === 'protein') {
        if (percentage < 10) return { label: 'Baixo', color: 'text-blue-400', border: 'border-blue-400' };
        if (percentage > 35) return { label: 'Alto', color: 'text-red-400', border: 'border-red-400' };
        return { label: 'Adequado', color: 'text-green-400', border: 'border-green-400' };
    }
    if (type === 'carbs') {
        if (percentage < 45) return { label: 'Baixo', color: 'text-blue-400', border: 'border-blue-400' }; // Low Carb
        if (percentage > 65) return { label: 'Alto', color: 'text-red-400', border: 'border-red-400' };
        return { label: 'Adequado', color: 'text-green-400', border: 'border-green-400' };
    }
    if (type === 'fats') {
        if (percentage < 20) return { label: 'Baixo', color: 'text-blue-400', border: 'border-blue-400' };
        if (percentage > 35) return { label: 'Alto', color: 'text-red-400', border: 'border-red-400' };
        return { label: 'Adequado', color: 'text-green-400', border: 'border-green-400' };
    }
    return { label: '', color: '', border: '' };
  };

  const activeCategoryItems = FoodDatabase.find(c => c.id === activeFoodCategory)?.items || [];
  const filteredFoodItems = foodSearch 
    ? FoodDatabase.flatMap(c => c.items).filter(i => i.name.toLowerCase().includes(foodSearch.toLowerCase()))
    : activeCategoryItems;

  if (!currentPatient) return null;

  const displayPlan = isEditing ? tempPlan : generatedPlan;

  const proteinPct = displayPlan ? getPercentage(displayPlan.macros?.protein || 0, 4, displayPlan.totalCalories || 0) : 0;
  const carbsPct = displayPlan ? getPercentage(displayPlan.macros?.carbs || 0, 4, displayPlan.totalCalories || 0) : 0;
  const fatsPct = displayPlan ? getPercentage(displayPlan.macros?.fats || 0, 9, displayPlan.totalCalories || 0) : 0;

  const proteinStatus = getMacroStatus('protein', proteinPct);
  const carbsStatus = getMacroStatus('carbs', carbsPct);
  const fatsStatus = getMacroStatus('fats', fatsPct);

  // Cálculo de IMC para exibição na tela
  const bmiInfo = calculateBMI(currentPatient.weight, currentPatient.height);

  return (
    <Layout title="IA Nutricional" showBack>
      {/* --- MODAL DE TEMPLATES --- */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950/50 rounded-t-2xl">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <LayoutTemplate size={20} className="text-primary" /> 
                Modelos de Planos Alimentares
              </h3>
              <button onClick={() => setShowTemplateModal(false)} className="text-gray-500 hover:text-white p-1">
                <X size={24} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              <p className="text-sm text-gray-400 mb-2">Selecione um modelo abaixo para carregar para <b>{currentPatient.name}</b>. Você poderá editá-lo depois.</p>
              
              {MealPlanTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleLoadTemplate(template)}
                  className="w-full flex items-start gap-4 p-4 bg-gray-800 hover:bg-gray-700 border border-transparent hover:border-primary/40 rounded-xl transition-all group text-left"
                >
                  <div className="bg-black/40 p-3 rounded-lg text-primary group-hover:scale-110 transition-transform">
                     <FileText size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                        <h4 className="font-bold text-white group-hover:text-primary transition-colors text-base">{template.name}</h4>
                        <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded border border-primary/20">{template.totalCalories} kcal</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 mb-2">{template.description}</p>
                    <div className="flex gap-2 text-[10px] text-gray-500 font-mono">
                       <span className="bg-black/30 px-2 py-0.5 rounded">PTN: {template.macros.protein}g</span>
                       <span className="bg-black/30 px-2 py-0.5 rounded">CHO: {template.macros.carbs}g</span>
                       <span className="bg-black/30 px-2 py-0.5 rounded">FAT: {template.macros.fats}g</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* --- MODAL DE SELEÇÃO DE ALIMENTOS --- */}
      {showFoodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
            <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-950/50 rounded-t-2xl">
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <BookOpen size={20} className="text-primary" /> 
                {itemIndexToReplace !== null ? 'Trocar Alimento' : 'Adicionar Alimento'}
              </h3>
              <button onClick={() => setShowFoodModal(false)} className="text-gray-500 hover:text-white p-1">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 text-gray-500" size={18} />
                <input 
                  autoFocus
                  placeholder="Buscar (ex: Arroz, Frango, Ovo)..."
                  value={foodSearch}
                  onChange={e => setFoodSearch(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded-xl py-3 pl-10 pr-4 text-white focus:border-primary focus:outline-none placeholder-gray-600"
                />
              </div>

              {!foodSearch && (
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {FoodDatabase.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveFoodCategory(cat.id)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-colors border ${
                        activeFoodCategory === cat.id 
                          ? 'bg-primary text-black border-primary' 
                          : 'bg-gray-800 text-gray-400 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto p-4 pt-0 space-y-2">
              {filteredFoodItems.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAddFromDatabase(item)}
                  className="w-full flex items-center justify-between p-3 bg-gray-800 hover:bg-gray-700 border border-transparent hover:border-primary/40 rounded-xl transition-all group text-left"
                >
                  <div className="flex-1">
                    <span className="font-bold text-gray-200 block group-hover:text-primary transition-colors text-sm">{item.name}</span>
                    <span className="text-xs text-gray-500 block mt-1">{item.qty}</span>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                     <span className="text-sm font-bold text-white bg-black/40 px-2 py-0.5 rounded border border-gray-700">{item.kcal} kcal</span>
                     <div className="flex gap-2 text-[10px] text-gray-400">
                        <span>P: {item.protein}</span>
                        <span>C: {item.carbs}</span>
                        <span>G: {item.fats}</span>
                     </div>
                  </div>
                </button>
              ))}
              {filteredFoodItems.length === 0 && (
                <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                   <Search size={32} className="opacity-20 mb-2" />
                   <p>Nenhum alimento encontrado.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* --- ESTADO INICIAL --- */}
      {!generatedPlan ? (
        <div className="flex flex-col h-full items-center justify-center py-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Gerar Plano Personalizado</h2>
            <p className="text-gray-400 max-w-xs mx-auto">
              A IA analisará os dados de <span className="text-primary font-bold">{currentPatient.name}</span> para criar uma dieta completa.
            </p>
          </div>

          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg border border-gray-800 shadow-xl">
            <div className="flex items-center gap-2 mb-6 text-primary border-b border-gray-800 pb-2">
              <Settings size={18} />
              <span className="font-bold uppercase text-xs tracking-wider">Configuração da Prescrição</span>
            </div>

            <div className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Objetivo do Plano</label>
                  <div className="relative">
                    <select 
                      value={targetGoal}
                      onChange={(e) => setTargetGoal(e.target.value)}
                      className="w-full bg-black border border-gray-700 text-white rounded-lg py-3 px-4 appearance-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer font-bold text-sm"
                    >
                      <optgroup label="Controle de Peso">
                        <option value="Perda de peso">Perda de Peso</option>
                        <option value="Ganho de peso">Hipertrofia</option>
                        <option value="Manutenção">Manutenção</option>
                      </optgroup>
                      <optgroup label="Clínico">
                        <option value="Diabetes">Diabetes</option>
                        <option value="Hipertensão">Hipertensão</option>
                        <option value="Dislipidemia">Colesterol</option>
                        <option value="Anti-inflamatória">Anti-inflamatória</option>
                      </optgroup>
                      <optgroup label="Esportivo">
                        <option value="Performance">Performance</option>
                        <option value="Definição">Definição (Cutting)</option>
                      </optgroup>
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-500 pointer-events-none" size={16} />
                  </div>
                </div>

                <div>
                   <label className="block text-gray-500 text-xs uppercase font-bold mb-2">
                     Meta Calórica (Kcal)
                     <span className="text-primary ml-1 text-[10px] lowercase font-normal">(opcional)</span>
                   </label>
                   <input
                      type="number"
                      placeholder="Ex: 1800"
                      value={customCalories}
                      onChange={(e) => setCustomCalories(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary text-sm font-bold placeholder-gray-600"
                   />
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/20 text-red-400 p-3 rounded-lg flex items-center gap-2 text-sm max-w-lg w-full">
              <AlertTriangle size={16} />
              {error}
            </div>
          )}

          <div className="flex flex-col gap-3 w-full max-w-lg">
            <Button onClick={handleGenerate} disabled={loading} className="relative overflow-hidden">
                {loading ? (
                <span className="flex items-center gap-2 animate-pulse">
                    <Sparkles size={20} className="animate-spin" /> Calculando...
                </span>
                ) : (
                <span className="flex items-center gap-2">
                    <Sparkles size={20} /> 
                    {customCalories ? `Gerar Dieta de ${customCalories} kcal` : `Gerar Plano para ${targetGoal}`}
                </span>
                )}
            </Button>
            
            <button 
                onClick={() => setShowTemplateModal(true)}
                className="w-full py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-300 font-bold hover:text-white hover:bg-gray-700 transition-all flex items-center justify-center gap-2 text-sm"
            >
                <LayoutTemplate size={18} /> Carregar Modelo Pronto
            </button>
          </div>
        </div>
      ) : (
        /* --- VISUALIZAÇÃO DO PLANO --- */
        <div className="space-y-6 pb-10 animate-fade-in">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2 bg-gray-900/50 p-4 rounded-xl border border-gray-800">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Plano Alimentar 
                {isEditing && <span className="bg-primary text-black text-[10px] px-2 py-0.5 rounded uppercase font-bold tracking-wider">Modo Edição</span>}
              </h2>
              <div className="flex flex-wrap items-center gap-4 mt-2">
                 <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-gray-400">Objetivo:</span>
                    <span className="text-sm text-primary font-bold">{targetGoal}</span>
                 </div>
                 {bmiInfo.value > 0 && (
                     <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-gray-400">IMC:</span>
                        <span className={`text-xs px-2 py-0.5 rounded border font-bold ${bmiInfo.color}`}>
                            {bmiInfo.value} - {bmiInfo.label}
                        </span>
                     </div>
                 )}
              </div>
            </div>
            
            <div className="flex gap-2">
               {!isEditing ? (
                   <>
                     <button 
                        onClick={() => setIsEditing(true)} 
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg hover:bg-gray-700 transition-all font-bold text-xs"
                      >
                        <Edit2 size={16} />
                        <span>Editar Plano</span>
                      </button>
                      <button 
                        onClick={handleExportPDF} 
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-opacity-90 transition-all font-bold text-xs shadow-lg shadow-primary/20"
                        title="Exportar PDF"
                      >
                        <FileText size={16} />
                        <span>Exportar PDF</span>
                      </button>
                   </>
               ) : (
                   <>
                     <button 
                        onClick={handleCancelEdits} 
                        className="flex items-center gap-2 px-4 py-2 bg-red-900/30 border border-red-900 text-red-400 rounded-lg hover:bg-red-900/50 transition-all font-bold text-xs"
                      >
                        <X size={16} />
                        <span>Cancelar</span>
                      </button>
                      <button 
                        onClick={handleSaveEdits} 
                        className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-lg hover:bg-opacity-90 transition-all font-bold text-xs shadow-lg shadow-primary/20"
                      >
                        <Save size={16} />
                        <span>Salvar Alterações</span>
                      </button>
                   </>
               )}
            </div>
          </div>

          <div className={`bg-gray-900 border rounded-xl p-6 relative overflow-hidden transition-colors duration-300 ${isEditing ? 'border-primary/50 bg-gray-900/80' : 'border-gray-800'}`}>
              {isEditing && (
                <div className="absolute top-0 right-0 p-3">
                    <span className="bg-primary/20 text-primary text-[10px] px-2 py-1 rounded border border-primary/30 flex items-center gap-1 font-bold animate-pulse">
                        <Calculator size={12} /> Cálculo Automático Ativo
                    </span>
                </div>
              )}

              <div className="flex items-center gap-3 mb-6">
                <PieChart className="text-primary" size={20} />
                <h3 className="font-bold text-white">Distribuição Nutricional {isEditing && "(Recalculando...)"}</h3>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 bg-black/50 rounded-xl p-4 flex flex-col items-center justify-center border border-gray-800 transition-all duration-300 relative group">
                      <span className="text-xs text-gray-500 uppercase font-bold mb-1">Total Diário</span>
                      <span className={`text-4xl font-bold ${isEditing ? 'text-primary' : 'text-white'}`}>{displayPlan?.totalCalories}</span>
                      <span className="text-xs text-primary font-bold">Kcal</span>
                  </div>

                  <div className="flex-[2] grid grid-cols-3 gap-3">
                      <div className="bg-red-900/10 border border-red-900/30 rounded-xl p-3 flex flex-col items-center justify-center relative">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] text-red-400 uppercase font-bold">Proteínas</span>
                             {proteinPct > 0 && <span className={`text-[8px] font-bold ${proteinStatus.color} border ${proteinStatus.border} px-1 rounded`}>{proteinStatus.label}</span>}
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-xl font-bold text-white">
                                  {proteinPct}%
                              </span>
                              <span className="text-[9px] text-red-300/70">({displayPlan?.macros?.protein || 0}g)</span>
                          </div>
                      </div>
                      <div className="bg-blue-900/10 border border-blue-900/30 rounded-xl p-3 flex flex-col items-center justify-center relative">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] text-blue-400 uppercase font-bold">Carboidratos</span>
                             {carbsPct > 0 && <span className={`text-[8px] font-bold ${carbsStatus.color} border ${carbsStatus.border} px-1 rounded`}>{carbsStatus.label}</span>}
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-xl font-bold text-white">
                                  {carbsPct}%
                              </span>
                              <span className="text-[9px] text-blue-300/70">({displayPlan?.macros?.carbs || 0}g)</span>
                          </div>
                      </div>
                      <div className="bg-yellow-900/10 border border-yellow-900/30 rounded-xl p-3 flex flex-col items-center justify-center relative">
                          <div className="flex items-center gap-2 mb-1">
                             <span className="text-[10px] text-yellow-400 uppercase font-bold">Lipídios</span>
                             {fatsPct > 0 && <span className={`text-[8px] font-bold ${fatsStatus.color} border ${fatsStatus.border} px-1 rounded`}>{fatsStatus.label}</span>}
                          </div>
                          <div className="flex flex-col items-center">
                              <span className="text-xl font-bold text-white">
                                  {fatsPct}%
                              </span>
                              <span className="text-[9px] text-yellow-300/70">({displayPlan?.macros?.fats || 0}g)</span>
                          </div>
                      </div>
                  </div>
              </div>
          </div>

          <div className="space-y-4">
            {displayPlan?.meals.map((meal, mealIndex) => (
              <div key={meal.id} className={`bg-gray-900 border rounded-xl overflow-hidden transition-all ${isEditing ? 'border-primary/40 bg-gray-900/80 shadow-lg shadow-black/50' : 'border-gray-800'}`}>
                <div 
                  className={`p-4 flex items-center justify-between cursor-pointer transition-colors ${isEditing ? 'bg-gray-800/50' : 'hover:bg-gray-800'}`}
                  onClick={() => !isEditing && setExpandedMeal(expandedMeal === meal.id ? null : meal.id)}
                >
                  {isEditing ? (
                    <div className="flex items-center gap-3 flex-1 flex-wrap">
                      <div className="bg-primary/20 p-2 rounded-lg text-primary shrink-0"><Clock size={18} /></div>
                      <div className="flex flex-1 gap-2 min-w-[200px]">
                          <input
                            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white font-bold focus:border-primary focus:outline-none min-w-0"
                            value={meal.name}
                            onChange={(e) => handleUpdateMealName(mealIndex, e.target.value)}
                            placeholder="Nome da refeição"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <input
                            type="time"
                            className="w-24 bg-gray-800 border border-gray-700 rounded-lg px-2 py-2 text-white font-mono text-center focus:border-primary focus:outline-none"
                            value={meal.time || ''}
                            onChange={(e) => handleUpdateMealTime(mealIndex, e.target.value)}
                            onClick={(e) => e.stopPropagation()}
                          />
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleRemoveMeal(mealIndex); }}
                        className="p-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 hover:text-white transition-colors shrink-0"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                       <div className="bg-gray-800 text-primary p-2 rounded-lg">
                          <Clock size={18} />
                       </div>
                       <div>
                           <h3 className="font-bold text-white text-lg leading-none">{meal.name}</h3>
                           {meal.time && (
                               <span className="text-xs text-gray-500 font-mono bg-gray-950 px-1.5 py-0.5 rounded mt-1 inline-block border border-gray-800">
                                   {meal.time}
                               </span>
                           )}
                       </div>
                    </div>
                  )}
                  
                  {!isEditing && (
                      expandedMeal === meal.id ? <ChevronUp size={20} className="text-primary" /> : <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
                
                {(expandedMeal === meal.id || isEditing) && (
                  <div className="p-4 pt-0 border-t border-gray-800 bg-gray-950/30">
                    <ul className="space-y-4 mt-4">
                      {meal.items.map((item, itemIndex) => {
                        const dbItem = findFoodByName(item.name);
                        const smartMeasures = dbItem ? getSmartMeasures(dbItem) : [];
                        
                        return (
                        <li key={itemIndex} className={`flex flex-col gap-2 ${isEditing ? 'bg-black/40 p-3 rounded-xl border border-gray-800' : 'pl-2 border-l-2 border-gray-800'}`}>
                          {isEditing ? (
                              <div className="space-y-3">
                                  <div className="flex flex-col md:flex-row gap-2">
                                     <div className="flex-[3]">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Alimento</label>
                                        <div className="flex gap-2">
                                           <input 
                                              className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-sm focus:border-primary focus:outline-none"
                                              value={item.name}
                                              onChange={(e) => handleUpdateItem(mealIndex, itemIndex, 'name', e.target.value)}
                                          />
                                          <button 
                                            onClick={() => openFoodDatabaseModal(mealIndex, itemIndex)}
                                            className="bg-primary/10 text-primary p-2 rounded-lg border border-primary/30 hover:bg-primary/20"
                                            title="Trocar por item da tabela"
                                          >
                                              <RefreshCw size={18} />
                                          </button>
                                        </div>
                                     </div>
                                     <div className="flex-1 min-w-[140px]">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1 flex items-center gap-1">
                                          Qtd / Medida <Scale size={10} />
                                        </label>
                                        {smartMeasures.length > 0 ? (
                                            <div className="relative">
                                                <select 
                                                    className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-sm font-bold focus:border-primary focus:outline-none appearance-none pr-8"
                                                    onChange={(e) => handleMeasureChange(mealIndex, itemIndex, e.target.value, item.name)}
                                                    defaultValue=""
                                                >
                                                    <option value="" disabled>{item.quantity}</option>
                                                    {smartMeasures.map((m, idx) => (
                                                        <option key={idx} value={m.amount}>
                                                            {m.label}
                                                        </option>
                                                    ))}
                                                </select>
                                                <ChevronDown size={14} className="absolute right-2 top-3 text-gray-500 pointer-events-none" />
                                            </div>
                                        ) : (
                                            <input 
                                                className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-white text-sm font-bold text-center"
                                                value={item.quantity}
                                                onChange={(e) => handleUpdateItem(mealIndex, itemIndex, 'quantity', e.target.value)}
                                            />
                                        )}
                                     </div>
                                     <div className="w-20">
                                         <label className="text-[10px] text-primary uppercase font-bold block mb-1">Kcal</label>
                                         <input 
                                            type="number"
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-primary text-sm font-bold text-center"
                                            value={item.calories || 0}
                                            disabled // Calculado automaticamente
                                        />
                                     </div>
                                  </div>
                                  
                                  <div className="flex items-center gap-2">
                                     <div className="flex-1">
                                        <label className="text-[10px] text-gray-500 uppercase font-bold block mb-1">Opções de Substituição (Auto-calculado)</label>
                                        <input 
                                            className="w-full bg-gray-900 border border-gray-700 rounded-lg p-2 text-gray-400 text-xs italic focus:border-primary focus:outline-none"
                                            value={item.substitutions?.join(', ')}
                                            onChange={(e) => handleUpdateItem(mealIndex, itemIndex, 'substitutions', e.target.value)}
                                        />
                                     </div>
                                     <button 
                                        onClick={() => handleRemoveItem(mealIndex, itemIndex)}
                                        className="mt-5 p-2 bg-red-900/20 text-red-400 rounded-lg hover:bg-red-900/40 hover:text-white transition-colors"
                                      >
                                          <Trash2 size={16} />
                                      </button>
                                  </div>
                              </div>
                          ) : (
                              <>
                                <div className="flex justify-between text-sm items-start">
                                    <span className="text-gray-200 font-medium leading-tight">{item.name}</span>
                                    <div className="flex items-center gap-3 shrink-0 ml-2">
                                        {item.calories && <span className="text-[10px] text-gray-500 font-mono">{item.calories} kcal</span>}
                                        <span className="text-black bg-primary font-bold px-2 py-0.5 rounded text-xs shadow-sm">{item.quantity}</span>
                                    </div>
                                </div>
                                {item.substitutions && item.substitutions.length > 0 && (
                                    <p className="text-xs text-gray-500 italic mt-1">
                                      <span className="font-bold text-gray-600">Ou:</span> {item.substitutions.join(', ')}
                                    </p>
                                )}
                              </>
                          )}
                        </li>
                      );
                      })}
                    </ul>
                    
                    {isEditing && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-gray-800">
                            <button 
                                onClick={() => openFoodDatabaseModal(mealIndex)}
                                className="flex-1 py-3 bg-primary/10 border border-primary/40 rounded-xl text-primary text-sm font-bold hover:bg-primary/20 flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <BookOpen size={16} /> + Adicionar da Tabela
                            </button>
                            <button 
                                onClick={() => handleAddItemManual(mealIndex)}
                                className="flex-1 py-3 bg-gray-800 border border-gray-700 rounded-xl text-gray-400 text-sm font-bold hover:text-white hover:bg-gray-700 flex items-center justify-center gap-2 transition-all active:scale-95"
                            >
                                <Plus size={16} /> + Manual
                            </button>
                        </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <button
              onClick={handleAddMeal}
              className="w-full py-4 border-2 border-dashed border-gray-800 rounded-xl text-gray-500 hover:text-primary hover:border-primary hover:bg-gray-800/50 transition-all flex items-center justify-center gap-2 font-bold"
            >
              <Plus size={20} /> Adicionar Nova Refeição
            </button>
          )}

          <div className="bg-gray-800/50 p-6 rounded-xl border border-dashed border-gray-700">
            <h4 className="text-primary text-sm font-bold uppercase mb-3 flex items-center gap-2">
                <FileText size={16} /> Orientações Gerais
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line bg-black/20 p-4 rounded-lg border border-gray-800">
                {displayPlan?.generalAdvice}
            </p>
          </div>

          {!isEditing && (
            <div className="pt-4 flex justify-center">
                <Button variant="outline" onClick={() => setGeneratedPlan(null)} className="!w-auto px-8 border-dashed opacity-50 hover:opacity-100">
                    Gerar Novo Plano do Zero
                </Button>
            </div>
          )}
        </div>
      )}
    </Layout>
  );
};

export default AIMealPlan;
