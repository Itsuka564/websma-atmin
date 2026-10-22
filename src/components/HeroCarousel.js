
"use client";

import { useState } from "react";
import Image from "next/image";

const slides = [
  {
    src: "/images/gedung-1.jpg",
    title: "SMA Negeri 1 Purworejo",
    subtitle: "Unggul, Berkarakter, Mendunia",
  },
  {
    src: "/images/gedung-2.jpg",
    title: "Lingkungan Belajar yang Inspiratif",
    subtitle: "Membangun generasi cerdas dan berkarakter",
  },
  {
    src: "/images/gedung-3.jpg",
    title: "Bersama Meraih Prestasi",
    subtitle: "Mengembangkan potensi akademik dan nonakademik",
  },
  {
    src: "/images/gedung-4.jpg",
    title: "Peduli dan Berbudaya Lingkungan",
    subtitle: "Berprestasi dengan tetap menjaga lingkungan",
  },
];

export default function HeroCarousel({ customSlides }) {
  const currentSlides = customSlides && customSlides.length > 0 ? customSlides : slides;
  const [active, setActive] = useState(0);

  function previousSlide() {
    setActive((current) =>
      current === 0 ? currentSlides.length - 1 : current - 1
    );
  }

  function nextSlide() {
    setActive((current) =>
      current === currentSlides.length - 1 ? 0 : current + 1
    );
  }

  const activeSlide = currentSlides[active] || currentSlides[0] || slides[0];

  return (
    <section className="relative w-full overflow-hidden bg-[#064ea2]">
      <div className="relative h-[350px] w-full sm:h-[450px] lg:h-[580px]">
        <Image
          key={activeSlide.src}
          src={activeSlide.src}
          alt={activeSlide.title || "Hero Slide"}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Lapisan gelap agar tulisan terbaca */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#064ea2]/80 via-[#064ea2]/35 to-transparent" />

        {/* Teks pada gambar */}
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-14 sm:px-10 sm:pb-20 lg:px-12">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[#f3ea08] sm:text-base">
              Situs Resmi Sekolah
            </p>

            <h1 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
              {activeSlide.title}
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-lg">
              {activeSlide.subtitle}
            </p>
          </div>
        </div>

        {/* Tombol sebelumnya */}
        <button
          type="button"
          onClick={previousSlide}
          aria-label="Foto sebelumnya"
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3ea08] text-2xl font-bold text-[#064ea2] shadow-lg transition hover:bg-white sm:left-6 sm:h-14 sm:w-14"
        >
          ‹
        </button>

        {/* Tombol selanjutnya */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Foto selanjutnya"
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[#f3ea08] text-2xl font-bold text-[#064ea2] shadow-lg transition hover:bg-white sm:right-6 sm:h-14 sm:w-14"
        >
          ›
        </button>

        {/* Indikator slide */}
        <div className="absolute bottom-5 right-6 flex gap-2 sm:right-12">
          {slides.map((slide, index) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setActive(index)}
              aria-label={`Tampilkan foto ${index + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                active === index
                  ? "w-9 bg-[#f3ea08]"
                  : "w-2.5 bg-white/70 hover:bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
