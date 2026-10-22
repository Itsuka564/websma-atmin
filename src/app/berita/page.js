
import { Suspense } from "react";
import NewsCard from "@/components/NewsCard";
import { getBeritaPublik } from "@/lib/berita";

export default function BeritaPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white px-5 py-20 text-center text-slate-700">
          Memuat berita sekolah...
        </main>
      }
    >
      <DaftarBerita />
    </Suspense>
  );
}

async function DaftarBerita() {
  const dataBerita = await getBeritaPublik();

  // Mengubah format data admin agar sesuai dengan NewsCard.
  const beritaData = [...dataBerita]
    .sort((a, b) =>
      String(b.tanggal || "").localeCompare(String(a.tanggal || ""))
    )
    .map((berita) => ({
      id: berita.id,
      image: berita.gambar || "/images/logo.png",
      title: berita.judul,
      date: berita.tanggal,
      excerpt: berita.ringkasan,
    }));

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#101D35] text-white">
        <div
          aria-hidden="true"
          className="absolute -right-24 -top-28 h-80 w-80 rounded-full border-[45px] border-yellow-400/10"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 right-1/3 h-40 w-40 rounded-full bg-cyan-400/5 blur-3xl"
        />

        <div className="relative mx-auto max-w-[1440px] px-5 py-16 sm:px-8 md:py-24 lg:px-12 lg:py-28">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-slate-200">
              Kabar Sekolah
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Cerita dan Informasi
            <span className="mt-2 block text-yellow-400">
              SMA Negeri 1 Purworejo
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Ikuti informasi, kegiatan pendidikan, prestasi, dan berbagai cerita
            dari lingkungan sekolah dalam satu halaman.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#daftar-berita"
              className="inline-flex items-center gap-3 rounded-xl bg-yellow-400 px-6 py-4 font-extrabold text-[#101D35] transition hover:-translate-y-1 hover:bg-yellow-300"
            >
              Jelajahi Berita
              <span aria-hidden="true">↓</span>
            </a>

            <span className="text-sm font-semibold text-slate-400">
              Informasi dari lingkungan sekolah
            </span>
          </div>

          <div className="mt-12 h-1.5 w-24 rounded-full bg-gradient-to-r from-yellow-300 to-cyan-400" />
        </div>
      </section>

      {/* DAFTAR BERITA */}
      <section
        id="daftar-berita"
        className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:px-8 md:py-20 lg:px-12"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-3 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-600">
                <span className="h-1 w-8 rounded-full bg-yellow-400" />
                Informasi Terbaru
              </p>

              <h2 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Semua Berita
              </h2>

              <p className="mt-3 max-w-2xl leading-7 text-slate-600">
                Temukan kabar dan artikel seputar kegiatan serta perkembangan
                SMA Negeri 1 Purworejo.
              </p>
            </div>

            <div className="w-fit rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Total Artikel
              </p>
              <p className="mt-1 text-2xl font-black text-[#101D35]">
                {String(beritaData.length).padStart(2, "0")}
                <span className="ml-2 text-sm font-semibold text-slate-500">
                  berita
                </span>
              </p>
            </div>
          </div>

          {beritaData.length > 0 ? (
            <div className="grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
              {beritaData.map((berita) => (
                <div
                  key={berita.id}
                  className="min-w-0 transition duration-300 hover:-translate-y-1"
                >
                  <NewsCard
                    id={berita.id}
                    image={berita.image}
                    title={berita.title}
                    date={berita.date}
                    excerpt={berita.excerpt}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-100 text-3xl">
                📰
              </div>

              <h3 className="mt-5 text-xl font-extrabold text-slate-900">
                Belum Ada Berita
              </h3>

              <p className="mt-2 text-slate-600">
                Berita sekolah akan ditampilkan di sini setelah tersedia.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* CTA PROFIL SEKOLAH */}
      <section className="bg-yellow-400 px-5 py-12 sm:px-8 md:py-14 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#101D35]/70">
              Tetap Terhubung
            </p>

            <h2 className="mt-2 text-2xl font-black text-[#101D35] sm:text-3xl">
              Kenali lebih dekat sekolah kami.
            </h2>

            <p className="mt-2 max-w-2xl leading-7 text-[#101D35]/80">
              Jelajahi profil dan perjalanan SMA Negeri 1 Purworejo.
            </p>
          </div>

          <a
            href="/about"
            className="inline-flex w-fit shrink-0 items-center gap-3 rounded-xl bg-[#101D35] px-6 py-4 font-extrabold text-white transition hover:bg-slate-800"
          >
            Lihat Profil Sekolah
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
    </main>
  );
}
