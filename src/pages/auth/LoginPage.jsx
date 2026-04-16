import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // 1. Kirim data ke /api/login (baseURL sudah diatur di axiosInstance)
      const res = await api.post('/login', formData);
      
      // 2. Ambil data dari response backend Go
      const { token, user } = res.data.data;
      const userRole = user.role;

      // 3. Simpan data ke LocalStorage untuk pengecekan ProtectedRoute & AdminRoute
      localStorage.setItem('token', token);
      localStorage.setItem('role', userRole);
      
      // 4. Integrasi Navigasi Berdasarkan Role
      if (userRole === 'admin') {
        // Jika admin, tendang ke dashboard admin
        navigate('/admin');
      } else {
        // Jika warga/user biasa, tendang ke halaman lapor
        navigate('/lapor');
      }

    } catch (err) {
      console.error("Login Error:", err);
      // Menangani berbagai jenis error response
      const message = err.response?.data?.message || 'Email atau password salah. Silakan coba lagi.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4 font-sans">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-10">
          <div className="inline-block p-4 bg-blue-50 rounded-2xl mb-4">
            <span className="text-4xl">👋</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Selamat Datang</h1>
          <p className="text-slate-500 mt-2 font-medium">Masuk untuk mulai berkontribusi menjaga lingkungan.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl mb-6 text-sm font-bold flex items-center">
             <span className="mr-2">⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">Alamat Email</label>
            <input 
              type="email" 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-all font-medium"
              placeholder="nama@email.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-700 uppercase tracking-widest mb-2">Kata Sandi</label>
            <input 
              type="password" 
              required
              className="w-full p-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:ring-0 outline-none transition-all font-medium"
              placeholder="••••••••"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 disabled:bg-blue-300 disabled:shadow-none uppercase tracking-widest text-sm"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mengecek...
              </span>
            ) : 'Masuk Sekarang'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500 font-medium">
            Belum punya akun? <Link to="/register" className="text-blue-600 font-bold hover:text-blue-800 transition">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </div>
  );
}