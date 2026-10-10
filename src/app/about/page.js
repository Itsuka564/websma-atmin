
import Image from "next/image";
import Link from "next/link";

const sejarah = [
  {
    tahun: "1954",
    judul: "Awal Perintisan Sekolah",
    isi: "SMA Negeri 1 Purworejo dirintis oleh Keluarga Besar Tentara Pelajar Detasemen III Brigade 17 untuk memperluas kesempatan masyarakat memperoleh pendidikan tingkat menengah atas.",
  },
  {
    tahun: "1955",
    judul: "Menjadi Sekolah Negeri",
    isi: "Pada 1 Agustus 1955, sekolah resmi menjadi SMA Negeri Purworejo setelah sebelumnya dikenal sebagai SMA B, C Kedu Selatan.",
  },
  {
    tahun: "1958",
    judul: "Pembangunan Gedung Sekolah",
    isi: "Departemen Pendidikan, Pengajaran dan Kebudayaan membeli tanah di Jalan Kutoarjo untuk pembangunan gedung SMA Negeri Purworejo.",
  },
  {
    tahun: "1976",
    judul: "Menempati Gedung Sekarang",
    isi: "Kegiatan pembelajaran mulai dilaksanakan di gedung baru di Jalan Tentara Pelajar, yang menjadi lokasi sekolah hingga sekarang.",
  },
];

const misi = [
  {
    judul: "Membentuk Karakter dan Integritas",
    isi: "Mengembangkan keimanan, ketakwaan, kejujuran, sopan santun, empati, dan budi pekerti luhur.",
  },
  {
    judul: "Meningkatkan Kualitas Pembelajaran",
    isi: "Menyelenggarakan pendidikan berdaya saing global dengan tetap mengedepankan kearifan lokal dan kepedulian lingkungan.",
  },
  {
    judul: "Mendorong Inovasi dan Prestasi",
    isi: "Mengembangkan pembelajaran kreatif, efektif, dan efisien serta meningkatkan prestasi akademik dan nonakademik.",
  },
  {
    judul: "Mengembangkan Kepemimpinan",
    isi: "Memberikan kesempatan kepada peserta didik untuk mengembangkan kemampuan berorganisasi, kepemimpinan, seni, dan budaya.",
  },
  {
    judul: "Meningkatkan Kompetensi Pendidik",
    isi: "Mendukung peningkatan kompetensi guru dan tenaga kependidikan sesuai perkembangan ilmu pengetahuan dan teknologi.",
  },
  {
    judul: "Melestarikan Lingkungan",
    isi: "Membangun kebiasaan menjaga kebersihan, mencegah pencemaran, dan melestarikan fungsi lingkungan.",
  },
  {
    judul: "Mewujudkan Sekolah Ramah Anak",
    isi: "Mendorong lingkungan yang aman, inklusif, demokratis, bebas kekerasan, dan menghargai kesetaraan.",
  },
  {
    judul: "Meningkatkan Mutu dan Kemitraan",
    isi: "Mengembangkan penjaminan mutu, tata kelola transparan dan akuntabel, serta kemitraan untuk mendukung pendidikan dan kelanjutan studi siswa.",
  },
];

const fotoGedung = [
  {
    src: "/images/gedung-1.jpg",
    alt: "Gedung sekolah SMA Negeri 1 Purworejo",
  },
  {
    src: "/images/gedung-2.jpg",
    alt: "Bangunan sekolah SMA Negeri 1 Purworejo",
  },
  {
    src: "/images/gedung-3.jpg",
    alt: "Area gedung SMA Negeri 1 Purworejo",
  },
  {
    src: "/images/gedung-4.jpg",
    alt: "Fasilitas gedung SMA Negeri 1 Purworejo",
  },
];

