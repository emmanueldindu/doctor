import api from '@/lib/api';

export interface RegisterPatientData {
  name: string;
  email: string;
  password: string;
  gender: 'MALE' | 'FEMALE';
}

export interface RegisterDoctorData {
  name: string;
  email: string;
  password: string;
  specialty: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: 'PATIENT' | 'DOCTOR' | 'ADMIN';
    specialty?: string;
    gender?: string;
  };
}

class AuthService {
  // Register Patient
  async registerPatient(data: RegisterPatientData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register/patient', data);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Register Doctor
  async registerDoctor(data: RegisterDoctorData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/register/doctor', data);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Login
  async login(data: LoginData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>('/auth/login', data);
    
    // Save token to localStorage
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  // Logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Get current user from localStorage
  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        console.error('Error parsing user data:', error);
        return null;
      }
    }
    return null;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Get token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Complete doctor profile
  async completeProfile(data: { bio: string; hospital: string; experience: string }) {
    const response = await api.patch('/users/doctor/complete-profile', data);
    
    // Update user in localStorage
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      const updatedUser = { ...currentUser, ...response.data };
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
    
    return response.data;
  }
}

export const authService = new AuthService();
