"use client";

import { Suspense } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { login, type LoginState } from "@/app/admin/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const initialState: LoginState = { status: "idle", message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing in…" : "Sign In"}
    </Button>
  );
}

function LoginForm() {
  const [state, formAction] = useFormState(login, initialState);
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  return (
    <form action={formAction} className="space-y-5 rounded-md border border-line bg-white p-6 shadow-subtle">
      {next && <input type="hidden" name="next" value={next} />}

      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" autoComplete="email" required />
      </div>

      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" autoComplete="current-password" required minLength={6} />
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

export default function AdminLoginPage() {
  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 text-center">
        <p className="font-display text-2xl text-maroon">रा</p>
        <h1 className="mt-2 font-display text-2xl text-ink">Admin Sign In</h1>
        <p className="mt-1 text-sm text-inkSoft">rameshwarmore.in content management</p>
      </div>

      <Suspense fallback={<div className="h-64" />}>
        <LoginForm />
      </Suspense>

      <p className="mt-6 text-center text-sm text-inkSoft">
        <Link href="/" className="text-maroon underline underline-offset-2">
          ← Back to the website
        </Link>
      </p>
    </div>
  );
}
