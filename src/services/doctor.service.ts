import api from '@/lib/api';

export interface Doctor {
  id: string;
  name: string;
  email: string;
  specialty: string;
  bio?: string;
  hospital?: string;
  experience?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DoctorSearchParams {
  specialty?: string;
  search?: string;
  page?: number;
  limit?: number;
}

class DoctorService {
  // Get all doctors
  async getAllDoctors(params?: DoctorSearchParams): Promise<Doctor[]> {
    const response = await api.get<Doctor[]>('/users/doctors', { params });
    return response.data;
  }

  // Get doctor by ID
  async getDoctorById(id: string): Promise<Doctor> {
    const response = await api.get<Doctor>(`/users/doctors/${id}`);
    return response.data;
  }

  // Search doctors
  async searchDoctors(query: string): Promise<Doctor[]> {
    const response = await api.get<Doctor[]>('/users/doctors', {
      params: { search: query }
    });
    return response.data;
  }

  // Filter by specialty
  async getDoctorsBySpecialty(specialty: string): Promise<Doctor[]> {
    const response = await api.get<Doctor[]>('/users/doctors', {
      params: { specialty }
    });
    return response.data;
  }
}

export const doctorService = new DoctorService();