function SectionLabel({ children, light = false }) {
  return (
    <p
      className={`mb-3 flex items-center gap-3 text-xs font-extrabold uppercase tracking-[0.22em] ${
        light ? "text-[#f3ea08]" : "text-[#064ea2]"
      }`}
    >
      <span className="h-1 w-8 rounded-full bg-[#f3ea08]" />
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className="max-w-2xl">
      <SectionLabel light={light}>{eyebrow}</SectionLabel>
      <h2
        className={`text-3xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl ${
          light ? "text-white" : "text-[#064ea2]"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-8 ${
            light ? "text-slate-300" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#064ea2]">
        <div
          aria-hidden="true"
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full border-[50px] border-[#f3ea08]/10"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-36 left-[35%] h-80 w-80 rounded-full bg-[#f3ea08]/5 blur-3xl"
        />

        <div className="relative mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-16 sm:px-8 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:px-12 lg:py-28">
          <div>
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f3ea08]" />
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-slate-200">
                Profil Sekolah
              </span>
            </div>

            <h1 className="max-w-3xl text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
              Mengenal Lebih Dekat
              <span className="mt-2 block text-[#f3ea08]">
                SMA Negeri 1 Purworejo
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Menumbuhkan generasi yang unggul dalam ilmu pengetahuan,
              berkarakter dalam tindakan, serta peduli terhadap lingkungan dan
              siap berkontribusi bagi masyarakat.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#sejarah"
                className="inline-flex items-center gap-3 rounded-xl bg-[#f3ea08] px-6 py-4 font-extrabold text-[#064ea2] transition hover:-translate-y-1 hover:bg-[#f3ea08]"
              >
                Jelajahi Sejarah
                <span aria-hidden="true">↓</span>
              </a>
              <a
                href="#visi-misi"
                className="inline-flex items-center rounded-xl border border-white/25 px-6 py-4 font-bold text-white transition hover:border-[#f3ea08] hover:text-[#f3ea08]"
              >
                Visi &amp; Misi
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="absolute -right-3 -top-3 h-24 w-24 rounded-tr-3xl border-r-4 border-t-4 border-[#f3ea08] sm:-right-5 sm:-top-5" />

            <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/5 p-3 shadow-2xl shadow-black/20">
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-800">
                <Image
                  src="/images/gedung-1.jpg"
                  alt="Gedung SMA Negeri 1 Purworejo"
                  fill
                  priority
                  sizes="(max-width: 1024px) 90vw, 45vw"
                  className="object-cover transition duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064ea2]/90 via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#f3ea08]">
                    Sejak 1955
                  </p>
                  <p className="mt-2 text-2xl font-black text-white sm:text-3xl">
                    Tumbuh Bersama Generasi Bangsa
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-2 rounded-xl bg-[#f3ea08] px-5 py-4 shadow-xl sm:-left-5 sm:px-7">
              <p className="text-3xl font-black text-[#064ea2]">1955</p>
              <p className="text-xs font-bold text-[#064ea2]/75">
                Tahun menjadi sekolah negeri
              </p>
            </div>
          </div>
        </div>

        <div className="h-1.5 w-full bg-gradient-to-r from-yellow-300 via-[#f3ea08] to-[#f3ea08]" />
      </section>

      {/* PROFIL SEKOLAH */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20">
          <div>
            <SectionHeading
              eyebrow="Tentang Sekolah"
              title="Pendidikan untuk Masa Depan"
              description="SMA Negeri 1 Purworejo merupakan sekolah menengah atas negeri yang memiliki sejarah panjang dalam dunia pendidikan di Kabupaten Purworejo, Jawa Tengah. Perintisan sekolah dimulai pada 1954 dan kemudian menjadi sekolah negeri pada 1955."
            />

            <p className="mt-5 max-w-2xl leading-8 text-slate-600">
              Dalam penyelenggaraan pendidikan, sekolah mengembangkan ilmu
              pengetahuan, karakter, prestasi, kepemimpinan, serta kepedulian
              terhadap lingkungan. Nilai-nilai tersebut menjadi bagian dari
              upaya membentuk peserta didik yang siap menghadapi masa depan.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              {[
                "Pendidikan Berkualitas",
                "Pembentukan Karakter",
                "Peduli Lingkungan",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-sm font-bold text-slate-700"
                >
                  <span className="mr-2 text-[#064ea2]">✓</span>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl bg-[#064ea2] p-6 text-white sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-300">
                Mulai Dirintis
              </p>
              <p className="mt-4 text-4xl font-black text-[#f3ea08] sm:text-5xl">
                1954
              </p>
              <div className="mt-5 h-1 w-12 rounded-full bg-[#f3ea08]" />
              <p className="mt-4 text-sm leading-6 text-slate-300">
                Awal perjalanan pendidikan sekolah.
              </p>
            </div>

            <div className="rounded-2xl bg-[#f3ea08] p-6 text-[#064ea2] sm:p-8">
              <p className="text-sm font-bold uppercase tracking-wider text-slate-800">
                Sekolah Negeri
              </p>
              <p className="mt-4 text-4xl font-black sm:text-5xl">1955</p>
              <div className="mt-5 h-1 w-12 rounded-full bg-[#064ea2]" />
              <p className="mt-4 text-sm leading-6 text-slate-800">
                Menjadi bagian dari pendidikan negeri.
              </p>
            </div>

            <div className="col-span-2 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xl">
                  📍
                </div>
                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#064ea2]">
                    Lokasi Sekolah
                  </p>
                  <p className="mt-2 text-lg font-extrabold sm:text-xl">
                    Jalan Tentara Pelajar No. 55
                  </p>
                  <p className="mt-1 text-slate-500">
                    Purworejo, Jawa Tengah
                  </p>
                  <a
                    href="https://maps.app.goo.gl/g2kzaWdCxY8UrtsZ6"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#064ea2] underline decoration-yellow-400 decoration-2 underline-offset-4 transition hover:text-[#064ea2]"
                  >
                    Lihat lokasi di Google Maps ↗
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEJARAH */}
      <section
        id="sejarah"
        className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="mb-12 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              eyebrow="Perjalanan Sekolah"
              title="Sejarah Singkat"
              description="Menelusuri perjalanan SMA Negeri 1 Purworejo dari awal perintisan hingga berkembang di lokasi sekarang."
            />
            <span className="hidden shrink-0 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-500 md:inline-block">
              1954 — Sekarang
            </span>
          </div>

          <div className="relative space-y-5 before:absolute before:bottom-8 before:left-[27px] before:top-8 before:w-0.5 before:bg-[#f3ea08] sm:before:left-[35px]">
            {sejarah.map((item, index) => (
              <article
                key={item.tahun}
                className="relative grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#f3ea08] hover:shadow-lg sm:grid-cols-[100px_1fr] sm:gap-7 sm:p-7"
              >
                <div className="relative z-10 flex items-start">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border-4 border-slate-50 bg-[#f3ea08] text-sm font-black text-[#064ea2] sm:h-[70px] sm:w-[70px] sm:text-base">
                    {item.tahun}
                  </div>
                </div>

                <div className="pb-1">
                  <p className="text-xs font-extrabold uppercase tracking-widest text-[#064ea2]">
                    Tahap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
                    {item.judul}
                  </h3>
                  <p className="mt-3 leading-8 text-slate-600">{item.isi}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VISI */}
      <section
        id="visi-misi"
        className="scroll-mt-24 bg-[#064ea2] px-5 py-16 text-white sm:px-8 md:py-24 lg:px-12"
      >
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-3xl text-center">
            <SectionLabel light>Arah Pendidikan</SectionLabel>
            <h2 className="text-3xl font-black sm:text-4xl md:text-5xl">
              Visi Sekolah
            </h2>
            <p className="mt-4 leading-7 text-slate-300">
              Landasan dalam membentuk generasi yang berilmu, berkarakter, dan
              peduli terhadap lingkungan.
            </p>
          </div>

          <div className="relative mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-7 sm:p-10 md:p-14">
            <span className="absolute -right-4 -top-16 select-none text-[180px] font-black leading-none text-white/[0.04]">
              “
            </span>
            <div className="relative">
              <span className="text-6xl font-black leading-none text-[#f3ea08]">
                “
              </span>
              <p className="mt-3 text-xl font-extrabold leading-relaxed sm:text-2xl md:text-3xl md:leading-relaxed">
                Pengembang kepribadian pemimpin bangsa yang bertakwa, cerdas,
                serta peduli dan berbudaya lingkungan, baik lokal maupun
                global.
              </p>
              <div className="mt-8 h-1.5 w-20 rounded-full bg-[#f3ea08]" />
              <p className="mt-6 max-w-2xl leading-8 text-slate-300">
                Visi ini menekankan pembentukan pribadi yang berintegritas,
                menguasai ilmu pengetahuan, menghargai karya, serta peduli
                terhadap lingkungan dan masyarakat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MISI */}
      <section className="bg-white px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <SectionHeading
            eyebrow="Langkah Nyata"
            title="Misi Sekolah"
            description="Delapan arah pengembangan untuk mendukung pembelajaran, karakter, prestasi, kepemimpinan, dan lingkungan sekolah."
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {misi.map((item, index) => (
              <article
                key={item.judul}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1.5 hover:border-[#f3ea08] hover:shadow-xl hover:shadow-slate-200/70 sm:p-7"
              >
                <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full bg-[#f3ea08]/10 transition group-hover:scale-150" />

                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3ea08] text-lg font-black text-[#064ea2] transition group-hover:rotate-3">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="relative mt-6 text-lg font-extrabold leading-snug text-slate-900">
                  {item.judul}
                </h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-600">
                  {item.isi}
                </p>

                <div className="mt-6 h-1 w-10 rounded-full bg-[#f3ea08] transition-all group-hover:w-16" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI GEDUNG */}
      <section className="bg-slate-50 px-5 py-16 sm:px-8 md:py-24 lg:px-12">
        <div className="mx-auto max-w-[1440px]">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              eyebrow="Lingkungan Sekolah"
              title="Galeri Gedung Sekolah"
              description="Melihat lebih dekat lingkungan dan fasilitas SMA Negeri 1 Purworejo."
            />

            <span className="w-fit rounded-lg bg-white px-4 py-2 text-sm font-bold text-slate-500 shadow-sm">
              {fotoGedung.length} Foto
            </span>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {fotoGedung.map((foto, index) => (
              <figure
                key={foto.src}
                className={`group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                }`}
              >
                <div
                  className={`relative overflow-hidden bg-slate-200 ${
                    index === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-[calc(100%-64px)] lg:min-h-[350px]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes={
                      index === 0
                        ? "(max-width: 1024px) 90vw, 50vw"
                        : "(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
                    }
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#064ea2]/60 via-transparent to-transparent opacity-70 transition group-hover:opacity-100" />
                  <span className="absolute bottom-4 left-4 rounded-lg bg-[#f3ea08] px-3 py-1.5 text-xs font-black text-[#064ea2]">
                    FOTO {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <figcaption className="p-4 font-bold text-slate-800">
                  {index === 0
                    ? "Lingkungan Sekolah"
                    : `Gedung Sekolah ${index + 1}`}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / ALAMAT */}
      <section className="bg-[#f3ea08] px-5 py-12 sm:px-8 md:py-16 lg:px-12">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#064ea2]/70">
              Kunjungi Kami
            </p>
            <h2 className="mt-3 text-3xl font-black leading-tight text-[#064ea2] sm:text-4xl">
              Kenali sekolah kami lebih dekat.
            </h2>
            <p className="mt-4 leading-7 text-[#064ea2]/80">
              SMA Negeri 1 Purworejo, Jl. Tentara Pelajar No. 55, Purworejo,
              Jawa Tengah.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <a
              href="https://maps.app.goo.gl/g2kzaWdCxY8UrtsZ6"
              target="_blank"
              rel="noreferrer"
              className="rounded-xl border-2 border-[#064ea2]/20 px-5 py-4 font-extrabold text-[#064ea2] transition hover:bg-[#f3ea08]"
            >
              Buka Google Maps ↗
            </a>
            <Link
              href="/berita"
              className="rounded-xl bg-[#064ea2] px-5 py-4 font-extrabold text-white transition hover:bg-slate-800"
            >
              Berita Sekolah →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
