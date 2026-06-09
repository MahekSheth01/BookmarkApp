"use client";

import { useActionState } from "react";
import { createBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Plus, Globe, Lock, Loader2 } from "lucide-react";

const initialState: {
  error?: string;
  success?: boolean;
} = {};

export default function BookmarkForm() {
  const [state, formAction, pending] = useActionState(createBookmark, initialState);

  return (
    <Card className="shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 border-b">
        <div className="flex items-center gap-2">
          <div className="rounded-md bg-primary/10 p-1.5 text-primary">
            <Plus className="h-4 w-4" />
          </div>
          <div>
            <CardTitle className="text-lg">Add New Bookmark</CardTitle>
            <CardDescription>Save a new link to your collection</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <form action={formAction} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Title"
                required
                disabled={pending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                placeholder="https://example.com"
                type="url"
                required
                disabled={pending}
              />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-4 bg-slate-50/30">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-background p-2 border shadow-sm text-muted-foreground">
                <Globe className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="isPublic" className="text-sm font-semibold">Public Bookmark</Label>
                <p className="text-xs text-muted-foreground">Make this bookmark visible on your public profile</p>
              </div>
            </div>
            <Switch id="isPublic" name="isPublic" disabled={pending} />
          </div>

          {state?.error && (
            <div className="rounded-md bg-destructive/15 p-3 text-sm text-destructive font-medium">
              {state.error}
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={pending} className="w-full sm:w-auto font-bold px-8">
              {pending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Bookmark"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
