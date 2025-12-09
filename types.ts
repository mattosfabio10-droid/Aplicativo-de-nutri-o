
export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Opcional na interface publica, usado internamente
  crn: string;
  role: 'admin' | 'nutritionist';
}

export interface Patient {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  occupation?: string;
  age: number;
  weight: number;
  height: number;
  waist?: number;
  goal: string; 
  gender: 'male' | 'female';
  activityLevel: 'sedentary' | 'moderate' | 'active';
  history: string;
  preferences: string;
}

export interface Appointment {
  id: string;
  patientId?: string;
  patientName: string;
  date: string;
  time: string;
  type: 'Primeira Consulta' | 'Retorno' | 'Bioimpedância' | 'Online';
  status: 'scheduled' | 'confirmed' | 'completed' | 'canceled';
  notes?: string;
}

export interface MealItem {
  name: string;
  quantity: string;
  calories?: number;
  substitutions?: string[];
}

export interface Meal {
  id: string;
  name: string; 
  time?: string;
  items: MealItem[];
  notes?: string;
}

export interface Macros {
  protein: number;
  carbs: number;
  fats: number;
}

export interface MealPlan {
  id: string;
  patientId: string;
  createdAt: string;
  totalCalories: number;
  macros: Macros;
  meals: Meal[];
  shoppingList: string[];
  generalAdvice: string;
}

export interface AnthropometryRecord {
  id?: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  
  // Circumferences (cm)
  waist: number;
  abdomen?: number;
  hip: number;
  armRight?: number;
  thighRight?: number;
  calfRight?: number;

  // Skinfolds (mm)
  triceps?: number;
  subscapular?: number;
  suprailiac?: number;
  abdominal?: number;

  // Results & Bioimpedance (Omron HBF-514C Fields)
  bodyFat?: number; // % Gordura Corporal
  visceralFat?: number; // Nível de Gordura Visceral
  skeletalMuscle?: number; // % Músculo Esquelético
  bodyAge?: number; // Idade Corporal
  restingMetabolism?: number; // Metabolismo Basal (kcal)
  
  fatMass?: number; // kg
  leanMass?: number; // kg
}

export interface Anamnesis {
  patientId: string;
  updatedAt: string;
  
  // Clínico Geral
  pathologies: string;
  medications: string;
  familyHistory: string;
  surgeries: string; // Novo
  allergies: string; // Novo
  
  // Estilo de Vida
  sleepQuality: string;
  stressLevel: string;
  physicalActivityDetails: string;
  smoking: string; // Novo
  alcohol: string; // Novo
  
  // Saúde Intestinal (Novo Detalhamento)
  intestinalFunction: string; // Frequência
  stoolConsistency: string; // Bristol
  digestiveSymptoms: string; // JSON string de array (Gases, Azia, etc)
  
  // Alimentar
  waterIntake: string;
  appetite: string;
  chewing: string;
  intolerances: string; // Novo
  preferences: string; // Novo (Aversões/Preferências)
  
  // Rastreamento Metabólico (Sinais e Sintomas) - Novo
  metabolicTracking: string; // JSON string contendo sintomas marcados (Cansaço, Queda de Cabelo, etc)
  
  notes: string;
}

export interface FormTemplate {
  id: string;
  title: string;
  description: string;
  responseCount: number;
  createdAt: string;
}

export enum AppRoutes {
  LOGIN = '/',
  DASHBOARD = '/dashboard',
  PATIENTS = '/patients',
  PATIENT_NEW = '/patients/new',
  PATIENT_DETAILS = '/patients/:id',
  AGENDA = '/agenda',
  ANAMNESIS = '/anamnesis',
  ANTHROPOMETRY = '/anthropometry',
  BIOIMPEDANCE = '/bioimpedance', // Nova Rota
  MEAL_PLAN_AI = '/meal-plan-ai',
  SUBSTITUTIONS = '/substitutions',
  PROTOCOLS = '/protocols',
  GUIDELINES = '/guidelines',
  CERTIFICATES = '/certificates',
  LAB_ANALYSIS = '/lab-analysis',
  CALCULATORS = '/calculators',
  SETTINGS = '/settings',
  PATIENT_AREA = '/patient-area',
  FORM_MANAGER = '/forms'
}