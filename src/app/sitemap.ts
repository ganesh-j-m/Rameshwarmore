import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rameshwarmore.in";

const staticRoutes = [
  "",
  "/about",
  "/education",
  "/research",
  "/awards",
  "/lectures",
  "/certifications",
  "/events",
  "/gallery",
  "/videos",
  "/social-work",
  "/blog",
  "/contact",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await prisma.blogPost
    .findMany({ where: { published: true }, select: { slug: true, updatedAt: true } })
    .catch(() => []);

  const staticEntries = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const postEntries = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticEntries, ...postEntries];
}
