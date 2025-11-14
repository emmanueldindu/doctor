import { useQuery } from '@tanstack/react-query';
import { doctorDashboardService } from '@/services/doctorDashboard.service';

export const useDoctorStats = () => {
  return useQuery({
    queryKey: ['doctor-stats'],
    queryFn: () => doctorDashboardService.getDashboardStats(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useTodayAppointments = () => {
  return useQuery({
    queryKey: ['doctor-today-appointments'],
    queryFn: () => doctorDashboardService.getTodayAppointments(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

export const useDoctorUpcomingAppointments = () => {
  return useQuery({
    queryKey: ['doctor-upcoming-appointments'],
    queryFn: () => doctorDashboardService.getUpcomingAppointments(),
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};
