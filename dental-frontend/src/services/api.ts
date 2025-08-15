import axios from 'axios';
import { AppUser, Appointment } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Response Types
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

interface AuthResponse {
  user: AppUser;
  token: string;
}

// Authentication API
export const authApi = {
  async register(userData: {
    name: string;
    email: string;
    password: string;
    role?: string;
  }): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    if (response.data.success && response.data.data) {
      const { user, token } = response.data.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data.data;
    }
    throw new Error(response.data.message || 'Registration failed');
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', { email, password });
    if (response.data.success && response.data.data) {
      const { user, token } = response.data.data;
      localStorage.setItem('auth_token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data.data;
    }
    throw new Error(response.data.message || 'Login failed');
  },

  async getProfile(): Promise<AppUser> {
    const response = await api.get<ApiResponse<AppUser>>('/auth/profile');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch profile');
  },

  async updateProfile(userData: Partial<AppUser>): Promise<AppUser> {
    const response = await api.put<ApiResponse<AppUser>>('/auth/profile', userData);
    if (response.data.success && response.data.data) {
      localStorage.setItem('user', JSON.stringify(response.data.data));
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update profile');
  },

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
  }
};

// Appointments API
export const appointmentsApi = {
  async createAppointment(appointmentData: {
    service: string;
    appointmentDate: string;
    appointmentTime: string;
    notes?: string;
    symptoms?: string;
  }): Promise<Appointment> {
    const response = await api.post<ApiResponse<Appointment>>('/appointments', appointmentData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to create appointment');
  },

  async getAppointments(): Promise<Appointment[]> {
    const response = await api.get<ApiResponse<Appointment[]>>('/appointments');
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch appointments');
  },

  async getAppointmentById(id: string): Promise<Appointment> {
    const response = await api.get<ApiResponse<Appointment>>(`/appointments/${id}`);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to fetch appointment');
  },

  async updateAppointment(id: string, updateData: Partial<Appointment>): Promise<Appointment> {
    const response = await api.put<ApiResponse<Appointment>>(`/appointments/${id}`, updateData);
    if (response.data.success && response.data.data) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Failed to update appointment');
  },

  async deleteAppointment(id: string): Promise<void> {
    const response = await api.delete<ApiResponse<void>>(`/appointments/${id}`);
    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to delete appointment');
    }
  },

  async getAvailableSlots(date: string): Promise<string[]> {
    const response = await api.get<ApiResponse<{ date: string; availableSlots: string[] }>>('/appointments/available-slots', {
      params: { date }
    });
    if (response.data.success && response.data.data) {
      return response.data.data.availableSlots;
    }
    throw new Error(response.data.message || 'Failed to fetch available slots');
  }
};

// Utility functions
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('auth_token');
};

export const getCurrentUser = (): AppUser | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user data:', error);
      localStorage.removeItem('user');
    }
  }
  return null;
};

// Error handling utility
export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message;
  }
  if (error.message) {
    return error.message;
  }
  return 'An unexpected error occurred';
};

export default api;
