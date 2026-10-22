
import { NextResponse } from "next/server";
import {
  validateAdmin,
  createSessionToken,
} from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      username.length > 100 ||
      password.length > 200
    ) {
      return NextResponse.json(
        { message: "Username atau password tidak valid." },
        { status: 400 }
      );
    }

    if (!validateAdmin(username, password)) {
      return NextResponse.json(
        { message: "Username atau password salah." },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      message: "Login berhasil.",
    });

    response.cookies.set("admin_session", createSessionToken(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 8 * 60 * 60,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch {
    return NextResponse.json(
      { message: "Permintaan login tidak valid." },
      { status: 400 }
    );
  }
}
