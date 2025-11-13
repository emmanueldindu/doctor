import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authService, RegisterPatientData, RegisterDoctorData, LoginData } from '@/services/auth.service';

export const useRegisterPatient = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterPatientData) => authService.registerPatient(data),
    onSuccess: (data) => {
      console.log('✅ Patient Registration Success:', data);
      toast.success(`Welcome ${data.user.name}! Registration successful.`);
      router.push('/patient/dashboard');
    },
    onError: (error: any) => {
      console.error('❌ Patient Registration Error:', error);
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useRegisterDoctor = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterDoctorData) => authService.registerDoctor(data),
    onSuccess: (data) => {
      console.log('✅ Doctor Registration Success:', data);
      toast.success(`Welcome Dr. ${data.user.name}! Registration successful.`);
      router.push('/doctor/complete-profile');
    },
    onError: (error: any) => {
      console.error('❌ Doctor Registration Error:', error);
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(message);
    },
  });
};

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginData) => authService.login(data),
    onSuccess: (data) => {
      console.log('✅ Login Success:', data);
      toast.success(`Welcome back, ${data.user.name}!`);
      
      // Redirect based on role
      if (data.user.role === 'PATIENT') {
        router.push('/patient/dashboard');
      } else if (data.user.role === 'DOCTOR') {
        router.push('/doctor/dashboard');
      } else {
        router.push('/');
      }
    },
    onError: (error: any) => {
      console.error('❌ Login Error:', error);
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();

  return () => {
    authService.logout();
    toast.success('Logged out successfully');
    router.push('/');
  };
};

export const useCompleteProfile = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: { bio: string; hospital: string; experience: string }) => 
      authService.completeProfile(data),
    onSuccess: (data) => {
      console.log('✅ Profile Completed:', data);
      toast.success('Profile completed successfully!');
      router.push('/doctor/dashboard');
    },
    onError: (error: any) => {
      console.error('❌ Profile Completion Error:', error);
      const message = error.response?.data?.error || 'Failed to complete profile. Please try again.';
      toast.error(message);
    },
  });
};
