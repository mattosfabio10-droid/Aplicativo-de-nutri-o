
import { Patient, MealPlan, AnthropometryRecord, Anamnesis, Appointment } from '../types';

const KEYS = {
  PATIENTS: 'nutrifabio_patients',
  MEAL_PLANS: 'nutrifabio_meal_plans',
  ANTHRO: 'nutrifabio_anthro',
  ANAMNESIS: 'nutrifabio_anamnesis',
  AGENDA: 'nutrifabio_agenda'
};

export const StorageService = {
  getPatients: (): Patient[] => {
    const data = localStorage.getItem(KEYS.PATIENTS);
    return data ? JSON.parse(data) : [];
  },

  savePatient: (patient: Patient) => {
    const patients = StorageService.getPatients();
    const existingIndex = patients.findIndex(p => p.id === patient.id);
    if (existingIndex >= 0) {
      patients[existingIndex] = patient;
    } else {
      patients.push(patient);
    }
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(patients));
  },

  deletePatient: (id: string) => {
    const patients = StorageService.getPatients();
    const filtered = patients.filter(p => p.id !== id);
    localStorage.setItem(KEYS.PATIENTS, JSON.stringify(filtered));
  },

  getMealPlans: (patientId: string): MealPlan[] => {
    const allPlans: MealPlan[] = JSON.parse(localStorage.getItem(KEYS.MEAL_PLANS) || '[]');
    return allPlans.filter(p => p.patientId === patientId);
  },

  saveMealPlan: (plan: MealPlan) => {
    const plans: MealPlan[] = JSON.parse(localStorage.getItem(KEYS.MEAL_PLANS) || '[]');
    plans.push(plan);
    localStorage.setItem(KEYS.MEAL_PLANS, JSON.stringify(plans));
  },

  getAnthropometry: (patientId: string): AnthropometryRecord[] => {
     const all: Record<string, AnthropometryRecord[]> = JSON.parse(localStorage.getItem(KEYS.ANTHRO) || '{}');
     return all[patientId] || [];
  },

  saveAnthropometry: (patientId: string, record: AnthropometryRecord) => {
    const all: Record<string, AnthropometryRecord[]> = JSON.parse(localStorage.getItem(KEYS.ANTHRO) || '{}');
    if (!all[patientId]) all[patientId] = [];
    
    if (record.id) {
        const index = all[patientId].findIndex(r => r.id === record.id);
        if (index >= 0) {
            all[patientId][index] = record;
        } else {
            all[patientId].push(record);
        }
    } else {
        record.id = Date.now().toString();
        all[patientId].push(record);
    }
    
    localStorage.setItem(KEYS.ANTHRO, JSON.stringify(all));
  },

  getAnamnesis: (patientId: string): Anamnesis | null => {
    const all: Record<string, Anamnesis> = JSON.parse(localStorage.getItem(KEYS.ANAMNESIS) || '{}');
    return all[patientId] || null;
  },

  saveAnamnesis: (anamnesis: Anamnesis) => {
    const all: Record<string, Anamnesis> = JSON.parse(localStorage.getItem(KEYS.ANAMNESIS) || '{}');
    all[anamnesis.patientId] = anamnesis;
    localStorage.setItem(KEYS.ANAMNESIS, JSON.stringify(all));
  },

  getAppointments: (): Appointment[] => {
    const data = localStorage.getItem(KEYS.AGENDA);
    return data ? JSON.parse(data) : [];
  },

  saveAppointment: (appointment: Appointment) => {
    const appointments = StorageService.getAppointments();
    const index = appointments.findIndex(a => a.id === appointment.id);
    if (index >= 0) {
      appointments[index] = appointment;
    } else {
      appointments.push(appointment);
    }
    localStorage.setItem(KEYS.AGENDA, JSON.stringify(appointments));
  },

  deleteAppointment: (id: string) => {
    const appointments = StorageService.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    localStorage.setItem(KEYS.AGENDA, JSON.stringify(filtered));
  }
};
