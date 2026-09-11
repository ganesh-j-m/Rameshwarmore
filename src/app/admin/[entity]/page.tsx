import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getEntityConfig } from "@/lib/admin/entities";
import { EntityManager } from "@/components/admin/EntityManager";

export const dynamic = "force-dynamic";

export default async function AdminEntityPage({ params }: { params: { entity: string } }) {
  const config = getEntityConfig(params.entity);
  if (!config) notFound();

  const delegate = (prisma as unknown as Record<string, { findMany: (args: unknown) => Promise<Record<string, unknown>[]> }>)[
    config.model
  ];

  const orderBy = config.defaultOrderBy
    ? { [config.defaultOrderBy.field]: config.defaultOrderBy.direction }
    : undefined;

  const items = await delegate.findMany({ orderBy }).catch(() => []);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-ink">{config.label}</h1>
        <p className="mt-1 text-sm text-inkSoft">
          Manage {config.label.toLowerCase()} shown on the public website. Changes go live immediately.
        </p>
      </div>
      <EntityManager config={config} items={items} />
    </div>
  );
}
