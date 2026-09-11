import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section, SectionHeading } from "@/components/site/Section";
import { EventCard } from "@/components/site/EventCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Events & Programs",
  description: "Upcoming and past Kirtan programs, lectures and events by Rameshwar Parmeshwar More.",
};

export default async function EventsPage() {
  const events = await prisma.event
    .findMany({ where: { published: true }, orderBy: { eventDate: "desc" } })
    .catch(() => []);

  const upcoming = events.filter((e) => e.status === "UPCOMING");
  const past = events.filter((e) => e.status !== "UPCOMING");

  return (
    <>
      <PageHeader
        title="Events & Programs"
        description="Kirtan programs, lectures and Career Katta events — upcoming and completed."
      />

      <Section tone="paper">
        <SectionHeading title="Upcoming" />
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.length === 0 ? (
            <p className="text-sm text-inkSoft">No upcoming events published yet.</p>
          ) : (
            upcoming.map((e) => (
              <EventCard
                key={e.id}
                title={e.title}
                eventDate={e.eventDate}
                venue={e.venue}
                city={e.city}
                status={e.status}
                description={e.description}
                posterUrl={e.posterUrl}
              />
            ))
          )}
        </div>
      </Section>

      {past.length > 0 && (
        <Section tone="dim">
          <SectionHeading title="Past Events" />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((e) => (
              <EventCard
                key={e.id}
                title={e.title}
                eventDate={e.eventDate}
                venue={e.venue}
                city={e.city}
                status={e.status}
                description={e.description}
                posterUrl={e.posterUrl}
              />
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
