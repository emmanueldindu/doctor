import { useQuery } from '@tanstack/react-query';
import { patientService } from '@/services/patient.service';

export const usePatientStats = () => {
  return useQuery({
    queryKey: ['patient-stats'],
    queryFn: () => patientService.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useUpcomingAppointments = () => {
  return useQuery({
    queryKey: ['upcoming-appointments'],
    queryFn: () => patientService.getUpcomingAppointments(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useMyAppointments = () => {
  return useQuery({
    queryKey: ['my-appointments'],
    queryFn: () => patientService.getMyAppointments(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
