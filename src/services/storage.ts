
import { Patient, MealPlan, AnthropometryRecord, Anamnesis, Appointment, User, PatientPhoto } from '../types';

const KEYS = {
  PATIENTS: 'nutrifabio_patients',
  MEAL_PLANS: 'nutrifabio_meal_plans',
  ANTHRO: 'nutrifabio_anthro',
  ANAMNESIS: 'nutrifabio_anamnesis',
  AGENDA: 'nutrifabio_agenda',
  SESSION: 'nutri_session',
  PROFESSIONAL_SETTINGS: 'nutri_professional_settings',
  PHOTOS: 'nutrifabio_photos'
};

const safeParse = <T>(key: string, fallback: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
};

export const StorageService = {
  getPatients: (): Patient[] => safeParse<Patient[]>(KEYS.PATIENTS, []),

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
    const allPlans: MealPlan[] = safeParse(KEYS.MEAL_PLANS, []);
    return allPlans.filter(p => p.patientId === patientId);
  },

  saveMealPlan: (plan: MealPlan) => {
    const plans: MealPlan[] = safeParse(KEYS.MEAL_PLANS, []);
    const index = plans.findIndex(p => p.id === plan.id);
    if (index >= 0) {
        plans[index] = plan;
    } else {
        plans.push(plan);
    }
    localStorage.setItem(KEYS.MEAL_PLANS, JSON.stringify(plans));
  },

  deleteMealPlan: (planId: string) => {
    const plans: MealPlan[] = safeParse(KEYS.MEAL_PLANS, []);
    const filtered = plans.filter(p => p.id !== planId);
    localStorage.setItem(KEYS.MEAL_PLANS, JSON.stringify(filtered));
  },

  getAnthropometry: (patientId: string): AnthropometryRecord[] => {
     const all: Record<string, AnthropometryRecord[]> = safeParse(KEYS.ANTHRO, {});
     return all[patientId] || [];
  },

  saveAnthropometry: (patientId: string, record: AnthropometryRecord) => {
    const all: Record<string, AnthropometryRecord[]> = safeParse(KEYS.ANTHRO, {});
    if (!all[patientId]) all[patientId] = [];
    if (record.id) {
        const index = all[patientId].findIndex(r => r.id === record.id);
        if (index >= 0) { all[patientId][index] = record; } else { all[patientId].push(record); }
    } else {
        record.id = Date.now().toString();
        all[patientId].push(record);
    }
    localStorage.setItem(KEYS.ANTHRO, JSON.stringify(all));
  },

  deleteAnthropometry: (patientId: string, recordId: string) => {
    const all: Record<string, AnthropometryRecord[]> = safeParse(KEYS.ANTHRO, {});
    if (all[patientId]) {
        all[patientId] = all[patientId].filter(r => r.id !== recordId);
        localStorage.setItem(KEYS.ANTHRO, JSON.stringify(all));
    }
  },

  getAnamnesis: (patientId: string): Anamnesis | null => {
    const all: Record<string, Anamnesis> = safeParse(KEYS.ANAMNESIS, {});
    return all[patientId] || null;
  },

  saveAnamnesis: (anamnesis: Anamnesis) => {
    const all: Record<string, Anamnesis> = safeParse(KEYS.ANAMNESIS, {});
    all[anamnesis.patientId] = anamnesis;
    localStorage.setItem(KEYS.ANAMNESIS, JSON.stringify(all));
  },

  getAppointments: (): Appointment[] => {
    return safeParse<Appointment[]>(KEYS.AGENDA, []);
  },

  saveAppointment: (appointment: Appointment) => {
    const appointments = StorageService.getAppointments();
    const index = appointments.findIndex(a => a.id === appointment.id);
    if (index >= 0) { appointments[index] = appointment; } else { appointments.push(appointment); }
    localStorage.setItem(KEYS.AGENDA, JSON.stringify(appointments));
  },

  deleteAppointment: (id: string) => {
    const appointments = StorageService.getAppointments();
    const filtered = appointments.filter(a => a.id !== id);
    localStorage.setItem(KEYS.AGENDA, JSON.stringify(filtered));
  },

  getPatientPhotos: (patientId: string): PatientPhoto[] => {
    const all: Record<string, PatientPhoto[]> = safeParse(KEYS.PHOTOS, {});
    return all[patientId] || [];
  },

  savePatientPhoto: (photo: PatientPhoto) => {
    try {
        const all: Record<string, PatientPhoto[]> = safeParse(KEYS.PHOTOS, {});
        if (!all[photo.patientId]) all[photo.patientId] = [];
        all[photo.patientId].push(photo);
        localStorage.setItem(KEYS.PHOTOS, JSON.stringify(all));
        return true;
    } catch (e) {
        return false;
    }
  },

  deletePatientPhoto: (patientId: string, photoId: string) => {
    const all: Record<string, PatientPhoto[]> = safeParse(KEYS.PHOTOS, {});
    if (all[patientId]) {
      all[patientId] = all[patientId].filter(p => p.id !== photoId);
      localStorage.setItem(KEYS.PHOTOS, JSON.stringify(all));
    }
  },

  getProfessionalSettings: (): Partial<User> | null => {
    return safeParse<Partial<User> | null>(KEYS.PROFESSIONAL_SETTINGS, null);
  },

  saveProfessionalSettings: (settings: Partial<User>) => {
    localStorage.setItem(KEYS.PROFESSIONAL_SETTINGS, JSON.stringify(settings));
    const session = localStorage.getItem(KEYS.SESSION);
    if (session) {
        const user = JSON.parse(session);
        const updatedUser = { ...user, ...settings };
        localStorage.setItem(KEYS.SESSION, JSON.stringify(updatedUser));
    }
  },

  exportAllData: () => {
    const data = {
      patients: localStorage.getItem(KEYS.PATIENTS),
      mealPlans: localStorage.getItem(KEYS.MEAL_PLANS),
      anthro: localStorage.getItem(KEYS.ANTHRO),
      anamnesis: localStorage.getItem(KEYS.ANAMNESIS),
      agenda: localStorage.getItem(KEYS.AGENDA),
      settings: localStorage.getItem(KEYS.PROFESSIONAL_SETTINGS),
      photos: localStorage.getItem(KEYS.PHOTOS),
      timestamp: new Date().toISOString()
    };
    return JSON.stringify(data);
  },

  importData: (jsonString: string) => {
    try {
      const data = JSON.parse(jsonString);
      if (data.patients) localStorage.setItem(KEYS.PATIENTS, data.patients);
      if (data.mealPlans) localStorage.setItem(KEYS.MEAL_PLANS, data.mealPlans);
      if (data.anthro) localStorage.setItem(KEYS.ANTHRO, data.anthro);
      if (data.anamnesis) localStorage.setItem(KEYS.ANAMNESIS, data.anamnesis);
      if (data.agenda) localStorage.setItem(KEYS.AGENDA, data.agenda);
      if (data.settings) localStorage.setItem(KEYS.PROFESSIONAL_SETTINGS, data.settings);
      if (data.photos) localStorage.setItem(KEYS.PHOTOS, data.photos);
      return true;
    } catch (e) {
      return false;
    }
  }
};
