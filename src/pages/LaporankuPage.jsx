import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar';

// Ambil Base URL dari .env (Vite)
const API_BASE = "/api";

export default function LaporankuPage() {
  const [laporans, setLaporans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLaporanku();
  }, []);

  const fetchLaporanku = async () => {
    try {
      const res = await api.get('/laporanku');
      setLaporans(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data laporan');
    } finally {
      setLoading(false);
    }
  };

  // Fungsi Sakti untuk menangani URL Gambar
  const getImageUrl = (url) => {
    if (!url) return "https://via.placeholder.com/400x300?text=Tanpa+Foto";
    
    // Jika sudah URL penuh (GCS), langsung return
    if (url.startsWith('http')) return url;
    
    // Jika masih path lama (uploads/...), tambahkan prefix API
    // Pastikan tidak ada double slash //
    return `${API_BASE}/${url}`.replace(/([^:]\/)\/+/g, "$1");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Riwayat Laporan Saya</h1>
        
        {loading ? (
          <div className="text-center py-10 text-slate-500">Memuat data...</div>
        ) : laporans.length === 0 ? (
          <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
            <p className="text-slate-500">Anda belum pernah membuat laporan.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {laporans.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-bold text-lg text-slate-800">{item.kategori}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                    item.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'Ditolak' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {/* Image Section dengan Error Handling */}
                <div className="relative group overflow-hidden rounded-lg mb-4">
                  <img 
                    src={getImageUrl(item.foto_url)}
                    alt={`Bukti ${item.kategori}`} 
                    className="w-full h-52 object-cover bg-slate-100 group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/400x300?text=Gambar+Tidak+Ditemukan" }}
                  />
                </div>
                
                <div className="text-sm text-slate-600 font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
                  <span className="text-slate-400">Lokasi:</span> <br/>
                  Lat: {item.latitude?.toFixed(5)} <br/>
                  Lng: {item.longitude?.toFixed(5)}
                </div>
                
                <div className="text-xs text-slate-400 mt-4 flex justify-between items-center border-t pt-3">
                  <span>ID: #{item.id}</span>
                  <span>Dilaporkan: {new Date(item.created_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}