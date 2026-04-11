import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import semua halaman
import LandingPage from './pages/LandingPage'; // <-- Tambahkan import ini
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import LaporPage from './pages/LaporPage';
import LaporankuPage from './pages/LaporankuPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

const GuestRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (token) {
    return <Navigate to={role === 'admin' ? "/admin" : "/lapor"} replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rute Bebas Publik */}
        <Route path="/" element={<LandingPage />} /> {/* <-- Landing Page di sini */}
        
        {/* Rute Tamu (Login & Register) */}
        <Route path="/login" element={<GuestRoute><LoginPage /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><RegisterPage /></GuestRoute>} />
        
        {/* Rute Warga */}
        <Route path="/lapor" element={<ProtectedRoute><LaporPage /></ProtectedRoute>} />
        <Route path="/laporanku" element={<ProtectedRoute><LaporankuPage /></ProtectedRoute>} />

        {/* Rute Khusus Admin */}
        <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        {/* Fallback URL: Jika salah ketik, kembali ke Landing Page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;