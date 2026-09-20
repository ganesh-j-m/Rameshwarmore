import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Hero } from "@/components/site/Hero";
import { BannerCarousel } from "@/components/site/BannerCarousel";
import { Section, SectionHeading } from "@/components/site/Section";
import { StatCard } from "@/components/site/StatCard";
import { AwardCard } from "@/components/site/AwardCard";
import { LectureCard } from "@/components/site/LectureCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { BlogCard } from "@/components/site/BlogCard";
import { Timeline } from "@/components/site/Timeline";
import { Button } from "@/components/ui/button";
import { profile as verifiedProfile, skills } from "@/lib/data/verified-biodata";

export const dynamic = "force-dynamic";

async function getHomeData() {
  const [profile, awardsCount, publicationsCount, lecturesCount, eventsCount] = await Promise.all([
    prisma.profile.findFirst().catch(() => null),
    prisma.award.count({ where: { published: true } }).catch(() => 0),
    prisma.publication.count({ where: { published: true } }).catch(() => 0),
    prisma.lecture.count({ where: { published: true } }).catch(() => 0),
    prisma.event.count({ where: { published: true } }).catch(() => 0),
  ]);

  const [featuredAwards, journeyItems, lectures, testimonials, blogPosts] = await Promise.all([
    prisma.award
      .findMany({ where: { published: true, featured: true }, orderBy: { order: "asc" }, take: 3 })
      .catch(() => []),
    prisma.journeyItem
      .findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 5 })
      .catch(() => []),
    prisma.lecture
      .findMany({ where: { published: true }, orderBy: { order: "asc" }, take: 3 })
      .catch(() => []),
    prisma.testimonial
      .findMany({ where: { published: true }, orderBy: { createdAt: "desc" }, take: 3 })
      .catch(() => []),
    prisma.blogPost
      .findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
        include: { category: true },
      })
      .catch(() => []),
  ]);

  return {
    profile,
    counts: { awardsCount, publicationsCount, lecturesCount, eventsCount },
    featuredAwards,
    journeyItems,
    lectures,
    testimonials,
    blogPosts,
  };
}

export default async function HomePage() {
  const { profile, counts, featuredAwards, journeyItems, lectures, testimonials, blogPosts } =
    await getHomeData();

  const designation = profile?.designation || verifiedProfile.designation;
  const tagline = profile?.tagline || verifiedProfile.tagline;
  const yearsOfKirtan = profile?.yearsOfKirtan ?? verifiedProfile.yearsOfKirtan;
  const aboutShort = profile?.aboutShort || verifiedProfile.aboutShort;
  const bannerImages = (profile?.bannerImages ?? []).filter(Boolean);

  return (
    <>
      <Hero
        designation={designation}
        tagline={tagline}
        heroImageUrl={profile?.heroImageUrl}
        heroImages={profile?.heroImages}
        yearsOfKirtan={yearsOfKirtan}
      />

      {/* Homepage banner slideshow */}
      {bannerImages.length >= 2 && (
        <Section tone="paper">
          <BannerCarousel images={bannerImages} />
        </Section>
      )}

      {/* Key Highlights */}
      <Section tone="paper">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <StatCard value={`${yearsOfKirtan}+`} label="Years of Kirtan & Social Awareness" />
          <StatCard value={String(counts.awardsCount || 6)} label="Awards & Honours" />
          <StatCard value={String(counts.lecturesCount || 10)} label="Lectures & Conferences" />
          <StatCard value={String(counts.publicationsCount || 1)} label="Research Publications" />
        </div>
      </Section>

      {/* About */}
      <Section tone="dim">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <SectionHeading
            title="Culture, Knowledge and Social Awareness"
            description={aboutShort}
          />
          <div>
            <p className="max-w-xl text-sm leading-relaxed text-inkSoft">
              Rameshwar&apos;s work weaves together Kirtan and Sant literature, post-graduate research
              in Marathi, public speaking at state and national forums, and coordination of
              youth-facing career programs — a combination of tradition and modern thinking.
            </p>
            <Link href="/about">
              <Button variant="secondary" className="mt-6">
                Read the Full Story
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Kirtan & Social Awareness */}
      <Section tone="ink">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm tracking-wide text-gold">Kirtan &amp; Social Awareness</p>
            <h2 className="mt-4 font-display text-3xl leading-tight sm:text-4xl">
              {yearsOfKirtan} Years of Kirtan-Based Public Awareness
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-paper/80">
              For over a decade, Kirtan has served as Rameshwar&apos;s primary medium for public
              awareness and social communication — carrying the language and philosophy of
              Marathi Sant literature to communities across Maharashtra.
            </p>
          </div>
          <Timeline
            entries={journeyItems.map((j) => ({
              id: j.id,
              heading: j.title,
              subheading: j.organization,
              meta: j.startYear ? String(j.startYear) : undefined,
              body: j.description,
            }))}
          />
        </div>
      </Section>

      {/* Awards preview */}
      {featuredAwards.length > 0 && (
        <Section tone="paper">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Awards & Honours"
              description="Recognition received for contributions to Kirtan, literature and social work."
            />
            <Link href="/awards" className="text-sm font-medium text-maroon hover:text-maroon-dark">
              View all awards
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredAwards.map((a) => (
              <AwardCard
                key={a.id}
                title={a.title}
                organization={a.organization}
                year={a.year}
                location={a.location}
                description={a.description}
                imageUrl={a.imageUrl}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Lectures preview */}
      {lectures.length > 0 && (
        <Section tone="dim">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              title="Lectures & Conferences"
              description="Recent participation as speaker and discussant at state and national forums."
            />
            <Link href="/lectures" className="text-sm font-medium text-maroon hover:text-maroon-dark">
              View all
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {lectures.map((l) => (
              <LectureCard
                key={l.id}
                title={l.title}
                type={l.type}
                organizer={l.organizer}
                location={l.location}
                year={l.year}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Skills */}
      <Section tone="paper">
        <SectionHeading title="Skills & Capabilities" />
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-sm border border-line bg-white px-4 py-2 text-sm text-inkSoft"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      {/* Testimonials */}
      <Section tone="dim">
        <SectionHeading title="Testimonials" />
        {testimonials.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <TestimonialCard
                key={t.id}
                name={t.name}
                role={t.role}
                organization={t.organization}
                testimonial={t.testimonial}
                profileImage={t.profileImage}
              />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-sm text-inkSoft">
            Testimonials will be added after verified submissions.
          </p>
        )}
      </Section>

      {/* Blog preview */}
      {blogPosts.length > 0 && (
        <Section tone="paper">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading title="From the Blog" />
            <Link href="/blog" className="text-sm font-medium text-maroon hover:text-maroon-dark">
              Read more
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-3">
            {blogPosts.map((p) => (
              <BlogCard
                key={p.id}
                slug={p.slug}
                title={p.title}
                excerpt={p.excerpt}
                coverImageUrl={p.coverImageUrl}
                categoryName={p.category?.name}
                publishedAt={p.publishedAt}
              />
            ))}
          </div>
        </Section>
      )}

      {/* Invite / Contact CTA */}
      <Section tone="ink">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-display text-3xl">Invite Rameshwar for Your Program</h2>
            <p className="mt-3 max-w-lg text-paper/80">
              For Kirtan programs, lectures, discussions or youth-oriented events, share your
              details and dates.
            </p>
          </div>
          <Link href="/contact">
            <Button variant="gold" size="lg">
              Send an Invitation
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}