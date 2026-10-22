"use client";

import { useEffect, useState } from "react";

export default function AdminSPMBPage() {
  const [data, setData] = useState({
    tahunAjaran: "2026/2027",
    judul: "Pengumuman Hasil Seleksi dan Informasi Daftar Ulang SPMB 2026",
    deskripsi: "Silakan unduh dokumen pengumuman dan berkas daftar ulang melalui tautan berikut.",
    fileId: "1EkgiMgDqKiepu6sxBX1OncdPr8q81158",
    folderUrl: "https://drive.google.com/drive/folders/1jVadHgfkDqKxhtpjCV4sdJ3dRTU8ZlDl",
    syarat: [
      "Lembar ceklist daftar ulang",
      "Lembar biodata Calon Murid Baru (CMB)",
      "Surat pernyataan CMB tentang kesanggupan selama menempuh studi",
    ],
  });

  const [syaratBaru, setSyaratBaru] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  useEffect(() => {
    muatData();
  }, []);

  async function muatData() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const settings = await res.json();
      if (settings && settings.spmb_data) {
        setData(settings.spmb_data);
      }
    } catch (e) {
      setPesan({ tipe: "error", teks: e.message });
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "spmb_data", value: data }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");

      setPesan({ tipe: "sukses", teks: "Data informasi SPMB berhasil disimpan! Langsung tayang di /spmb." });
      setTimeout(() => setPesan({ tipe: "", teks: "" }), 4000);
    } catch (e) {
      setPesan({ tipe: "error", teks: e.message });
    } finally {
      setSaving(false);
    }
  }

  function handleTambahSyarat() {
    if (!syaratBaru.trim()) return;
    setData({
      ...data,
      syarat: [...(data.syarat || []), syaratBaru.trim()],
    });
    setSyaratBaru("");
  }

  function handleHapusSyarat(index) {
    setData({
      ...data,
      syarat: data.syarat.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {pesan.teks && (
        <div
          className={`p-4 rounded-xl text-sm font-semibold flex items-center justify-between ${
            pesan.tipe === "sukses"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-rose-50 text-rose-800 border border-rose-200"
          }`}
        >
          <span>{pesan.teks}</span>
          <button onClick={() => setPesan({ tipe: "", teks: "" })} className="underline text-xs">
            Tutup
          </button>
        </div>
      )}

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-black text-slate-900">Kelola Informasi SPMB</h2>
          <p className="text-xs text-slate-500 mt-1">
            Atur pengumuman kelulusan/hasil seleksi dan tautan berkas pendaftaran ulang murid baru.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-slate-400 py-6 text-center">Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Ajaran</label>
                <input
                  type="text"
                  value={data.tahunAjaran}
                  onChange={(e) => setData({ ...data, tahunAjaran: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 font-bold outline-none focus:border-orange-500"
                  placeholder="2026/2027"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Drive File ID / Link Unduh</label>
                <input
                  type="text"
                  value={data.fileId}
                  onChange={(e) => setData({ ...data, fileId: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 font-mono text-xs outline-none focus:border-orange-500"
                  placeholder="ID berkas Google Drive pengumuman"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Pengumuman</label>
              <input
                type="text"
                value={data.judul}
                onChange={(e) => setData({ ...data, judul: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 font-extrabold outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan Singkat</label>
              <textarea
                rows={3}
                value={data.deskripsi}
                onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Link Folder Google Drive Berkas Daftar Ulang</label>
              <input
                type="text"
                value={data.folderUrl || ""}
                onChange={(e) => setData({ ...data, folderUrl: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
                placeholder="https://drive.google.com/drive/folders/..."
              />
            </div>

            {/* List Berkas Syarat */}
            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 mb-2">Dokumen / Berkas yang Diperlukan</label>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={syaratBaru}
                  onChange={(e) => setSyaratBaru(e.target.value)}
                  placeholder="Tambah nama dokumen baru..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
                />
                <button
                  type="button"
                  onClick={handleTambahSyarat}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800"
                >
                  + Tambah
                </button>
              </div>

              <div className="space-y-1.5">
                {(data.syarat || []).map((s, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg border border-slate-200 bg-slate-50 text-xs">
                    <span className="text-slate-800 font-medium">• {s}</span>
                    <button
                      type="button"
                      onClick={() => handleHapusSyarat(idx)}
                      className="text-rose-500 hover:text-rose-700 font-bold px-1"
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white text-xs font-bold transition shadow-md disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Pengaturan SPMB 💾"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
