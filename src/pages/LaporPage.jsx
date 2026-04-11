import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import api from '../api/axiosInstance';
import Navbar from '../components/Navbar'; // <-- Memanggil Navbar
import 'leaflet/dist/leaflet.css';

// Memperbaiki icon marker Leaflet yang sering hilang di Vite/React
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

// Komponen Deteksi Klik di Peta
function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return position === null ? null : <Marker position={position}></Marker>;
}

export default function LaporPage() {
  const [position, setPosition] = useState({ lat: -6.9147, lng: 107.6098 }); // Default: Bandung (Sesuai lokasi Anda saat ini)
  const [kategori, setKategori] = useState('Jalan Rusak');
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!foto) {
      alert('Tolong unggah foto bukti laporan!');
      return;
    }

    setLoading(true);
    
    // Gunakan FormData karena kita mengirim file fisik (Gambar)
    const formData = new FormData();
    formData.append('kategori', kategori);
    formData.append('latitude', position.lat);
    formData.append('longitude', position.lng);
    formData.append('foto', foto);

    try {
      const res = await api.post('/lapor', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(res.data.message || 'Laporan berhasil dikirim!');
      setFoto(null); // Kosongkan file setelah berhasil
    } catch (err) {
      alert(err.response?.data?.message || 'Gagal mengirim laporan');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      <Navbar /> {/* <-- Menampilkan Navigasi Atas */}

      <div className="p-6">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <div className="mb-8 border-b border-slate-100 pb-4">
            <h1 className="text-3xl font-extrabold text-slate-800">Kirim Laporan 📢</h1>
            <p className="text-slate-500 mt-2">Bantu kami mengetahui masalah di lingkungan Anda.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Input Kategori */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Masalah</label>
              <select 
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                value={kategori} 
                onChange={(e) => setKategori(e.target.value)}
              >
                <option value="Jalan Rusak">Jalan Rusak</option>
                <option value="Sampah Menumpuk">Sampah Menumpuk</option>
                <option value="Fasilitas Publik">Fasilitas Publik Rusak</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>

            {/* Input Foto */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Foto Bukti</label>
              <input 
                type="file" 
                accept="image/*"
                className="w-full p-2 border border-slate-300 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                onChange={(e) => setFoto(e.target.files[0])}
              />
            </div>

            {/* Peta Lokasi */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                Pilih Lokasi di Peta (Klik untuk mengubah titik)
              </label>
              {/* Tambahkan z-index 0 agar peta tidak menutupi navbar/dropdown */}
              <div className="h-64 w-full rounded-xl overflow-hidden border border-slate-300 shadow-sm relative z-0">
                <MapContainer center={[position.lat, position.lng]} zoom={13} scrollWheelZoom={false} className="h-full w-full">
                  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                  <LocationMarker position={position} setPosition={setPosition} />
                </MapContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2 font-mono">
                Koordinat Terpilih: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}
              </p>
            </div>

            {/* Tombol Submit */}
            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl shadow-md transition-all disabled:bg-blue-300 mt-4"
            >
              {loading ? 'Mengirim Data...' : 'Kirim Laporan Sekarang'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}