export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; 
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
  waist: number;
  abdomen?: number;
  hip: number;
  armRight?: number;
  thighRight?: number;
  calfRight?: number;
  triceps?: number;
  subscapular?: number;
  suprailiac?: number;
  abdominal?: number;
  bodyFat?: number;
  visceralFat?: number;
  skeletalMuscle?: number;
  bodyAge?: number;
  restingMetabolism?: number;
  fatMass?: number;
  leanMass?: number;
}

export interface Anamnesis {
  patientId: string;
  updatedAt: string;
  pathologies: string;
  medications: string;
  familyHistory: string;
  surgeries: string;
  allergies: string;
  sleepQuality: string;
  stressLevel: string;
  physicalActivityDetails: string;
  smoking: string;
  alcohol: string;
  intestinalFunction: string;
  stoolConsistency: string;
  digestiveSymptoms: string;
  waterIntake: string;
  appetite: string;
  chewing: string;
  intolerances: string;
  preferences: string;
  metabolicTracking: string;
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
  BIOIMPEDANCE = '/bioimpedance',
  MEAL_PLAN_AI = '/meal-plan-ai',
  SUBSTITUTIONS = '/substitutions',
  PROTOCOLS = '/protocols',
  GUIDELINES = '/guidelines',
  CERTIFICATES = '/certificates',
  LAB_ANALYSIS = '/lab-analysis',
  SETTINGS = '/settings',
  PATIENT_AREA = '/patient-area',
  FORM_MANAGER = '/forms'
}