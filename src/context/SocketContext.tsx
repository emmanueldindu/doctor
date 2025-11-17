'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  sendMessage: (receiverId: string, message: string) => void;
  onMessageReceive: (callback: (data: any) => void) => void;
  offMessageReceive: (callback: (data: any) => void) => void;
  markAsRead: (senderId: string) => void;
  onUserOnline: (callback: (data: { userId: string }) => void) => void;
  onUserOffline: (callback: (data: { userId: string }) => void) => void;
}

const SocketContext = createContext<SocketContextType | null>(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('token');
    
    if (!token) {
      return;
    }

    // Initialize socket connection
    // Remove /api from the URL for Socket.IO connection
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 
                      process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 
                      'http://localhost:5050';
    
    const socketInstance = io(socketUrl, {
      auth: {
        token,
      },
      transports: ['websocket', 'polling'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Socket disconnected');
      setIsConnected(false);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const sendMessage = useCallback((receiverId: string, message: string) => {
    if (socket && isConnected) {
      socket.emit('message:send', { receiverId, message });
    }
  }, [socket, isConnected]);

  const onMessageReceive = useCallback((callback: (data: any) => void) => {
    if (socket) {
      socket.on('message:receive', callback);
    }
  }, [socket]);

  const offMessageReceive = useCallback((callback: (data: any) => void) => {
    if (socket) {
      socket.off('message:receive', callback);
    }
  }, [socket]);

  const markAsRead = useCallback((senderId: string) => {
    if (socket && isConnected) {
      socket.emit('message:read', { senderId });
    }
  }, [socket, isConnected]);

  const onUserOnline = useCallback((callback: (data: { userId: string }) => void) => {
    if (socket) {
      socket.on('user:online', callback);
    }
  }, [socket]);

  const onUserOffline = useCallback((callback: (data: { userId: string }) => void) => {
    if (socket) {
      socket.on('user:offline', callback);
    }
  }, [socket]);

  const value: SocketContextType = {
    socket,
    isConnected,
    sendMessage,
    onMessageReceive,
    offMessageReceive,
    markAsRead,
    onUserOnline,
    onUserOffline,
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
};
