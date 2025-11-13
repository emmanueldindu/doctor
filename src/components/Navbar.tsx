'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/services/auth.service';
import { useLogout } from '@/hooks/useAuth';

export default function Navbar() {
  const router = useRouter();
  const logout = useLogout();
  const [user, setUser] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    
    // Listen for storage changes (logout from other tabs)
    const handleStorageChange = () => {
      const updatedUser = authService.getCurrentUser();
      setUser(updatedUser);
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    return user.role === 'PATIENT' ? '/patient/dashboard' : '/doctor/dashboard';
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    setShowDropdown(false);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 lg:px-20">
      <Link href="/" className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-[#2F80ED] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <span className="text-xl font-semibold text-[#2F80ED]">MedEase</span>
      </Link>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/" className="text-[#2F80ED] font-medium">Home</Link>
        <Link href="/find-doctor" className="text-gray-600 hover:text-[#2F80ED] transition-colors">Find a Doctor</Link>
        <Link href="/about" className="text-gray-600 hover:text-[#2F80ED] transition-colors">About Us</Link>
      </div>
      
      {user ? (
        <div className="flex items-center space-x-4">
          <Link 
            href={getDashboardLink()}
            className="hidden md:block text-[#2F80ED] font-medium hover:underline"
          >
            Go to Dashboard
          </Link>
          
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-semibold hover:bg-[#2563EB] transition-colors"
            >
              {getInitials(user.name)}
            </button>
            
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Link
                  href={getDashboardLink()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href={user.role === 'PATIENT' ? '/patient/profile' : '/doctor/profile'}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setShowDropdown(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Link href="/register/patient" className="bg-[#2F80ED] text-white px-6 py-2 rounded-full font-medium hover:bg-[#2563EB] transition-colors">
          Register
        </Link>
      )}
    </nav>
  );
}
