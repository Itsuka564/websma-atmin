
export default function KeuanganPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#064ea2] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08]">
            Transparansi Informasi
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Informasi Keuangan
          </h1>
        </div>
      </section>

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3ea08]/20 text-4xl">
          📄
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#064ea2]">
          Informasi Keuangan Tahun 2026
        </h2>

        <p className="mt-3 max-w-xl leading-7 text-slate-600">
          Informasi keuangan untuk tahun 2026 belum dirilis. Silakan
          kunjungi halaman ini kembali secara berkala untuk mendapatkan
          informasi terbaru.
        </p>

        <span className="mt-6 rounded-full border border-[#f3ea08] bg-[#f3ea08]/10 px-5 py-2 text-sm font-semibold text-[#064ea2]">
          Belum Dirilis
        </span>
      </section>
    </main>
  );
}
