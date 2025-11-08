import Image from "next/image";
import Hero from '@/assets/images/hero.png';

export default function HeroSection() {
  return (
    <main className="px-6 lg:px-20 py-12">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8">
          {/* Rating Badge */}
          <div className="flex items-center space-x-2 text-[#2F80ED]">
            <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="text-sm font-medium">Rated #1 choice for healthcare appointments by users</span>
          </div>

          {/* Main Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Connecting You <span className="italic text-[#2F80ED]">to</span>
              <br />
              Better Health
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              We're here to link you directly to improved health outcomes, 
              effortlessly connecting you with the care you need.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-[#2F80ED] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2563EB] transition-colors">
              Book Consultation
            </button>
            <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-full font-medium hover:border-[#2F80ED] hover:text-[#2F80ED] transition-colors flex items-center justify-center space-x-2">
              <span>Learn More</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Content - Doctor Image and Stats */}
        <div className="relative">
       

          {/* Hero Image */}
          <div className="relative rounded-2xl overflow-hidden">
            <Image
              src={Hero}
              alt="Healthcare professional with laptop"
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
