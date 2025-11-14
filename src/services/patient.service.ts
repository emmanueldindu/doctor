import api from '@/lib/api';

export interface DashboardStats {
  totalAppointments: number;
  upcomingAppointments: number;
  completedAppointments: number;
  cancelledAppointments: number;
}

export interface UpcomingAppointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorSpecialty: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  reason: string;
}

class PatientService {
  // Get dashboard stats
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await api.get<DashboardStats>('/appointments/patient/stats');
    return response.data;
  }

  // Get upcoming appointments
  async getUpcomingAppointments(): Promise<UpcomingAppointment[]> {
    const response = await api.get<UpcomingAppointment[]>('/appointments/patient/upcoming');
    return response.data;
  }

  // Get all appointments
  async getMyAppointments() {
    const response = await api.get('/appointments/patient/my-appointments');
    return response.data;
  }
}

export const patientService = new PatientService();
