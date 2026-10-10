
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function SiteHeader() {
  const [waktu, setWaktu] = useState(null);

  useEffect(() => {
    function perbaruiWaktu() {
      setWaktu(new Date());
    }

    perbaruiWaktu();

    const interval = setInterval(perbaruiWaktu, 1000);

    return () => clearInterval(interval);
  }, []);

  const tanggal = waktu
    ? new Intl.DateTimeFormat("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
        timeZone: "Asia/Jakarta",
      }).format(waktu)
    : "Memuat tanggal...";

  const jam = waktu
    ? new Intl.DateTimeFormat("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Jakarta",
      }).format(waktu)
    : "--:--:--";

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 py-5 sm:px-8 md:flex-row lg:px-12">
        {/* LOGO DAN IDENTITAS SEKOLAH */}
        <div className="flex items-center gap-4">
          <div className="relative h-16 w-16 shrink-0 sm:h-20 sm:w-20">
            <Image
              src="/images/logo.png"
              alt="Logo SMA Negeri 1 Purworejo"
              fill
              sizes="80px"
              className="object-contain"
              priority
            />
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#064ea2] sm:text-xs">
              Situs Resmi
            </p>

            <h1 className="mt-1 text-lg font-black leading-tight text-slate-900 sm:text-2xl">
              SMA NEGERI 1 PURWOREJO
            </h1>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Unggul, Berkarakter, Mendunia
            </p>
          </div>
        </div>

        {/* TANGGAL DAN JAM */}
        <div className="w-full rounded-lg border border-slate-200 bg-slate-50 px-5 py-3 text-center md:w-auto md:min-w-64 md:text-right">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Waktu Indonesia Barat
          </p>

          <p className="mt-1 text-sm font-semibold capitalize text-slate-700">
            {tanggal}
          </p>

          <p className="mt-1 font-mono text-2xl font-black tracking-wider text-[#064ea2]">
            {jam}
          </p>
        </div>
      </div>
    </header>
  );
}
