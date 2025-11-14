'use client';

import DoctorSidebar from '@/components/DoctorSidebar';
import { useState, useEffect } from 'react';
import { useDoctorStats, useTodayAppointments } from '@/hooks/useDoctorDashboard';
import { format } from 'date-fns';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

interface WeeklySchedule {
  startDate: string;
  endDate: string;
  days: {
    date: string;
    totalAppointments: number;
    appointments: any[];
  }[];
}

export default function DoctorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [doctorName, setDoctorName] = useState('Doctor');
  const [weeklySchedule, setWeeklySchedule] = useState<WeeklySchedule | null>(null);
  const [scheduleLoading, setScheduleLoading] = useState(true);

  // Fetch dashboard data
  const { data: stats, isLoading: statsLoading } = useDoctorStats();
  const { data: appointments, isLoading: appointmentsLoading } = useTodayAppointments();

  useEffect(() => {
    // Get doctor name from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setDoctorName(user.name || 'Doctor');
    }

    // Fetch weekly schedule
    fetchWeeklySchedule();
  }, []);

  const fetchWeeklySchedule = async () => {
    try {
      setScheduleLoading(true);
      const response = await api.get('/appointments/doctor/weekly-schedule');
      setWeeklySchedule(response.data);
    } catch (error) {
      console.error('Error fetching weekly schedule:', error);
      toast.error('Failed to load weekly schedule');
    } finally {
      setScheduleLoading(false);
    }
  };

  const statsConfig = [
    {
      label: 'Total Patients',
      getValue: () => stats?.totalPatients?.toString() || '0',
      change: 'All time',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      color: 'bg-blue-500'
    },
    {
      label: 'Today\'s Appointments',
      getValue: () => stats?.todayAppointments?.toString() || '0',
      change: appointments ? `${appointments.filter(a => a.status === 'PENDING').length} pending` : '0 pending',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      color: 'bg-green-500'
    },
    {
      label: 'This Week',
      getValue: () => stats?.weekAppointments?.toString() || '0',
      change: 'Appointments',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      color: 'bg-purple-500'
    },
    {
      label: 'Completed',
      getValue: () => stats?.totalCompleted?.toString() || '0',
      change: 'Total completed',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
        return 'bg-green-100 text-green-700';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-700';
      case 'CANCELLED':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatStatus = (status: string) => {
    return status.charAt(0) + status.slice(1).toLowerCase();
  };

  // Format weekly schedule for display
  const getWeekDaysDisplay = () => {
    if (!weeklySchedule) return [];

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return weeklySchedule.days.map((day) => {
      const dayDate = new Date(day.date);
      dayDate.setHours(0, 0, 0, 0);
      const isToday = dayDate.getTime() === today.getTime();

      return {
        day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }),
        date: dayDate.getDate(),
        isToday,
        hasAppointment: day.totalAppointments > 0,
        appointmentCount: day.totalAppointments,
      };
    });
  };

  const weekDays = getWeekDaysDisplay();

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
          error: {
            style: {
              background: '#EF4444',
            },
          },
        }}
      />
      <DoctorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1 text-sm lg:text-base">
                Welcome back, {doctorName}
              </p>
            </div>
          </div>

          {/* Notification */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          {statsLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
                </div>
                <div className="h-8 bg-gray-200 rounded mb-2 w-20"></div>
                <div className="h-4 bg-gray-200 rounded mb-1 w-32"></div>
                <div className="h-3 bg-gray-200 rounded w-24"></div>
              </div>
            ))
          ) : (
            statsConfig.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg text-white`}>
                    {stat.icon}
                  </div>
                </div>
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-1">{stat.getValue()}</h3>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-xs text-gray-500 font-medium">{stat.change}</p>
              </div>
            ))
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar - Next 7 Days */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">This Week's Schedule</h2>
            
            {scheduleLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED]"></div>
              </div>
            ) : weekDays.length > 0 ? (
              <>
                <div className="grid grid-cols-7 gap-2 lg:gap-4">
                  {weekDays.map((day, index) => (
                    <div
                      key={index}
                      className={`text-center p-3 lg:p-4 rounded-lg border-2 transition-all ${
                        day.isToday
                          ? 'border-[#2F80ED] bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="text-xs lg:text-sm text-gray-600 mb-2">{day.day}</p>
                      <p className={`text-lg lg:text-2xl font-bold ${
                        day.isToday ? 'text-[#2F80ED]' : 'text-gray-900'
                      }`}>
                        {day.date}
                      </p>
                      {day.hasAppointment && (
                        <div className="mt-2 flex flex-col items-center gap-1">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-xs text-gray-600">{day.appointmentCount}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <p>No schedule data available</p>
              </div>
            )}

            {!scheduleLoading && weekDays.length > 0 && (
              <div className="mt-6 flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span>Has Appointments</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 border-2 border-[#2F80ED] rounded-full"></div>
                  <span>Today</span>
                </div>
              </div>
            )}
          </div>

          {/* Today's Appointments */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Appointments</h2>

            {appointmentsLoading ? (
              // Loading skeleton
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                ))}
              </div>
            ) : appointments && appointments.length > 0 ? (
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">{appointment.patientName}</h3>
                        {appointment.type && (
                          <p className="text-sm text-gray-600">{appointment.type}</p>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                        {formatStatus(appointment.status)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 text-sm">No appointments today</p>
              </div>
            )}

            <button className="w-full mt-4 py-2 text-[#2F80ED] hover:bg-blue-50 rounded-lg font-medium transition-colors">
              View All Appointments
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
