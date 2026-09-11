import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {
  profile,
  education,
  researchProjects,
  publications,
  journeyItems,
  awards,
  lectures,
  certifications,
} from "../src/lib/data/verified-biodata";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding verified data for rameshwarmore.in ...");

  // ---- First admin account ----
  const adminEmail = process.env.ADMIN_EMAIL ?? profile.email;
  const adminPassword = process.env.ADMIN_PASSWORD;
  const adminName = process.env.ADMIN_NAME ?? profile.fullName;

  if (!adminPassword) {
    throw new Error(
      "Set ADMIN_PASSWORD in your .env file before seeding, so a first admin account can be created."
    );
  }

  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      name: adminName,
      email: adminEmail,
      passwordHash,
    },
  });
  console.log(`Admin account ready: ${adminEmail}`);

  // ---- Profile (singleton row) ----
  const existingProfile = await prisma.profile.findFirst();
  if (!existingProfile) {
    await prisma.profile.create({
      data: {
        fullName: profile.fullName,
        designation: profile.designation,
        tagline: profile.tagline,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        dateOfBirth: new Date(profile.dateOfBirth),
        languagesSpoken: profile.languagesSpoken,
        yearsOfKirtan: profile.yearsOfKirtan,
        aboutShort: profile.aboutShort,
        aboutLong: profile.aboutLong,
      },
    });
    console.log("Profile created.");
  }

  // ---- Education ----
  for (const item of education) {
    const existing = await prisma.education.findFirst({ where: { level: item.level } });
    if (!existing) await prisma.education.create({ data: item });
  }

  // ---- Research ----
  for (const item of researchProjects) {
    const existing = await prisma.researchProject.findFirst({ where: { title: item.title } });
    if (!existing) await prisma.researchProject.create({ data: item });
  }

  // ---- Publications ----
  for (const item of publications) {
    const existing = await prisma.publication.findFirst({ where: { title: item.title } });
    if (!existing) await prisma.publication.create({ data: item });
  }

  // ---- Journey ----
  for (const item of journeyItems) {
    const existing = await prisma.journeyItem.findFirst({ where: { title: item.title } });
    if (!existing) await prisma.journeyItem.create({ data: item });
  }

  // ---- Awards ----
  for (const item of awards) {
    const existing = await prisma.award.findFirst({ where: { title: item.title } });
    if (!existing) await prisma.award.create({ data: item });
  }

  // ---- Lectures / Workshops / Conferences ----
  for (const item of lectures) {
    const existing = await prisma.lecture.findFirst({ where: { title: item.title } });
    if (!existing) await prisma.lecture.create({ data: item });
  }

  // ---- Certifications ----
  for (const item of certifications) {
    const existing = await prisma.certification.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.certification.create({
        data: {
          ...item,
          date: item.date ? new Date(item.date) : undefined,
        },
      });
    }
  }

  // ---- Placeholder testimonial notice ----
  const testimonialCount = await prisma.testimonial.count();
  if (testimonialCount === 0) {
    console.log(
      "No testimonials seeded — the site will show 'Testimonials will be added after verified submissions.' until real ones are added via the Admin Panel."
    );
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
