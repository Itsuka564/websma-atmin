import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  readFile,
  writeFile,
  unlink,
  access,
  mkdir,
} from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { verifySessionToken } from "@/lib/auth";
import { fotoGaleriAwal, getFotoGaleri } from "@/lib/galeri";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const DATA_DIRECTORY = path.join(process.cwd(), "data");
const FILE_PATH = path.join(DATA_DIRECTORY, "galeri.json");
const MIGRATION_FILE = path.join(
  DATA_DIRECTORY,
  "galeri-migrated.txt"
);

const UPLOAD_DIRECTORY = path.join(
  process.cwd(),
  "public",
  "uploads",
  "galeri"
);

// Memastikan hanya admin yang dapat mengelola galeri.
async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  return Boolean(token && verifySessionToken(token));
}

// Membaca data galeri dan memigrasikan foto awal hanya satu kali (lokal fallback).
async function bacaGaleriLokal() {
  let data = [];

  try {
    const content = await readFile(FILE_PATH, "utf8");
    data = JSON.parse(content);

    if (!Array.isArray(data)) {
      throw new Error("Format data galeri tidak valid.");
    }
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  if (data.length > 0) {
    return data;
  }

  try {
    await access(MIGRATION_FILE);
    return data;
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  const fotoAwal = fotoGaleriAwal.map((foto) => ({
    ...foto,
    id: randomUUID(),
  }));

  await simpanGaleriLokal(fotoAwal);
  return fotoAwal;
}

async function simpanGaleriLokal(data) {
  try {
    await mkdir(DATA_DIRECTORY, { recursive: true });
    await writeFile(
      FILE_PATH,
      JSON.stringify(data, null, 2) + "\n",
      "utf8"
    );
  } catch (error) {
    console.warn("Penyimpanan galeri lokal diabaikan:", error.message);
  }
}

// GET: mengambil daftar foto untuk admin.
export async function GET() {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login kembali." },
        { status: 401 }
      );
    }

    if (isSupabaseConfigured()) {
      const fotoGaleri = await getFotoGaleri();
      return NextResponse.json(
        { fotoGaleri },
        { headers: { "Cache-Control": "no-store" } }
      );
    }

    const fotoGaleri = await bacaGaleriLokal();

    return NextResponse.json(
      { fotoGaleri },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (error) {
    console.error("Gagal membaca galeri:", error);

    return NextResponse.json(
      { message: "Gagal membaca data galeri." },
      { status: 500 }
    );
  }
}

// POST: menambahkan foto ke daftar galeri.
export async function POST(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();

    const title =
      typeof body.title === "string" ? body.title.trim() : "";
    const kategori =
      typeof body.kategori === "string"
        ? body.kategori.trim()
        : "";
    const src = typeof body.src === "string" ? body.src.trim() : "";

    if (!title || !kategori || !src) {
      return NextResponse.json(
        { message: "Judul, kategori, dan gambar wajib diisi." },
        { status: 400 }
      );
    }

    if (
      title.length > 150 ||
      kategori.length > 50 ||
      src.length > 500
    ) {
      return NextResponse.json(
        { message: "Ada data yang melebihi batas panjang." },
        { status: 400 }
      );
    }

    // Izinkan gambar internal, unggahan lokal, dan remote URL (Supabase storage)
    const isAllowedLocation =
      src.startsWith("/images/") ||
      src.startsWith("/uploads/galeri/") ||
      src.startsWith("http://") ||
      src.startsWith("https://");

    if (!isAllowedLocation) {
      return NextResponse.json(
        { message: "Lokasi gambar tidak diizinkan." },
        { status: 400 }
      );
    }

    const fotoBaru = {
      id: randomUUID(),
      src,
      title,
      kategori,
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase.from("galeri").insert(fotoBaru);

        if (error) {
          throw new Error("Supabase insert error: " + error.message);
        }

        return NextResponse.json(
          {
            message: "Foto berhasil ditambahkan ke galeri.",
            foto: fotoBaru,
          },
          { status: 201 }
        );
      }
    }

    const fotoGaleri = await bacaGaleriLokal();
    fotoGaleri.unshift(fotoBaru);
    await simpanGaleriLokal(fotoGaleri);

    return NextResponse.json(
      {
        message: "Foto berhasil ditambahkan ke galeri.",
        foto: fotoBaru,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Gagal menambahkan foto:", error);

    return NextResponse.json(
      { message: error.message || "Gagal menambahkan foto ke galeri." },
      { status: 500 }
    );
  }
}

// DELETE: menghapus foto dari daftar dan file hasil unggahan.
export async function DELETE(request) {
  try {
    if (!(await requireAdmin())) {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login kembali." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json(
        { message: "ID foto wajib diisi." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { data: fotoDihapus } = await supabase
          .from("galeri")
          .select("*")
          .eq("id", id)
          .single();

        const { error } = await supabase
          .from("galeri")
          .delete()
          .eq("id", id);

        if (error) {
          throw new Error("Supabase delete error: " + error.message);
        }

        // Jika foto berasal dari Supabase Storage bucket uploads, hapus filenya
        if (
          fotoDihapus &&
          typeof fotoDihapus.src === "string" &&
          fotoDihapus.src.includes("/storage/v1/object/public/uploads/")
        ) {
          const parts = fotoDihapus.src.split("/storage/v1/object/public/uploads/");
          if (parts[1]) {
            await supabase.storage.from("uploads").remove([parts[1]]);
          }
        }

        return NextResponse.json({
          message: "Foto berhasil dihapus dari galeri.",
        });
      }
    }

    const fotoGaleri = await bacaGaleriLokal();

    const fotoDihapus = fotoGaleri.find(
      (foto) => String(foto.id) === id
    );

    if (!fotoDihapus) {
      return NextResponse.json(
        { message: "Foto tidak ditemukan." },
        { status: 404 }
      );
    }

    const fotoTersisa = fotoGaleri.filter(
      (foto) => String(foto.id) !== id
    );

    await simpanGaleriLokal(fotoTersisa);

    // Hapus file fisik jika berasal dari folder unggahan lokal galeri
    if (
      typeof fotoDihapus.src === "string" &&
      fotoDihapus.src.startsWith("/uploads/galeri/")
    ) {
      const filename = path.basename(fotoDihapus.src);
      const filePath = path.join(UPLOAD_DIRECTORY, filename);

      if (path.dirname(filePath) === UPLOAD_DIRECTORY) {
        try {
          await unlink(filePath);
        } catch (error) {
          if (error.code !== "ENOENT") {
            console.error("Gagal menghapus file foto:", error);
          }
        }
      }
    }

    return NextResponse.json({
      message: "Foto berhasil dihapus dari galeri.",
    });
  } catch (error) {
    console.error("Gagal menghapus foto:", error);

    return NextResponse.json(
      { message: "Gagal menghapus foto dari galeri." },
      { status: 500 }
    );
  }
}
