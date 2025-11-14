import api from '@/lib/api';

export interface DoctorStats {
  totalPatients: number;
  todayAppointments: number;
  todayPending: number;
  weekAppointments: number;
  totalPending: number;
  totalCompleted: number;
}

export interface DoctorAppointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  type?: string;
  notes?: string;
}

class DoctorDashboardService {
  // Get doctor dashboard stats
  async getDashboardStats(): Promise<DoctorStats> {
    const response = await api.get<DoctorStats>('/appointments/doctor/stats');
    return response.data;
  }

  // Get today's appointments for doctor
  async getTodayAppointments(): Promise<DoctorAppointment[]> {
    const response = await api.get<DoctorAppointment[]>('/appointments/doctor/today');
    return response.data;
  }

  // Get upcoming appointments for doctor
  async getUpcomingAppointments(): Promise<DoctorAppointment[]> {
    const response = await api.get<DoctorAppointment[]>('/appointments/doctor/upcoming');
    return response.data;
  }
}

export const doctorDashboardService = new DoctorDashboardService();
