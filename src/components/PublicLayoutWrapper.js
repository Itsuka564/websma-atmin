"use client";

import { usePathname } from "next/navigation";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AdminFloatingButton from "@/components/AdminFloatingButton";

function PublicLayoutContent({ children }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Jika sedang di halaman admin, sembunyikan Navbar publik, Footer, dan Tombol mengambang
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
      <AdminFloatingButton />
    </>
  );
}

export default function PublicLayoutWrapper({ children }) {
  return (
    <Suspense fallback={<>{children}</>}>
      <PublicLayoutContent>{children}</PublicLayoutContent>
    </Suspense>
  );
}
