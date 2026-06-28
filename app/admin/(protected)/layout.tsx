import AdminHeader from "@/components/admin/AdminHeader";
import { requireOwner } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { profile } = await requireOwner();

  return (
    <div className="admin-shell">
      <AdminHeader profile={profile} />
      <main className="admin-main">{children}</main>
    </div>
  );
}
