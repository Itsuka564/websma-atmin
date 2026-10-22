import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
  title: "Admin Panel - SMA Negeri 1 Purworejo",
  description: "Dashboard Administrasi dan Manajemen Konten Sekolah",
};

export default function AdminLayout({ children }) {
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
