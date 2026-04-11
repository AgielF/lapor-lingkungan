import React, { useEffect, useState } from 'react';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar';

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
      alert('Gagal mengambil data laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Riwayat Laporan Saya</h1>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : laporans.length === 0 ? (
          <p className="text-slate-500">Anda belum pernah membuat laporan.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {laporans.map((item) => (
              <div key={item.id} className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-lg text-slate-800">{item.kategori}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === 'Selesai' ? 'bg-green-100 text-green-700' :
                    item.status === 'Diproses' ? 'bg-yellow-100 text-yellow-700' :
                    item.status === 'Ditolak' ? 'bg-red-100 text-red-700' :
                    'bg-blue-100 text-blue-700' // Terkirim
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {item.foto_url && (
                  <img 
                    src={`http://localhost:8080/${item.foto_url}`} 
                    alt="Bukti Laporan" 
                    className="w-full h-48 object-cover rounded-lg mb-3 bg-slate-100"
                  />
                )}
                
                <div className="text-sm text-slate-600 font-mono bg-slate-50 p-2 rounded">
                  Lat: {item.latitude.toFixed(5)} <br/>
                  Lng: {item.longitude.toFixed(5)}
                </div>
                <div className="text-xs text-slate-400 mt-3 text-right">
                  Dilaporkan: {new Date(item.created_at).toLocaleDateString('id-ID')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}