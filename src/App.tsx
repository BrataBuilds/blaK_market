import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { MarketplaceProvider } from './contexts/MarketplaceContext';
import Layout from './components/Layout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Marketplace from './pages/Marketplace';
import Messages from './pages/Messages';
import Wishlist from './pages/Wishlist';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import Help from './pages/Help';
import Footer from './components/Footer';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
};

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }
  
  return user ? <Navigate to="/marketplace" /> : <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <MarketplaceProvider>
        <Router>
          <div className="min-h-screen bg-gray-900 flex flex-col">
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              <Route path="/help" element={<Help />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }>
                <Route path="marketplace" element={<Marketplace />} />
                <Route path="messages" element={<Messages />} />
                <Route path="wishlist" element={<Wishlist />} />
                <Route path="profile" element={<Profile />} />
                <Route path="dashboard" element={<Dashboard />} />
              </Route>
            </Routes>
            <Footer />
          </div>
        </Router>
      </MarketplaceProvider>
    </AuthProvider>
  );
}

export default App;