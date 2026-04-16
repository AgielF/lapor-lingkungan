import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar';

// HARDCODE: Pastikan ini sama dengan baseURL di axios
const API_BASE = "/api";

export default function LaporankuPage() {
  const [laporans, setLaporans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaporanku();
  }, []);

  const fetchLaporanku = async () => {
    try {
      const res = await api.get('/laporanku'); // Ini akan menjadi /api/laporanku
      setLaporans(res.data?.data || []);
    } catch (err) {
      console.error(err);
      setLaporans([]);
      alert('Gagal mengambil data laporan');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Sakti untuk menangani URL Gambar
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x300?text=Tanpa+Foto";
    
    // Jika sudah URL penuh (GCS), langsung tampilkan
    if (url.startsWith('http')) return url;
    
    // Jika path lama (uploads/...), paksa lewat /api/ agar Nginx yang urus
    return `${API_BASE}/${url}`.replace(/([^:]\/)\/+/g, "$1");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Riwayat Laporan Saya</h1>
        
        {loading ? (
          <div className="text-center py-10 text-slate-500 font-medium">Memuat data dari server...</div>
        ) : laporans.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <p className="text-slate-400 text-lg">Anda belum memiliki riwayat laporan.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {laporans.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-slate-800">{item.kategori}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                    item.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'Ditolak' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status || 'Terkirim'}
                  </span>
                </div>
                
                <div className="relative overflow-hidden rounded-xl mb-4 bg-slate-50 aspect-video flex items-center justify-center">
                  <img 
                    src={getImageUrl(item.foto_url)}
                    alt="Bukti Laporan" 
                    className="w-full h-full object-cover"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Gagal+Memuat+Gambar" }}
                  />
                </div>
                
                <div className="text-sm text-slate-600 font-mono bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <div className="flex justify-between">
                    <span>Lat: {item.latitude?.toFixed(5)}</span>
                    <span>Lng: {item.longitude?.toFixed(5)}</span>
                  </div>
                </div>
                
                <div className="text-[10px] uppercase tracking-wider text-slate-400 text-right font-bold">
                  Dibuat pada: {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}