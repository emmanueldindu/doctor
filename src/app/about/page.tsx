import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="px-6 py-16 lg:px-20 lg:py-24 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-[#2F80ED]">MedEase</span>
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            We&apos;re revolutionizing healthcare by making quality medical services accessible, 
            affordable, and convenient for everyone. Our mission is to bridge the gap between 
            patients and healthcare providers through innovative technology.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 py-16 lg:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              To empower individuals with seamless access to healthcare services, 
              connecting them with qualified medical professionals and providing 
              comprehensive health solutions at their fingertips.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="w-16 h-16 bg-[#2F80ED] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h2>
            <p className="text-gray-600 leading-relaxed">
              To become the leading healthcare platform that transforms the way people 
              experience medical care, making quality healthcare a fundamental right 
              accessible to all, regardless of location or circumstance.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="px-6 py-16 lg:px-20 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
          <div className="bg-white p-8 lg:p-12 rounded-2xl shadow-lg">
            <p className="text-gray-600 leading-relaxed mb-6">
              MedEase was founded with a simple yet powerful idea: healthcare should be 
              accessible to everyone, everywhere. We noticed that many people struggled 
              to find reliable medical information, connect with the right healthcare 
              providers, and manage their health effectively.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Our team of healthcare professionals, technologists, and innovators came 
              together to create a platform that addresses these challenges. We&apos;ve built 
              a comprehensive ecosystem that connects patients with verified doctors, 
              provides reliable health information, and offers convenient appointment 
              scheduling.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, we&apos;re proud to serve thousands of users, partnering with healthcare 
              providers across multiple specialties to deliver exceptional care and support 
              to our community.
            </p>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-16 lg:px-20">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Trust & Safety</h3>
              <p className="text-gray-600">
                We prioritize patient safety and data security, ensuring all healthcare 
                providers are verified and qualified.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously evolve our platform with cutting-edge technology to 
                improve healthcare delivery.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[#2F80ED]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Compassion</h3>
              <p className="text-gray-600">
                We approach every interaction with empathy, understanding the importance 
                of quality healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-16 lg:px-20 bg-[#2F80ED]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Verified Doctors</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">10K+</div>
              <div className="text-blue-100">Happy Patients</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Specialties</div>
            </div>
            <div>
              <div className="text-4xl lg:text-5xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
