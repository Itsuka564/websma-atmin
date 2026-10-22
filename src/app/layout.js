import "./globals.css";
import PublicLayoutWrapper from "@/components/PublicLayoutWrapper";

export const metadata = {
  title: "SMA Negeri 1 Purworejo",
  description:
    "Situs resmi SMA Negeri 1 Purworejo. Unggul, Berkarakter, Mendunia.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        <PublicLayoutWrapper>{children}</PublicLayoutWrapper>
      </body>
    </html>
  );
}
