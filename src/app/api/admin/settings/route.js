import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/lib/auth";
import { getAllSettings, saveSetting, getSetting } from "@/lib/settings";

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!token || !verifySessionToken(token)) {
    throw new Error("UNAUTHORIZED");
  }
}

// GET: Ambil seluruh pengaturan situs
export async function GET(request) {
  try {
    await requireAdmin();
    const settings = await getAllSettings();

    return NextResponse.json(settings, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login." },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Gagal mengambil pengaturan." },
      { status: 500 }
    );
  }
}

// POST: Simpan satu pengaturan berdasarkan key
export async function POST(request) {
  try {
    await requireAdmin();
    const body = await request.json();
    const { key, value } = body;

    if (!key || typeof key !== "string" || value === undefined) {
      return NextResponse.json(
        { message: "Key dan value wajib disertakan." },
        { status: 400 }
      );
    }

    await saveSetting(key, value);

    return NextResponse.json({
      message: `Pengaturan '${key}' berhasil disimpan.`,
      key,
      value,
    });
  } catch (error) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { message: "Sesi admin tidak valid. Silakan login." },
        { status: 401 }
      );
    }

    console.error("Gagal menyimpan setting:", error);
    return NextResponse.json(
      { message: error.message || "Gagal menyimpan pengaturan." },
      { status: 500 }
    );
  }
}
