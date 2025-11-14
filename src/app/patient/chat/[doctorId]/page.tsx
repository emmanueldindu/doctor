'use client';

import PatientSidebar from '@/components/PatientSidebar';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/api';
import toast, { Toaster } from 'react-hot-toast';
import { useSocket } from '@/context/SocketContext';

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  message: string;
  timestamp: string;
  isRead: boolean;
}

interface DoctorInfo {
  id: string;
  name: string;
  specialty: string;
}

export default function PatientChatRoom() {
  const router = useRouter();
  const params = useParams();
  const doctorId = params.doctorId as string;
  const { socket, isConnected } = useSocket();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState<DoctorInfo | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentUserId, setCurrentUserId] = useState('');

  // Listen for incoming messages
  useEffect(() => {
    if (!socket) return;

    const handleMessageReceive = (data: any) => {
      if (data.senderId === doctorId) {
        const newMsg: Message = {
          id: Date.now().toString(),
          senderId: data.senderId,
          receiverId: currentUserId,
          message: data.message,
          timestamp: data.timestamp,
          isRead: false,
        };
        setMessages((prev) => [...prev, newMsg]);
      }
    };

    socket.on('message:receive', handleMessageReceive);

    return () => {
      socket.off('message:receive', handleMessageReceive);
    };
  }, [socket, doctorId, currentUserId]);

  useEffect(() => {
    fetchDoctorInfo();
    fetchCurrentUser();
    fetchMessages();
  }, [doctorId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get('/users/me');
      setCurrentUserId(response.data.id);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  const fetchDoctorInfo = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/doctors/${doctorId}`);
      setDoctor({
        id: response.data.id,
        name: response.data.name,
        specialty: response.data.specialty,
      });
    } catch (error: any) {
      console.error('Error fetching doctor info:', error);
      toast.error('Failed to load doctor information');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await api.get(`/messages/conversation/${doctorId}`);
      const fetchedMessages = response.data.map((msg: any) => ({
        id: msg.id,
        senderId: msg.senderId,
        receiverId: msg.receiverId,
        message: msg.message,
        timestamp: msg.createdAt,
        isRead: msg.isRead,
      }));
      setMessages(fetchedMessages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;

    try {
      setSending(true);
      
      // Send message via API
      const response = await api.post('/messages', {
        receiverId: doctorId,
        message: newMessage,
      });

      // Add message to local state
      const sentMessage: Message = {
        id: response.data.id,
        senderId: currentUserId,
        receiverId: doctorId,
        message: newMessage,
        timestamp: response.data.createdAt,
        isRead: false,
      };
      
      setMessages([...messages, sentMessage]);
      setNewMessage('');
      
      // Emit socket event for real-time delivery
      if (socket && isConnected) {
        socket.emit('message:send', {
          receiverId: doctorId,
          message: newMessage,
        });
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message');
    } finally {
      setSending(false);
    }
  };

  const formatSpecialty = (specialty: string) => {
    if (!specialty) return '';
    return specialty
      .split('_')
      .map(word => word.charAt(0) + word.slice(1).toLowerCase())
      .join(' ');
  };

  const getInitials = (name: string) => {
    if (!name) return 'D';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-gray-50">
        <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2F80ED] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading chat...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-center" />
      <PatientSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 px-4 py-4 lg:px-8">
          <div className="flex items-center gap-4">
            {/* Back Button */}
            <button
              onClick={() => router.push('/patient/chat')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Doctor Info */}
            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 bg-[#2F80ED] rounded-full flex items-center justify-center text-white font-semibold">
                {doctor ? getInitials(doctor.name) : 'D'}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{doctor?.name || 'Doctor'}</h2>
                <p className="text-sm text-gray-600">{doctor?.specialty ? formatSpecialty(doctor.specialty) : ''}</p>
              </div>
            </div>

            {/* More Options */}
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto space-y-4">
            {messages.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No messages yet</h3>
                <p className="text-gray-600">Start a conversation with {doctor?.name}</p>
              </div>
            ) : (
              messages.map((message, index) => {
                const isOwnMessage = message.senderId === currentUserId;
                const showDate = index === 0 || 
                  formatMessageDate(messages[index - 1].timestamp) !== formatMessageDate(message.timestamp);

                return (
                  <div key={message.id}>
                    {showDate && (
                      <div className="flex justify-center my-4">
                        <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                          {formatMessageDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'order-2' : 'order-1'}`}>
                        <div
                          className={`px-4 py-2 rounded-2xl ${
                            isOwnMessage
                              ? 'bg-[#2F80ED] text-white rounded-br-none'
                              : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                          }`}
                        >
                          <div className="flex items-end gap-2">
                            <p className="text-sm break-words flex-1">{message.message}</p>
                            <span className={`text-xs flex-shrink-0 ${
                              isOwnMessage ? 'text-blue-100' : 'text-gray-500'
                            }`}>
                              {formatMessageTime(message.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4 lg:px-8">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
            <div className="flex items-center items-end gap-3">
              {/* Attachment Button */}
              <button
                type="button"
                className="p-3 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
              </button>

              {/* Text Input */}
              <div className="flex-1">
                <textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage(e);
                    }
                  }}
                  placeholder="Type a message..."
                  rows={1}
                  className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#2F80ED] focus:border-transparent outline-none transition-all resize-none"
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!newMessage.trim() || sending}
                className="p-3 bg-[#2F80ED] text-white rounded-lg hover:bg-[#2563EB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <svg className="animate-spin h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
