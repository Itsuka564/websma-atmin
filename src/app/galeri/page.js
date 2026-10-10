
const fotoGaleri = [
  {
    src: "/images/gedung-1.jpg",
    title: "Gedung SMA Negeri 1 Purworejo",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-2.jpg",
    title: "Lingkungan Sekolah",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-3.jpg",
    title: "Fasilitas Sekolah",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-4.jpg",
    title: "Area SMA Negeri 1 Purworejo",
    kategori: "Sekolah",
  },
  {
    src: "/images/berita-1.jpg",
    title: "Peringatan Nuzulul Quran 2026",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-2.jpg",
    title: "Kunjungan Alumni",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-3.jpg",
    title: "Ganesha Voice dan Ekstrakurikuler",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-4.jpg",
    title: "Ziarah Makam HUT ke-71",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-5.jpg",
    title: "Penilaian Sumatif Akhir Tahun",
    kategori: "Akademik",
  },
  {
    src: "/images/berita-6.jpg",
    title: "Earth Day With Ganesha",
    kategori: "Lingkungan",
  },
];

export default function GaleriPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#064ea2] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08]">
            Dokumentasi
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Galeri Sekolah
          </h1>
          <p className="mt-4 text-slate-300">
            Kumpulan foto lingkungan sekolah dan berbagai kegiatan siswa.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fotoGaleri.map((foto) => (
            <article
              key={foto.src}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src={foto.src}
                  alt={foto.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#064ea2]">
                  {foto.kategori}
                </span>
                <h2 className="mt-2 font-bold text-[#064ea2]">
                  {foto.title}
                </h2>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
