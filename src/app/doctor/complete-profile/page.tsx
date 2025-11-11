'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CompleteProfile() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [profileData, setProfileData] = useState({
    bio: '',
    hospital: '',
    experience: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Profile completed:', profileData);
    // Save profile data
    router.push('/doctor/dashboard');
  };

  const handleSkip = () => {
    router.push('/doctor/dashboard');
  };

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 lg:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
          <p className="text-gray-600">Help patients know more about you</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm font-medium text-[#2F80ED]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#2F80ED] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Form Steps */}
        <form onSubmit={handleSubmit}>
          {/* Step 1: Bio */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label htmlFor="bio" className="block text-lg font-semibold text-gray-900 mb-3">
                  Tell us about yourself
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Write a brief professional bio that patients will see on your profile
                </p>
                <textarea
                  id="bio"
                  name="bio"
                  value={profileData.bio}
                  onChange={handleChange}
                  rows={6}
                  className="w-full placeholder:text-gray-400 text-black px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-[#2F80ED] outline-none transition-all resize-none"
                  placeholder="e.g., Experienced cardiologist with over 15 years of practice. Specialized in interventional cardiology and preventive heart care..."
                  required
                
                />
                <p className="text-xs text-gray-500 mt-2">
                  {profileData.bio.length} / 500 characters
                </p>
              </div>
            </div>
          )}

          {/* Step 2: Hospital */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label htmlFor="hospital" className="block text-lg font-semibold text-gray-900 mb-3">
                  Where do you practice?
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  Enter the name of your hospital, clinic, or medical center
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={profileData.hospital}
                    onChange={handleChange}
                    className="w-full placeholder:text-gray-400 text-black pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-[#2F80ED] outline-none transition-all text-lg"
                    placeholder="e.g., Mount Adora Hospital"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Experience */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <label htmlFor="experience" className="block text-lg font-semibold text-gray-900 mb-3">
                  How many years of experience do you have?
                </label>
                <p className="text-sm text-gray-600 mb-4">
                  This helps patients understand your level of expertise
                </p>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="experience"
                    name="experience"
                    value={profileData.experience}
                    onChange={handleChange}
                    className="w-full placeholder:text-gray-400 text-black pl-12 pr-4 py-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-[#2F80ED] outline-none transition-all text-lg"
                    placeholder="e.g., 15 years"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  You can enter in any format (e.g., "5 years", "10+ years", "2 years")
                </p>
              </div>

              {/* Summary */}
              <div className="bg-blue-50 rounded-lg p-6 border border-blue-100 mt-8">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">Profile Summary</h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <p><span className="font-medium">Bio:</span> {profileData.bio.substring(0, 50)}...</p>
                  <p><span className="font-medium">Hospital:</span> {profileData.hospital}</p>
                  <p><span className="font-medium">Experience:</span> {profileData.experience}</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
            )}

            {currentStep < totalSteps ? (
              <>
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Continue
                </button>
                {/* <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Skip
                </button> */}
              </>
            ) : (
              <>
                <button
                  type="submit"
                  className="flex-1 bg-[#2F80ED] text-white py-3 rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
                >
                  Complete Profile
                </button>
                {/* <button
                  type="button"
                  onClick={handleSkip}
                  className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Skip
                </button> */}
              </>
            )}
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
