
import Link from "next/link";

export default function InformasiPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#064ea2] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08]">
            Informasi Sekolah
          </p>
          <h1 className="text-3xl font-extrabold md:text-5xl">
            Pengumuman
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Informasi dan pengumuman terbaru SMA Negeri 1 Purworejo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="h-2 bg-[#f3ea08]" />

          <div className="p-6 md:p-10">
            <span className="rounded-full bg-[#f3ea08]/20 px-3 py-1 text-xs font-bold text-[#064ea2]">
              PENGUMUMAN SPMB
            </span>

            <h2 className="mt-5 text-2xl font-bold leading-snug text-[#064ea2] md:text-3xl">
              Pengumuman Hasil Seleksi dan Daftar Ulang SPMB 2026/2027
            </h2>

            <p className="mt-4 text-sm text-slate-500">
              Sastra Amijaya <span className="mx-2">|</span>
              21 Juni 2026 <span className="mx-2">|</span>
              132 kali dibaca
            </p>

            <p className="mt-6 leading-8 text-slate-700">
              Pengumuman hasil seleksi dan informasi daftar ulang Sistem
              Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027 dapat
              dilihat melalui halaman resmi SMA Negeri 1 Purworejo.
            </p>

            <Link
              href="https://sman1purworejo.sch.id/page/pengumuman-hasil-seleksi-spmb-2026"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-lg bg-[#064ea2] px-6 py-3 font-semibold text-white transition hover:bg-[#043875]"
            >
              Lihat Pengumuman Resmi ↗
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
