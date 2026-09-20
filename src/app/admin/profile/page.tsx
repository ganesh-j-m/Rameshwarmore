import { prisma } from "@/lib/prisma";
import { profile as verifiedProfile } from "@/lib/data/verified-biodata";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const dynamic = "force-dynamic";

export default async function AdminProfilePage() {
  const profile = await prisma.profile.findFirst();

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl text-ink">Profile & Bio</h1>
        <p className="mt-1 text-sm text-inkSoft">
          This powers the hero section, About page, and SEO metadata across the site.
        </p>
      </div>
      <ProfileForm
        profile={{
          fullName: profile?.fullName ?? verifiedProfile.fullName,
          designation: profile?.designation ?? verifiedProfile.designation,
          tagline: profile?.tagline ?? verifiedProfile.tagline,
          heroImageUrl: profile?.heroImageUrl ?? "",
          heroImagesText: (profile?.heroImages ?? []).join("\n"),
          bannerImagesText: (profile?.bannerImages ?? []).join("\n"),
          aboutShort: profile?.aboutShort ?? verifiedProfile.aboutShort,
          aboutLong: profile?.aboutLong ?? verifiedProfile.aboutLong,
          email: profile?.email ?? verifiedProfile.email,
          phone: profile?.phone ?? verifiedProfile.phone,
          address: profile?.address ?? verifiedProfile.address,
          languagesSpoken: profile?.languagesSpoken ?? verifiedProfile.languagesSpoken,
          yearsOfKirtan: profile?.yearsOfKirtan ?? verifiedProfile.yearsOfKirtan,
          metaTitle: profile?.metaTitle ?? "",
          metaDescription: profile?.metaDescription ?? verifiedProfile.aboutShort,
        }}
      />
    </div>
  );
}