
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, FileText, Settings, PieChart, Edit2, Save, X, Plus, Trash2, Search, BookOpen, Clock, Calculator, RefreshCw, Scale, LayoutTemplate, PenTool } from 'lucide-react';
import { jsPDF } from "jspdf";
import Layout from '../components/Layout';
import { useApp } from '../context/AppContext';
import { generateMealPlanWithAI } from '../services/aiNutrition';
import { Button, Input } from '../components/UI';
import { MealPlan, MealItem } from '../types';
import { StorageService } from '../services/storage';
import { FoodDatabase, findFoodByName, getSmartMeasures, calculateCaloriesForMeasure, calculateSmartSubstitutions } from '../data/foodDatabase';
import { MealPlanTemplates, MealPlanTemplate } from '../data/mealPlanTemplates';

const AIMealPlan: React.FC = () => {
  const { currentPatient } = useApp();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<MealPlan | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempPlan, setTempPlan] = useState<MealPlan | null>(null);
  const [targetGoal, setTargetGoal] = useState('Manutenção');
  const [customCalories, setCustomCalories] = useState('');

  useEffect(() => {
    if (currentPatient) {
      setTargetGoal(currentPatient.goal || 'Manutenção');
      const savedPlans = StorageService.getMealPlans(currentPatient.id);
      if (savedPlans.length > 0) setGeneratedPlan(savedPlans[savedPlans.length - 1]);
    }
  }, [currentPatient]);

  const handleGenerate = async () => {
    if (!currentPatient) return;
    setLoading(true);
    const plan = await generateMealPlanWithAI({ ...currentPatient, goal: targetGoal, customCalories: Number(customCalories) });
    if (plan) {
        setGeneratedPlan(plan);
        StorageService.saveMealPlan(plan);
    }
    setLoading(false);
  };

  const handleSaveEdits = () => {
      if (tempPlan) {
          setGeneratedPlan(tempPlan);
          StorageService.saveMealPlan(tempPlan);
          setIsEditing(false);
      }
  };

  if (!currentPatient) return null;

  return (
    <Layout title="IA Nutricional" showBack>
      {!generatedPlan ? (
        <div className="flex flex-col items-center justify-center py-10 space-y-6">
          <div className="bg-gray-900 p-6 rounded-xl w-full max-w-lg border border-gray-800">
            <Input label="Meta Calórica (Opcional)" type="number" value={customCalories} onChange={e => setCustomCalories(e.target.value)} />
            <Button onClick={handleGenerate} disabled={loading}><Sparkles /> {loading ? 'Gerando...' : 'Gerar Plano com IA'}</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center bg-gray-900 p-4 rounded-xl">
            <h2 className="text-xl font-bold text-white">Plano Alimentar</h2>
            <div className="flex gap-2">
                {!isEditing ? <Button onClick={() => { setIsEditing(true); setTempPlan(generatedPlan); }}><Edit2 size={16} /> Editar</Button> : <Button onClick={handleSaveEdits}><Save size={16} /> Salvar</Button>}
            </div>
          </div>
          <div className="space-y-4">
            {(isEditing ? tempPlan : generatedPlan)?.meals.map((meal, idx) => (
                <div key={idx} className="bg-gray-900 p-4 rounded-xl border border-gray-800">
                    <h3 className="font-bold text-white mb-2">{meal.name} - {meal.time}</h3>
                    <ul className="space-y-2">
                        {meal.items.map((item, i) => (
                            <li key={i} className="text-gray-300 text-sm flex justify-between">
                                <span>{item.name}</span>
                                <span>{item.quantity} ({item.calories} kcal)</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default AIMealPlan;
