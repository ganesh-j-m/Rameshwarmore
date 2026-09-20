import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HeroCarousel } from "@/components/site/HeroCarousel";

export function Hero({
  designation,
  tagline,
  heroImageUrl,
  heroImages,
  yearsOfKirtan,
}: {
  designation: string;
  tagline: string;
  heroImageUrl?: string | null;
  heroImages?: string[];
  yearsOfKirtan: number;
}) {
  const slides = (heroImages ?? []).filter(Boolean);

  return (
    <section className="relative overflow-hidden border-b border-line bg-paper">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-28">
        <div>
          <p className="font-body text-sm tracking-wide text-gold-dark">
            {yearsOfKirtan}+ Years of Kirtan &amp; Social Awareness
          </p>
          <h1 className="mt-4 font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
            Rameshwar
            <br />
            More
          </h1>
          <p className="mt-5 text-lg text-maroon">Founder of Suryaseva Green Energy Pvt Ltd|{designation}</p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-inkSoft">{tagline}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className={cn(buttonVariants({ variant: "primary", size: "lg" }))}>
              Invite for Kirtan / Program
            </Link>
            <Link href="/about" className={cn(buttonVariants({ variant: "secondary", size: "lg" }))}>
              Explore My Journey
            </Link>
          </div>
        </div>

        <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-md border border-line bg-paperDim">
          {slides.length >= 2 ? (
            <HeroCarousel images={slides} alt="Rameshwar Parmeshwar More" />
          ) : slides[0] || heroImageUrl ? (
            <Image src={slides[0] || heroImageUrl!} alt="Rameshwar Parmeshwar More" fill className="object-cover" priority />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-8 text-center text-sm text-inkSoft">
              Photograph will be updated.
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1.5 bg-gradient-to-r from-maroon via-gold to-teal" />
        </div>
      </div>
    </section>
  );
}