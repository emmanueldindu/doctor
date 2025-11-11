import Image from "next/image";
import Team from '@/assets/images/team.png';

export default function HealthcareTeam() {
  return (
    <section className="px-6 lg:px-20 py-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Team Image */}
          <div className="relative">
            {/* Team Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <Image 
                src={Team} 
                alt="Healthcare team of professional doctors" 
                width={600} 
                height={400}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </div>

          {/* Right Content - Text and Statistics */}
          <div className="space-y-8">
            {/* Rating Badge */}
            <div className="flex items-center space-x-2 text-[#2F80ED]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-medium">Rated #1 for appointments with many professional doctors</span>
            </div>

            {/* Main Description */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                We&apos;re revolutionizing healthcare with seamless access to trusted professionals, prioritizing your journey to better health.
              </h2>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-8">
              {/* Dedicated Doctors */}
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-[#2F80ED] mb-2">40+</div>
                <div className="text-gray-600 font-medium">Dedicated Doctors</div>
              </div>

              {/* Hours of Patient Consultations */}
              <div className="text-center lg:text-left">
                <div className="text-4xl lg:text-5xl font-bold text-[#2F80ED] mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Hours of Patient Consultations</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
