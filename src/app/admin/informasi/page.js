"use client";

import { useEffect, useState } from "react";

const FORM_KOSONG = {
  id: "",
  kategori: "PENGUMUMAN SPMB",
  judul: "",
  tanggal: "",
  penulis: "Admin Sekolah",
  dibaca: 100,
  ringkasan: "",
  linkResmi: "",
};

export default function AdminInformasiPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState(FORM_KOSONG);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pesan, setPesan] = useState({ tipe: "", teks: "" });

  useEffect(() => {
    muatData();
  }, []);

  async function muatData() {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings", { cache: "no-store" });
      const data = await res.json();
      if (data && data.informasi_list) {
        setList(data.informasi_list);
      }
    } catch (e) {
      setPesan({ tipe: "error", teks: "Gagal memuat informasi: " + e.message });
    } finally {
      setLoading(false);
    }
  }

  async function simpanList(dataBaru) {
    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: "informasi_list", value: dataBaru }),
      });
      if (!res.ok) throw new Error("Gagal menyimpan ke server");
      setList(dataBaru);
      setPesan({ tipe: "sukses", teks: "Data pengumuman berhasil disimpan!" });
      setShowModal(false);
      setForm(FORM_KOSONG);
      setEditId(null);
      setTimeout(() => setPesan({ tipe: "", teks: "" }), 4000);
    } catch (e) {
      setPesan({ tipe: "error", teks: e.message });
    } finally {
      setSaving(false);
    }
  }

  function handleOpenAdd() {
    setEditId(null);
    setForm({
      ...FORM_KOSONG,
      id: "info-" + Date.now(),
      tanggal: new Date().toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    });
    setShowModal(true);
  }

  function handleOpenEdit(item) {
    setEditId(item.id);
    setForm({ ...item });
    setShowModal(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.judul.trim()) {
      alert("Judul pengumuman wajib diisi.");
      return;
    }

    let updated = [];
    if (editId) {
      updated = list.map((item) => (item.id === editId ? form : item));
    } else {
      updated = [form, ...list];
    }
    simpanList(updated);
  }

  function handleDelete(id) {
    if (!confirm("Yakin ingin menghapus pengumuman ini?")) return;
    const updated = list.filter((item) => item.id !== id);
    simpanList(updated);
  }

  return (
    <div className="space-y-6">
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

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h2 className="text-xl font-black text-slate-900">Kelola Pengumuman Sekolah</h2>
          <p className="text-xs text-slate-500 mt-0.5">Daftar pengumuman yang tayang di halaman /informasi</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-[#f06548] hover:bg-[#d95338] text-white text-xs font-bold transition shadow-xs flex items-center gap-1.5 self-start sm:self-auto"
        >
          <span>+ Buat Pengumuman Baru</span>
        </button>
      </div>

      {/* List Card */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
        {loading ? (
          <p className="p-8 text-center text-xs font-semibold text-slate-400">Memuat data pengumuman...</p>
        ) : list.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            <p className="text-sm font-bold">Belum ada pengumuman.</p>
            <p className="text-xs text-slate-400 mt-1">Klik tombol "+ Buat Pengumuman Baru" di atas.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {list.map((item) => (
              <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50/60 transition">
                <div className="space-y-1.5 min-w-0 max-w-3xl">
                  <span className="text-[10px] font-black uppercase tracking-wider text-orange-600 bg-orange-100 px-2 py-0.5 rounded">
                    {item.kategori}
                  </span>
                  <h3 className="font-extrabold text-slate-900 text-base leading-snug">
                    {item.judul}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2">
                    {item.ringkasan}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium pt-1">
                    {item.penulis} • {item.tanggal} • {item.dibaca || 0}x dibaca
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <button
                    onClick={() => handleOpenEdit(item)}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-100 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1.5 rounded-lg border border-rose-200 bg-rose-50 text-rose-600 text-xs font-bold hover:bg-rose-100 transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-900">
                {editId ? "Edit Pengumuman" : "Buat Pengumuman Baru"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Kategori Pengumuman</label>
                <input
                  type="text"
                  value={form.kategori}
                  onChange={(e) => setForm({ ...form, kategori: e.target.value })}
                  placeholder="Contoh: PENGUMUMAN SPMB, AKADEMIK, KEGIATAN"
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 font-semibold outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Judul Pengumuman</label>
                <input
                  type="text"
                  value={form.judul}
                  onChange={(e) => setForm({ ...form, judul: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 font-bold outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tanggal</label>
                  <input
                    type="text"
                    value={form.tanggal}
                    onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Penulis</label>
                  <input
                    type="text"
                    value={form.penulis}
                    onChange={(e) => setForm({ ...form, penulis: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Ringkasan / Isi Pengumuman</label>
                <textarea
                  rows={4}
                  value={form.ringkasan}
                  onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
                  className="w-full text-sm p-2.5 rounded-xl border border-slate-200 outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Tautan / Link Dokumen Resmi (Opsional)</label>
                <input
                  type="text"
                  value={form.linkResmi || ""}
                  onChange={(e) => setForm({ ...form, linkResmi: e.target.value })}
                  placeholder="https://..."
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-[#f06548] text-white text-xs font-bold hover:bg-[#d95338] disabled:opacity-50"
                >
                  {saving ? "Menyimpan..." : "Simpan Pengumuman 💾"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
