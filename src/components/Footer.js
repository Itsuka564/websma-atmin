
export default function Footer() {
  return (
    <footer className="bg-[#043875] px-5 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_380px] md:items-start">
          {/* Informasi Sekolah */}
          <div className="flex flex-col justify-between gap-8">
            <div>
              <h2 className="text-lg font-bold">
                SMA Negeri 1 Purworejo
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                Jl. Tentara Pelajar No. 55, Purworejo
              </p>
            </div>

            <p className="text-sm leading-6 text-slate-400">
              © 2026 SMA Negeri 1 Purworejo.
              {" "}Semua hak dilindungi.
            </p>
          </div>

          {/* Google Maps */}
          <div className="w-full md:ml-auto">
            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3ea08]">
                Lokasi Sekolah
              </p>

              <h3 className="mt-2 text-lg font-bold">
                Temukan Lokasi Kami
              </h3>
            </div>

            <div className="overflow-hidden rounded-xl border border-white/15 shadow-lg">
              <iframe
                title="Lokasi SMA Negeri 1 Purworejo"
                src="https://maps.google.com/maps?q=SMA%20Negeri%201%20Purworejo&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="200"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>

            <a
              href="https://maps.app.goo.gl/g2kzaWdCxY8UrtsZ6"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-[#f3ea08] transition hover:text-[#f3ea08]"
            >
              Buka Petunjuk Arah
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}