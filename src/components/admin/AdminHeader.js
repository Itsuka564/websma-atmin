"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

const TITLE_MAP = {
  "/admin": {
    title: "Dashboard",
    desc: "Ringkasan performa konten dan status website sekolah",
  },
  "/admin/beranda": {
    title: "Kelola Beranda (No-Code CMS)",
    desc: "Ubah teks hero, sambutan kepsek, statistik, dan running text tanpa koding",
  },
  "/admin/berita": {
    title: "Kelola Berita & Artikel",
    desc: "Tambah, edit, dan publikasikan artikel berita sekolah",
  },
  "/admin/galeri": {
    title: "Kelola Galeri Foto",
    desc: "Unggah dan atur dokumentasi kegiatan serta fasilitas sekolah",
  },
  "/admin/informasi": {
    title: "Kelola Informasi & Pengumuman",
    desc: "Atur pengumuman resmi dan seleksi yang ditampilkan ke publik",
  },
  "/admin/keuangan": {
    title: "Kelola Transparansi Keuangan",
    desc: "Atur status rilis, tahun anggaran, dan tautan laporan keuangan",
  },
  "/admin/spmb": {
    title: "Kelola SPMB (Penerimaan Siswa)",
    desc: "Atur pengumuman hasil seleksi, tautan Google Drive, dan berkas syarat",
  },
};

export default function AdminHeader() {
  const pathname = usePathname();
  const current = TITLE_MAP[pathname] || {
    title: "Panel Admin",
    desc: "Administrasi Konten SMA Negeri 1 Purworejo",
  };

  return (
    <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-20 shadow-xs">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          {current.title}
        </h1>
        <p className="text-xs text-slate-500 font-medium mt-0.5">
          {current.desc}
        </p>
      </div>

      <div className="flex items-center gap-3 self-end sm:self-auto">
        {/* Quick Website Link */}
        <Link
          href="/"
          target="_blank"
          className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition"
        >
          <span>🌐 Pratinjau Web</span>
        </Link>

        {/* Notification Bell */}
        <div className="relative">
          <button
            className="w-9 h-9 rounded-xl border border-slate-200 hover:border-slate-300 flex items-center justify-center text-slate-500 hover:text-slate-800 transition bg-white"
            title="Notifikasi"
            aria-label="Notifikasi"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
        </div>

        {/* Profile Card */}
        <div className="flex items-center gap-3 pl-2 sm:border-l sm:border-slate-200">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow-sm">
              AD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              Administrator
            </p>
            <p className="text-[10px] text-emerald-600 font-semibold leading-tight">
              Aktif • Super Admin
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
