import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar';
import 'leaflet/dist/leaflet.css';

// Fix Ikon Leaflet (Wajib untuk Vite)
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Deteksi Klik Peta
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

export default function LaporPage() {
  const [position, setPosition] = useState({ lat: -6.9147, lng: 107.6098 }); // Default: Bandung
  const [kategori, setKategori] = useState('Jalan Rusak');
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null); // Tambahan untuk Preview

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      setPreview(URL.createObjectURL(file)); // Buat URL sementara untuk preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      alert('Tolong unggah foto bukti laporan!');
      return;
    }

    setLoading(true);
    
    // FormData untuk mengirim file fisik
    const formData = new FormData();
    formData.append('kategori', kategori);
    formData.append('latitude', position.lat);
    formData.append('longitude', position.lng);
    formData.append('foto', foto);

    try {
      // Endpoint otomatis menjadi /api/lapor karena baseURL axios adalah /api
      const res = await api.post('/lapor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message || 'Laporan berhasil dikirim!');
      
      // Reset Form
      setFoto(null);
      setPreview(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Gagal mengirim laporan. Pastikan Anda sudah login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />

      <div className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="mb-8 border-b border-slate-100 pb-4 text-center md:text-left">
            <h1 className="text-3xl font-extrabold text-slate-800">Kirim Laporan 📢</h1>
            <p className="text-slate-500 mt-2">Laporkan masalah lingkungan di sekitar Bandung.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Kategori */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Pilih Kategori</label>
              <select 
                className="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition bg-slate-50"
                value={kategori} 
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="Jalan Rusak">Jalan Rusak</option>
                <option value="Sampah Menumpuk">Sampah Menumpuk</option>
                <option value="Fasilitas Publik">Fasilitas Publik Rusak</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Foto & Preview */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Unggah Foto Bukti</label>
              <div className="flex flex-col items-center p-4 border-2 border-dashed border-slate-300 rounded-xl hover:bg-slate-50 transition">
                <input 
                  type="file" accept="image/*"
                  className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                  onChange={handleFileChange}
                />
                {preview && (
                  <img src={preview} alt="Preview" className="mt-4 h-48 rounded-lg shadow-md object-cover w-full md:w-2/3 border border-slate-200" />
                )}
              </div>
            </div>

            {/* Peta Lokasi */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Tentukan Lokasi (Klik Peta)</label>
              <div className="h-72 w-full rounded-xl overflow-hidden border border-slate-300 shadow-inner relative z-0">
                <MapContainer center={[position.lat, position.lng]} zoom={13} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <div className="mt-3 flex justify-between items-center bg-blue-50 p-3 rounded-lg border border-blue-100">
                <span className="text-xs font-mono text-blue-700 font-bold">
                  Lat: {position.lat.toFixed(6)} | Lng: {position.lng.toFixed(6)}
                </span>
                <span className="text-[10px] text-blue-400 italic">Bandung, Jawa Barat</span>
              </div>
            </div>

            <button 
              type="submit" disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-lg transition-all disabled:bg-blue-300 disabled:cursor-not-allowed transform hover:-translate-y-1"
            >
              {loading ? 'Sedang Mengirim...' : 'Kirim Laporan Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}