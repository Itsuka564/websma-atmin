
import Link from "next/link";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import { beritaData } from "@/data/berita";

const statistik = [
  {
    label: "Guru dan Tenaga Kependidikan",
    jumlah: "57",
    warna: "border-blue-500",
    angka: "text-blue-600",
  },
  {
    label: "Tenaga Kependidikan",
    jumlah: "21",
    warna: "border-green-500",
    angka: "text-green-600",
  },
  {
    label: "Siswa",
    jumlah: "440",
    warna: "border-yellow-400",
    angka: "text-yellow-600",
  },
  {
    label: "Siswi",
    jumlah: "740",
    warna: "border-red-500",
    angka: "text-red-600",
  },
];

function formatTanggal(tanggal) {
  const hasil = new Date(tanggal);

  if (Number.isNaN(hasil.getTime())) {
    return tanggal;
  }

  return hasil.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Jakarta",
  });
}

function BeritaUtama({ berita }) {
  if (!berita) return null;

  return (
    <Link
      href={`/berita/${berita.id}`}
      className="group block overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-60 overflow-hidden bg-slate-200 sm:h-80">
        {berita.image ? (
          <Image
            src={berita.image}
            alt={berita.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-800 text-white">
            Foto berita
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

        <span className="absolute left-5 top-5 rounded-md bg-yellow-400 px-3 py-1.5 text-xs font-black uppercase tracking-wider text-slate-950">
          Berita Pilihan
        </span>

        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
          <p className="mb-3 text-xs font-semibold text-yellow-300">
            {formatTanggal(berita.date)}
          </p>

          <h3 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
            {berita.title}
          </h3>

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-200">
            {berita.excerpt}
          </p>

          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-yellow-300 transition group-hover:gap-3">
            Baca selengkapnya <span aria-hidden="true">→</span>
          </span>
        </div>
      </div>
    </Link>
  );
}

function BeritaKecil({ berita }) {
  if (!berita) return null;

  return (
    <Link
      href={`/berita/${berita.id}`}
      className="group flex gap-4 rounded-xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 hover:border-cyan-500 hover:shadow-md sm:p-4"
    >
      <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-lg bg-slate-200 sm:h-32 sm:w-36">
        {berita.image ? (
          <Image
            src={berita.image}
            alt={berita.title}
            fill
            sizes="144px"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-slate-500">
            Foto
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <p className="text-xs font-semibold text-cyan-700">
          {formatTanggal(berita.date)}
        </p>

        <h3 className="mt-2 line-clamp-3 text-sm font-extrabold leading-5 text-slate-900 transition group-hover:text-cyan-700 sm:text-base sm:leading-6">
          {berita.title}
        </h3>

        <span className="mt-3 text-xs font-bold text-slate-500">
          Baca berita →
        </span>
      </div>
    </Link>
  );
}

export default function Home() {
  const beritaTerbaru = beritaData.slice(0, 3);
  const beritaUtama = beritaTerbaru[0];
  const beritaPendukung = beritaTerbaru.slice(1, 3);

  return (
    <main className="min-h-screen w-full overflow-hidden bg-white">
      {/* HERO CAROUSEL - TETAP MENGGUNAKAN KOMPONEN LAMA */}
      <HeroCarousel />

      {/* PENGUMUMAN */}
      <section className="flex w-full flex-col overflow-hidden md:flex-row">
        <div className="flex shrink-0 items-center justify-center gap-3 bg-cyan-600 px-6 py-4 text-white md:min-w-56 md:justify-start">
          <span className="text-2xl" aria-hidden="true">
            📢
          </span>

          <h2 className="whitespace-nowrap text-lg font-extrabold">
            Pengumuman
          </h2>
        </div>

        <div className="flex min-w-0 flex-1 items-center overflow-hidden bg-[#101D35] py-4 text-white">
          <div className="animate-[marquee_22s_linear_infinite] whitespace-nowrap px-5 text-sm font-medium sm:text-base">
            <span className="mx-8">
              Selamat datang di situs resmi SMA Negeri 1 Purworejo
            </span>
            <span className="mx-8 text-yellow-400">◆</span>
            <span className="mx-8">
              Unggul, Berkarakter, Mendunia
            </span>
            <span className="mx-8 text-yellow-400">◆</span>
            <span className="mx-8">
              Pantau informasi dan pengumuman sekolah melalui situs ini
            </span>
          </div>
        </div>
      </section>

      {/* SAMBUTAN KEPALA SEKOLAH */}
      <section className="w-full bg-slate-50">
        <div className="mx-auto grid w-full max-w-[1440px] items-center gap-7 px-5 py-10 sm:px-8 lg:grid-cols-[280px_1fr] lg:gap-12 lg:px-10">
          <div className="mx-auto w-full max-w-[240px] lg:max-w-[280px]">
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
              <Image
                src="/images/kepala-sekolah.jpg"
                alt="Cahyo Winarno, S.Pd., M.Pd., Kepala SMA Negeri 1 Purworejo"
                width={480}
                height={600}
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>

            <h3 className="mt-3 text-center text-base font-extrabold text-[#101D35]">
              Cahyo Winarno, S.Pd., M.Pd.
            </h3>

            <p className="mt-1 text-center text-sm text-slate-500">
              Kepala SMA Negeri 1 Purworejo
            </p>
          </div>

          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
              Sambutan Kepala Sekolah
            </p>

            <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl lg:text-4xl">
              Selamat Datang di Website SMA Negeri 1 Purworejo
            </h2>

            <div className="my-4 h-1.5 w-16 rounded-full bg-yellow-400" />

            <p className="text-sm font-semibold italic text-slate-700">
              Bismillahirrahmanirrahim. Assalamu’alaikum warahmatullahi
              wabarakatuh.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Puji syukur ke hadirat Allah SWT atas rahmat dan karunia-Nya.
              Website SMA Negeri 1 Purworejo hadir sebagai sarana informasi,
              literasi, dan kolaborasi bagi seluruh warga sekolah serta
              masyarakat.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Berdiri sejak 2 Agustus 1955, SMA Negeri 1 Purworejo terus
              berkomitmen mengembangkan ilmu pengetahuan, karakter,
              kreativitas, dan kepedulian terhadap lingkungan lokal maupun
              global.
            </p>

            <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
              Semoga website ini menjadi media belajar dan berbagi informasi
              yang bermanfaat bagi peserta didik, alumni, guru, orang tua,
              serta masyarakat.
            </p>

            <p className="mt-4 text-sm font-semibold italic text-slate-700">
              Wassalamu’alaikum warahmatullahi wabarakatuh.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTIK */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-[1440px] px-5 py-14 sm:px-8 lg:px-10">
          <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
                SMA Negeri 1 Purworejo
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900 sm:text-3xl">
                Sekilas Data Sekolah
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-slate-500">
              Gambaran tenaga pendidik dan peserta didik SMA Negeri 1 Purworejo.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {statistik.map((item) => (
              <div
                key={item.label}
                className={`group relative overflow-hidden rounded-lg border border-slate-200 border-t-[5px] ${item.warna} bg-white px-3 py-6 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:px-5 sm:py-8`}
              >
                <div className="absolute inset-0 bg-slate-50 opacity-0 transition group-hover:opacity-100" />

                <div className="relative">
                  <p
                    className={`text-3xl font-black sm:text-4xl lg:text-5xl ${item.angka}`}
                  >
                    {item.jumlah}
                  </p>

                  <h3 className="mx-auto mt-3 max-w-48 text-xs font-bold leading-5 text-slate-700 sm:text-sm">
                    {item.label}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROFIL SEKOLAH DAN BERITA */}
      <section className="w-full bg-slate-50">
        <div className="mx-auto grid w-full max-w-[1440px] gap-8 px-5 py-14 sm:px-8 lg:grid-cols-[0.85fr_1.5fr] lg:gap-10 lg:px-10">
          {/* PROFIL */}
          <div>
            <div className="mb-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
                Mengenal sekolah
              </p>

              <h2 className="mt-2 text-2xl font-black text-slate-900">
                Tentang SMAN 1 Purworejo
              </h2>
            </div>

            <div className="overflow-hidden rounded-xl bg-[#101D35] shadow-md">
              <div className="relative flex min-h-56 flex-col justify-end overflow-hidden p-6 sm:min-h-64">
                <div className="absolute -right-12 -top-12 h-48 w-48 rounded-full border-[28px] border-cyan-500/20" />
                <div className="absolute -bottom-20 -left-10 h-52 w-52 rounded-full bg-yellow-400/10" />

                <div className="relative">
                  <span className="inline-block rounded bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-wider text-slate-950">
                    Unggul
                  </span>

                  <h3 className="mt-4 text-3xl font-black leading-tight text-white">
                    Berkarakter,
                    <br />
                    Mendunia.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-300">
                    Tumbuh bersama dalam pendidikan, prestasi, dan kepedulian
                    terhadap lingkungan.
                  </p>
                </div>
              </div>

              <div className="border-t border-white/10 p-5">
                <p className="text-sm leading-7 text-slate-300">
                  Berlokasi di Jalan Tentara Pelajar No. 55, Purworejo,
                  SMA Negeri 1 Purworejo terus mengembangkan potensi peserta
                  didik melalui pendidikan yang berkualitas dan berkarakter.
                </p>

                <Link
                  href="/about"
                  className="mt-4 inline-flex items-center gap-2 font-bold text-yellow-300 transition hover:text-white"
                >
                  Kenali sekolah kami <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* BERITA */}
          <div>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-cyan-700">
                  Kabar sekolah
                </p>

                <h2 className="mt-2 text-2xl font-black text-slate-900">
                  Berita & Kegiatan
                </h2>
              </div>

              <Link
                href="/berita"
                className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-cyan-600 hover:text-cyan-700"
              >
                Semua berita <span aria-hidden="true">→</span>
              </Link>
            </div>

            {beritaUtama ? (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.15fr_0.85fr]">
                <BeritaUtama berita={beritaUtama} />

                <div className="flex flex-col gap-4">
                  {beritaPendukung.map((berita) => (
                    <BeritaKecil key={berita.id} berita={berita} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                Belum ada berita untuk ditampilkan.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative w-full overflow-hidden bg-[#101D35]">
        <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[40px] border-cyan-500/10" />

        <div className="relative mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-yellow-400">
              Informasi sekolah
            </p>

            <h2 className="mt-2 text-2xl font-black text-white">
              Jelajahi SMA Negeri 1 Purworejo
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-300">
              Temukan informasi profil sekolah dan berita kegiatan lainnya.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/about"
              className="rounded-md bg-yellow-400 px-5 py-3 text-sm font-extrabold text-slate-950 transition hover:bg-yellow-300"
            >
              Profil Sekolah
            </Link>

            <Link
              href="/berita"
              className="rounded-md border border-white/30 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-white/10"
            >
              Lihat Berita
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
