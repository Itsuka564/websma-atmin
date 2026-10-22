import Link from "next/link";
import { getSetting } from "@/lib/settings";

export const instant = false;

export default async function InformasiPage() {
  const list = (await getSetting("informasi_list")) || [];

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

      <section className="mx-auto max-w-6xl px-6 py-12 space-y-6">
        {list.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center text-slate-500">
            <p className="font-bold">Belum ada pengumuman yang dirilis.</p>
          </div>
        ) : (
          list.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="h-2 bg-[#f3ea08]" />

              <div className="p-6 md:p-10">
                <span className="rounded-full bg-[#f3ea08]/20 px-3 py-1 text-xs font-bold text-[#064ea2]">
                  {item.kategori}
                </span>

                <h2 className="mt-5 text-2xl font-bold leading-snug text-[#064ea2] md:text-3xl">
                  {item.judul}
                </h2>

                <p className="mt-4 text-sm text-slate-500">
                  {item.penulis || "Admin Sekolah"} <span className="mx-2">|</span>
                  {item.tanggal} <span className="mx-2">|</span>
                  {item.dibaca || 0} kali dibaca
                </p>

                <p className="mt-6 leading-8 text-slate-700 whitespace-pre-line">
                  {item.ringkasan}
                </p>

                {item.linkResmi && (
                  <Link
                    href={item.linkResmi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex rounded-lg bg-[#064ea2] px-6 py-3 font-semibold text-white transition hover:bg-[#043875]"
                  >
                    Lihat Pengumuman Resmi ↗
                  </Link>
                )}
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
