import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Khusus Landing Page */}
      <nav className="bg-white shadow-sm px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="font-extrabold text-2xl text-blue-600 flex items-center gap-2">
          <span>🌱</span> LaporLingkungan
        </div>
        <div className="flex gap-4">
          <Link to="/login" className="px-5 py-2 text-blue-600 font-bold hover:bg-blue-50 rounded-lg transition">
            Masuk
          </Link>
          <Link to="/register" className="px-5 py-2 bg-blue-600 text-white font-bold hover:bg-blue-700 rounded-lg shadow-md transition">
            Daftar
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-24 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 tracking-tight mb-6">
            Bantu Wujudkan Lingkungan <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500">
              Bersih dan Aman
            </span>
          </h1>
          <p className="mt-4 text-xl text-slate-500 max-w-2xl mx-auto mb-10">
            Platform pelaporan warga yang cepat, transparan, dan terintegrasi. 
            Satu ketukan Anda dapat membawa perubahan besar bagi kota kita.
          </p>
          <div className="flex justify-center gap-4">
            <Link to="/register" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Mulai Lapor Sekarang 🚀
            </Link>
            <a href="#fitur" className="px-8 py-4 bg-white text-slate-600 hover:bg-slate-50 border border-slate-200 text-lg font-bold rounded-full transition-all">
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="fitur" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-800">Mengapa Menggunakan Lapor Lingkungan?</h2>
            <p className="text-slate-500 mt-4">Tiga langkah mudah untuk lingkungan yang lebih baik.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                📍
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Tepat Sasaran</h3>
              <p className="text-slate-600">Tandai lokasi masalah secara akurat menggunakan peta interaktif langsung dari perangkat Anda.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                📸
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Bukti Nyata</h3>
              <p className="text-slate-600">Unggah foto sebagai bukti valid. Tim terkait akan langsung memvalidasi laporan berdasarkan foto Anda.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:shadow-md transition">
              <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-6">
                ⚡
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">Pantau Prosesnya</h3>
              <p className="text-slate-600">Transparansi penuh. Lacak status laporan Anda mulai dari "Terkirim" hingga "Selesai".</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 py-8 text-center">
        <p className="text-slate-400 font-medium">
          &copy; {new Date().getFullYear()} LaporLingkungan. Dibangun untuk masyarakat.
        </p>
      </footer>
    </div>
  );
}