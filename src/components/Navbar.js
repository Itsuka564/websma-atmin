
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const menu = [
  { label: "HOME", href: "/" },
  { label: "PROFIL", href: "/about" },
  { label: "BERITA", href: "/berita" },
  { label: "INFORMASI", href: "/informasi" },
  { label: "KEUANGAN", href: "/keuangan" },
  { label: "GALERI", href: "/galeri" },
  { label: "SPMB 2026/2027", href: "/spmb" },
  { label: "INTERAKSI", href: "/interaksi" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");

  // Tanggal dan jam WIB
  useEffect(() => {
    const updateWaktu = () => {
      const sekarang = new Date();

      setTanggal(
        new Intl.DateTimeFormat("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
          timeZone: "Asia/Jakarta",
        }).format(sekarang)
      );

      setJam(
        new Intl.DateTimeFormat("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Jakarta",
        }).format(sekarang)
      );
    };

    updateWaktu();

    const interval = setInterval(updateWaktu, 1000);

    return () => clearInterval(interval);
  }, []);

  // Tutup menu HP ketika pindah halaman
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Penanda halaman aktif
  const isActive = (href) => {
    if (href === "/") return pathname === "/";

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-2 pt-2 sm:px-3">
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-900/10">

        {/* IDENTITAS SEKOLAH */}
        <div className="flex items-center justify-between gap-3 bg-[#064ea2] px-4 py-4 sm:px-6 md:py-5">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-3"
            aria-label="SMA Negeri 1 Purworejo - Beranda"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1.5 sm:h-14 sm:w-14">
              <img
                src="/images/logo.png"
                alt="Logo SMA Negeri 1 Purworejo"
                className="h-full w-full object-contain"
              />
            </div>

            <div className="min-w-0">
              <h1 className="text-sm font-extrabold leading-tight tracking-wide text-white sm:text-base md:text-lg">
                SMA NEGERI 1
                <br className="sm:hidden" />{" "}
                <span className="sm:ml-1">PURWOREJO</span>
              </h1>

              <p className="mt-1 text-[10px] text-slate-300 sm:text-xs sm:tracking-wide">
                Unggul, Berkarakter, Mendunia
              </p>
            </div>
          </Link>

          {/* Tombol menu HP */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-white transition hover:bg-white/10 md:hidden"
            aria-label={mobileOpen ? "Tutup menu" : "Buka menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 6h16" />
                <path d="M4 12h16" />
                <path d="M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* NAVIGASI DESKTOP */}
        <nav
          aria-label="Navigasi utama"
          className="hidden w-full border-b border-slate-200 bg-white p-2 md:block lg:px-3"
        >
          <div className="flex w-full items-stretch justify-between gap-1">
            {menu.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative flex min-w-0 flex-1 items-center justify-center rounded-lg px-1 py-3 text-center text-[10px] font-bold tracking-wide transition-colors lg:px-2 lg:text-xs xl:text-[13px] ${
                    active
                      ? "bg-[#f3ea08] text-[#064ea2]"
                      : "text-[#064ea2] hover:bg-slate-100 hover:text-[#064ea2]"
                  }`}
                >
                  {item.label}

                  {active && (
                    <span className="absolute bottom-1 left-1/2 h-0.5 w-5 -translate-x-1/2 rounded-full bg-[#064ea2]" />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* NAVIGASI MOBILE */}
        {mobileOpen && (
          <nav
            id="mobile-navigation"
            aria-label="Navigasi mobile"
            className="border-b border-slate-200 bg-white p-3 md:hidden"
          >
            <div className="grid grid-cols-2 gap-2">
              {menu.map((item) => {
                const active = isActive(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex min-h-11 items-center justify-center rounded-xl px-3 py-3 text-center text-xs font-bold transition ${
                      active
                        ? "bg-[#f3ea08] text-[#064ea2]"
                        : "bg-slate-50 text-[#064ea2] hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        )}

        {/* TANGGAL DAN JAM */}
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 bg-slate-50 px-4 py-2.5 sm:px-6">
          <div className="flex min-w-0 items-center gap-2 text-xs text-slate-600 sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4" />
              <path d="M8 2v4" />
              <path d="M3 10h18" />
            </svg>

            <span className="capitalize">
              {tanggal || "Memuat tanggal..."}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold tabular-nums text-[#064ea2] sm:text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>

            <span>{jam || "--:--:--"} WIB</span>
          </div>
        </div>
      </div>
    </header>
  );
}
