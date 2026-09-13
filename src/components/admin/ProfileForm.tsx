"use client";

import { useFormState, useFormStatus } from "react-dom";
import { updateProfile } from "@/app/admin/actions/profile";
import type { CrudActionState } from "@/app/admin/actions/generic-crud";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialState: CrudActionState = { status: "idle", message: "" };

type ProfileValues = {
  fullName: string;
  designation: string;
  tagline: string;
  heroImageUrl: string;
  heroImagesText: string;
  aboutShort: string;
  aboutLong: string;
  email: string;
  phone: string;
  address: string;
  languagesSpoken: string;
  yearsOfKirtan: number;
  metaTitle: string;
  metaDescription: string;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Saving…" : "Save Changes"}
    </Button>
  );
}

export function ProfileForm({ profile }: { profile: ProfileValues }) {
  const [state, formAction] = useFormState(updateProfile, initialState);

  return (
    <form action={formAction} className="max-w-2xl space-y-8">
      <section className="space-y-4 rounded-md border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Basics</h2>
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input id="fullName" name="fullName" defaultValue={profile.fullName} required />
        </div>
        <div>
          <Label htmlFor="designation">Designation</Label>
          <Input id="designation" name="designation" defaultValue={profile.designation} required />
        </div>
        <div>
          <Label htmlFor="tagline">Tagline</Label>
          <Input id="tagline" name="tagline" defaultValue={profile.tagline} />
        </div>
        <div>
          <Label htmlFor="heroImageUrl">Hero Photo URL</Label>
          <Input id="heroImageUrl" name="heroImageUrl" type="url" defaultValue={profile.heroImageUrl} placeholder="https://res.cloudinary.com/…" />
          <p className="mt-1 text-xs text-inkSoft">Used only when the slideshow below is empty.</p>
        </div>
        <div>
          <Label htmlFor="heroImagesText">Hero Slideshow Images</Label>
          <Textarea
            id="heroImagesText"
            name="heroImagesText"
            defaultValue={profile.heroImagesText}
            rows={4}
            placeholder={"https://res.cloudinary.com/one.jpg\nhttps://res.cloudinary.com/two.jpg\nhttps://res.cloudinary.com/three.jpg"}
          />
          <p className="mt-1 text-xs text-inkSoft">
            One image URL per line. If you add 2 or more, the homepage will show them as an
            auto-rotating slideshow with left/right arrows instead of a single photo.
          </p>
        </div>
        <div>
          <Label htmlFor="yearsOfKirtan">Years of Kirtan</Label>
          <Input id="yearsOfKirtan" name="yearsOfKirtan" type="number" min={0} max={80} defaultValue={profile.yearsOfKirtan} />
        </div>
      </section>

      <section className="space-y-4 rounded-md border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Biography</h2>
        <div>
          <Label htmlFor="aboutShort">Short Bio (homepage)</Label>
          <Textarea id="aboutShort" name="aboutShort" defaultValue={profile.aboutShort} rows={3} />
        </div>
        <div>
          <Label htmlFor="aboutLong">Full Biography (About page)</Label>
          <Textarea id="aboutLong" name="aboutLong" defaultValue={profile.aboutLong} rows={8} />
        </div>
      </section>

      <section className="space-y-4 rounded-md border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">Contact Details</h2>
        <p className="text-xs text-inkSoft">
          Address and date of birth are intentionally not shown on the public site — only used
          internally. Only fill in what you&apos;re comfortable making semi-public.
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="email">Public Email</Label>
            <Input id="email" name="email" type="email" defaultValue={profile.email} />
          </div>
          <div>
            <Label htmlFor="phone">Public Phone</Label>
            <Input id="phone" name="phone" defaultValue={profile.phone} />
          </div>
        </div>
        <div>
          <Label htmlFor="address">Address</Label>
          <Input id="address" name="address" defaultValue={profile.address} />
        </div>
        <div>
          <Label htmlFor="languagesSpoken">Languages Spoken</Label>
          <Input id="languagesSpoken" name="languagesSpoken" defaultValue={profile.languagesSpoken} placeholder="Marathi, Hindi, English" />
        </div>
      </section>

      <section className="space-y-4 rounded-md border border-line bg-white p-6">
        <h2 className="font-display text-lg text-ink">SEO</h2>
        <div>
          <Label htmlFor="metaTitle">Meta Title</Label>
          <Input id="metaTitle" name="metaTitle" defaultValue={profile.metaTitle} />
        </div>
        <div>
          <Label htmlFor="metaDescription">Meta Description</Label>
          <Textarea id="metaDescription" name="metaDescription" defaultValue={profile.metaDescription} rows={2} />
        </div>
      </section>

      <div className="flex items-center gap-4">
        <SubmitButton />
        {state.status === "error" && <p className="text-sm text-red-700">{state.message}</p>}
        {state.status === "success" && <p className="text-sm text-teal">{state.message}</p>}
      </div>
    </form>
  );
}