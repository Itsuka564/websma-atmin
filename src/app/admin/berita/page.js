
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FORM_KOSONG = {
  judul: "",
  tanggal: "",
  penulis: "",
  ringkasan: "",
  isi: "",
  gambar: "",
};

function getTanggalHariIni() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function AdminBeritaPage() {
  const [berita, setBerita] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(FORM_KOSONG);
  const [previewGambar, setPreviewGambar] = useState("");
  const [fileInputKey, setFileInputKey] = useState(0);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      tanggal: current.tanggal || getTanggalHariIni(),
    }));

    loadBerita();
  }, []);

  useEffect(() => {
    return () => {
      if (previewGambar.startsWith("blob:")) {
        URL.revokeObjectURL(previewGambar);
      }
    };
  }, [previewGambar]);

  async function loadBerita() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/admin/berita", {
        cache: "no-store",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal mengambil berita."
        );
      }

      setBerita(Array.isArray(result) ? result : result.berita || []);
    } catch (err) {
      setError(err.message || "Gagal mengambil data berita.");
    } finally {
      setLoading(false);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));

    if (name === "gambar") {
      setPreviewGambar(value);
    }
  }

  async function handleUploadGambar(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    setError("");
    setSuccess("");

    const tipeDiizinkan = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!tipeDiizinkan.includes(file.type)) {
      setError("Format gambar harus JPG, PNG, WEBP, atau GIF.");
      event.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    const previewSementara = URL.createObjectURL(file);
    setPreviewGambar(previewSementara);

    try {
      setUploading(true);

      const formData = new FormData();
      formData.append("gambar", file);

      const response = await fetch("/api/admin/berita/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal mengunggah gambar."
        );
      }

      setForm((current) => ({
        ...current,
        gambar: result.url,
      }));

      setPreviewGambar(result.url);
      setSuccess(
        "Gambar berhasil diunggah. Jangan lupa simpan beritanya."
      );
    } catch (err) {
      setError(
        err.message || "Terjadi kesalahan saat mengunggah gambar."
      );
    } finally {
      setUploading(false);
    }
  }

  function hapusGambar() {
    setForm((current) => ({
      ...current,
      gambar: "",
    }));

    setPreviewGambar("");
    setFileInputKey((current) => current + 1);
    setError("");
    setSuccess(
      "Gambar dihapus dari formulir. Simpan berita untuk menerapkan perubahan."
    );
  }

  function mulaiEdit(item) {
    setEditId(item.id);

    setForm({
      judul: item.judul || "",
      tanggal: item.tanggal || getTanggalHariIni(),
      penulis: item.penulis || "",
      ringkasan: item.ringkasan || "",
      isi: item.isi || "",
      gambar: item.gambar || "",
    });

    setPreviewGambar(item.gambar || "");
    setFileInputKey((current) => current + 1);
    setError("");
    setSuccess("");

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function batalEdit() {
    setEditId(null);

    setForm({
      ...FORM_KOSONG,
      tanggal: getTanggalHariIni(),
    });

    setPreviewGambar("");
    setFileInputKey((current) => current + 1);
    setError("");
    setSuccess("");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (uploading) {
      setError("Tunggu sampai proses upload gambar selesai.");
      return;
    }

    if (
      !form.judul.trim() ||
      !form.tanggal ||
      !form.ringkasan.trim() ||
      !form.isi.trim()
    ) {
      setError("Judul, tanggal, ringkasan, dan isi wajib diisi.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...form,
        judul: form.judul.trim(),
        penulis: form.penulis.trim(),
        ringkasan: form.ringkasan.trim(),
        isi: form.isi.trim(),
        gambar: form.gambar.trim(),
      };

      const response = await fetch("/api/admin/berita", {
        method: editId ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          editId ? { ...payload, id: editId } : payload
        ),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal menyimpan berita."
        );
      }

      if (editId) {
        setBerita((current) =>
          current.map((item) => (item.id === editId ? result : item))
        );

        setSuccess("Berita berhasil diperbarui.");
      } else {
        setBerita((current) => [...current, result]);
        setSuccess("Berita berhasil ditambahkan.");
      }

      setEditId(null);

      setForm({
        ...FORM_KOSONG,
        tanggal: getTanggalHariIni(),
      });

      setPreviewGambar("");
      setFileInputKey((current) => current + 1);
    } catch (err) {
      setError(
        err.message || "Terjadi kesalahan saat menyimpan berita."
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    const yakin = window.confirm(
      `Yakin ingin menghapus berita "${item.judul}"?`
    );

    if (!yakin) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/admin/berita", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: item.id }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || result.error || "Gagal menghapus berita."
        );
      }

      setBerita((current) =>
        current.filter((beritaItem) => beritaItem.id !== item.id)
      );

      if (editId === item.id) {
        batalEdit();
      }

      setSuccess("Berita berhasil dihapus.");
    } catch (err) {
      setError(
        err.message || "Terjadi kesalahan saat menghapus berita."
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="berita-admin-container">

        <section className="berita-form">
          <h2>{editId ? "Edit Berita" : "Tambah Berita"}</h2>

          {error && (
            <p className="berita-message berita-error" role="alert">
              {error}
            </p>
          )}

          {success && (
            <p className="berita-message berita-success" role="status">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            <div className="berita-form-grid">
              <label>
                Judul berita *
                <input
                  type="text"
                  name="judul"
                  value={form.judul}
                  onChange={handleChange}
                  placeholder="Masukkan judul berita"
                  maxLength={200}
                  required
                />
              </label>

              <label>
                Tanggal *
                <input
                  type="date"
                  name="tanggal"
                  value={form.tanggal}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Penulis
                <input
                  type="text"
                  name="penulis"
                  value={form.penulis}
                  onChange={handleChange}
                  placeholder="Nama penulis"
                  maxLength={100}
                />
              </label>

              <label>
                URL gambar (opsional)
                <input
                  type="text"
                  name="gambar"
                  value={form.gambar}
                  onChange={handleChange}
                  placeholder="https://... atau /uploads/berita/..."
                  maxLength={500}
                />
                <small>
                  Bisa menggunakan URL internet atau alamat gambar lokal.
                </small>
              </label>
            </div>

            <div className="berita-upload-area">
              <label htmlFor="gambar-upload">
                Upload gambar dari laptop
              </label>

              <input
                key={fileInputKey}
                id="gambar-upload"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleUploadGambar}
                disabled={uploading || saving}
              />

              <small>
                Format JPG, PNG, WEBP, atau GIF. Maksimal 5 MB.
              </small>

              {uploading && (
                <p className="berita-message">
                  Mengunggah gambar, tunggu sebentar...
                </p>
              )}

              {previewGambar && (
                <div className="berita-image-preview">
                  <p>Pratinjau gambar</p>

                  <img
                    src={previewGambar}
                    alt="Pratinjau gambar berita"
                  />

                  <button
                    type="button"
                    className="berita-cancel-button"
                    onClick={hapusGambar}
                    disabled={uploading || saving}
                  >
                    Hapus gambar dari formulir
                  </button>
                </div>
              )}
            </div>

            <label>
              Ringkasan berita *
              <textarea
                name="ringkasan"
                value={form.ringkasan}
                onChange={handleChange}
                placeholder="Ringkasan singkat berita"
                rows={3}
                maxLength={1000}
                required
              />
            </label>

            <label>
              Isi berita *
              <textarea
                name="isi"
                value={form.isi}
                onChange={handleChange}
                placeholder="Tulis isi berita lengkap"
                rows={7}
                maxLength={50000}
                required
              />
            </label>

            <div className="berita-form-actions">
              <button type="submit" disabled={saving || uploading}>
                {uploading
                  ? "Mengunggah gambar..."
                  : saving
                    ? "Menyimpan..."
                    : editId
                      ? "Simpan Perubahan"
                      : "Tambah Berita"}
              </button>

              {editId && (
                <button
                  type="button"
                  className="berita-cancel-button"
                  onClick={batalEdit}
                  disabled={saving || uploading}
                >
                  Batal Edit
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="berita-list">
          <div className="berita-list-header">
            <h2>Daftar Berita ({berita.length})</h2>

            <button
              type="button"
              onClick={loadBerita}
              disabled={loading}
            >
              {loading ? "Memuat..." : "Muat Ulang"}
            </button>
          </div>

          {loading ? (
            <p>Memuat data berita...</p>
          ) : berita.length === 0 ? (
            <p>Belum ada berita.</p>
          ) : (
            <div className="berita-items">
              {berita.map((item) => (
                <article className="berita-item" key={item.id}>
                  <div className="berita-item-content">
                    {item.gambar && (
                      <img
                        src={item.gambar}
                        alt={`Gambar berita ${item.judul}`}
                        className="berita-item-thumbnail"
                        loading="lazy"
                      />
                    )}

                    <h3>{item.judul}</h3>

                    <p className="berita-item-meta">
                      {item.tanggal || "Tanpa tanggal"}
                      {item.penulis ? ` • ${item.penulis}` : ""}
                    </p>

                    <p>{item.ringkasan}</p>

                    <div className="berita-item-actions">
                      <button
                        type="button"
                        className="berita-edit-button"
                        onClick={() => mulaiEdit(item)}
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="berita-delete-button"
                        onClick={() => handleDelete(item)}
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
