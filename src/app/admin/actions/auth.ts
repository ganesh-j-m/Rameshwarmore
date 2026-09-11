"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSessionToken, setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";
import { loginSchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export type LoginState = { status: "idle" | "error"; message: string };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid input." };
  }

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(`login:${ip}`, 8, 10 * 60_000);
  if (!allowed) {
    return { status: "error", message: "Too many login attempts. Please try again in a few minutes." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (!admin) {
    return { status: "error", message: "Invalid email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { status: "error", message: "Invalid email or password." };
  }

  const token = await createSessionToken({ adminId: admin.id, email: admin.email, name: admin.name });
  await setSessionCookie(token);

  await prisma.activityLog
    .create({ data: { adminId: admin.id, action: "LOGIN", entity: "AdminUser", entityId: admin.id, ipAddress: ip } })
    .catch(() => null);

  const next = formData.get("next");
  const target = typeof next === "string" && next.startsWith("/admin/") ? next : "/admin/dashboard";
  redirect(target);
}

export async function logout() {
  const session = await getSession();
  if (session) {
    await prisma.activityLog
      .create({ data: { adminId: session.adminId, action: "LOGOUT", entity: "AdminUser", entityId: session.adminId } })
      .catch(() => null);
  }
  await clearSessionCookie();
  redirect("/admin/login");
}
