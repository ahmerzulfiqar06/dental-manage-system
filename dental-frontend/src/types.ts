export type UserRole = 'admin' | 'patient';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface Appointment {
  id: string;
  userId?: string; // undefined for guest booking
  service: string;
  date: string; // ISO date
  time: string; // e.g., '09:00 AM'
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
}


