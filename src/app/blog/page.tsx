import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/site/PageHeader";
import { Section } from "@/components/site/Section";
import { BlogCard } from "@/components/site/BlogCard";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description: "Articles on Marathi literature, Sant literature, Kirtan, youth development and social awareness.",
};

export default async function BlogPage() {
  const posts = await prisma.blogPost
    .findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      include: { category: true },
    })
    .catch(() => []);

  return (
    <>
      <PageHeader title="Blog" description="Writing on Marathi literature, Kirtan, and social awareness." />
      <Section tone="paper">
        {posts.length === 0 ? (
          <p className="text-sm text-inkSoft">Articles will be published here soon.</p>
        ) : (
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
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
        )}
      </Section>
    </>
  );
}
