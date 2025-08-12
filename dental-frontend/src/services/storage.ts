import { AppUser, Appointment } from '../types';

const KEYS = {
  user: 'dc_user',
  users: 'dc_users',
  appointments: 'dc_appointments',
};

export const saveUser = (user: AppUser | null) => {
  if (user) localStorage.setItem(KEYS.user, JSON.stringify(user));
  else localStorage.removeItem(KEYS.user);
};

export const getUser = (): AppUser | null => {
  const v = localStorage.getItem(KEYS.user);
  return v ? (JSON.parse(v) as AppUser) : null;
};

export const registerUser = (user: AppUser) => {
  const list = getUsers();
  list.push(user);
  localStorage.setItem(KEYS.users, JSON.stringify(list));
};

export const getUsers = (): AppUser[] => {
  const v = localStorage.getItem(KEYS.users);
  return v ? (JSON.parse(v) as AppUser[]) : [];
};

export const saveAppointment = (a: Appointment) => {
  const list = getAppointments();
  list.push(a);
  localStorage.setItem(KEYS.appointments, JSON.stringify(list));
};

export const getAppointments = (): Appointment[] => {
  const v = localStorage.getItem(KEYS.appointments);
  return v ? (JSON.parse(v) as Appointment[]) : [];
};

export const updateAppointment = (id: string, patch: Partial<Appointment>) => {
  const list = getAppointments().map((x) => (x.id === id ? { ...x, ...patch } : x));
  localStorage.setItem(KEYS.appointments, JSON.stringify(list));
};


