
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { beritaData } from "@/data/berita";

export function generateStaticParams() {
  return beritaData.map((berita) => ({
    id: berita.id,
  }));
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;

  const berita = beritaData.find((item) => item.id === id);

  if (!berita) {
    notFound();
  }

  return (
    <>
      {/* HEADER DETAIL BERITA */}
      <section className="bg-[#064ea2] px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 font-semibold text-[#f3ea08] transition hover:text-[#f3ea08]"
          >
            <span aria-hidden="true">←</span>
            Kembali ke Berita
          </Link>

          <p className="mt-8 text-sm font-semibold text-[#f3ea08]">
            {berita.date}
          </p>

          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            {berita.title}
          </h1>

          <p className="mt-5 max-w-3xl leading-7 text-slate-300">
            {berita.excerpt}
          </p>

          <div className="mt-7 h-1.5 w-20 rounded-full bg-[#f3ea08]" />
        </div>
      </section>

      {/* ISI ARTIKEL */}
      <article className="bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          {/* Gambar utama */}
          <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
            <Image
              src={berita.image}
              alt={berita.title}
              width={1200}
              height={700}
              priority
              className="max-h-[520px] w-full object-cover"
            />
          </div>

          {/* Isi berita */}
          <div className="mt-10">
            <div className="mb-8 border-l-4 border-[#f3ea08] pl-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#064ea2]">
                SMA Negeri 1 Purworejo
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {berita.title}
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-700 md:text-lg">
              {berita.paragraphs.map((paragraf, index) => (
                <p key={index}>{paragraf}</p>
              ))}
            </div>
          </div>

          {/* Informasi penutup */}
          <div className="mt-12 rounded-2xl bg-[#064ea2] p-7 text-white md:p-9">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#f3ea08]">
              Unggul, Berkarakter, Mendunia
            </p>

            <h2 className="mt-3 text-xl font-bold md:text-2xl">
              Terus ikuti informasi sekolah
            </h2>

            <p className="mt-3 leading-7 text-slate-300">
              Jelajahi berita lainnya untuk mengenal lebih dekat
              kegiatan dan informasi seputar SMA Negeri 1 Purworejo.
            </p>

            <Link
              href="/berita"
              className="mt-6 inline-flex rounded-lg bg-[#f3ea08] px-5 py-3 font-bold text-[#064ea2] transition hover:bg-[#f3ea08]"
            >
              Lihat Semua Berita →
            </Link>
          </div>

          {/* Tombol kembali */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <Link
              href="/berita"
              className="font-semibold text-slate-700 transition hover:text-[#064ea2]"
            >
              ← Kembali ke Daftar Berita
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
