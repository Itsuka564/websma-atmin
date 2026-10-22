
"use client";

import { useCallback, useEffect, useState } from "react";

const KATEGORI_GALERI = [
  "Sekolah",
  "Kegiatan",
  "Akademik",
  "Lingkungan",
  "Prestasi",
  "Lainnya",
];

const inputClass =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-100";

export default function AdminGaleriPage() {
  const [fotoGaleri, setFotoGaleri] = useState([]);
  const [judul, setJudul] = useState("");
  const [kategori, setKategori] = useState("Kegiatan");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [hapusId, setHapusId] = useState(null);
  const [pesan, setPesan] = useState("");
  const [error, setError] = useState("");

  // Mengambil daftar foto dari API admin.
  const muatGaleri = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/galeri", {
        cache: "no-store",
      });

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal memuat galeri.");
      }

      setFotoGaleri(data.fotoGaleri || []);
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat memuat galeri.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    muatGaleri();
  }, [muatGaleri]);

  // Membuat preview gambar yang dipilih.
  useEffect(() => {
    if (!file) {
      setPreview("");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  // Memilih gambar dan membersihkan pesan sebelumnya.
  function handlePilihFile(event) {
    const gambar = event.target.files?.[0];

    setPesan("");
    setError("");

    if (!gambar) {
      setFile(null);
      return;
    }

    const tipeDiizinkan = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/gif",
    ];

    if (!tipeDiizinkan.includes(gambar.type)) {
      setFile(null);
      setError("Format gambar harus JPG, PNG, WEBP, atau GIF.");
      event.target.value = "";
      return;
    }

    if (gambar.size > 5 * 1024 * 1024) {
      setFile(null);
      setError("Ukuran gambar maksimal 5 MB.");
      event.target.value = "";
      return;
    }

    setFile(gambar);
  }

  // Mengunggah file, kemudian menyimpan datanya ke galeri.
  async function handleUpload(event) {
    event.preventDefault();

    setPesan("");
    setError("");

    if (!judul.trim()) {
      setError("Judul foto wajib diisi.");
      return;
    }

    if (!file) {
      setError("Silakan pilih gambar terlebih dahulu.");
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("gambar", file);

      const uploadResponse = await fetch(
        "/api/admin/galeri/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const uploadData = await uploadResponse.json();

      if (uploadResponse.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!uploadResponse.ok) {
        throw new Error(
          uploadData.message || "Gagal mengunggah gambar."
        );
      }

      const simpanResponse = await fetch("/api/admin/galeri", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: judul.trim(),
          kategori,
          src: uploadData.url,
        }),
      });

      const simpanData = await simpanResponse.json();

      if (simpanResponse.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!simpanResponse.ok) {
        throw new Error(
          simpanData.message ||
            "Gambar terunggah, tetapi gagal disimpan ke galeri."
        );
      }

      setJudul("");
      setKategori("Kegiatan");
      setFile(null);

      const inputFile = document.getElementById("gambar-galeri");

      if (inputFile) {
        inputFile.value = "";
      }

      setPesan("Foto berhasil diunggah dan ditambahkan ke galeri.");

      await muatGaleri();
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat mengunggah foto.");
    } finally {
      setUploading(false);
    }
  }

  // Menghapus foto melalui API.
  async function handleHapus(foto) {
    const yakin = window.confirm(
      `Yakin ingin menghapus foto "${foto.title}"?`
    );

    if (!yakin) return;

    setPesan("");
    setError("");
    setHapusId(foto.id);

    try {
      const response = await fetch("/api/admin/galeri", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: foto.id,
        }),
      });

      const data = await response.json();

      if (response.status === 401) {
        window.location.href = "/admin/login";
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Gagal menghapus foto.");
      }

      setFotoGaleri((daftar) =>
        daftar.filter((item) => String(item.id) !== String(foto.id))
      );

      setPesan("Foto berhasil dihapus dari galeri.");
    } catch (err) {
      setError(err.message || "Terjadi kesalahan saat menghapus foto.");
    } finally {
      setHapusId(null);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-widest text-blue-700">
            Panel Administrator
          </p>

          <h1 className="text-3xl font-extrabold text-slate-900 sm:text-4xl">
            Kelola Galeri
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:text-base">
            Tambahkan dokumentasi kegiatan, fasilitas, prestasi, dan
            berbagai aktivitas SMA Negeri 1 Purworejo.
          </p>
        </div>

        {/* Notifikasi */}
        {pesan && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-800"
          >
            {pesan}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
          >
            {error}
          </div>
        )}

        {/* Form upload */}
        <section className="mb-10 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
          <div className="mb-6 border-b border-slate-100 pb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Unggah Foto Baru
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Format JPG, PNG, WEBP, atau GIF. Maksimal 5 MB.
            </p>
          </div>

          <form onSubmit={handleUpload} className="space-y-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Judul */}
              <div>
                <label
                  htmlFor="judul-galeri"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Judul Foto
                </label>

                <input
                  id="judul-galeri"
                  type="text"
                  value={judul}
                  onChange={(event) => setJudul(event.target.value)}
                  placeholder="Contoh: Kegiatan Upacara Bendera"
                  maxLength={150}
                  required
                  className={inputClass}
                />
              </div>

              {/* Kategori */}
              <div>
                <label
                  htmlFor="kategori-galeri"
                  className="mb-2 block text-sm font-semibold text-slate-800"
                >
                  Kategori
                </label>

                <select
                  id="kategori-galeri"
                  value={kategori}
                  onChange={(event) => setKategori(event.target.value)}
                  required
                  className={inputClass}
                >
                  {KATEGORI_GALERI.map((item) => (
                    <option
                      key={item}
                      value={item}
                      className="bg-white text-slate-900"
                    >
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pilih gambar */}
            <div>
              <label
                htmlFor="gambar-galeri"
                className="mb-2 block text-sm font-semibold text-slate-800"
              >
                File Gambar
              </label>

              <input
                id="gambar-galeri"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handlePilihFile}
                required
                className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white text-sm text-slate-900 file:mr-4 file:cursor-pointer file:border-0 file:bg-blue-700 file:px-5 file:py-3 file:font-semibold file:text-white hover:file:bg-blue-800"
              />
            </div>

            {/* Preview */}
            {preview && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <p className="mb-3 text-sm font-semibold text-slate-800">
                  Preview Gambar
                </p>

                <img
                  src={preview}
                  alt="Preview foto yang akan diunggah"
                  className="max-h-72 w-auto max-w-full rounded-lg object-contain"
                />

                <p className="mt-3 break-all text-sm text-slate-600">
                  {file?.name}
                </p>
              </div>
            )}

            {/* Tombol upload */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={uploading || !file}
                className="inline-flex items-center justify-center rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {uploading ? "Mengunggah..." : "Unggah Foto"}
              </button>

              <button
                type="button"
                disabled={uploading}
                onClick={() => {
                  setJudul("");
                  setKategori("Kegiatan");
                  setFile(null);
                  setPesan("");
                  setError("");

                  const inputFile =
                    document.getElementById("gambar-galeri");

                  if (inputFile) {
                    inputFile.value = "";
                  }
                }}
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Reset Form
              </button>
            </div>
          </form>
        </section>

        {/* Daftar foto */}
        <section>
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900">
                Daftar Foto Galeri
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Kelola foto yang tampil di halaman publik.
              </p>
            </div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-bold text-blue-800">
              {fotoGaleri.length} Foto
            </span>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center text-slate-600">
              Memuat daftar foto...
            </div>
          ) : fotoGaleri.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-12 text-center">
              <p className="text-lg font-bold text-slate-800">
                Belum ada foto
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Unggah foto melalui form di atas untuk mengisi galeri.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {fotoGaleri.map((foto) => (
                <article
                  key={foto.id}
                  className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={foto.src}
                      alt={foto.title}
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="p-5">
                    <span className="inline-block rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-900">
                      {foto.kategori}
                    </span>

                    <h3 className="mt-3 break-words text-base font-bold text-slate-900">
                      {foto.title}
                    </h3>

                    <button
                      type="button"
                      onClick={() => handleHapus(foto)}
                      disabled={hapusId !== null}
                      className="mt-5 w-full rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {String(hapusId) === String(foto.id)
                        ? "Menghapus..."
                        : "Hapus Foto"}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
