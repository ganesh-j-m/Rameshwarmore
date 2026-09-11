import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { Section } from "@/components/site/Section";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

async function getPost(slug: string) {
  return prisma.blogPost
    .findFirst({ where: { slug, published: true }, include: { category: true, tags: true } })
    .catch(() => null);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt || undefined,
    openGraph: {
      title: post.title,
      description: post.excerpt || undefined,
      images: post.coverImageUrl ? [post.coverImageUrl] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <Section tone="paper">
      <div className="mx-auto max-w-prose">
        {post.category && <Badge variant="gold">{post.category.name}</Badge>}
        <h1 className="mt-4 font-display text-3xl leading-tight text-ink sm:text-4xl">{post.title}</h1>
        {post.publishedAt && (
          <p className="mt-3 text-sm text-inkSoft">{formatDate(post.publishedAt)}</p>
        )}
        {post.coverImageUrl && (
          <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-md border border-line">
            <Image src={post.coverImageUrl} alt={post.title} fill className="object-cover" />
          </div>
        )}
        <div className="prose-marathi mt-10 whitespace-pre-line">{post.content}</div>
        {post.tags.length > 0 && (
          <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
            {post.tags.map((t) => (
              <Badge key={t.id}>{t.name}</Badge>
            ))}
          </div>
        )}
      </div>
    </Section>
  );
}
