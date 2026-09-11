"use server";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { contactInquirySchema } from "@/lib/validations";
import { checkRateLimit } from "@/lib/rate-limit";

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContactInquiry(
  _prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const raw = Object.fromEntries(formData.entries());

  const parsed = contactInquirySchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string") fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // Honeypot: silently pretend success so bots don't learn anything.
  if (parsed.data.website) {
    return { status: "success", message: "Thank you — your invitation has been received." };
  }

  const ip = headers().get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const { allowed } = checkRateLimit(`contact:${ip}`, 5, 10 * 60_000);
  if (!allowed) {
    return {
      status: "error",
      message: "Too many submissions from this connection. Please try again later.",
    };
  }

  const data = parsed.data;

  await prisma.contactInquiry.create({
    data: {
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      email: data.email || null,
      organization: data.organization || null,
      programType: data.programType || null,
      eventDate: data.eventDate ? new Date(data.eventDate) : null,
      venue: data.venue || null,
      city: data.city || null,
      expectedAudience: data.expectedAudience || null,
      message: data.message || null,
      ipAddress: ip,
    },
  });

  return {
    status: "success",
    message: "Thank you — your invitation has been received. Rameshwar's team will get back to you soon.",
  };
}
