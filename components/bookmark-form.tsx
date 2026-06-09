"use client";

import { useActionState, useEffect, useRef } from "react";
import { createBookmark } from "@/actions/bookmarks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Globe, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const initialState: { error?: string; success?: boolean } = {};

export default function BookmarkForm() {
  const [state, formAction, pending] = useActionState(createBookmark, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      formRef.current?.reset();
    }
  }, [state?.success]);

  if (state?.success) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-12 text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-50 border border-emerald-100 p-5">
            <CheckCircle2 className="h-12 w-12 text-emerald-500" />
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-extrabold text-slate-900">Bookmark Saved!</h2>
          <p className="text-slate-500">Your new bookmark has been added to your collection.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/dashboard/bookmarks"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all text-center"
          >
            View Collection
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2.5 text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            Add Another
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary">
            <Plus className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">New Bookmark</h2>
            <p className="text-sm text-slate-500">Enter the details for your new link</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-6">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold text-slate-700">
                Bookmark Title
              </Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. My Favourite Design Tool"
                required
                disabled={pending}
                className="h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white"
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-bold text-slate-700">
                Website URL
              </Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                type="url"
                required
                disabled={pending}
                className="h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white"
              />
            </div>
          </div>

          {/* Public toggle */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-5 transition-colors">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-2.5 border border-slate-200 shadow-sm">
                <Globe className="h-5 w-5 text-slate-400" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="isPublic" className="text-sm font-bold text-slate-900 cursor-pointer">
                  Make Public
                </Label>
                <p className="text-xs text-slate-500">Show this link on your public profile</p>
              </div>
            </div>
            <Switch id="isPublic" name="isPublic" disabled={pending} />
          </div>

          {/* Error */}
          {state?.error && (
            <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600 font-semibold">
              {state.error}
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={pending}
              className="bg-primary hover:bg-primary/90 text-white rounded-xl px-6 py-2.5 font-bold text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm transition-colors"
            >
              {pending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  Save Bookmark
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
