
import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBeritaPublik } from "@/lib/berita";

async function DetailBeritaContent({ id }) {
  const semuaBerita = await getBeritaPublik();

  const berita = semuaBerita.find(
    (item) => String(item.id) === String(id)
  );

  if (!berita) {
    notFound();
  }

  const judul = berita.judul || berita.title || "Berita Sekolah";
  const tanggal = berita.tanggal || berita.date || "";
  const gambar = berita.gambar || berita.image || "";
  const ringkasan = berita.ringkasan || berita.excerpt || "";

  const paragraf = berita.isi
    ? berita.isi.split(/\r?\n\s*\r?\n/)
    : Array.isArray(berita.paragraphs)
      ? berita.paragraphs
      : [ringkasan].filter(Boolean);

  return (
    <>
      <section className="bg-[#064ea2] px-5 py-12 text-white md:px-8 md:py-16">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/berita"
            className="inline-flex items-center gap-2 font-semibold text-[#f3ea08] transition hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Kembali ke Berita
          </Link>

          {tanggal && (
            <p className="mt-8 text-sm font-semibold text-[#f3ea08]">
              {tanggal}
            </p>
          )}

          <h1 className="mt-3 text-3xl font-black leading-tight md:text-5xl">
            {judul}
          </h1>

          {ringkasan && (
            <p className="mt-5 max-w-3xl leading-7 text-slate-300">
              {ringkasan}
            </p>
          )}

          <div className="mt-7 h-1.5 w-20 rounded-full bg-[#f3ea08]" />
        </div>
      </section>

      <article className="bg-white px-5 py-12 md:px-8 md:py-16">
        <div className="mx-auto max-w-4xl">
          {gambar && (
            <div className="overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <Image
                src={gambar}
                alt={judul}
                width={1200}
                height={700}
                priority
                className="max-h-[520px] w-full object-cover"
              />
            </div>
          )}

          <div className="mt-10">
            <div className="mb-8 border-l-4 border-[#f3ea08] pl-5">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#064ea2]">
                SMA Negeri 1 Purworejo
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {judul}
              </h2>

              {berita.penulis && (
                <p className="mt-2 text-sm text-slate-500">
                  Ditulis oleh {berita.penulis}
                </p>
              )}
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-700 md:text-lg">
              {paragraf.map((teks, index) => (
                <p key={index}>{teks}</p>
              ))}
            </div>
          </div>

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
              className="mt-6 inline-flex rounded-lg bg-[#f3ea08] px-5 py-3 font-bold text-[#064ea2] transition hover:brightness-95"
            >
              Lihat Semua Berita →
            </Link>
          </div>

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

export default function DetailBeritaPage({ params }) {
  return (
    <Suspense
      fallback={
        <section className="bg-slate-50 px-6 py-16 text-center text-slate-600">
          Memuat detail berita...
        </section>
      }
    >
      <DetailBeritaPageContent params={params} />
    </Suspense>
  );
}

async function DetailBeritaPageContent({ params }) {
  const { id } = await params;

  return <DetailBeritaContent id={id} />;
}
