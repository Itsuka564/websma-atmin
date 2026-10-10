
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "SMA Negeri 1 Purworejo",
  description:
    "Situs resmi SMA Negeri 1 Purworejo. Unggul, Berkarakter, Mendunia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <Suspense
          fallback={
            <div
              className="h-32"
              aria-hidden="true"
            />
          }
        >
          <Navbar />
        </Suspense>

        {children}

        <Footer />
      </body>
    </html>
  );
}
