import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('blakmarket_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication - check if email ends with @kiit.ac.in
    if (!email.endsWith('@kiit.ac.in')) {
      return false;
    }

    // Mock user data
    const mockUser: User = {
      id: '1',
      name: email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email,
      studentId: '21052' + Math.floor(Math.random() * 10000),
      department: 'Computer Science',
      semester: Math.floor(Math.random() * 8) + 1,
      points: Math.floor(Math.random() * 1000) + 100,
      rating: 4.2 + Math.random() * 0.8,
      reviewCount: Math.floor(Math.random() * 50) + 5,
      verified: true,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
    };

    setUser(mockUser);
    localStorage.setItem('blakmarket_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (userData: Partial<User> & { email: string; password: string }): Promise<boolean> => {
    // Check KIIT email domain
    if (!userData.email.endsWith('@kiit.ac.in')) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name || userData.email.split('@')[0].replace(/\./g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      email: userData.email,
      studentId: userData.studentId || '21052' + Math.floor(Math.random() * 10000),
      department: userData.department || 'Computer Science',
      semester: userData.semester || 1,
      points: 50, // Starting points
      rating: 0,
      reviewCount: 0,
      verified: false,
      joinedDate: new Date().toISOString(),
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
    };

    setUser(newUser);
    localStorage.setItem('blakmarket_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('blakmarket_user');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('blakmarket_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
};