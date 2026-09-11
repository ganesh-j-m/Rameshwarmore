import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statLinks = [
  { key: "education", label: "Education", href: "/admin/education" },
  { key: "researchProject", label: "Research Projects", href: "/admin/research" },
  { key: "publication", label: "Publications", href: "/admin/publications" },
  { key: "award", label: "Awards & Honours", href: "/admin/awards" },
  { key: "event", label: "Events & Programs", href: "/admin/events" },
  { key: "lecture", label: "Lectures & Workshops", href: "/admin/lectures" },
  { key: "certification", label: "Certifications", href: "/admin/certifications" },
  { key: "video", label: "Videos", href: "/admin/videos" },
  { key: "socialWork", label: "Social Work", href: "/admin/social-work" },
  { key: "testimonial", label: "Testimonials", href: "/admin/testimonials" },
] as const;

export default async function AdminDashboardPage() {
  const [counts, inquiries, newInquiryCount] = await Promise.all([
    Promise.all(
      statLinks.map(async ({ key }) => {
        const delegate = (prisma as unknown as Record<string, { count: () => Promise<number> }>)[key];
        return delegate.count().catch(() => 0);
      })
    ),
    prisma.contactInquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }).catch(() => []),
    prisma.contactInquiry.count({ where: { status: "NEW" } }).catch(() => 0),
  ]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl text-ink">Dashboard</h1>
        <p className="mt-1 text-sm text-inkSoft">
          An overview of everything currently published on rameshwarmore.in.
        </p>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-inkSoft/70">Content</h2>
          {newInquiryCount > 0 && (
            <Link href="/admin/contact-inquiries">
              <Badge variant="gold">{newInquiryCount} new inquiry{newInquiryCount === 1 ? "" : "ies"}</Badge>
            </Link>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {statLinks.map((item, i) => (
            <Link key={item.href} href={item.href}>
              <Card className="p-5 transition-colors hover:border-maroon">
                <p className="font-display text-3xl text-maroon">{counts[i]}</p>
                <p className="mt-1 text-sm text-inkSoft">{item.label}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium uppercase tracking-wide text-inkSoft/70">
            Recent Contact Inquiries
          </h2>
          <Link href="/admin/contact-inquiries" className="text-sm text-maroon underline underline-offset-2">
            View all
          </Link>
        </div>
        <Card className="p-0">
          {inquiries.length === 0 ? (
            <p className="p-6 text-sm text-inkSoft">No inquiries yet.</p>
          ) : (
            <div className="divide-y divide-line">
              {inquiries.map((inq) => (
                <div key={inq.id} className="flex flex-wrap items-center justify-between gap-2 px-5 py-4">
                  <div>
                    <p className="text-sm font-medium text-ink">{inq.fullName}</p>
                    <p className="text-xs text-inkSoft">
                      {inq.programType || "General inquiry"} · {inq.mobileNumber}
                      {inq.city ? ` · ${inq.city}` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-inkSoft">{formatDate(inq.createdAt)}</span>
                    <Badge variant={inq.status === "NEW" ? "gold" : "default"}>{inq.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-medium uppercase tracking-wide text-inkSoft/70">
          Not yet in the CMS
        </h2>
        <Card className="bg-paperDim/60">
          <CardNotice />
        </Card>
      </div>
    </div>
  );
}

function CardNotice() {
  return (
    <p className="text-sm text-inkSoft">
      <strong className="text-ink">Gallery albums</strong> and{" "}
      <strong className="text-ink">Blog posts</strong> aren&apos;t wired into the admin panel yet — the
      public <code className="text-xs">/gallery</code> and <code className="text-xs">/blog</code>{" "}
      pages will show an empty state until that editor is built. Everything else in the original
      spec (Profile, Education, Research, Awards, Events, Lectures, Certifications, Videos, Social
      Work, Testimonials, Social Links, Contact Inquiries) is fully editable from the sidebar.
    </p>
  );
}
