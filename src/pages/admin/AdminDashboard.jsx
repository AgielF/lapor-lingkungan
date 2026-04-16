import React, { useEffect, useState } from 'react';
import api from '../../api/axiosInstance';
import Navbar from '../../components/Navbar';

export default function AdminDashboard() {
  const [laporans, setLaporans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSemuaLaporan();
  }, []);

  const fetchSemuaLaporan = async () => {
    try {
      // Akan menembak ke /api/admin/semua-laporan
      const res = await api.get('/admin/semua-laporan');
      setLaporans(res.data?.data || []);
    } catch (err) {
      console.error(err);
      alert('Gagal mengambil data laporan admin');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, statusBaru) => {
    try {
      // Akan menembak ke /api/admin/laporan/:id/status
      await api.put(`/admin/laporan/${id}/status`, { status: statusBaru });
      alert('Status berhasil diperbarui!');
      fetchSemuaLaporan(); 
    } catch (err) {
      alert('Gagal update status');
    }
  };

  // Helper untuk URL Gambar (Sama dengan LaporankuPage)
  const getImageUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) return url; // Jika URL GCS
    return `/api/${url}`.replace(/([^:]\/)\/+/g, "$1"); // Jika URL lokal (lewat proxy /api)
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-extrabold text-slate-800">Dashboard Admin 🛠️</h1>
          <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-bold text-sm">
            Total: {laporans.length} Laporan
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-20 text-slate-500 font-medium">Memproses data laporan...</div>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-800 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-4 border-b">ID / Tanggal</th>
                  <th className="px-6 py-4 border-b">Kategori</th>
                  <th className="px-6 py-4 border-b text-center">Bukti Foto</th>
                  <th className="px-6 py-4 border-b">Lokasi</th>
                  <th className="px-6 py-4 border-b text-center">Ubah Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {laporans.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">#{item.id}</span> <br/>
                      <span className="text-[10px] text-slate-400 font-mono">{new Date(item.created_at).toLocaleString('id-ID')}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-slate-100 px-3 py-1 rounded-full text-xs font-semibold text-slate-600">
                        {item.kategori}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      {item.foto_url ? (
                        <a 
                          href={getImageUrl(item.foto_url)} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-bold decoration-2 underline-offset-4 hover:underline"
                        >
                          Lihat Bukti ↗
                        </a>
                      ) : <span className="text-slate-300">Tanpa Foto</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-mono text-[10px] bg-slate-50 p-2 rounded border border-slate-100 inline-block">
                        {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <select 
                        className={`p-2 border rounded-xl font-bold text-xs outline-none transition cursor-pointer ${
                          item.status === 'Selesai' ? 'bg-green-50 text-green-700 border-green-200' :
                          item.status === 'Ditolak' ? 'bg-red-50 text-red-700 border-red-200' :
                          item.status === 'Diproses' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                          'bg-blue-50 text-blue-700 border-blue-200'
                        }`}
                        value={item.status}
                        onChange={(e) => updateStatus(item.id, e.target.value)}
                      >
                        <option value="Terkirim">Terkirim</option>
                        <option value="Diproses">Diproses</option>
                        <option value="Selesai">Selesai</option>
                        <option value="Ditolak">Ditolak</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}