import { z } from "zod";

export const contactInquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  mobileNumber: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s]{7,15}$/, "Please enter a valid mobile number"),
  email: z.string().trim().email("Please enter a valid email").optional().or(z.literal("")),
  organization: z.string().trim().max(200).optional().or(z.literal("")),
  programType: z.string().trim().max(120).optional().or(z.literal("")),
  eventDate: z.string().optional().or(z.literal("")),
  venue: z.string().trim().max(200).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  expectedAudience: z.string().trim().max(60).optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot field: real users never fill this in.
  website: z.string().max(0, "Spam detected").optional().or(z.literal("")),
});

export type ContactInquiryInput = z.infer<typeof contactInquirySchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const profileSchema = z.object({
  fullName: z.string().trim().min(2, "Full name is required").max(150),
  designation: z.string().trim().min(2, "Designation is required").max(150),
  tagline: z.string().trim().max(200).optional().or(z.literal("")),
  heroImageUrl: z.string().trim().url("Enter a valid URL").optional().or(z.literal("")),
  heroImagesText: z.string().trim().max(3000).optional().or(z.literal("")),
  aboutShort: z.string().trim().max(600).optional().or(z.literal("")),
  aboutLong: z.string().trim().max(5000).optional().or(z.literal("")),
  email: z.string().trim().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  address: z.string().trim().max(300).optional().or(z.literal("")),
  languagesSpoken: z.string().trim().max(200).optional().or(z.literal("")),
  yearsOfKirtan: z.coerce.number().int().min(0).max(80).optional(),
  metaTitle: z.string().trim().max(160).optional().or(z.literal("")),
  metaDescription: z.string().trim().max(300).optional().or(z.literal("")),
});