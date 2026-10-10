
"use client";

import { useState } from "react";

export default function InteraksiPage() {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    jenis: "Kritik",
    pesan: "",
  });

  const [terkirim, setTerkirim] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setTerkirim(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTerkirim(true);

    setFormData({
      nama: "",
      email: "",
      jenis: "Kritik",
      pesan: "",
    });
  };

  const inputClass =
    "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-[#f3ea08] focus:ring-2 focus:ring-[#f3ea08]/40";

  const labelClass =
    "mb-2 block text-sm font-semibold text-slate-800";

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#064ea2] px-6 py-16 text-white md:py-20">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f3ea08]/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full bg-[#f3ea08]/10 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08]">
            Hubungi Kami
          </p>

          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">
            Interaksi
            <span className="text-[#f3ea08]">.</span>
          </h1>

          <p className="mt-5 max-w-2xl leading-7 text-slate-300">
            Sampaikan kritik, saran, maupun pertanyaan untuk membantu
            meningkatkan kualitas layanan dan informasi SMA Negeri 1
            Purworejo.
          </p>

          <div className="mt-7 h-1.5 w-24 rounded-full bg-[#f3ea08]" />
        </div>
      </section>

      {/* Form */}
      <section className="px-6 py-12 md:py-16">
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          {/* Informasi */}
          <aside className="h-fit rounded-2xl bg-[#064ea2] p-7 text-white shadow-lg md:p-8">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#f3ea08] text-2xl text-[#064ea2]">
              ✉
            </div>

            <h2 className="text-xl font-bold md:text-2xl">
              Suara Anda Berarti
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              Kami terbuka terhadap masukan dari siswa, orang tua,
              alumni, dan masyarakat demi kemajuan sekolah.
            </p>

            <div className="mt-7 border-t border-white/15 pt-5">
              <p className="text-sm font-semibold text-[#f3ea08]">
                SMA Negeri 1 Purworejo
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Unggul, Berkarakter, Mendunia.
              </p>
            </div>
          </aside>

          {/* Formulir */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h2 className="text-2xl font-bold text-[#064ea2]">
              Kritik dan Saran
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Silakan isi formulir berikut dengan informasi yang sesuai.
            </p>

            {terkirim && (
              <div
                role="status"
                className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm leading-6 text-green-800"
              >
                <p className="font-bold">Formulir berhasil disimulasikan!</p>
                <p>
                  Ini hanya konfirmasi di halaman. Masukan belum benar-benar
                  dikirim atau disimpan.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-5">
              {/* Nama */}
              <div>
                <label htmlFor="nama" className={labelClass}>
                  Nama <span className="text-red-500">*</span>
                </label>

                <input
                  id="nama"
                  type="text"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  placeholder="Masukkan nama kamu"
                  autoComplete="name"
                  required
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email <span className="text-red-500">*</span>
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Masukkan alamat email"
                  autoComplete="email"
                  required
                  className={inputClass}
                />
              </div>

              {/* Jenis Masukan */}
              <div>
                <label htmlFor="jenis" className={labelClass}>
                  Jenis Masukan
                </label>

                <select
                  id="jenis"
                  name="jenis"
                  value={formData.jenis}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Kritik">Kritik</option>
                  <option value="Saran">Saran</option>
                  <option value="Pertanyaan">Pertanyaan</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
              </div>

              {/* Pesan */}
              <div>
                <label htmlFor="pesan" className={labelClass}>
                  Kritik atau Saran{" "}
                  <span className="text-red-500">*</span>
                </label>

                <textarea
                  id="pesan"
                  name="pesan"
                  value={formData.pesan}
                  onChange={handleChange}
                  placeholder="Tuliskan kritik, saran, atau pertanyaan kamu..."
                  rows={5}
                  required
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* Tombol */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f3ea08] px-6 py-3.5 font-bold text-[#064ea2] transition hover:bg-[#f3ea08] focus:outline-none focus:ring-2 focus:ring-[#f3ea08] focus:ring-offset-2"
              >
                Kirim Masukan
                <span aria-hidden="true">→</span>
              </button>

              <p className="text-xs leading-5 text-slate-500">
                Tanda (*) menunjukkan kolom yang wajib diisi.
              </p>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}