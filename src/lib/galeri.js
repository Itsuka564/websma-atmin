import "server-only";

import { readFile } from "node:fs/promises";
import path from "node:path";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const FILE_PATH = path.join(process.cwd(), "data", "galeri.json");

export const fotoGaleriAwal = [
  {
    src: "/images/gedung-1.jpg",
    title: "Gedung SMA Negeri 1 Purworejo",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-2.jpg",
    title: "Lingkungan Sekolah",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-3.jpg",
    title: "Fasilitas Sekolah",
    kategori: "Sekolah",
  },
  {
    src: "/images/gedung-4.jpg",
    title: "Area SMA Negeri 1 Purworejo",
    kategori: "Sekolah",
  },
  {
    src: "/images/berita-1.jpg",
    title: "Peringatan Nuzulul Quran 2026",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-2.jpg",
    title: "Kunjungan Alumni",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-3.jpg",
    title: "Ganesha Voice dan Ekstrakurikuler",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-4.jpg",
    title: "Ziarah Makam HUT ke-71",
    kategori: "Kegiatan",
  },
  {
    src: "/images/berita-5.jpg",
    title: "Penilaian Sumatif Akhir Tahun",
    kategori: "Akademik",
  },
  {
    src: "/images/berita-6.jpg",
    title: "Earth Day With Ganesha",
    kategori: "Lingkungan",
  },
];

async function seedGaleriJikaKosong(supabase) {
  try {
    const { count, error } = await supabase
      .from("galeri")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Gagal memeriksa tabel galeri Supabase:", error);
      return;
    }

    if (count === 0) {
      const rows = fotoGaleriAwal.map((f, index) => ({
        id: `initial-${index + 1}`,
        title: f.title,
        kategori: f.kategori,
        src: f.src,
      }));

      await supabase.from("galeri").insert(rows);
    }
  } catch (err) {
    console.error("Error auto-seed galeri ke Supabase:", err);
  }
}

export async function getFotoGaleri() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await seedGaleriJikaKosong(supabase);

      const { data, error } = await supabase
        .from("galeri")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  }

  // Fallback lokal
  try {
    const content = await readFile(FILE_PATH, "utf8");
    const data = JSON.parse(content);

    if (Array.isArray(data) && data.length > 0) {
      return data;
    }

    return fotoGaleriAwal;
  } catch (error) {
    return fotoGaleriAwal;
  }
}
