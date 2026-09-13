"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/awards", label: "Awards" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  // { href: "/blog", label: "Blog" },
];

const moreLinks = [
  { href: "/education", label: "Education" },
  { href: "/research", label: "Research" },
  { href: "/lectures", label: "Lectures & Workshops" },
  // { href: "/certifications", label: "Certifications" },
  // { href: "/videos", label: "Videos" },
  { href: "/social-work", label: "Social Work" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setMoreOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-4 sm:px-8">
        <Link href="/" className="flex items-baseline gap-2">
          <span className="font-display text-xl text-maroon"></span>
          <span className="font-display text-lg text-ink">Rameshwar More</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm text-inkSoft transition-colors hover:text-maroon",
                pathname === link.href && "text-maroon font-medium"
              )}
            >
              {link.label}
            </Link>
          ))}

          <div className="relative">
            <button
              onClick={() => setMoreOpen((v) => !v)}
              className="flex items-center gap-1 text-sm text-inkSoft transition-colors hover:text-maroon"
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown size={14} className={cn("transition-transform", moreOpen && "rotate-180")} />
            </button>
            {moreOpen && (
              <div className="absolute right-0 top-8 w-56 rounded-md border border-line bg-white py-2 shadow-lg">
                {moreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-inkSoft hover:bg-paperDim hover:text-maroon"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* <Link href="/contact" className={cn(buttonVariants({ variant: "primary", size: "sm" }))}>
            Invite for a Program
          </Link> */}
        </nav>

        {/* Mobile toggle */}
        <button
          className="p-2 lg:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-sm px-3 py-2.5 text-sm text-inkSoft hover:bg-paperDim hover:text-maroon",
                  pathname === link.href && "bg-paperDim text-maroon font-medium"
                )}
              >
                {link.label}
              </Link>
            ))}
            {/* <Link href="/contact" className="mt-3">
              <Button className="w-full">Invite for a Program</Button>
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  );
}
