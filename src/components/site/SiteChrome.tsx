"use client";

import { usePathname } from "next/navigation";

/**
 * The public Header/Footer are rendered from the root layout so every page
 * gets them "for free" — except the admin panel, which has its own sidebar
 * shell (see src/app/admin/layout.tsx) and shouldn't show the public nav on
 * top of it. Footer does server-side data fetching (Prisma), so it can't
 * use usePathname itself; instead the root layout passes it in as a prop
 * and this client component decides whether to render it.
 */
export function SiteChrome({
  header,
  footer,
  children,
}: {
  header: React.ReactNode;
  footer: React.ReactNode;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <>
      {header}
      <main>{children}</main>
      {footer}
    </>
  );
}
