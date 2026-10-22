"use client";

import { useEffect, useState } from "react";

export default function AdminBerandaPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  // Tab aktif
  const [activeTab, setActiveTab] = useState("sambutan");

  // State data
  const [sambutan, setSambutan] = useState({
    nama: "",
    jabatan: "",
    foto: "",
    sapaanAwal: "",
    paragraf1: "",
    paragraf2: "",
    paragraf3: "",
    sapaanAkhir: "",
  });

  const [marquee, setMarquee] = useState([]);
  const [teksMarqueeBaru, setTeksMarqueeBaru] = useState("");

  const [statistik, setStatistik] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);

  useEffect(() => {
    muatPengaturan();
  }, []);

  async function muatPengaturan() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      if (res.status === 401) {
        window.location.href = "/admin/login";
        return;
      }
      const data = await res.json();
      if (data) {
        if (data.beranda_sambutan) setSambutan(data.beranda_sambutan);
        if (data.beranda_marquee) setMarquee(data.beranda_marquee);
        if (data.beranda_statistik) setStatistik(data.beranda_statistik);
        if (data.beranda_hero) setHeroSlides(data.beranda_hero);
      }
    } catch (err) {
      setPesan({ tipe: "error", teks: "Gagal memuat pengaturan: " + err.message });
    } finally {
      setLoading(false);
    }
  }

  async function simpanSetting(key, value, namaBagian) {
    try {
      setSaving(true);
      setPesan({ tipe: "", teks: "" });

      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value }),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Gagal menyimpan");

      setPesan({ tipe: "sukses", teks: `Berhasil menyimpan ${namaBagian}! Perubahan langsung tayang di beranda.` });
      setTimeout(() => setPesan({ tipe: "", teks: "" }), 5000);
    } catch (err) {
      setPesan({ tipe: "error", teks: err.message });
    } finally {
      setSaving(false);
    }
  }

  async function handleUploadFotoKepsek(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      setPesan({ tipe: "", teks: "" });
      const formData = new FormData();
      formData.append("gambar", file);

      const res = await fetch("/api/admin/berita/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload gagal");

      setSambutan((prev) => ({ ...prev, foto: data.url }));
      setPesan({ tipe: "sukses", teks: "Foto kepala sekolah berhasil diunggah! Jangan lupa klik Simpan." });
    } catch (err) {
      setPesan({ tipe: "error", teks: err.message });
    } finally {
      setUploading(false);
    }
  }

  async function handleUploadSlide(index, file) {
    if (!file) return;

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("gambar", file);

      const res = await fetch("/api/admin/berita/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload gagal");

      const update = [...heroSlides];
      update[index].src = data.url;
      setHeroSlides(update);
    } catch (err) {
      setPesan({ tipe: "error", teks: err.message });
    } finally {
      setUploading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center text-slate-500 border border-slate-200">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="font-semibold text-sm">Memuat pengaturan beranda...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Notifikasi */}
      {pesan.teks && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between shadow-xs ${
            pesan.tipe === "sukses"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{pesan.teks}</span>
          <button onClick={() => setPesan({ tipe: "", teks: "" })} className="text-xs font-bold underline">
            Tutup
          </button>
        </div>
      )}

      {/* Header Info */}
      <div className="bg-gradient-to-r from-[#111927] to-[#1e293b] rounded-2xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-widest text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
            No-Code Homepage Editor
          </span>
          <h2 className="text-xl sm:text-2xl font-black mt-2 text-white">
            Kelola Konten Beranda
          </h2>
          <p className="text-xs text-slate-300 mt-1">
            Ubah teks sambutan, pengumuman berjalan, angka murid, dan foto slider tanpa menyentuh kodingan.
          </p>
        </div>

        <a
          href="/"
          target="_blank"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition self-start sm:self-auto"
        >
          <span>Lihat Hasil di Beranda</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        {[
          { id: "sambutan", label: "👤 Sambutan Kepala Sekolah" },
          { id: "marquee", label: "📢 Pengumuman Berjalan" },
          { id: "statistik", label: "📊 Angka Statistik" },
          { id: "hero", label: "🖼️ Hero Carousel Slider" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-[#f06548] text-white shadow-sm shadow-orange-500/20"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: SAMBUTAN KEPALA SEKOLAH */}
      {activeTab === "sambutan" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Sambutan Kepala Sekolah</h3>
            <p className="text-xs text-slate-500">Profil, foto, dan isi teks sambutan yang muncul di halaman depan.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Foto Profil & Upload */}
            <div className="lg:col-span-4 space-y-4">
              <label className="block text-xs font-bold text-slate-700">Foto Kepala Sekolah</label>
              <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-slate-200 bg-slate-50 relative">
                {sambutan.foto ? (
                  <img src={sambutan.foto} alt="Kepala Sekolah" className="w-full h-full object-cover object-top" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400 font-bold text-sm">
                    Belum ada foto
                  </div>
                )}
              </div>

              <div>
                <label className="inline-block w-full text-center px-4 py-2 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 cursor-pointer transition">
                  {uploading ? "Mengunggah..." : "Ganti Foto Baru 📁"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleUploadFotoKepsek}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
                <input
                  type="text"
                  value={sambutan.foto || ""}
                  onChange={(e) => setSambutan({ ...sambutan, foto: e.target.value })}
                  placeholder="Atau masukkan URL foto"
                  className="mt-2 w-full text-xs p-2.5 rounded-lg border border-slate-200 text-slate-600 bg-slate-50"
                />
              </div>
            </div>

            {/* Form Teks */}
            <div className="lg:col-span-8 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                  <input
                    type="text"
                    value={sambutan.nama || ""}
                    onChange={(e) => setSambutan({ ...sambutan, nama: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 font-semibold focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Contoh: Cahyo Winarno, S.Pd., M.Pd."
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Jabatan</label>
                  <input
                    type="text"
                    value={sambutan.jabatan || ""}
                    onChange={(e) => setSambutan({ ...sambutan, jabatan: e.target.value })}
                    className="w-full text-sm p-3 rounded-xl border border-slate-200 font-semibold focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Contoh: Kepala SMA Negeri 1 Purworejo"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sapaan Pembuka</label>
                <input
                  type="text"
                  value={sambutan.sapaanAwal || ""}
                  onChange={(e) => setSambutan({ ...sambutan, sapaanAwal: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 italic focus:border-orange-500 outline-none"
                  placeholder="Bismillahirrahmanirrahim. Assalamu’alaikum..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf 1</label>
                <textarea
                  rows={3}
                  value={sambutan.paragraf1 || ""}
                  onChange={(e) => setSambutan({ ...sambutan, paragraf1: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf 2</label>
                <textarea
                  rows={3}
                  value={sambutan.paragraf2 || ""}
                  onChange={(e) => setSambutan({ ...sambutan, paragraf2: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Paragraf 3</label>
                <textarea
                  rows={3}
                  value={sambutan.paragraf3 || ""}
                  onChange={(e) => setSambutan({ ...sambutan, paragraf3: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 focus:border-orange-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Sapaan Penutup</label>
                <input
                  type="text"
                  value={sambutan.sapaanAkhir || ""}
                  onChange={(e) => setSambutan({ ...sambutan, sapaanAkhir: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 italic focus:border-orange-500 outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => simpanSetting("beranda_sambutan", sambutan, "Sambutan Kepala Sekolah")}
                  className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white font-extrabold text-sm shadow-md transition disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Sambutan Kepala Sekolah 💾"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PENGUMUMAN BERJALAN (MARQUEE) */}
      {activeTab === "marquee" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Running Text Pengumuman</h3>
            <p className="text-xs text-slate-500">Teks berjalan di bar pengumuman biru gelap di bawah banner hero.</p>
          </div>

          {/* Form Tambah Kalimat */}
          <div className="flex gap-3">
            <input
              type="text"
              value={teksMarqueeBaru}
              onChange={(e) => setTeksMarqueeBaru(e.target.value)}
              placeholder="Tulis kalimat pengumuman baru..."
              className="flex-1 text-sm p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
            />
            <button
              onClick={() => {
                if (!teksMarqueeBaru.trim()) return;
                setMarquee([...marquee, teksMarqueeBaru.trim()]);
                setTeksMarqueeBaru("");
              }}
              className="px-5 py-3 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition shrink-0"
            >
              + Tambah Teks
            </button>
          </div>

          {/* List Kalimat */}
          <div className="space-y-2">
            {marquee.map((teks, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-3 p-3.5 rounded-xl border border-slate-200 bg-slate-50"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-6 h-6 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold text-xs shrink-0">
                    {index + 1}
                  </span>
                  <input
                    type="text"
                    value={teks}
                    onChange={(e) => {
                      const updated = [...marquee];
                      updated[index] = e.target.value;
                      setMarquee(updated);
                    }}
                    className="text-sm bg-transparent font-medium text-slate-800 w-full outline-none"
                  />
                </div>

                <button
                  onClick={() => {
                    setMarquee(marquee.filter((_, i) => i !== index));
                  }}
                  className="text-rose-500 hover:text-rose-700 text-xs font-bold px-2 py-1"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          {/* Pratinjau Teks Berjalan */}
          <div className="p-4 rounded-xl bg-[#101D35] text-white overflow-hidden">
            <p className="text-[10px] font-bold uppercase tracking-widest text-yellow-400 mb-1">
              Pratinjau Teks Berjalan:
            </p>
            <div className="text-xs font-medium truncate">
              {marquee.join("  ◆  ")}
            </div>
          </div>

          <div>
            <button
              type="button"
              disabled={saving}
              onClick={() => simpanSetting("beranda_marquee", marquee, "Pengumuman Berjalan")}
              className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white font-extrabold text-sm shadow-md transition disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Running Text 💾"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: STATISTIK SEKOLAH */}
      {activeTab === "statistik" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-lg font-black text-slate-900">Angka Statistik Sekolah</h3>
            <p className="text-xs text-slate-500">Angka jumlah pendidik, tenaga kependidikan, siswa, dan siswi.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {statistik.map((item, index) => (
              <div key={index} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Kategori / Label</label>
                  <input
                    type="text"
                    value={item.label}
                    onChange={(e) => {
                      const updated = [...statistik];
                      updated[index].label = e.target.value;
                      setStatistik(updated);
                    }}
                    className="w-full text-sm p-2.5 rounded-lg border border-slate-200 bg-white font-bold outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Jumlah (Angka)</label>
                  <input
                    type="text"
                    value={item.jumlah}
                    onChange={(e) => {
                      const updated = [...statistik];
                      updated[index].jumlah = e.target.value;
                      setStatistik(updated);
                    }}
                    className="w-full text-lg p-2.5 rounded-lg border border-slate-200 bg-white font-black text-slate-900 outline-none"
                    placeholder="Contoh: 440"
                  />
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              disabled={saving}
              onClick={() => simpanSetting("beranda_statistik", statistik, "Statistik Sekolah")}
              className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white font-extrabold text-sm shadow-md transition disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Angka Statistik 💾"}
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: HERO CAROUSEL */}
      {activeTab === "hero" && (
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-lg font-black text-slate-900">Hero Carousel Slider</h3>
              <p className="text-xs text-slate-500">Slide foto dan headline utama di bagian paling atas beranda.</p>
            </div>
            <button
              onClick={() => {
                setHeroSlides([
                  ...heroSlides,
                  {
                    src: "/images/gedung-1.jpg",
                    title: "Judul Slide Baru",
                    subtitle: "Deskripsi singkat slide baru",
                  },
                ]);
              }}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition"
            >
              + Tambah Slide
            </button>
          </div>

          <div className="space-y-6">
            {heroSlides.map((slide, index) => (
              <div key={index} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/70 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2.5 py-1 rounded-md">
                    Slide {index + 1}
                  </span>
                  {heroSlides.length > 1 && (
                    <button
                      onClick={() => setHeroSlides(heroSlides.filter((_, i) => i !== index))}
                      className="text-xs font-bold text-rose-500 hover:text-rose-700"
                    >
                      Hapus Slide
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Preview Gambar */}
                  <div className="md:col-span-4 space-y-2">
                    <div className="aspect-[16/9] rounded-xl overflow-hidden border border-slate-200 bg-slate-200 relative">
                      <img src={slide.src} alt={slide.title} className="w-full h-full object-cover" />
                    </div>

                    <label className="inline-block w-full text-center px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-100 text-xs font-bold text-slate-700 cursor-pointer transition">
                      {uploading ? "Mengunggah..." : "Unggah Gambar 📁"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadSlide(index, e.target.files?.[0])}
                        className="hidden"
                        disabled={uploading}
                      />
                    </label>
                  </div>

                  {/* Form Judul & Subtitle */}
                  <div className="md:col-span-8 space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Judul Utama</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const update = [...heroSlides];
                          update[index].title = e.target.value;
                          setHeroSlides(update);
                        }}
                        className="w-full text-sm p-2.5 rounded-lg border border-slate-200 bg-white font-bold outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Sub Judul / Slogan</label>
                      <input
                        type="text"
                        value={slide.subtitle}
                        onChange={(e) => {
                          const update = [...heroSlides];
                          update[index].subtitle = e.target.value;
                          setHeroSlides(update);
                        }}
                        className="w-full text-sm p-2.5 rounded-lg border border-slate-200 bg-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <button
              type="button"
              disabled={saving}
              onClick={() => simpanSetting("beranda_hero", heroSlides, "Hero Carousel")}
              className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white font-extrabold text-sm shadow-md transition disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Slider Hero 💾"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
