'use client';

import PatientSidebar from '@/components/PatientSidebar';
import { useState } from 'react';

export default function PatientAppointments() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Richard James',
      specialty: 'Cardiologist',
      date: 'Nov 15, 2024',
      time: '10:00 AM',
      status: 'Confirmed',
      type: 'In-person'
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Wilson',
      specialty: 'Dermatologist',
      date: 'Nov 18, 2024',
      time: '02:30 PM',
      status: 'Pending',
      type: 'Video Call'
    },
    {
      id: 3,
      doctor: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      date: 'Nov 10, 2024',
      time: '09:00 AM',
      status: 'Completed',
      type: 'In-person'
    },
    {
      id: 4,
      doctor: 'Dr. Emily Brown',
      specialty: 'Neurologist',
      date: 'Nov 05, 2024',
      time: '03:00 PM',
      status: 'Completed',
      type: 'Video Call'
    }
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Appointments</h1>
            </div>
            <p className="text-gray-600 mt-1">Manage and view all your appointments</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-sm p-3 lg:p-4 mb-6 border border-gray-100 overflow-x-auto">
            <div className="flex gap-2 lg:gap-4 min-w-max lg:min-w-0">
              <button className="px-3 lg:px-4 py-2 bg-[#2F80ED] text-white rounded-lg font-medium text-sm whitespace-nowrap">
                All
              </button>
              <button className="px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                Upcoming
              </button>
              <button className="px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                Completed
              </button>
              <button className="px-3 lg:px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                Cancelled
              </button>
            </div>
          </div>

          {/* Appointments List */}
          <div className="space-y-3 lg:space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 border border-gray-100 hover:shadow-md transition-shadow">
                {/* Mobile & Desktop Layout */}
                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                  {/* Doctor Info */}
                  <div className="flex items-start gap-3 lg:gap-4 flex-1">
                    <div className="w-12 h-12 lg:w-14 lg:h-14 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {appointment.doctor.split(' ')[1][0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base lg:text-lg font-semibold text-gray-900 truncate">{appointment.doctor}</h3>
                      <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      
                      {/* Date & Time Info */}
                      <div className="flex flex-wrap items-center gap-3 mt-2 text-xs lg:text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          <span>{appointment.type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Status & Actions */}
                  <div className="flex items-center justify-between lg:justify-end gap-3 lg:gap-4">
                    <span className={`px-3 py-1.5 rounded-full text-xs lg:text-sm font-medium whitespace-nowrap ${
                      appointment.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-700' 
                        : appointment.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {appointment.status}
                    </span>

                    {appointment.status !== 'Completed' && (
                      <div className="flex gap-2">
                        <button 
                          className="p-2 text-[#2F80ED] hover:bg-blue-50 rounded-lg transition-colors"
                          title="Reschedule"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Cancel"
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
        </div>
      </main>
    </div>
  );
}
