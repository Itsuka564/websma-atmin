import Link from "next/link";
import { getSetting } from "@/lib/settings";

export const instant = false;

export default async function KeuanganPage() {
  const data = (await getSetting("keuangan_data")) || {
    status: "Belum Dirilis",
    tahun: "2026",
    judul: "Informasi Keuangan Tahun 2026",
    deskripsi: "Informasi keuangan untuk tahun 2026 belum dirilis.",
    fileUrl: "",
  };

  const isRilis = data.status === "Telah Dirilis";

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

      <section className="mx-auto flex max-w-4xl flex-col items-center px-6 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3ea08]/20 text-4xl shadow-sm">
          📄
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#064ea2] md:text-3xl">
          {data.judul}
        </h2>

        <p className="mt-4 max-w-xl leading-7 text-slate-600 whitespace-pre-line">
          {data.deskripsi}
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
          <span
            className={`rounded-full border px-5 py-2 text-sm font-semibold ${
              isRilis
                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                : "border-[#f3ea08] bg-[#f3ea08]/10 text-[#064ea2]"
            }`}
          >
            {data.status}
          </span>

          {isRilis && data.fileUrl && (
            <Link
              href={data.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full bg-[#064ea2] px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#043875] transition"
            >
              Unduh Laporan Keuangan ↗
            </Link>
          )}
        </div>
      </section>
    </main>
  );
}
