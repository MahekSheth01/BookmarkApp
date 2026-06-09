"use client";

import { useActionState } from "react";
import { signUp } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Mail, Lock, AtSign, Loader2, BookmarkIcon } from "lucide-react";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        <div className="h-2 w-full bg-primary" />
        <div className="p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <div className="rounded-2xl bg-primary/10 p-3">
                <BookmarkIcon className="h-7 w-7 text-primary" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-slate-500">
              Join BookmarkHub and start saving links today
            </p>
          </div>

          {/* Form */}
          <form action={formAction} className="space-y-5">
            {/* Handle */}
            <div className="space-y-2">
              <Label
                htmlFor="handle"
                className="text-sm font-bold text-slate-700"
              >
                Your Handle
              </Label>
              <div className="relative">
                <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  id="handle"
                  name="handle"
                  placeholder="johndoe"
                  disabled={isPending}
                  required
                  className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-slate-50/50"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-bold text-slate-700"
              >
                Email address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  id="email"
                  name="email"
                  placeholder="name@example.com"
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isPending}
                  required
                  className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-slate-50/50"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-bold text-slate-700"
              >
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  disabled={isPending}
                  required
                  className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-slate-50/50"
                />
              </div>
            </div>

            {/* Error */}
            {state?.error && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3.5 text-sm text-red-600 font-medium">
                {state.error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-primary hover:bg-primary/90 text-white rounded-xl h-11 font-bold text-base flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account…
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-primary font-bold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
