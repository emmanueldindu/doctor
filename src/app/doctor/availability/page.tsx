'use client';

import DoctorSidebar from '@/components/DoctorSidebar';
import { useState } from 'react';

export default function DoctorAvailability() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [availableDays, setAvailableDays] = useState<number[]>([1, 2, 3, 4, 5]); // Monday to Friday

  const daysOfWeek = [
    { id: 0, name: 'Sunday', short: 'Sun' },
    { id: 1, name: 'Monday', short: 'Mon' },
    { id: 2, name: 'Tuesday', short: 'Tue' },
    { id: 3, name: 'Wednesday', short: 'Wed' },
    { id: 4, name: 'Thursday', short: 'Thu' },
    { id: 5, name: 'Friday', short: 'Fri' },
    { id: 6, name: 'Saturday', short: 'Sat' }
  ];

  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM']
  };

  const [selectedSlots, setSelectedSlots] = useState<string[]>([
    '09:00 AM', '09:30 AM', '10:00 AM', '02:00 PM', '02:30 PM', '03:00 PM'
  ]);

  const toggleDay = (dayId: number) => {
    setAvailableDays(prev =>
      prev.includes(dayId)
        ? prev.filter(d => d !== dayId)
        : [...prev, dayId]
    );
  };

  const toggleTimeSlot = (slot: string) => {
    setSelectedSlots(prev =>
      prev.includes(slot)
        ? prev.filter(s => s !== slot)
        : [...prev, slot]
    );
  };

  const handleSave = () => {
    console.log('Available Days:', availableDays);
    console.log('Selected Time Slots:', selectedSlots);
    alert('Availability settings saved!');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <DoctorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Availability Settings</h1>
            </div>
            <p className="text-gray-600 mt-1">Set your available days and time slots</p>
          </div>

          {/* Available Days */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Days</h2>
            <p className="text-sm text-gray-600 mb-4">Select the days you are available for appointments</p>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
              {daysOfWeek.map((day) => (
                <button
                  key={day.id}
                  onClick={() => toggleDay(day.id)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    availableDays.includes(day.id)
                      ? 'border-[#2F80ED] bg-blue-50 text-[#2F80ED]'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <p className="text-xs font-medium mb-1">{day.short}</p>
                  <p className="text-sm font-semibold">{day.name.slice(0, 3)}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Slots */}
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Available Time Slots</h2>
            <p className="text-sm text-gray-600 mb-6">Select your preferred consultation time slots</p>

            {/* Morning Slots */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Morning (9:00 AM - 12:00 PM)
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {timeSlots.morning.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => toggleTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedSlots.includes(slot)
                        ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Afternoon Slots */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
                Afternoon (2:00 PM - 5:00 PM)
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {timeSlots.afternoon.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => toggleTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedSlots.includes(slot)
                        ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Evening Slots */}
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
                Evening (5:00 PM - 7:00 PM)
              </h3>
              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {timeSlots.evening.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => toggleTimeSlot(slot)}
                    className={`py-2 px-3 rounded-lg border text-sm font-medium transition-all ${
                      selectedSlots.includes(slot)
                        ? 'border-[#2F80ED] bg-[#2F80ED] text-white'
                        : 'border-gray-200 text-gray-700 hover:border-[#2F80ED]'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Summary */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 mb-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Summary</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p><span className="font-medium">Available Days:</span> {availableDays.length} days selected</p>
              <p><span className="font-medium">Time Slots:</span> {selectedSlots.length} slots selected</p>
              <p><span className="font-medium">Total Slots/Week:</span> {availableDays.length * selectedSlots.length} slots</p>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
            >
              Save Availability
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
