'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Calendar from '@/components/Calendar';
import { useState } from 'react';
import Image from 'next/image';

export default function DoctorDetails() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');

  // Dummy doctor data
  const doctor = {
    id: 1,
    name: 'Dr. Richard James',
    specialty: 'Cardiologist',
    image: '/doctors/doctor-1.jpg',
    rating: 4.8,
    reviews: 272,
    experience: '15 years',
    patients: 1500,
    location: 'Mount Adora Hospital, Sylhet',
    about: 'Dr. Richard James is a highly experienced cardiologist with over 15 years of practice. He specializes in interventional cardiology, heart disease prevention, and cardiac rehabilitation. Dr. James is known for his patient-centered approach and has successfully treated thousands of patients with various cardiovascular conditions.',
    education: [
      'MD - Cardiology, Harvard Medical School (2008)',
      'MBBS - Johns Hopkins University (2004)',
      'Fellowship in Interventional Cardiology (2010)'
    ],
    specializations: [
      'Interventional Cardiology',
      'Heart Disease Prevention',
      'Cardiac Rehabilitation',
      'Echocardiography',
      'Stress Testing'
    ],
    languages: ['English', 'Spanish', 'French'],
    consultationFee: 150,
    bgColor: 'from-green-400 to-green-500',
    availableDays: [1, 2] // Monday and Tuesday (0 = Sunday, 1 = Monday, etc.)
  };

  // Available time slots
  const timeSlots = {
    morning: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
    afternoon: ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'],
    evening: ['05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM']
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 lg:px-20 lg:py-12">
        {/* Doctor Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8">
          <div className="grid md:grid-cols-3 gap-8 p-8">
            {/* Doctor Image */}
            <div className="md:col-span-1">
              <Image src={require('../../../assets/images/doc-image.png')} alt={doctor.name} className={`w-full aspect-square rounded-2xl bg-gradient-to-br flex items-center justify-center`}>
                {/* <svg className="w-32 h-32 text-white/30" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg> */}
              </Image>
            </div>

            {/* Doctor Info */}
            <div className="md:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{doctor.name}</h1>
                  <p className="text-xl text-[#2F80ED] font-medium mb-3">{doctor.specialty}</p>
                  
                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="font-semibold text-gray-900">{doctor.rating}</span>
                      <span className="text-gray-500">({doctor.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Consultation Fee */}
                <div className="text-right">
                  <p className="text-sm text-gray-500 mb-1">Consultation Fee</p>
                  <p className="text-2xl font-bold text-[#2F80ED]">${doctor.consultationFee}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-blue-50 rounded-lg  gap-1 p-4">

                  <div className="flex items-center mb-1 gap-2 ">
                    <svg className="w-5 h-5 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Patients</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">+{doctor.patients}</p>

                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Experience</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">{doctor.experience}</p>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-600">Location</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{doctor.location}</p>
                </div>
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
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Education Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>
              <ul className="space-y-3">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-[#2F80ED] rounded-full mt-2"></div>
                    <span className="text-gray-700">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specializations Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specializations</h2>
              <div className="flex flex-wrap gap-2">
                {doctor.specializations.map((spec, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-[#2F80ED] px-4 py-2 rounded-full text-sm font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages Section */}
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Languages Spoken</h2>
              <div className="flex gap-3">
                {doctor.languages.map((lang, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium"
                  >
                    {lang}
                  </span>
                ))}
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
                <Calendar
                  selectedDate={selectedDate}
                  onDateSelect={setSelectedDate}
                  availableDays={doctor.availableDays}
                />
              </div>

              {/* Time Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">Select Time</h3>
                
                {/* Morning Slots */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Morning</p>
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

                {/* Afternoon Slots */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Afternoon</p>
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

                {/* Evening Slots */}
                <div>
                  <p className="text-xs text-gray-500 mb-2">Evening</p>
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
              </div>

              {/* Booking Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Booking Summary</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p>Date: <span className="font-medium text-gray-900">{selectedDate.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span></p>
                    <p>Time: <span className="font-medium text-gray-900">{selectedTime}</span></p>
                    <p>Fee: <span className="font-medium text-gray-900">${doctor.consultationFee}</span></p>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <button
                disabled={!selectedDate || !selectedTime}
                className={`w-full py-3 rounded-lg font-medium transition-colors ${
                  selectedDate && selectedTime
                    ? 'bg-[#2F80ED] text-white hover:bg-[#2563EB]'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
