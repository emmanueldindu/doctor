import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 lg:px-20">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#2F80ED] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xl font-semibold text-[#2F80ED]">MedEase</span>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-[#2F80ED] font-medium">Home</Link>
     
        <Link href="/find-doctor" className="text-gray-600 hover:text-[#2F80ED] transition-colors">Find a Doctor</Link>
        <Link href="/about" className="text-gray-600 hover:text-[#2F80ED] transition-colors">About Us</Link>
      </div>
      
      <Link href="/register/patient" className="bg-[#2F80ED] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2563EB] transition-colors">
        Register
      </Link>
    </nav>
  );
}
