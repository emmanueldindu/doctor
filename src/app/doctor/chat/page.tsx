'use client';

import DoctorSidebar from '@/components/DoctorSidebar';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';

interface ChatContact {
  id: string;
  patientId: string;
  patientName: string;
  patientGender: string;
  lastAppointmentDate: string;
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount?: number;
}

export default function DoctorChat() {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ChatContact[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchChatContacts();
  }, []);

  const fetchChatContacts = async () => {
    try {
      setLoading(true);
      // Fetch confirmed appointments to get list of patients
      const response = await api.get('/appointments/doctor/my-appointments');
      const appointments = response.data;

      // Filter confirmed appointments and group by patient
      const confirmedAppointments = appointments.filter(
        (apt: any) => apt.status === 'CONFIRMED' || apt.status === 'COMPLETED'
      );

      // Create unique patient contacts and fetch last message for each
      const patientMap = new Map();
      const contactPromises = confirmedAppointments.map(async (apt: any) => {
        if (!patientMap.has(apt.patientId)) {
          patientMap.set(apt.patientId, true);
          
          try {
            // Fetch last message for this patient
            const messagesResponse = await api.get(`/messages/conversation/${apt.patientId}`);
            const messages = messagesResponse.data;
            const lastMsg = messages.length > 0 ? messages[messages.length - 1] : null;
            
            return {
              id: apt.id,
              patientId: apt.patientId,
              patientName: apt.patient?.name || 'Patient',
              patientGender: apt.patient?.gender || '',
              lastAppointmentDate: apt.appointmentDate,
              lastMessage: lastMsg?.message || '',
              lastMessageTime: lastMsg?.createdAt || apt.appointmentDate,
              unreadCount: 0, // TODO: Implement with socket
            };
          } catch (error) {
            return {
              id: apt.id,
              patientId: apt.patientId,
              patientName: apt.patient?.name || 'Patient',
              patientGender: apt.patient?.gender || '',
              lastAppointmentDate: apt.appointmentDate,
              lastMessage: '',
              lastMessageTime: apt.appointmentDate,
              unreadCount: 0,
            };
          }
        }
        return null;
      });

      const contactsData = await Promise.all(contactPromises);
      const validContacts = contactsData.filter(c => c !== null);
      setContacts(validContacts);
    } catch (error: any) {
      console.error('Error fetching chat contacts:', error);
      if (error.response?.status === 401) {
        toast.error('Please login to view chats');
        setTimeout(() => router.push('/login'), 1500);
      } else {
        toast.error('Failed to load chat contacts');
      }
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    if (!name) return 'P';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const diffTime = today.getTime() - messageDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      // Today - show time
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      // This week - show day name
      return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      // Older - show date
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChatClick = (contact: ChatContact) => {
    router.push(`/doctor/chat/${contact.patientId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <DoctorSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 p-4 lg:p-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Messages</h1>
            </div>
            <p className="text-gray-600">Chat with your patients</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search patients..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-black pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED] mx-auto mb-4"></div>
                  <p className="text-gray-600">Loading chats...</p>
                </div>
              </div>
            ) : filteredContacts.length === 0 ? (
              <div className="text-center py-12 px-4">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {searchQuery ? 'No patients found' : 'No chats yet'}
                </h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery
                    ? 'Try searching with a different name'
                    : 'You will see your patients here once you have confirmed appointments'}
                </p>
                {!searchQuery && (
                  <button
                    onClick={() => router.push('/doctor/appointments')}
                    className="px-6 py-2 bg-[#2F80ED] text-white rounded-lg font-medium hover:bg-[#2563EB] transition-colors"
                  >
                    View Appointments
                  </button>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {filteredContacts.map((contact) => (
                  <div
                    key={contact.id}
                    onClick={() => handleChatClick(contact)}
                    className="flex items-center gap-4 p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {getInitials(contact.patientName)}
                      </div>
                      {contact.unreadCount && contact.unreadCount > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {contact.unreadCount}
                        </div>
                      )}
                    </div>

                    {/* Contact Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-900 truncate">
                          {contact.patientName}
                        </h3>
                        <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                          {formatDate(contact.lastMessageTime || contact.lastAppointmentDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600 truncate flex-1">
                          {contact.lastMessage || (contact.patientGender ? `${contact.patientGender.charAt(0) + contact.patientGender.slice(1).toLowerCase()} Patient` : 'Patient')}
                        </p>
                        {contact.unreadCount && contact.unreadCount > 0 && (
                          <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold ml-2 flex-shrink-0">
                            {contact.unreadCount}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
