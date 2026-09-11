"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { getEntityConfig, type EntityField } from "@/lib/admin/entities";

type PrismaDelegate = {
  create: (args: { data: Record<string, unknown> }) => Promise<{ id: string }>;
  update: (args: { where: { id: string }; data: Record<string, unknown> }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

function getDelegate(model: string): PrismaDelegate {
  const delegate = (prisma as unknown as Record<string, PrismaDelegate>)[model];
  if (!delegate) throw new Error(`Unknown model: ${model}`);
  return delegate;
}

function coerceValue(field: EntityField, raw: FormDataEntryValue | null) {
  if (field.type === "boolean") return raw === "on" || raw === "true";
  if (raw === null || raw === "") return null;
  const value = String(raw);
  if (field.type === "number") {
    const num = Number(value);
    return Number.isNaN(num) ? null : num;
  }
  if (field.type === "date") return new Date(value);
  return value;
}

function buildData(entityKey: string, formData: FormData) {
  const config = getEntityConfig(entityKey);
  if (!config) throw new Error(`Unknown entity: ${entityKey}`);

  const data: Record<string, unknown> = {};
  for (const field of config.fields) {
    const value = coerceValue(field, formData.get(field.name));
    if (field.required && (value === null || value === "")) {
      throw new Error(`${field.label} is required.`);
    }
    data[field.name] = value;
  }
  return { config, data };
}

async function requireSession() {
  const session = await getSession();
  if (!session) throw new Error("Not authenticated.");
  return session;
}

async function logActivity(action: string, entity: string, entityId?: string) {
  const session = await getSession();
  if (!session) return;
  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim();
  await prisma.activityLog
    .create({
      data: { adminId: session.adminId, action, entity, entityId, ipAddress: ip },
    })
    .catch(() => null);
}

export type CrudActionState = { status: "idle" | "success" | "error"; message: string };

export async function createEntity(
  entityKey: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  try {
    await requireSession();
    const { config, data } = buildData(entityKey, formData);
    const delegate = getDelegate(config.model);
    const created = await delegate.create({ data });
    await logActivity("CREATE", config.model, created.id);
    revalidatePath(`/admin/${entityKey}`);
    revalidatePath("/");
    return { status: "success", message: `${config.singularLabel} created.` };
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : "Something went wrong." };
  }
}

export async function updateEntity(
  entityKey: string,
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  try {
    await requireSession();
    const { config, data } = buildData(entityKey, formData);
    const delegate = getDelegate(config.model);
    await delegate.update({ where: { id }, data });
    await logActivity("UPDATE", config.model, id);
    revalidatePath(`/admin/${entityKey}`);
    revalidatePath("/");
    return { status: "success", message: `${config.singularLabel} updated.` };
  } catch (err) {
    return { status: "error", message: err instanceof Error ? err.message : "Something went wrong." };
  }
}

export async function deleteEntity(entityKey: string, id: string) {
  await requireSession();
  const config = getEntityConfig(entityKey);
  if (!config) throw new Error(`Unknown entity: ${entityKey}`);
  const delegate = getDelegate(config.model);
  await delegate.delete({ where: { id } });
  await logActivity("DELETE", config.model, id);
  revalidatePath(`/admin/${entityKey}`);
  revalidatePath("/");
}

export async function toggleField(entityKey: string, id: string, field: string, value: boolean) {
  await requireSession();
  const config = getEntityConfig(entityKey);
  if (!config) throw new Error(`Unknown entity: ${entityKey}`);
  const delegate = getDelegate(config.model);
  await delegate.update({ where: { id }, data: { [field]: value } });
  await logActivity(value ? "PUBLISH" : "UNPUBLISH", config.model, id);
  revalidatePath(`/admin/${entityKey}`);
  revalidatePath("/");
}
