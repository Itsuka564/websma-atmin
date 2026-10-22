import "server-only";

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { beritaData } from "../data/berita.js";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const FILE_PATH = path.join(process.cwd(), "data", "berita.json");

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!verifySessionToken(token)) {
    throw new Error("UNAUTHORIZED");
  }
}

// Konversi format berita lama ke format yang dipakai admin.
function konversiBeritaLama(item) {
  return {
    id: String(item.id),
    judul: item.title || item.judul || "",
    tanggal: item.date || item.tanggal || "",
    penulis: item.penulis || "",
    ringkasan: item.excerpt || item.ringkasan || "",
    isi: Array.isArray(item.paragraphs)
      ? item.paragraphs.join("\n\n")
      : item.isi || "",
    gambar: item.image || item.gambar || "",
  };
}

// Membaca file JSON lokal jika Supabase belum aktif
async function bacaJSONLokal() {
  try {
    const content = await readFile(FILE_PATH, "utf8");
    const data = JSON.parse(content);
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return beritaData.map(konversiBeritaLama);
    }
    return [];
  }
}

async function simpanJSONLokal(data) {
  try {
    await writeFile(
      FILE_PATH,
      JSON.stringify(data, null, 2) + "\n",
      "utf8"
    );
  } catch (error) {
    // Pada Vercel (read-only filesystem), writeFile akan gagal, jangan crash aplikasi
    console.warn("Penyimpanan JSON lokal diabaikan:", error.message);
  }
}

function gabungkanBerita(dataJSON) {
  const idYangAda = new Set(dataJSON.map((item) => String(item.id)));
  const beritaLamaBelumAda = beritaData
    .filter((item) => !idYangAda.has(String(item.id)))
    .map(konversiBeritaLama);

  return [...dataJSON, ...beritaLamaBelumAda];
}

// Inisialisasi awal ke Supabase jika tabel masih kosong
async function seedBeritaJikaKosong(supabase) {
  try {
    const { count, error } = await supabase
      .from("berita")
      .select("*", { count: "exact", head: true });

    if (error) {
      console.error("Gagal memeriksa tabel berita Supabase:", error);
      return;
    }

    if (count === 0) {
      const dataAwal = gabungkanBerita(await bacaJSONLokal());
      if (dataAwal.length > 0) {
        const rowsToInsert = dataAwal.map((b) => ({
          id: String(b.id),
          judul: b.judul || "",
          tanggal: b.tanggal || "",
          penulis: b.penulis || "",
          ringkasan: b.ringkasan || "",
          isi: b.isi || "",
          gambar: b.gambar || "",
        }));

        await supabase.from("berita").insert(rowsToInsert);
      }
    }
  } catch (err) {
    console.error("Error auto-seed berita ke Supabase:", err);
  }
}

export async function getBerita() {
  await requireAdmin();

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await seedBeritaJikaKosong(supabase);

      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("tanggal", { ascending: false });

      if (!error && Array.isArray(data)) {
        return data;
      }
      console.error("Gagal mengambil berita dari Supabase:", error);
    }
  }

  // Fallback lokal jika belum dikonfigurasi Supabase
  const dataJSON = await bacaJSONLokal();
  const dataGabungan = gabungkanBerita(dataJSON);

  if (dataGabungan.length !== dataJSON.length) {
    await simpanJSONLokal(dataGabungan);
  }

  return dataGabungan;
}

export async function saveBerita(berita) {
  await requireAdmin();

  if (!Array.isArray(berita)) {
    throw new Error("Data berita harus berupa array.");
  }

  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      // Upsert semua baris berita
      const rows = berita.map((b) => ({
        id: String(b.id),
        judul: b.judul,
        tanggal: b.tanggal,
        penulis: b.penulis || "",
        ringkasan: b.ringkasan,
        isi: b.isi,
        gambar: b.gambar || "",
      }));

      const { error } = await supabase
        .from("berita")
        .upsert(rows, { onConflict: "id" });

      if (error) {
        throw new Error("Gagal menyimpan ke Supabase: " + error.message);
      }
      return;
    }
  }

  await simpanJSONLokal(berita);
}

export async function getBeritaPublik() {
  if (isSupabaseConfigured()) {
    const supabase = getSupabaseAdmin();
    if (supabase) {
      await seedBeritaJikaKosong(supabase);

      const { data, error } = await supabase
        .from("berita")
        .select("*")
        .order("tanggal", { ascending: false });

      if (!error && Array.isArray(data) && data.length > 0) {
        return data;
      }
    }
  }

  const dataJSON = await bacaJSONLokal();
  return gabungkanBerita(dataJSON);
}
