import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { verifySessionToken } from "@/lib/auth";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

const ALLOWED_TYPES = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export async function POST(request) {
  try {
    // Pastikan admin sudah login.
    const cookieStore = await cookies();
    const token = cookieStore.get("admin_session")?.value;

    if (!token || !verifySessionToken(token)) {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login kembali." },
        { status: 401 }
      );
    }

    // Ambil file dari FormData.
    const formData = await request.formData();
    const file = formData.get("gambar");

    if (!file || typeof file === "string" || file.size === 0) {
      return NextResponse.json(
        { message: "Pilih gambar terlebih dahulu." },
        { status: 400 }
      );
    }

    // Validasi tipe dan ukuran file.
    const extension = ALLOWED_TYPES[file.type];

    if (!extension) {
      return NextResponse.json(
        { message: "Format harus JPG, PNG, WEBP, atau GIF." },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { message: "Ukuran gambar maksimal 5 MB." },
        { status: 400 }
      );
    }

    const filename = `${randomUUID()}${extension}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Jika Supabase Storage aktif, unggah langsung ke bucket Supabase
    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const storagePath = `berita/${filename}`;
        const { error: uploadError } = await supabase.storage
          .from("uploads")
          .upload(storagePath, buffer, {
            contentType: file.type,
            upsert: false,
          });

        if (uploadError) {
          console.error("Supabase storage upload error:", uploadError);
          throw new Error("Gagal mengunggah ke Supabase Storage: " + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from("uploads")
          .getPublicUrl(storagePath);

        return NextResponse.json(
          {
            message: "Gambar berhasil diunggah ke Supabase Storage.",
            url: publicUrlData.publicUrl,
          },
          { status: 201 }
        );
      }
    }

    // Fallback penyimpanan lokal jika Supabase belum aktif
    const uploadDirectory = path.join(
      process.cwd(),
      "public",
      "uploads",
      "berita"
    );

    await mkdir(uploadDirectory, { recursive: true });
    const filePath = path.join(uploadDirectory, filename);
    await writeFile(filePath, buffer, { flag: "wx" });

    return NextResponse.json(
      {
        message: "Gambar berhasil diunggah secara lokal.",
        url: `/uploads/berita/${filename}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Upload gambar gagal:", error);

    return NextResponse.json(
      { message: error.message || "Terjadi kesalahan saat mengunggah gambar." },
      { status: 500 }
    );
  }
}
