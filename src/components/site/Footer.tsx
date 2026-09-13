import Link from "next/link";
import { prisma } from "@/lib/prisma";

const columns = [
  {
    title: "Explore",
    links: [
      { href: "/about", label: "About" },
      { href: "/education", label: "Education" },
      { href: "/research", label: "Research" },
      { href: "/awards", label: "Awards & Honours" },
      { href: "/lectures", label: "Lectures & Workshops" },
    ],
  },
  {
    title: "Work",
    links: [
      { href: "/events", label: "Events & Programs" },
      { href: "/social-work", label: "Social Work" },
      { href: "/gallery", label: "Gallery" },
      { href: "/videos", label: "Videos" },
      { href: "/blog", label: "Blog" },
    ],
  },
];

export async function Footer() {
  const socialLinks = await prisma.socialLink
    .findMany({ where: { published: true }, orderBy: { order: "asc" } })
    .catch(() => []);

  return (
    <footer className="border-t border-line bg-paperDim">
      <div className="mx-auto max-w-content px-5 py-14 sm:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-ink">Rameshwar More</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-inkSoft">
              Youth Leader from Maharastra
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-4 flex gap-4">
                {socialLinks.map((s) => (
                  <a
                    key={s.id}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-inkSoft hover:text-maroon"
                  >
                    {s.platform}
                  </a>
                ))}
              </div>
            )}
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-medium text-ink">{col.title}</p>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-inkSoft hover:text-maroon">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="font-medium text-ink">Get in Touch</p>
            <ul className="mt-3 space-y-2 text-sm text-inkSoft">
              <li>
                <a href="mailto:rameshwarmore9964@gmail.com" className="hover:text-maroon">
                  rameshwarmore9964@gmail.com
                </a>
              </li>
              <li>
                <a href="tel:+917517363644" className="hover:text-maroon">
                </a>
              </li>
              <li>Maharashtra, India</li>
            </ul>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-maroon hover:text-maroon-dark"
            >
              Invite for Kirtan / Program
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line pt-6 text-xs text-inkSoft sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Rameshwar More All rights reserved.</p>
          <p>@ {new Date().getFullYear()} Design and Developed By Ganesh</p>
          <Link href="/admin/login" className="hover:text-maroon">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
