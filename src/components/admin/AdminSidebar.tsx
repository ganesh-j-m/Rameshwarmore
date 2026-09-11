"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  UserCircle,
  GraduationCap,
  FlaskConical,
  BookOpen,
  Route,
  Award,
  CalendarDays,
  Presentation,
  BadgeCheck,
  Video,
  HeartHandshake,
  Quote,
  Share2,
  Mail,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/admin/actions/auth";

const navSections = [
  {
    title: "Overview",
    items: [{ href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard }],
  },
  {
    title: "Profile",
    items: [{ href: "/admin/profile", label: "Profile & Bio", icon: UserCircle }],
  },
  {
    title: "Content",
    items: [
      { href: "/admin/education", label: "Education", icon: GraduationCap },
      { href: "/admin/research", label: "Research Projects", icon: FlaskConical },
      { href: "/admin/publications", label: "Publications", icon: BookOpen },
      { href: "/admin/journey", label: "Journey / Timeline", icon: Route },
      { href: "/admin/awards", label: "Awards & Honours", icon: Award },
      { href: "/admin/events", label: "Events & Programs", icon: CalendarDays },
      { href: "/admin/lectures", label: "Lectures & Workshops", icon: Presentation },
      { href: "/admin/certifications", label: "Certifications", icon: BadgeCheck },
      { href: "/admin/videos", label: "Videos", icon: Video },
      { href: "/admin/social-work", label: "Social Work", icon: HeartHandshake },
      { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
      { href: "/admin/social-links", label: "Social Links", icon: Share2 },
    ],
  },
  {
    title: "Inbox",
    items: [{ href: "/admin/contact-inquiries", label: "Contact Inquiries", icon: Mail }],
  },
];

function NavLinks({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  return (
    <nav className="space-y-6">
      {navSections.map((section) => (
        <div key={section.title}>
          <p className="px-3 text-xs font-medium uppercase tracking-wide text-inkSoft/60">
            {section.title}
          </p>
          <div className="mt-2 space-y-0.5">
            {section.items.map((item) => {
              const active = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onNavigate}
                  className={cn(
                    "flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-maroon text-paper"
                      : "text-inkSoft hover:bg-paper hover:text-ink"
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      ))}
    </nav>
  );
}

export function AdminSidebar({ name, email }: { name: string; email: string }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile top bar */}
      <div className="flex items-center justify-between border-b border-line bg-white px-4 py-3 lg:hidden">
        <Link href="/admin/dashboard" className="flex items-baseline gap-2">
          <span className="font-display text-lg text-maroon">रा</span>
          <span className="font-display text-sm text-ink">Admin</span>
        </Link>
        <button onClick={() => setMobileOpen((v) => !v)} aria-label="Toggle menu" className="p-1.5">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {mobileOpen && (
        <div className="border-b border-line bg-white px-4 py-4 lg:hidden">
          <NavLinks pathname={pathname ?? ""} onNavigate={() => setMobileOpen(false)} />
          <form action={logout} className="mt-4 border-t border-line pt-4">
            <button className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-inkSoft hover:bg-paper hover:text-maroon">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-line bg-white lg:flex">
        <Link href="/admin/dashboard" className="flex items-baseline gap-2 border-b border-line px-5 py-5">
          <span className="font-display text-xl text-maroon">रा</span>
          <span className="font-display text-base text-ink">Admin Panel</span>
        </Link>

        <div className="flex-1 overflow-y-auto px-3 py-5">
          <NavLinks pathname={pathname ?? ""} />
        </div>

        <div className="border-t border-line p-4">
          <p className="truncate text-sm font-medium text-ink">{name}</p>
          <p className="truncate text-xs text-inkSoft">{email}</p>
          <form action={logout} className="mt-3">
            <button className="flex w-full items-center gap-2.5 rounded-sm border border-line px-3 py-2 text-sm text-inkSoft hover:border-maroon hover:text-maroon">
              <LogOut size={16} /> Sign Out
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}
