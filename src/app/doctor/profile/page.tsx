'use client';

import DoctorSidebar from '@/components/DoctorSidebar';
import { useState } from 'react';

export default function DoctorProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: 'Dr. Richard James',
    email: 'richard.james@medease.com',
    phone: '+1 234 567 8900',
    specialty: 'Cardiologist',
    licenseNumber: 'MD-12345-2020',
    experience: '15 years',
    consultationFee: '150',
    education: 'MD - Cardiology, Harvard Medical School',
    hospital: 'Mount Adora Hospital',
    address: '123 Medical Center, New York, NY 10001',
    bio: 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile updated:', formData);
    alert('Profile updated successfully!');
  };

  const specialties = [
    'Cardiologist',
    'Dermatologist',
    'Pediatrician',
    'Neurologist',
    'Orthopedic',
    'Psychiatrist',
    'General Physician',
    'Gynecologist',
    'Ophthalmologist',
    'ENT Specialist',
    'Dentist'
  ];

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
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Profile</h1>
            </div>
            <p className="text-gray-600 mt-1">Manage your professional information</p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 border border-gray-100">
            {/* Avatar Section */}
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
              <div className="w-24 h-24 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-semibold text-3xl">
                RJ
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{formData.fullName}</h2>
                <p className="text-gray-600">{formData.specialty}</p>
                <button className="mt-2 text-sm text-[#2F80ED] hover:underline font-medium">
                  Change Profile Picture
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Specialty */}
                  <div>
                    <label htmlFor="specialty" className="block text-sm font-medium text-gray-700 mb-2">
                      Specialty
                    </label>
                    <select
                      id="specialty"
                      name="specialty"
                      value={formData.specialty}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all bg-white"
                    >
                      {specialties.map((spec) => (
                        <option key={spec} value={spec}>
                          {spec}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* License Number */}
                  <div>
                    <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      License Number
                    </label>
                    <input
                      type="text"
                      id="licenseNumber"
                      name="licenseNumber"
                      value={formData.licenseNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Experience */}
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-2">
                      Years of Experience
                    </label>
                    <input
                      type="text"
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Consultation Fee */}
                  <div>
                    <label htmlFor="consultationFee" className="block text-sm font-medium text-gray-700 mb-2">
                      Consultation Fee ($)
                    </label>
                    <input
                      type="number"
                      id="consultationFee"
                      name="consultationFee"
                      value={formData.consultationFee}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Education */}
                  <div>
                    <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                      Education
                    </label>
                    <input
                      type="text"
                      id="education"
                      name="education"
                      value={formData.education}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>

                  {/* Hospital */}
                  <div className="md:col-span-2">
                    <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital/Clinic
                    </label>
                    <input
                      type="text"
                      id="hospital"
                      name="hospital"
                      value={formData.hospital}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Address & Bio */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                
                {/* Address */}
                <div className="mb-6">
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Professional Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                    placeholder="Tell patients about your experience and expertise..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-6">
                <button
                  type="submit"
                  className="flex-1 bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
