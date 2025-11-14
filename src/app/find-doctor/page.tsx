'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useAllDoctors } from '@/hooks/useDoctor';

export default function FindDoctor() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  // Fetch doctors from API
  const { data: doctors, isLoading } = useAllDoctors({
    search: searchQuery,
    specialty: selectedSpecialty
  });

  const specialties = [
    'CARDIOLOGIST',
    'DERMATOLOGIST',
    'PEDIATRICIAN',
    'NEUROLOGIST',
    'ORTHOPEDIC',
    'PSYCHIATRIST',
    'GENERAL_PHYSICIAN',
    'GYNECOLOGIST',
    'OPHTHALMOLOGIST'
  ];

  const getInitials = (name: string) => {
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

  const handleSearch = () => {
    // Search is automatically triggered by React Query when searchQuery changes
  };

  // Use real data or dummy data for demo
  const displayDoctors = doctors || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section with Search */}
      <section className="px-6 py-12 lg:px-20 lg:py-16 bg-gradient-to-br from-[#2F80ED] to-[#1E5BB8]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Find Your Perfect Doctor
          </h1>
          <p className="text-blue-100 mb-8">
            Search from hundreds of verified healthcare professionals
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-lg p-2 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-3 px-4">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or specialty..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button 
              onClick={handleSearch}
              className="bg-[#2F80ED] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2563EB] transition-colors"
            >
              Search
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button 
              onClick={() => setSelectedSpecialty('')}
              className={`backdrop-blur-sm px-4 py-2 rounded-full text-sm transition-colors ${
                selectedSpecialty === '' 
                  ? 'bg-white text-[#2F80ED] font-medium' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              All Specialties
            </button>
            {specialties.slice(0, 4).map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialty(spec)}
                className={`backdrop-blur-sm px-4 py-2 rounded-full text-sm transition-colors ${
                  selectedSpecialty === spec
                    ? 'bg-white text-[#2F80ED] font-medium'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                {formatSpecialty(spec)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="px-6 py-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
              <p className="text-gray-600 mt-1">
                {isLoading ? 'Loading...' : `${displayDoctors.length} doctors found`}
              </p>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED]"></div>
              <p className="mt-4 text-gray-600">Loading doctors...</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && displayDoctors.length === 0 && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-gray-600 text-lg">No doctors found</p>
              <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Doctor Cards Grid */}
          {!isLoading && displayDoctors.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayDoctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctor/${doctor.id}`}
                className="group flex h-full flex-col bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Doctor Avatar */}
                <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                  <div className="w-24 h-24 bg-[#2F80ED] rounded-full flex items-center justify-center text-white text-3xl font-bold">
                    {getInitials(doctor.name)}
                  </div>
                  
                  {/* Available Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Available
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-[#2F80ED] font-medium mb-3">{formatSpecialty(doctor.specialty)}</p>
                  
                  {/* Additional Info */}
                  <div className="space-y-2 mb-4">
                    {doctor.experience && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>{doctor.experience} experience</span>
                      </div>
                    )}
                    {doctor.hospital && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <span className="truncate">{doctor.hospital}</span>
                      </div>
                    )}
                    {doctor.bio && (
                      <p className="text-sm text-gray-500 line-clamp-3 mt-2">{doctor.bio}</p>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex gap-2 mt-auto">
                    <span className="flex-1 bg-[#2F80ED] text-white py-2.5 rounded-lg font-medium transition-colors text-sm text-center group-hover:bg-[#2563EB]">
                      View Profile
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            </div>
          )}

          {/* Pagination */}
          {/* <div className="flex justify-center items-center gap-2 mt-12">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Previous
            </button>
            <button className="px-4 py-2 bg-[#2F80ED] text-white rounded-lg">1</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">2</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">3</button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div> */}
        </div>
      </section>

      <Footer />
    </div>
  );
}
