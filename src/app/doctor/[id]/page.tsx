'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDoctorById } from '@/hooks/useDoctor';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

interface DoctorAvailability {
  doctorId: string;
  doctorName: string;
  availableDays: number[];
  availability: Record<number, string[]>;
}

export default function DoctorDetails() {
  const params = useParams();
  const router = useRouter();
  const doctorId = params.id as string;
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [availability, setAvailability] = useState<DoctorAvailability | null>(null);
  const [availabilityLoading, setAvailabilityLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Fetch doctor data from API
  const { data: doctor, isLoading } = useDoctorById(doctorId);

  const getInitials = (name: string) => {
    if (!name) return '??';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatSpecialty = (specialty: string) => {
    return specialty
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  // Fetch doctor's availability
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        setAvailabilityLoading(true);
        const response = await api.get(`/availability/doctor/${doctorId}`);
        setAvailability(response.data);
      } catch (error: any) {
        console.error('Error fetching availability:', error);
        // If no availability set, keep null
        setAvailability(null);
      } finally {
        setAvailabilityLoading(false);
      }
    };

    if (doctorId) {
      fetchAvailability();
    }
  }, [doctorId]);

  // Get all unique time slots from availability
  const getAllTimeSlots = (): string[] => {
    if (!availability) return [];
    
    const allSlots = new Set<string>();
    Object.values(availability.availability).forEach(slots => {
      slots.forEach(slot => allSlots.add(slot));
    });
    
    return Array.from(allSlots).sort((a, b) => {
      // Convert to 24-hour format for sorting
      const timeA = convertTo24Hour(a);
      const timeB = convertTo24Hour(b);
      return timeA.localeCompare(timeB);
    });
  };

  // Convert 12-hour time to 24-hour for sorting
  const convertTo24Hour = (time12h: string): string => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    
    if (hours === '12') {
      hours = '00';
    }
    
    if (modifier === 'PM') {
      hours = String(parseInt(hours, 10) + 12);
    }
    
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  // Group time slots by time of day
  const groupTimeSlotsByPeriod = () => {
    const allSlots = getAllTimeSlots();
    
    const morning: string[] = [];
    const afternoon: string[] = [];
    const evening: string[] = [];
    
    allSlots.forEach(slot => {
      const time24 = convertTo24Hour(slot);
      const hour = parseInt(time24.split(':')[0]);
      
      if (hour >= 5 && hour < 12) {
        morning.push(slot);
      } else if (hour >= 12 && hour < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });
    
    return { morning, afternoon, evening };
  };

  // Get time slots for selected date
  const getTimeSlotsForDate = (date: Date | null) => {
    if (!date || !availability) return { morning: [], afternoon: [], evening: [] };
    
    const dayOfWeek = date.getDay();
    const slotsForDay = availability.availability[dayOfWeek] || [];
    
    const morning: string[] = [];
    const afternoon: string[] = [];
    const evening: string[] = [];
    
    slotsForDay.forEach(slot => {
      const time24 = convertTo24Hour(slot);
      const hour = parseInt(time24.split(':')[0]);
      
      if (hour >= 5 && hour < 12) {
        morning.push(slot);
      } else if (hour >= 12 && hour < 17) {
        afternoon.push(slot);
      } else {
        evening.push(slot);
      }
    });
    
    return { morning, afternoon, evening };
  };

  const timeSlots = selectedDate ? getTimeSlotsForDate(selectedDate) : groupTimeSlotsByPeriod();

  // Handle booking confirmation
  const handleConfirmBooking = async () => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Please login to book an appointment');
      setTimeout(() => {
        router.push('/login');
      }, 1500);
      return;
    }

    try {
      setBookingLoading(true);

      // Format date to local YYYY-MM-DD (avoid timezone conversion)
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const day = String(selectedDate.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      const response = await api.post('/appointments', {
        doctorId,
        appointmentDate: formattedDate,
        appointmentTime: selectedTime,
      });

      // Success toast
      toast.success(
        `Appointment booked successfully with ${doctor?.name}!`,
        {
          duration: 4000,
          icon: '✅',
        }
      );

      // Reset selections
      setSelectedDate(null);
      setSelectedTime('');

      // Redirect to appointments page after a short delay
      setTimeout(() => {
        router.push('/patient/appointments');
      }, 2000);
    } catch (error: any) {
      console.error('Booking error:', error);
      
      // Handle specific error messages
      if (error.response?.status === 400) {
        toast.error(
          error.response.data.error || 'This time slot is already booked',
          { duration: 4000 }
        );
      } else if (error.response?.status === 403) {
        toast.error('Only patients can book appointments');
      } else if (error.response?.status === 404) {
        toast.error('Doctor not found');
      } else {
        toast.error('Failed to book appointment. Please try again.');
      }
    } finally {
      setBookingLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED]"></div>
          <p className="mt-4 text-gray-600">Loading doctor profile...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
          <p className="text-gray-600 text-lg">Doctor not found</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
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
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-20 lg:py-12">
        {/* Doctor Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Doctor Avatar */}
            <div className="md:col-span-1">
              <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                <div className="w-32 h-32 bg-[#2F80ED] rounded-full flex items-center justify-center text-white text-4xl font-bold">
                  {getInitials(doctor.name)}
                </div>
              </div>
            </div>

            {/* Doctor Info */}
            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-[#2F80ED] font-medium mb-3">{formatSpecialty(doctor.specialty)}</p>
                  <p className="text-sm text-gray-600">{doctor.email}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                {doctor.experience && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Experience</span>
                    </div>
                    <p className="text-xl font-bold text-gray-900">{doctor.experience}</p>
                  </div>
                )}

                {doctor.hospital && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <svg className="w-5 h-5 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <span className="text-sm font-medium text-gray-600">Hospital</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">{doctor.hospital}</p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors">
                  Book Appointment
                </button>
            
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            {doctor.bio && (
              <div className="bg-white rounded-2xl shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
              </div>
            )}

            {/* Specialty Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specialty</h2>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-[#2F80ED] px-4 py-2 rounded-full text-sm font-medium">
                  {formatSpecialty(doctor.specialty)}
                </span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-700">{doctor.email}</span>
                </div>
                {doctor.hospital && (
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <span className="text-gray-700">{doctor.hospital}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Appointment Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-md p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h2>

              {/* Date Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Date</h3>
                {availabilityLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#2F80ED]"></div>
                  </div>
                ) : !availability || availability.availableDays.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                    <svg className="w-8 h-8 text-yellow-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-sm text-yellow-800 font-medium">No availability set</p>
                    <p className="text-xs text-yellow-700 mt-1">This doctor hasn't set their available schedule yet.</p>
                  </div>
                ) : (
                  <Calendar
                    selectedDate={selectedDate}
                    onDateSelect={setSelectedDate}
                    availableDays={availability.availableDays}
                  />
                )}
              </div>

              {/* Time Selection */}
              {!availabilityLoading && availability && availability.availableDays.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Time</h3>
                  
                  {!selectedDate ? (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                      <svg className="w-8 h-8 text-blue-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-sm text-blue-800">Please select a date first</p>
                    </div>
                  ) : (
                    <>
                      {/* Morning Slots */}
                      {timeSlots.morning.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <svg className="w-3 h-3 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                            Morning
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.morning.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                                  selectedTime === time
                                    ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                                    : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Afternoon Slots */}
                      {timeSlots.afternoon.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <svg className="w-3 h-3 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                            </svg>
                            Afternoon
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.afternoon.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                                  selectedTime === time
                                    ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                                    : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Evening Slots */}
                      {timeSlots.evening.length > 0 && (
                        <div className="mb-4">
                          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                            <svg className="w-3 h-3 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                            </svg>
                            Evening
                          </p>
                          <div className="grid grid-cols-3 gap-2">
                            {timeSlots.evening.map((time) => (
                              <button
                                key={time}
                                onClick={() => setSelectedTime(time)}
                                className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all ${
                                  selectedTime === time
                                    ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                                    : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* No slots available for selected date */}
                      {timeSlots.morning.length === 0 && timeSlots.afternoon.length === 0 && timeSlots.evening.length === 0 && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 text-center">
                          <svg className="w-8 h-8 text-yellow-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-yellow-800">No time slots available for this date</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Doctor: <span className="font-medium text-gray-900">{doctor.name}</span></p>
                    <p>Date: <span className="font-medium text-gray-900">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></p>
                    <p>Time: <span className="font-medium text-gray-900">{selectedTime}</span></p>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleConfirmBooking}
                disabled={!selectedDate || !selectedTime || bookingLoading}
                className={`w-full py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  selectedDate && selectedTime && !bookingLoading
                    ? 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {bookingLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Booking...</span>
                  </>
                ) : (
                  'Confirm Appointment'
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
