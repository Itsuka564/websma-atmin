import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { verifySessionToken } from "@/lib/auth";
import { getBerita } from "@/lib/berita";
import { getFotoGaleri } from "@/lib/galeri";
import { getAllSettings } from "@/lib/settings";

export const instant = false;

export default async function AdminDashboardPage() {
  await connection();

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  // Ambil data untuk statistik dan widget
  let beritaList = [];
  let galeriList = [];
  let settings = {};

  try {
    beritaList = await getBerita();
  } catch (e) {
    beritaList = [];
  }

  try {
    galeriList = await getFotoGaleri();
  } catch (e) {
    galeriList = [];
  }

  try {
    settings = await getAllSettings();
  } catch (e) {
    settings = {};
  }

  const totalBerita = beritaList.length;
  const totalGaleri = galeriList.length;
  const totalInfo = settings.informasi_list ? settings.informasi_list.length : 1;
  const sambutan = settings.beranda_sambutan || {};
  const marquee = settings.beranda_marquee || [];

  return (
    <div className="space-y-6">
      {/* Stat Summary Cards - Gaya Persis Reference Screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Berita */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Artikel Berita</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2">{totalBerita}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-lg">
              📰
            </div>
          </div>
          <Link
            href="/admin/berita"
            className="mt-4 text-xs font-bold text-slate-600 hover:text-blue-600 inline-flex items-center gap-1 transition"
          >
            Kelola berita <span aria-hidden="true">&gt;</span>
          </Link>
        </div>

        {/* Card 2: Galeri */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Koleksi Galeri</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2">{totalGaleri}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold text-lg">
              🖼️
            </div>
          </div>
          <Link
            href="/admin/galeri"
            className="mt-4 text-xs font-bold text-slate-600 hover:text-purple-600 inline-flex items-center gap-1 transition"
          >
            Kelola foto <span aria-hidden="true">&gt;</span>
          </Link>
        </div>

        {/* Card 3: Informasi */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">Informasi & SPMB</p>
              <h2 className="text-3xl font-black text-slate-900 mt-2">{totalInfo}</h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-lg">
              📢
            </div>
          </div>
          <Link
            href="/admin/informasi"
            className="mt-4 text-xs font-bold text-slate-600 hover:text-emerald-600 inline-flex items-center gap-1 transition"
          >
            Kelola pengumuman <span aria-hidden="true">&gt;</span>
          </Link>
        </div>

        {/* Card 4: CMS Beranda */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs flex flex-col justify-between hover:shadow-md transition">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500">CMS Beranda</p>
              <h2 className="text-sm font-black text-emerald-600 mt-3 inline-flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Siap Diedit
              </h2>
            </div>
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center font-bold text-lg">
              ⚡
            </div>
          </div>
          <Link
            href="/admin/beranda"
            className="mt-4 text-xs font-bold text-slate-600 hover:text-orange-600 inline-flex items-center gap-1 transition"
          >
            Ubah beranda (No-code) <span aria-hidden="true">&gt;</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Dua Kolom Seperti Reference UI */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Kolom Kiri: Berita & Konten Terbaru (7 Kolom) */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Berita & Konten Terbaru</h3>
              <p className="text-xs text-slate-500">Artikel yang saat ini tayang di website</p>
            </div>
            <Link
              href="/admin/berita"
              className="px-3.5 py-1.5 rounded-xl bg-[#f06548] text-white text-xs font-bold hover:bg-[#d95338] transition shadow-xs flex items-center gap-1.5"
            >
              <span>+ Tulis Berita</span>
            </Link>
          </div>

          <div className="divide-y divide-slate-100">
            {beritaList.slice(0, 5).map((b, idx) => (
              <div key={b.id || idx} className="py-3.5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-500 shrink-0 text-sm overflow-hidden border border-slate-200">
                    {b.gambar ? (
                      <img src={b.gambar} alt="" className="w-full h-full object-cover" />
                    ) : (
                      "📰"
                    )}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition">
                      {b.judul || b.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-0.5 truncate">
                      {b.tanggal || b.date} • {b.penulis ? `Oleh ${b.penulis}` : "Admin"}
                    </p>
                  </div>
                </div>

                <Link
                  href="/admin/berita"
                  className="shrink-0 text-xs font-semibold px-2.5 py-1 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition"
                >
                  Edit
                </Link>
              </div>
            ))}

            {beritaList.length === 0 && (
              <p className="text-xs text-slate-400 py-6 text-center">Belum ada berita tersimpan.</p>
            )}
          </div>

          <div className="pt-2">
            <Link
              href="/admin/berita"
              className="text-xs font-bold text-slate-500 hover:text-slate-800 transition inline-flex items-center gap-1"
            >
              Lihat seluruh daftar berita ({totalBerita}) →
            </Link>
          </div>
        </div>

        {/* Kolom Kanan: Pengaturan Cepat Beranda & Jadwal (5 Kolom) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Beranda & Tampilan Utama</h3>
              <p className="text-xs text-slate-500">Konfigurasi langsung tanpa sentuh koding</p>
            </div>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full border border-emerald-200">
              ● Live
            </span>
          </div>

          <div className="space-y-3">
            {/* Active Highlight Card - Persis Seperti Item Oranye di Referensi Gambar */}
            <div className="bg-[#f06548] text-white p-4 rounded-xl shadow-md shadow-orange-500/20">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded">
                  Sambutan Kepala Sekolah
                </span>
                <span className="text-xs font-semibold text-orange-100">Aktif</span>
              </div>
              <h4 className="mt-2 text-base font-extrabold text-white leading-tight">
                {sambutan.nama || "Cahyo Winarno, S.Pd., M.Pd."}
              </h4>
              <p className="text-xs text-orange-100 mt-1 line-clamp-2 leading-relaxed">
                {sambutan.paragraf1 || "Puji syukur ke hadirat Allah SWT atas rahmat dan karunia-Nya..."}
              </p>
              <div className="mt-3 pt-3 border-t border-white/20 flex items-center justify-between">
                <span className="text-[11px] text-white/90 font-medium">Foto & teks sambutan</span>
                <Link
                  href="/admin/beranda#sambutan"
                  className="text-xs font-bold bg-white text-[#f06548] px-3 py-1 rounded-lg hover:bg-orange-50 transition"
                >
                  Ubah Sambutan
                </Link>
              </div>
            </div>

            {/* Item 2: Running Text (Marquee) */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">📢 Running Text Pengumuman</span>
                <span className="text-[11px] text-slate-400 font-medium">{marquee.length} Teks</span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5 truncate">
                {marquee[0] || "Selamat datang di situs resmi SMA Negeri 1 Purworejo"}
              </p>
              <div className="mt-2 flex justify-end">
                <Link
                  href="/admin/beranda#marquee"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Ubah Teks →
                </Link>
              </div>
            </div>

            {/* Item 3: Statistik Sekolah */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">📊 Angka Statistik Beranda</span>
                <span className="text-[11px] text-slate-400 font-medium">4 Data</span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                Guru, Tenaga Kependidikan, Siswa, dan Siswi.
              </p>
              <div className="mt-2 flex justify-end">
                <Link
                  href="/admin/beranda#statistik"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Ubah Angka →
                </Link>
              </div>
            </div>

            {/* Item 4: Slider Hero */}
            <div className="p-3.5 rounded-xl border border-slate-200 hover:border-slate-300 transition bg-slate-50/50">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800">🖼️ Hero Carousel Slider</span>
                <span className="text-[11px] text-slate-400 font-medium">Slide Foto</span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                Foto dan teks utama di bagian paling atas beranda.
              </p>
              <div className="mt-2 flex justify-end">
                <Link
                  href="/admin/beranda#hero"
                  className="text-xs font-bold text-blue-600 hover:underline"
                >
                  Atur Slider →
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/admin/beranda"
              className="w-full block py-2.5 px-4 rounded-xl text-center bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              Buka Semua Pengaturan Beranda (CMS) ⚙️
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
