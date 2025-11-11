'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    specialty: ''
  });

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
    'Dentist',
    'Other'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Doctor registration:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Doctor Registration</h1>
            <p className="text-gray-600">Join our network of healthcare professionals</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                placeholder="Dr. John Doe"
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
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                placeholder="doctor@example.com"
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
                required
                className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all bg-white"
              >
                <option value="">Select your specialty</option>
                {specialties.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                placeholder="Create a strong password"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                minLength={8}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
                placeholder="Confirm your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
            >
              Register as Doctor
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or</span>
            </div>
          </div>

          {/* Links */}
          <div className="space-y-3 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <Link href="/login/doctor" className="text-[#2F80ED] font-medium hover:underline">
                Sign in
              </Link>
            </p>
            <p className="text-sm text-gray-600">
              Are you a patient?{' '}
              <Link href="/register/patient" className="text-[#2F80ED] font-medium hover:underline">
                Register as Patient
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
