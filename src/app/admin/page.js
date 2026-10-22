
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import { verifySessionToken } from "@/lib/auth";

export const instant = false;

export default async function AdminDashboardPage() {
  // Pastikan halaman dirender saat ada request, bukan diprerender.
  await connection();

  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  const menus = [
    {
      title: "Berita",
      description: "Kelola artikel dan berita sekolah.",
      icon: "📰",
      href: "/admin/berita",
      ready: true,
    },
    {
      title: "Galeri",
      description: "Kelola foto dan dokumentasi kegiatan.",
      icon: "🖼️",
      href: "/admin/galeri",
      ready: true,
    },
    {
      title: "Informasi",
      description: "Kelola informasi sekolah.",
      icon: "📢",
      href: null,
      ready: false,
    },
    {
      title: "Keuangan",
      description: "Kelola konten informasi keuangan.",
      icon: "💰",
      href: null,
      ready: false,
    },
    {
      title: "SPMB",
      description: "Kelola informasi penerimaan murid baru.",
      icon: "🎓",
      href: null,
      ready: false,
    },
  ];

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <p>ADMINISTRATION PANEL</p>
          <h1>Dashboard Admin</h1>
          <span>SMA Negeri 1 Purworejo</span>
        </div>

        <form action="/api/admin/logout" method="POST">
          <button type="submit" className="logout-button">
            Keluar
          </button>
        </form>
      </header>

      <section className="admin-welcome">
        <h2>Selamat datang, Admin!</h2>
        <p>Pilih bagian website yang ingin kamu kelola.</p>
      </section>

      <section className="admin-menu">
        {menus.map((menu) => (
          <article className="admin-menu-card" key={menu.title}>
            <span className="admin-menu-icon">{menu.icon}</span>
            <h3>{menu.title}</h3>
            <p>{menu.description}</p>

            {menu.ready ? (
              <Link
                href={menu.href}
                className="admin-menu-status admin-menu-link"
              >
                Kelola Sekarang →
              </Link>
            ) : (
              <span className="admin-menu-status">
                Segera tersedia
              </span>
            )}
          </article>
        ))}
      </section>

      <a className="admin-back-home" href="/">
        ← Kembali ke website publik
      </a>
    </main>
  );
}
