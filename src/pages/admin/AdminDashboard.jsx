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
      const res = await api.get('/admin/semua-laporan');
      setLaporans(res.data.data);
    } catch (err) {
      alert('Gagal mengambil data laporan admin');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, statusBaru) => {
    try {
      await api.put(`/admin/laporan/${id}/status`, { status: statusBaru });
      alert('Status berhasil diperbarui!');
      fetchSemuaLaporan(); // Refresh data
    } catch (err) {
      alert('Gagal update status');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-800 mb-6">Dashboard Admin</h1>
        
        {loading ? (
          <p>Memuat data...</p>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 text-slate-800 uppercase font-bold">
                <tr>
                  <th className="px-6 py-4 border-b">ID / Tgl</th>
                  <th className="px-6 py-4 border-b">Kategori</th>
                  <th className="px-6 py-4 border-b">Foto</th>
                  <th className="px-6 py-4 border-b">Koordinat</th>
                  <th className="px-6 py-4 border-b">Aksi Status</th>
                </tr>
              </thead>
              <tbody>
                {laporans.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-slate-50">
                    <td className="px-6 py-4">
                      #{item.id} <br/>
                      <span className="text-xs text-slate-400">{new Date(item.created_at).toLocaleDateString()}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-slate-800">{item.kategori}</td>
                    <td className="px-6 py-4">
                      {item.foto_url ? (
                        <a href={`http://localhost:8080/${item.foto_url}`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                          Lihat Foto
                        </a>
                      ) : '-'}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs">
                      {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}
                    </td>
                    <td className="px-6 py-4">
                      <select 
                        className="p-2 border border-slate-300 rounded-lg focus:ring-2 outline-none cursor-pointer"
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