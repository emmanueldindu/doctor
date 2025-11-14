'use client';

import DoctorSidebar from '@/components/DoctorSidebar';
import ConfirmModal from '@/components/ConfirmModal';
import { useState, useEffect } from 'react';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

interface Patient {
  id: string;
  name: string;
  email: string;
  gender: string;
}

interface Appointment {
  id: string;
  doctorId: string;
  patientId: string;
  appointmentDate: string;
  appointmentTime: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  notes?: string;
  createdAt: string;
  updatedAt: string;
  patient: Patient;
}

export default function DoctorAppointments() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'TODAY' | 'UPCOMING' | 'COMPLETED'>('ALL');
  const [processingId, setProcessingId] = useState<string | null>(null);
  
  // Modal states
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [appointmentToProcess, setAppointmentToProcess] = useState<Appointment | null>(null);

  // Fetch appointments
  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get('/appointments/doctor/my-appointments');
      setAppointments(response.data);
    } catch (error: any) {
      console.error('Error fetching appointments:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        toast.error('Please login to view appointments');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        toast.error('Failed to load appointments');
      }
    } finally {
      setLoading(false);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  // Get initials from name
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Check if date is today
  const isToday = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  // Check if date is upcoming (future)
  const isUpcoming = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  };

  // Check if date is in the past or today (can be completed)
  const canBeCompleted = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    date.setHours(0, 0, 0, 0);
    return date <= today;
  };

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'ALL') return true;
    if (filter === 'TODAY') return isToday(appointment.appointmentDate);
    if (filter === 'UPCOMING') return isUpcoming(appointment.appointmentDate) && (appointment.status === 'PENDING' || appointment.status === 'CONFIRMED');
    if (filter === 'COMPLETED') return appointment.status === 'COMPLETED';
    return true;
  });

  // Open confirm modal
  const handleConfirmClick = (appointment: Appointment) => {
    setAppointmentToProcess(appointment);
    setShowConfirmModal(true);
  };

  // Open cancel modal
  const handleCancelClick = (appointment: Appointment) => {
    setAppointmentToProcess(appointment);
    setShowCancelModal(true);
  };

  // Open complete modal
  const handleCompleteClick = (appointment: Appointment) => {
    setAppointmentToProcess(appointment);
    setShowCompleteModal(true);
  };

  // Close modals
  const handleCloseModals = () => {
    if (!processingId) {
      setShowConfirmModal(false);
      setShowCancelModal(false);
      setShowCompleteModal(false);
      setAppointmentToProcess(null);
    }
  };

  // Confirm appointment (change status to CONFIRMED)
  const handleConfirmAppointment = async () => {
    if (!appointmentToProcess) return;

    try {
      setProcessingId(appointmentToProcess.id);
      await api.patch(`/appointments/${appointmentToProcess.id}/status`, {
        status: 'CONFIRMED'
      });
      
      toast.success('Appointment confirmed successfully');
      
      // Close modal and refresh appointments
      setShowConfirmModal(false);
      setAppointmentToProcess(null);
      fetchAppointments();
    } catch (error: any) {
      console.error('Error confirming appointment:', error);
      toast.error('Failed to confirm appointment');
    } finally {
      setProcessingId(null);
    }
  };

  // Cancel appointment
  const handleCancelAppointment = async () => {
    if (!appointmentToProcess) return;

    try {
      setProcessingId(appointmentToProcess.id);
      await api.delete(`/appointments/${appointmentToProcess.id}`);
      
      toast.success('Appointment cancelled successfully');
      
      // Close modal and refresh appointments
      setShowCancelModal(false);
      setAppointmentToProcess(null);
      fetchAppointments();
    } catch (error: any) {
      console.error('Error cancelling appointment:', error);
      toast.error('Failed to cancel appointment');
    } finally {
      setProcessingId(null);
    }
  };

  // Complete appointment
  const handleCompleteAppointment = async () => {
    if (!appointmentToProcess) return;

    try {
      setProcessingId(appointmentToProcess.id);
      await api.patch(`/appointments/${appointmentToProcess.id}/status`, {
        status: 'COMPLETED'
      });
      
      toast.success('Appointment marked as completed');
      
      // Close modal and refresh appointments
      setShowCompleteModal(false);
      setAppointmentToProcess(null);
      fetchAppointments();
    } catch (error: any) {
      console.error('Error completing appointment:', error);
      const errorMessage = error.response?.data?.error || 'Failed to mark appointment as completed';
      toast.error(errorMessage);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            style: {
              background: '#10B981',
            },
          },
          error: {
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
      <DoctorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Appointments</h1>
            </div>
            <p className="text-gray-600 mt-1">Manage your patient appointments</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-3 lg:p-4 mb-6 border border-gray-100 overflow-x-auto">
            <div className="flex gap-2 lg:gap-4 min-w-max lg:min-w-0">
              <button 
                onClick={() => setFilter('ALL')}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === 'ALL' ? 'bg-[#2F80ED] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All ({appointments.length})
              </button>
              <button 
                onClick={() => setFilter('TODAY')}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === 'TODAY' ? 'bg-[#2F80ED] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Today ({appointments.filter(a => isToday(a.appointmentDate)).length})
              </button>
              <button 
                onClick={() => setFilter('UPCOMING')}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === 'UPCOMING' ? 'bg-[#2F80ED] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Upcoming ({appointments.filter(a => isUpcoming(a.appointmentDate) && (a.status === 'PENDING' || a.status === 'CONFIRMED')).length})
              </button>
              <button 
                onClick={() => setFilter('COMPLETED')}
                className={`px-3 lg:px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                  filter === 'COMPLETED' ? 'bg-[#2F80ED] text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Completed ({appointments.filter(a => a.status === 'COMPLETED').length})
              </button>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED] mx-auto mb-4"></div>
                <p className="text-gray-600">Loading appointments...</p>
              </div>
            </div>
          ) : filteredAppointments.length === 0 ? (
            /* Empty State */
            <div className="bg-white rounded-xl shadow-sm p-8 lg:p-12 border border-gray-100 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {filter === 'ALL' ? 'No appointments yet' : `No ${filter.toLowerCase()} appointments`}
              </h3>
              <p className="text-gray-600">
                {filter === 'ALL' 
                  ? 'Your appointments will appear here once patients book with you'
                  : `You don't have any ${filter.toLowerCase()} appointments`
                }
              </p>
            </div>
          ) : (
            /* Appointments List */
            <div className="space-y-3 lg:space-y-4">
              {filteredAppointments.map((appointment) => (
                <div key={appointment.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Patient Info */}
                    <div className="flex items-start gap-3 lg:gap-4 flex-1">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                        {getInitials(appointment.patient.name)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base lg:text-lg font-semibold text-gray-900">{appointment.patient.name}</h3>
                        <p className="text-sm text-gray-600">{appointment.patient.email}</p>
                      
                        {/* Date & Time Info */}
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs lg:text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{formatDate(appointment.appointmentDate)}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{appointment.appointmentTime}</span>
                          </div>
                        </div>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500 mt-2 line-clamp-2">Note: {appointment.notes}</p>
                        )}
                      </div>
                    </div>

                    {/* Status & Actions */}
                    <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-4">
                      <span className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap ${
                        appointment.status === 'CONFIRMED' 
                          ? 'bg-green-100 text-green-700' 
                          : appointment.status === 'PENDING'
                          ? 'bg-yellow-100 text-yellow-700'
                          : appointment.status === 'CANCELLED'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {appointment.status.charAt(0) + appointment.status.slice(1).toLowerCase()}
                      </span>

                      {appointment.status !== 'COMPLETED' && appointment.status !== 'CANCELLED' && (
                        <div className="flex gap-2">
                          {appointment.status === 'PENDING' && (
                            <button 
                              onClick={() => handleConfirmClick(appointment)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Confirm Appointment"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            </button>
                          )}
                          {appointment.status === 'CONFIRMED' && canBeCompleted(appointment.appointmentDate) && (
                            <button 
                              onClick={() => handleCompleteClick(appointment)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Mark as Complete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                          )}
                          <button 
                            onClick={() => handleCancelClick(appointment)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Appointment"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Confirm Appointment Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseModals}
        onConfirm={handleConfirmAppointment}
        title="Confirm Appointment?"
        message={`Are you sure you want to confirm the appointment with ${appointmentToProcess?.patient.name}?`}
        confirmText="Yes, Confirm"
        cancelText="Cancel"
        confirmButtonClass="bg-green-600 hover:bg-green-700"
        iconType="success"
        isLoading={!!processingId}
      />

      {/* Cancel Appointment Modal */}
      <ConfirmModal
        isOpen={showCancelModal}
        onClose={handleCloseModals}
        onConfirm={handleCancelAppointment}
        title="Cancel Appointment?"
        message={`Are you sure you want to cancel the appointment with ${appointmentToProcess?.patient.name}? This action cannot be undone.`}
        confirmText="Yes, Cancel"
        cancelText="No, Keep It"
        confirmButtonClass="bg-red-600 hover:bg-red-700"
        isLoading={!!processingId}
      />

      {/* Complete Appointment Modal */}
      <ConfirmModal
        isOpen={showCompleteModal}
        onClose={handleCloseModals}
        onConfirm={handleCompleteAppointment}
        title="Mark as Complete?"
        message={`Are you sure you want to mark the appointment with ${appointmentToProcess?.patient.name} as completed?`}
        confirmText="Yes, Complete"
        cancelText="Cancel"
        confirmButtonClass="bg-blue-600 hover:bg-blue-700"
        iconType="info"
        isLoading={!!processingId}
      />
    </div>
  );
}
