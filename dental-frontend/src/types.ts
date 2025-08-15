export type UserRole = 'admin' | 'patient' | 'doctor';

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patient?: AppUser; // Populated by backend
  service: string;
  appointmentDate: string; // ISO date
  appointmentTime: string; // e.g., '09:00'
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  symptoms?: string;
  doctorAssigned?: string;
  estimatedCost?: number;
  durationMinutes?: number;
  createdAt: string;
  updatedAt: string;
}


