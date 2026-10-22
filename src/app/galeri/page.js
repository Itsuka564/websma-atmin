
import { Suspense } from "react";
import { getFotoGaleri, fotoGaleriAwal } from "@/lib/galeri";

async function GaleriContent() {
  let fotoGaleri = await getFotoGaleri();

  if (fotoGaleri.length === 0) {
    fotoGaleri = fotoGaleriAwal;
  }

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {fotoGaleri.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {fotoGaleri.map((foto, index) => (
            <article
              key={`${foto.src}-${index}`}
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
      ) : (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
          <h2 className="text-xl font-bold text-[#064ea2]">
            Belum Ada Foto
          </h2>
          <p className="mt-2 text-slate-600">
            Dokumentasi kegiatan sekolah akan ditampilkan di sini.
          </p>
        </div>
      )}
    </section>
  );
}

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

      <Suspense
        fallback={
          <section className="mx-auto max-w-7xl px-6 py-12">
            <p className="text-slate-600">Memuat galeri sekolah...</p>
          </section>
        }
      >
        <GaleriContent />
      </Suspense>
    </main>
  );
}
