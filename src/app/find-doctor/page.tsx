import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';

export default function FindDoctor() {
  // Dummy doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Richard James',
      specialty: 'Cardiologist',
      image: '/doctors/doctor-1.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '15 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-green-400 to-green-500'
    },
    {
      id: 2,
      name: 'Dr. Sarah Mitchell',
      specialty: 'Dermatologist',
      image: '/doctors/doctor-2.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '12 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-purple-500 to-purple-600'
    },
    {
      id: 3,
      name: 'Dr. Michael Chen',
      specialty: 'Pediatrician',
      image: '/doctors/doctor-3.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '18 years',
      status: 'Busy',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-orange-300 to-orange-400'
    },
    {
      id: 4,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Neurologist',
      image: '/doctors/doctor-4.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '10 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-blue-400 to-blue-500'
    },
    {
      id: 5,
      name: 'Dr. David Thompson',
      specialty: 'Orthopedic',
      image: '/doctors/doctor-5.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '20 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-pink-400 to-pink-500'
    },
    {
      id: 6,
      name: 'Dr. Jessica Park',
      specialty: 'Psychiatrist',
      image: '/doctors/doctor-6.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '14 years',
      status: 'Offline',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-teal-400 to-teal-500'
    },
    {
      id: 7,
      name: 'Dr. Robert Wilson',
      specialty: 'General Physician',
      image: '/doctors/doctor-7.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '8 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-indigo-400 to-indigo-500'
    },
    {
      id: 8,
      name: 'Dr. Amanda Lee',
      specialty: 'Gynecologist',
      image: '/doctors/doctor-8.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '16 years',
      status: 'Available',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-red-400 to-red-500'
    },
    {
      id: 9,
      name: 'Dr. James Anderson',
      specialty: 'Ophthalmologist',
      image: '/doctors/doctor-9.jpg',
      rating: 4.8,
      reviews: 272,
      experience: '11 years',
      status: 'Busy',
      location: 'Mount Adora Hospital, Sylhet',
      patients: 1500,
      bgColor: 'from-yellow-400 to-yellow-500'
    }
  ];

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
                placeholder="Search by name, specialty, or condition..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
            </div>
            <button className="bg-[#2F80ED] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2563EB] transition-colors">
              Search
            </button>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
              All Specialties
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
              Available Now
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
              Top Rated
            </button>
            <button className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm hover:bg-white/30 transition-colors">
              Near Me
            </button>
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="px-6 py-12 lg:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Available Doctors</h2>
              <p className="text-gray-600 mt-1">{doctors.length} doctors found</p>
            </div>
            
            {/* Sort Dropdown */}
          
          </div>

          {/* Doctor Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                href={`/doctor/${doctor.id}`}
                className="group block bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                {/* Doctor Image */}
                <div className="relative h-100 bg-gradient-to-br from-blue-100 to-blue-50">
                  <div className="absolute h-full w-full  inset- flex items-center justify-center">
                    <Image src={require('../../assets/images/doc-image.png')} alt={doctor.name}   className="w-full h-full bg-gray-200  flex items-center justify-center">
                      {/* <svg className="w-12 h-12 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /> */}
                      {/* </svg> */}
                    </Image>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doctor.status === 'Available'
                          ? 'bg-green-100 text-green-700'
                          : doctor.status === 'Busy'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {doctor.status}
                    </span>
                  </div>
                </div>

                {/* Doctor Info */}
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{doctor.name}</h3>
                  <p className="text-[#2F80ED] font-medium mb-2">{doctor.specialty}</p>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3 text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="ml-1 font-semibold text-gray-900 text-sm">{doctor.rating}</span>
                    </div>
                    <span className="text-gray-500 text-sm">({doctor.reviews} reviews)</span>
                  </div>

                  {/* Additional Info */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>{doctor.experience} experience</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <span className="flex-1 bg-[#2F80ED] text-white py-2 rounded-lg font-medium transition-colors text-sm text-center group-hover:bg-[#2563EB]">
                      Book Now
                    </span>
                  
                  </div>
                </div>
              </Link>
            ))}
          </div>

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
