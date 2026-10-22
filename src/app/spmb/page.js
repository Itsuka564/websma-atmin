import { getSetting } from "@/lib/settings";

export const instant = false;

export default async function SPMBPage() {
  const data = (await getSetting("spmb_data")) || {
    tahunAjaran: "2026/2027",
    judul: "Pengumuman Hasil Seleksi dan Informasi Daftar Ulang SPMB 2026",
    deskripsi: "Silakan unduh dokumen pengumuman melalui tautan berikut.",
    fileId: "1EkgiMgDqKiepu6sxBX1OncdPr8q81158",
    folderUrl: "https://drive.google.com/drive/folders/1jVadHgfkDqKxhtpjCV4sdJ3dRTU8ZlDl",
    syarat: [
      "Lembar ceklist daftar ulang",
      "Lembar biodata Calon Murid Baru (CMB)",
      "Surat pernyataan CMB tentang kesanggupan selama menempuh studi",
    ],
  };

  const downloadUrl = data.fileId.startsWith("http")
    ? data.fileId
    : `https://drive.google.com/uc?export=download&id=${data.fileId}`;

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-[#064ea2] px-6 py-16 text-white">
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08]">
            Tahun Ajaran {data.tahunAjaran}
          </p>
          <h1 className="mt-3 text-3xl font-extrabold md:text-5xl">
            Informasi SPMB
          </h1>
          <p className="mt-4 max-w-2xl leading-7 text-slate-300">
            Pengumuman hasil seleksi dan informasi daftar ulang Sistem
            Penerimaan Murid Baru SMA Negeri 1 Purworejo.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl space-y-8 px-6 py-12">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-bold text-[#064ea2]">
            {data.judul}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">
            {data.deskripsi}
          </p>

          {data.fileId && (
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex rounded-lg bg-[#064ea2] px-6 py-3 font-semibold text-white transition hover:bg-[#043875]"
            >
              Unduh Pengumuman ↗
            </a>
          )}
        </div>

        {data.syarat && data.syarat.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-xl font-bold text-[#064ea2]">
              Berkas Daftar Ulang
            </h2>

            <p className="mt-3 leading-7 text-slate-600">
              Buka folder berikut untuk mengunduh dokumen yang diperlukan:
            </p>

            <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
              {data.syarat.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            {data.folderUrl && (
              <a
                href={data.folderUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex rounded-lg bg-[#064ea2] px-6 py-3 font-semibold text-white transition hover:bg-[#043875]"
              >
                Buka Folder Berkas Daftar Ulang ↗
              </a>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
