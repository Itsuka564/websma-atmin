"use client";

import { useEffect, useState } from "react";

export default function AdminKeuanganPage() {
  const [data, setData] = useState({
    status: "Belum Dirilis",
    tahun: "2026",
    judul: "Informasi Keuangan Tahun 2026",
    deskripsi: "Informasi keuangan untuk tahun 2026 belum dirilis. Silakan kunjungi halaman ini kembali secara berkala untuk mendapatkan informasi terbaru.",
    fileUrl: "",
  });

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
      if (settings && settings.keuangan_data) {
        setData(settings.keuangan_data);
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
        body: JSON.stringify({ key: "keuangan_data", value: data }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan");

      setPesan({ tipe: "sukses", teks: "Data transparansi keuangan berhasil disimpan! Langsung tayang di /keuangan." });
      setTimeout(() => setPesan({ tipe: "", teks: "" }), 4000);
    } catch (e) {
      setPesan({ tipe: "error", teks: e.message });
    } finally {
      setSaving(false);
    }
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
          <h2 className="text-xl font-black text-slate-900">Kelola Informasi Keuangan</h2>
          <p className="text-xs text-slate-500 mt-1">
            Atur status transparansi anggaran yang dapat dilihat publik pada halaman /keuangan.
          </p>
        </div>

        {loading ? (
          <p className="text-xs text-slate-400 py-6 text-center">Memuat data...</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Status Rilis</label>
                <select
                  value={data.status}
                  onChange={(e) => setData({ ...data, status: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 font-bold bg-white outline-none focus:border-orange-500"
                >
                  <option value="Belum Dirilis">Belum Dirilis</option>
                  <option value="Telah Dirilis">Telah Dirilis (Publik)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tahun Anggaran</label>
                <input
                  type="text"
                  value={data.tahun}
                  onChange={(e) => setData({ ...data, tahun: e.target.value })}
                  className="w-full text-sm p-3 rounded-xl border border-slate-200 font-bold outline-none focus:border-orange-500"
                  placeholder="2026"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Judul Laporan</label>
              <input
                type="text"
                value={data.judul}
                onChange={(e) => setData({ ...data, judul: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 font-extrabold outline-none focus:border-orange-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Keterangan / Deskripsi</label>
              <textarea
                rows={4}
                value={data.deskripsi}
                onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Tautan / Link Berkas Laporan PDF (Google Drive / Cloud)
              </label>
              <input
                type="text"
                value={data.fileUrl || ""}
                onChange={(e) => setData({ ...data, fileUrl: e.target.value })}
                className="w-full text-sm p-3 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
                placeholder="https://drive.google.com/..."
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Jika diisi dan status "Telah Dirilis", tombol unduh laporan akan muncul di halaman publik.
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white text-xs font-bold transition shadow-md disabled:opacity-50"
              >
                {saving ? "Menyimpan..." : "Simpan Informasi Keuangan 💾"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
