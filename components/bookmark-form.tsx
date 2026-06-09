"use client";

import { useActionState, useEffect, useRef } from "react";
import { createBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Globe, Lock, Loader2, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

const initialState: {
  error?: string;
  success?: boolean;
} = {};

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
      <Card className="shadow-lg border-2 border-green-500/20 overflow-hidden animate-in zoom-in-95 duration-300">
        <CardContent className="p-12 text-center space-y-6">
          <div className="flex justify-center">
            <div className="rounded-full bg-green-100 p-4 text-green-600 animate-bounce">
              <CheckCircle2 className="h-12 w-12" />
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">Successfully Saved!</h2>
            <p className="text-muted-foreground">Your new bookmark has been added to your collection.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Button asChild variant="outline" className="w-full sm:w-auto">
              <Link href="/dashboard/bookmarks">
                View Collection
              </Link>
            </Button>
            <Button onClick={() => window.location.reload()} className="w-full sm:w-auto font-bold">
              Add Another
              <Plus className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1.5 text-primary">
            <Plus className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg">New Bookmark</CardTitle>
            <CardDescription>Enter the details for your new link</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-bold">Bookmark Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="e.g. My Favorite Design Tool"
                required
                disabled={pending}
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-bold">Website URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                type="url"
                required
                disabled={pending}
                className="h-11"
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border p-5 bg-slate-50/50 transition-colors">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-2.5 border shadow-sm text-primary">
                <Globe className="h-5 w-5" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="isPublic" className="text-base font-bold cursor-pointer">Make Public</Label>
                <p className="text-xs text-muted-foreground">Show this link on your public profile</p>
              </div>
            </div>
            <Switch id="isPublic" name="isPublic" disabled={pending} className="scale-110" />
          </div>

          {state?.error && (
            <div className="rounded-lg bg-destructive/10 p-4 text-sm text-destructive font-semibold border border-destructive/20 animate-in shake-1 duration-300">
              {state.error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button variant="ghost" asChild className="flex-1 font-semibold">
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" disabled={pending} className="flex-[2] font-bold h-11 shadow-lg shadow-primary/20">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving Bookmark...
                </>
              ) : (
                <>
                  Save Bookmark
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

