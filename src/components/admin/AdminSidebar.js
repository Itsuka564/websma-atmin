"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const MENU_SECTIONS = [
  {
    title: "MENU UTAMA",
    items: [
      {
        href: "/admin",
        label: "Dashboard",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "KONTEN SEKOLAH",
    items: [
      {
        href: "/admin/berita",
        label: "Berita & Artikel",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
        ),
      },
      {
        href: "/admin/galeri",
        label: "Galeri Foto",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        ),
      },
      {
        href: "/admin/informasi",
        label: "Informasi & Pengumuman",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        ),
      },
      {
        href: "/admin/keuangan",
        label: "Keuangan",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        ),
      },
      {
        href: "/admin/spmb",
        label: "SPMB (Penerimaan Siswa)",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
          </svg>
        ),
      },
    ],
  },
  {
    title: "PENGATURAN SITUS (NO-CODE)",
    items: [
      {
        href: "/admin/beranda",
        label: "Kelola Beranda",
        badge: "CMS",
        icon: (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        ),
      },
    ],
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-[#064ea2] px-4 py-3 text-white sticky top-0 z-30 border-b border-blue-900/50 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white p-1 flex items-center justify-center shadow-md">
            <img src="/images/logo.png" alt="Logo" className="w-full h-full object-contain" />
          </div>
          <span className="font-extrabold text-sm tracking-wide">ADMIN PANEL</span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
          aria-label="Toggle Navigation"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Main Sidebar - Warna Biru Senada dengan Navbar Sekolah (#064ea2) */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-gradient-to-b from-[#064ea2] via-[#05438d] to-[#04336c] text-white flex flex-col transition-transform duration-300 ease-in-out border-r border-blue-900/40 shadow-2xl ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo / Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-md shrink-0">
              <img src="/images/logo.png" alt="Logo SMAN 1" className="w-full h-full object-contain" />
            </div>
            <div>
              <h1 className="font-black text-white text-base tracking-wider leading-none">
                SMAN 1 PWO
              </h1>
              <p className="text-[11px] text-[#f3ea08] font-bold mt-1 tracking-widest uppercase">
                Admin Console
              </p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-blue-200 hover:text-white p-1"
          >
            ✕
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="flex-1 overflow-y-auto px-4 py-5 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {MENU_SECTIONS.map((section, idx) => (
            <div key={idx} className="space-y-1.5">
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-blue-200/70">
                {section.title}
              </p>

              <div className="space-y-1 pt-1">
                {section.items.map((item) => {
                  const isActive =
                    item.href === "/admin"
                      ? pathname === "/admin"
                      : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                        isActive
                          ? "bg-white text-[#064ea2] shadow-lg shadow-black/15 font-black"
                          : "text-blue-100 hover:bg-white/10 hover:text-white font-semibold"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`transition-colors duration-200 ${
                            isActive
                              ? "text-[#064ea2]"
                              : "text-blue-300 group-hover:text-white"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={`text-[10px] uppercase font-black px-2 py-0.5 rounded-md ${
                            isActive
                              ? "bg-[#064ea2] text-white"
                              : "bg-[#f3ea08] text-[#064ea2]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/20">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3.5 py-2 text-xs font-bold text-blue-100 hover:text-white rounded-lg hover:bg-white/10 transition"
          >
            <svg className="w-4 h-4 text-[#f3ea08]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            <span>Lihat Website Publik ↗</span>
          </Link>

          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3.5 py-2 text-xs font-bold text-rose-300 hover:text-rose-200 rounded-lg hover:bg-rose-500/20 transition text-left"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Keluar (Logout)</span>
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
