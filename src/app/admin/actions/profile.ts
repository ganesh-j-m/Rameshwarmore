"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { profileSchema } from "@/lib/validations";
import type { CrudActionState } from "@/app/admin/actions/generic-crud";

export async function updateProfile(
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const session = await getSession();
  if (!session) return { status: "error", message: "Not authenticated." };

  const parsed = profileSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Please check the form." };
  }

  const data = parsed.data;
  const clean = {
    fullName: data.fullName,
    designation: data.designation,
    tagline: data.tagline || undefined,
    heroImageUrl: data.heroImageUrl || null,
    aboutShort: data.aboutShort || null,
    aboutLong: data.aboutLong || null,
    email: data.email || null,
    phone: data.phone || null,
    address: data.address || null,
    languagesSpoken: data.languagesSpoken || null,
    yearsOfKirtan: data.yearsOfKirtan ?? undefined,
    metaTitle: data.metaTitle || null,
    metaDescription: data.metaDescription || null,
  };

  const existing = await prisma.profile.findFirst();

  if (existing) {
    await prisma.profile.update({ where: { id: existing.id }, data: clean });
  } else {
    await prisma.profile.create({ data: clean });
  }

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim();
  await prisma.activityLog
    .create({
      data: {
        adminId: session.adminId,
        action: "UPDATE",
        entity: "Profile",
        entityId: existing?.id,
        ipAddress: ip,
      },
    })
    .catch(() => null);

  revalidatePath("/admin/profile");
  revalidatePath("/");
  revalidatePath("/about");

  return { status: "success", message: "Profile updated." };
}
