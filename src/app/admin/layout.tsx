import { getSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();

  if (!session) {
    // Unauthenticated — this only ever renders /admin/login (middleware
    // redirects every other /admin/* route here when there's no session).
    return (
      <div className="flex min-h-screen items-center justify-center bg-paperDim p-4">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paperDim lg:flex">
      <AdminSidebar name={session.name} email={session.email} />
      <main className="flex-1 p-5 lg:p-10">
        <div className="mx-auto max-w-5xl">{children}</div>
      </main>
    </div>
  );
}
