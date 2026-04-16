import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* --- NAVBAR STATIS --- */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-black tracking-tighter text-indigo-600">
            LAPOR<span className="text-slate-800">.NET</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors">
              Masuk
            </Link>
            <Link to="/register" className="px-5 py-2 text-sm font-bold bg-indigo-600 text-white rounded-xl shadow-md shadow-indigo-100 hover:bg-indigo-700 transition-all">
              Daftar
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-indigo-600 uppercase bg-indigo-50 rounded-full">
            Solusi Aspirasi Warga Bandung
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-8 leading-[1.1]">
            Kota Lebih Baik <br/>
            <span className="text-indigo-600">Mulai dari Laporanmu.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-500 mb-10 leading-relaxed">
            Platform pelaporan fasilitas umum berbasis cloud. Cepat, transparan, dan terintegrasi langsung dengan Google Cloud Storage.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/register" className="px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl shadow-xl hover:bg-slate-800 hover:-translate-y-1 transition-all">
              Buat Laporan Sekarang
            </Link>
          </div>
        </div>
      </header>

      {/* --- MOCKUP / PREVIEW SECTION --- */}
      <section className="py-10 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Card Statis 1 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl text-2xl mb-6">📍</div>
            <h3 className="font-bold text-xl mb-2 text-slate-800">Presisi Lokasi</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Penandaan otomatis menggunakan koordinat GPS untuk memudahkan petugas lapangan.</p>
          </div>

          {/* Card Statis 2 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl text-2xl mb-6">☁️</div>
            <h3 className="font-bold text-xl mb-2 text-slate-800">Cloud Storage</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Semua bukti foto tersimpan aman di Google Cloud Storage secara efisien.</p>
          </div>

          {/* Card Statis 3 */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 flex items-center justify-center rounded-2xl text-2xl mb-6">🛡️</div>
            <h3 className="font-bold text-xl mb-2 text-slate-800">Panel Admin</h3>
            <p className="text-slate-500 text-sm leading-relaxed">Dashboard khusus admin untuk memproses, menolak, atau menyelesaikan laporan.</p>
          </div>
        </div>
      </section>

      {/* --- PREVIEW FEED (STATIC) --- */}
      <section className="py-20 px-6 max-w-6xl mx-auto bg-indigo-900 rounded-[3rem] my-20 text-white overflow-hidden relative">
        <div className="relative z-10 grid md:grid-cols-2 items-center gap-12">
          <div className="p-8">
            <h2 className="text-4xl font-black mb-6 leading-tight">Pantau Progress <br/> Laporan Warga.</h2>
            <p className="text-indigo-200 mb-8">Setiap laporan memiliki siklus hidup yang jelas. Dari saat dikirim hingga diverifikasi oleh tim teknis kami.</p>
            <div className="space-y-4">
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10">
                <div className="w-4 h-4 rounded-full bg-blue-400 shadow-[0_0_15px_rgba(96,165,250,0.5)]"></div>
                <span className="font-bold text-sm">Status: Terkirim</span>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 opacity-60">
                <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                <span className="font-bold text-sm">Status: Diproses</span>
              </div>
              <div className="flex items-center gap-4 bg-white/10 p-4 rounded-2xl border border-white/10 opacity-40">
                <div className="w-4 h-4 rounded-full bg-green-400"></div>
                <span className="font-bold text-sm">Status: Selesai</span>
              </div>
            </div>
          </div>
          
          {/* Ilustrasi Card Statis */}
          <div className="relative">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-2xl text-slate-800 rotate-3 translate-x-10 scale-105">
               <div className="h-40 bg-slate-100 rounded-2xl mb-4 flex items-center justify-center font-bold text-slate-300">PREVIEW GAMBAR</div>
               <h4 className="font-black text-lg">Jalan Berlubang</h4>
               <p className="text-xs text-slate-400 font-mono">📍 -6.9147, 107.6098</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-20 text-center">
        <div className="text-slate-800 font-black text-2xl mb-4">LAPOR.NET</div>
        <p className="text-slate-400 text-sm">
          Project Mata Kuliah Cloud Computing <br/>
          <span className="font-bold text-slate-500">Agiel Fernanda • Itenas Bandung</span>
        </p>
      </footer>
    </div>
  );
}