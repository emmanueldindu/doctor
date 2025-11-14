import { useQuery } from '@tanstack/react-query';
import { doctorService, DoctorSearchParams } from '@/services/doctor.service';

export const useAllDoctors = (params?: DoctorSearchParams) => {
  return useQuery({
    queryKey: ['doctors', params],
    queryFn: () => doctorService.getAllDoctors(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useDoctorById = (id: string) => {
  return useQuery({
    queryKey: ['doctor', id],
    queryFn: () => doctorService.getDoctorById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useSearchDoctors = (query: string) => {
  return useQuery({
    queryKey: ['doctors-search', query],
    queryFn: () => doctorService.searchDoctors(query),
    enabled: query.length > 0,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDoctorsBySpecialty = (specialty: string) => {
  return useQuery({
    queryKey: ['doctors-specialty', specialty],
    queryFn: () => doctorService.getDoctorsBySpecialty(specialty),
    enabled: !!specialty,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};
