import type { Metadata } from "next";
import { Mail, Phone, MapPin } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { ContactForm } from "@/components/site/ContactForm";
import { profile as verifiedProfile } from "@/lib/data/verified-biodata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Invite for Kirtan / Program",
  description:
    "Invite Rameshwar Parmeshwar More for a Kirtan, lecture or discussion session, or get in touch directly.",
};

export default async function ContactPage() {
  const profile = await prisma.profile.findFirst().catch(() => null);

  const email = profile?.email || verifiedProfile.email;
  const phone = profile?.phone || verifiedProfile.phone;
  const address = profile?.address;

  return (
    <>
      <PageHeader
        title="Invite Rameshwar More"
        description="Share your program details below, or reach out directly — we'll get back to you soon."
      />
      <Section tone="paper">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.5fr]">
          <div className="space-y-6">
            <div>
              <h2 className="font-display text-2xl text-ink">Direct Contact</h2>
              <p className="mt-2 text-sm leading-relaxed text-inkSoft">
                For Kirtan invitations, lectures, discussions or general queries, write in below or
                reach out using the details here.
              </p>
            </div>

            <div className="space-y-4 text-sm text-inkSoft">
              {email && (
                <a href={`mailto:${email}`} className="flex items-center gap-3 hover:text-maroon">
                  <Mail size={18} className="text-gold" />
                  {email}
                </a>
              )}
              {phone && (
                <a href={`tel:${phone}`} className="flex items-center gap-3 hover:text-maroon">
                  <Phone size={18} className="text-gold" />
                  {phone}
                </a>
              )}
              {address && (
                <p className="flex items-start gap-3">
                  <MapPin size={18} className="mt-0.5 shrink-0 text-gold" />
                  {address}
                </p>
              )}
            </div>
          </div>

          <ContactForm />
        </div>
      </Section>
    </>
  );
}
