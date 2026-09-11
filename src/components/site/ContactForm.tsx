"use client";

import { useFormState, useFormStatus } from "react-dom";
import { submitContactInquiry, type ContactFormState } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialState: ContactFormState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" disabled={pending} className="w-full sm:w-auto">
      {pending ? "Sending…" : "Send Invitation"}
    </Button>
  );
}

export function ContactForm() {
  const [state, formAction] = useFormState(submitContactInquiry, initialState);

  if (state.status === "success") {
    return (
      <div className="rounded-md border border-teal/30 bg-teal/10 p-6 text-sm text-ink">
        {state.message}
      </div>
    );
  }

  const fieldError = (name: string) => state.fieldErrors?.[name];

  return (
    <form action={formAction} className="space-y-6 rounded-md border border-line bg-white p-6 shadow-subtle sm:p-8">
      {/* Honeypot — hidden from real visitors, catches simple bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" required maxLength={120} placeholder="Your full name" />
          {fieldError("fullName") && <p className="mt-1 text-xs text-red-600">{fieldError("fullName")}</p>}
        </div>

        <div>
          <Label htmlFor="mobileNumber">Mobile Number *</Label>
          <Input id="mobileNumber" name="mobileNumber" required placeholder="e.g. 9876543210" />
          {fieldError("mobileNumber") && (
            <p className="mt-1 text-xs text-red-600">{fieldError("mobileNumber")}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" placeholder="you@example.com" />
          {fieldError("email") && <p className="mt-1 text-xs text-red-600">{fieldError("email")}</p>}
        </div>

        <div>
          <Label htmlFor="city">Location / City</Label>
          <Input id="city" name="city" placeholder="City, District" />
        </div>

        <div>
          <Label htmlFor="organization">Organization</Label>
          <Input id="organization" name="organization" placeholder="College, mandal, trust, etc." />
        </div>

        <div>
          <Label htmlFor="programType">Program Type</Label>
          <Select id="programType" name="programType" defaultValue="">
            <option value="">Select a type</option>
            <option value="Kirtan">Kirtan</option>
            <option value="Lecture / Speech">Lecture / Speech</option>
            <option value="Discussion / Panel">Discussion / Panel</option>
            <option value="Workshop">Workshop</option>
            <option value="Other">Other</option>
          </Select>
        </div>

        <div>
          <Label htmlFor="eventDate">Preferred Date</Label>
          <Input id="eventDate" name="eventDate" type="date" />
        </div>

        <div>
          <Label htmlFor="venue">Venue</Label>
          <Input id="venue" name="venue" placeholder="Venue name" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="expectedAudience">Expected Audience</Label>
          <Input id="expectedAudience" name="expectedAudience" placeholder="Approximate number of attendees" />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea id="message" name="message" maxLength={2000} placeholder="Tell us a bit about the program…" />
        </div>
      </div>

      {state.status === "error" && (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <SubmitButton />
    </form>
  );
}
