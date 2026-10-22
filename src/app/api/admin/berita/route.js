import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getBerita, saveBerita } from "@/lib/berita";
import { getSupabaseAdmin, isSupabaseConfigured } from "@/lib/supabase";

function validasiBerita(body) {
  const { judul, tanggal, penulis, ringkasan, isi, gambar } = body;

  if (
    typeof judul !== "string" ||
    !judul.trim() ||
    judul.length > 200 ||
    typeof tanggal !== "string" ||
    !/^\d{4}-\d{2}-\d{2}$/.test(tanggal) ||
    typeof ringkasan !== "string" ||
    !ringkasan.trim() ||
    typeof isi !== "string" ||
    !isi.trim() ||
    (penulis !== undefined && typeof penulis !== "string") ||
    (gambar !== undefined && typeof gambar !== "string")
  ) {
    return "Data berita tidak valid atau belum lengkap.";
  }

  if (
    ringkasan.length > 1000 ||
    isi.length > 50000 ||
    (penulis && penulis.length > 100) ||
    (gambar && gambar.length > 500)
  ) {
    return "Ada kolom yang terlalu panjang.";
  }

  return null;
}

function normalisasiBerita(body) {
  return {
    judul: body.judul.trim(),
    tanggal: body.tanggal,
    penulis: (body.penulis || "").trim(),
    ringkasan: body.ringkasan.trim(),
    isi: body.isi.trim(),
    gambar: (body.gambar || "").trim(),
  };
}

function tanganiError(error, pesan) {
  if (error.message === "UNAUTHORIZED") {
    return NextResponse.json(
      { message: "Silakan login sebagai admin." },
      { status: 401 }
    );
  }

  console.error(pesan, error);

  return NextResponse.json(
    { message: pesan },
    { status: 500 }
  );
}

// GET: mengambil semua berita
export async function GET() {
  try {
    const berita = await getBerita();

    return NextResponse.json(berita, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    return tanganiError(error, "Gagal membaca data berita.");
  }
}

// POST: menambahkan berita
export async function POST(request) {
  try {
    const body = await request.json();
    const pesanValidasi = validasiBerita(body);

    if (pesanValidasi) {
      return NextResponse.json(
        { message: pesanValidasi },
        { status: 400 }
      );
    }

    const beritaBaru = {
      id: randomUUID(),
      ...normalisasiBerita(body),
    };

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase
          .from("berita")
          .insert(beritaBaru);

        if (error) {
          throw new Error("Supabase insert error: " + error.message);
        }

        return NextResponse.json(beritaBaru, { status: 201 });
      }
    }

    const berita = await getBerita();
    await saveBerita([...berita, beritaBaru]);

    return NextResponse.json(beritaBaru, { status: 201 });
  } catch (error) {
    return tanganiError(error, "Gagal menyimpan berita.");
  }
}

// PUT: mengedit berita berdasarkan ID
export async function PUT(request) {
  try {
    const body = await request.json();
    const { id } = body;

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        { message: "ID berita tidak valid." },
        { status: 400 }
      );
    }

    const pesanValidasi = validasiBerita(body);

    if (pesanValidasi) {
      return NextResponse.json(
        { message: pesanValidasi },
        { status: 400 }
      );
    }

    const dataUpdate = normalisasiBerita(body);

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase
          .from("berita")
          .update(dataUpdate)
          .eq("id", id);

        if (error) {
          throw new Error("Supabase update error: " + error.message);
        }

        return NextResponse.json({ ...dataUpdate, id });
      }
    }

    const berita = await getBerita();
    const index = berita.findIndex((item) => item.id === id);

    if (index === -1) {
      return NextResponse.json(
        { message: "Berita tidak ditemukan." },
        { status: 404 }
      );
    }

    const beritaDiperbarui = {
      ...berita[index],
      ...dataUpdate,
      id,
    };

    const beritaTerbaru = [...berita];
    beritaTerbaru[index] = beritaDiperbarui;

    await saveBerita(beritaTerbaru);

    return NextResponse.json(beritaDiperbarui);
  } catch (error) {
    return tanganiError(error, "Gagal memperbarui berita.");
  }
}

// DELETE: menghapus berita berdasarkan ID
export async function DELETE(request) {
  try {
    const { id } = await request.json();

    if (typeof id !== "string" || !id.trim()) {
      return NextResponse.json(
        { message: "ID berita tidak valid." },
        { status: 400 }
      );
    }

    if (isSupabaseConfigured()) {
      const supabase = getSupabaseAdmin();
      if (supabase) {
        const { error } = await supabase
          .from("berita")
          .delete()
          .eq("id", id);

        if (error) {
          throw new Error("Supabase delete error: " + error.message);
        }

        return NextResponse.json({
          message: "Berita berhasil dihapus.",
          id,
        });
      }
    }

    const berita = await getBerita();
    const beritaAda = berita.some((item) => item.id === id);

    if (!beritaAda) {
      return NextResponse.json(
        { message: "Berita tidak ditemukan." },
        { status: 404 }
      );
    }

    const beritaTerbaru = berita.filter((item) => item.id !== id);
    await saveBerita(beritaTerbaru);

    return NextResponse.json({
      message: "Berita berhasil dihapus.",
      id,
    });
  } catch (error) {
    return tanganiError(error, "Gagal menghapus berita.");
  }
}
