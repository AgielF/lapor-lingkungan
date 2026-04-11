import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/axiosInstance';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nama: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.post('/register', formData);
      alert('Pendaftaran berhasil! Silakan login.');
      navigate('/login'); // Arahkan ke halaman login
    } catch (err) {
      setError(err.response?.data?.message || 'Terjadi kesalahan saat mendaftar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-600">Daftar Akun</h1>
          <p className="text-slate-500 mt-2">Bergabung untuk mulai melapor.</p>
        </div>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-lg mb-4 text-sm font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
            <input 
              type="text" required
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Budi Santoso"
              onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
            <input 
              type="email" required
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="budi@gmail.com"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1">Password</label>
            <input 
              type="password" required minLength="6"
              className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
              placeholder="Minimal 6 karakter"
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition disabled:bg-blue-300"
          >
            {loading ? 'Memproses...' : 'Daftar Sekarang'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-slate-600">
          Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Masuk di sini</Link>
        </p>
      </div>
    </div>
  );
}