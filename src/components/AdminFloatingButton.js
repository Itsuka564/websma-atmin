
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminFloatingButton() {
  const pathname = usePathname();

  // Sembunyikan tombol pada seluruh halaman admin.
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="group fixed bottom-6 right-5 z-[100] sm:bottom-8 sm:right-8">
      <Link
        href="/admin/login"
        aria-label="Masuk ke halaman admin"
        title="Login Admin"
        className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-blue-800 text-white shadow-xl transition duration-300 hover:scale-110 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      </Link>

      <span className="pointer-events-none absolute right-16 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
        Login Admin
      </span>
    </div>
  );
}
