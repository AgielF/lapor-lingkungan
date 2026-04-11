import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="font-extrabold text-2xl text-blue-600 flex items-center gap-2">
        <span>🌱</span> LaporLingkungan
      </div>
      
      {/* Menu Navigasi Sederhana */}
      <div className="flex items-center gap-6">
        {role === 'admin' ? (
          <Link to="/admin" className="font-bold text-slate-600 hover:text-blue-600">Dashboard Admin</Link>
        ) : (
          <>
            <Link to="/lapor" className="font-bold text-slate-600 hover:text-blue-600">Buat Laporan</Link>
            <Link to="/laporanku" className="font-bold text-slate-600 hover:text-blue-600">Riwayat Saya</Link>
          </>
        )}
        
        <button 
          onClick={handleLogout} 
          className="px-4 py-2 bg-red-50 text-red-600 hover:bg-red-500 hover:text-white rounded-lg font-bold transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}