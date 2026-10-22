import "server-only";

import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

// Nilai default awal untuk pengaturan situs
export const DEFAULT_SETTINGS = {
  beranda_marquee: [
    "Selamat datang di situs resmi SMA Negeri 1 Purworejo",
    "Unggul, Berkarakter, Mendunia",
    "Pantau informasi dan pengumuman sekolah melalui situs ini",
  ],
  beranda_sambutan: {
    nama: "Cahyo Winarno, S.Pd., M.Pd.",
    jabatan: "Kepala SMA Negeri 1 Purworejo",
    foto: "/images/kepala-sekolah.jpg",
    sapaanAwal: "Bismillahirrahmanirrahim. Assalamu’alaikum warahmatullahi wabarakatuh.",
    paragraf1: "Puji syukur ke hadirat Allah SWT atas rahmat dan karunia-Nya. Website SMA Negeri 1 Purworejo hadir sebagai sarana informasi, literasi, dan kolaborasi bagi seluruh warga sekolah serta masyarakat.",
    paragraf2: "Berdiri sejak 2 Agustus 1955, SMA Negeri 1 Purworejo terus berkomitmen mengembangkan ilmu pengetahuan, karakter, kreativitas, dan kepedulian terhadap lingkungan lokal maupun global.",
    paragraf3: "Semoga website ini menjadi media belajar dan berbagi informasi yang bermanfaat bagi peserta didik, alumni, guru, orang tua, serta masyarakat.",
    sapaanAkhir: "Wassalamu’alaikum warahmatullahi wabarakatuh.",
  },
  beranda_statistik: [
    {
      label: "Guru dan Tenaga Kependidikan",
      jumlah: "57",
      warna: "border-blue-500",
      angka: "text-blue-600",
    },
    {
      label: "Tenaga Kependidikan",
      jumlah: "21",
      warna: "border-green-500",
      angka: "text-green-600",
    },
    {
      label: "Siswa",
      jumlah: "440",
      warna: "border-yellow-400",
      angka: "text-yellow-600",
    },
    {
      label: "Siswi",
      jumlah: "740",
      warna: "border-red-500",
      angka: "text-red-600",
    },
  ],
  beranda_hero: [
    {
      src: "/images/gedung-1.jpg",
      title: "SMA Negeri 1 Purworejo",
      subtitle: "Unggul, Berkarakter, Mendunia",
    },
    {
      src: "/images/gedung-2.jpg",
      title: "Lingkungan Belajar yang Inspiratif",
      subtitle: "Membangun generasi cerdas dan berkarakter",
    },
    {
      src: "/images/gedung-3.jpg",
      title: "Bersama Meraih Prestasi",
      subtitle: "Mengembangkan potensi akademik dan nonakademik",
    },
    {
      src: "/images/gedung-4.jpg",
      title: "Peduli dan Berbudaya Lingkungan",
      subtitle: "Berprestasi dengan tetap menjaga lingkungan",
    },
  ],
  informasi_list: [
    {
      id: "info-1",
      kategori: "PENGUMUMAN SPMB",
      judul: "Pengumuman Hasil Seleksi dan Daftar Ulang SPMB 2026/2027",
      tanggal: "21 Juni 2026",
      penulis: "Sastra Amijaya",
      dibaca: 132,
      ringkasan: "Pengumuman hasil seleksi dan informasi daftar ulang Sistem Penerimaan Murid Baru (SPMB) Tahun Ajaran 2026/2027 dapat dilihat melalui halaman resmi SMA Negeri 1 Purworejo.",
      linkResmi: "https://sman1purworejo.sch.id/page/pengumuman-hasil-seleksi-spmb-2026",
    },
  ],
  keuangan_data: {
    status: "Belum Dirilis",
    tahun: "2026",
    judul: "Informasi Keuangan Tahun 2026",
    deskripsi: "Informasi keuangan untuk tahun 2026 belum dirilis. Silakan kunjungi halaman ini kembali secara berkala untuk mendapatkan informasi terbaru.",
    fileUrl: "",
  },
  spmb_data: {
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
  },
};

// Mengambil pengaturan dari Supabase atau fallback ke nilai default
export async function getSetting(key) {
  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("site_settings")
          .select("value")
          .eq("key", key)
          .single();

        if (!error && data && data.value !== null && data.value !== undefined) {
          return data.value;
        }

        // Jika data belum ada, simpan default ke Supabase
        if (DEFAULT_SETTINGS[key] !== undefined) {
          await supabase.from("site_settings").upsert(
            { key, value: DEFAULT_SETTINGS[key], updated_at: new Date().toISOString() },
            { onConflict: "key" }
          );
        }
      }
    } catch (err) {
      console.warn(`Gagal mengambil setting ${key} dari Supabase:`, err.message);
    }
  }

  return DEFAULT_SETTINGS[key] ?? null;
}

// Mengambil seluruh pengaturan situs sekaligus
export async function getAllSettings() {
  const result = { ...DEFAULT_SETTINGS };

  if (isSupabaseConfigured()) {
    try {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data, error } = await supabase
          .from("site_settings")
          .select("key, value");

        if (!error && Array.isArray(data)) {
          data.forEach((row) => {
            if (row.key && row.value !== null && row.value !== undefined) {
              result[row.key] = row.value;
            }
          });
        }
      }
    } catch (err) {
      console.warn("Gagal membaca site_settings Supabase:", err.message);
    }
  }

  return result;
}

// Menyimpan satu pengaturan ke Supabase
export async function saveSetting(key, value) {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      const { error } = await supabase.from("site_settings").upsert(
        {
          key,
          value,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "key" }
      );

      if (error) {
        throw new Error("Gagal menyimpan ke Supabase: " + error.message);
      }
      return;
    }
  }

  // Jika belum terkoneksi, update memori runtime
  DEFAULT_SETTINGS[key] = value;
}
