import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBookmark } from "@/actions/bookmarks";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, Save, Globe, Lock, Edit3 } from "lucide-react";
import Link from "next/link";

export default async function EditBookmarkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!bookmark) {
    notFound();
  }

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-6 max-w-2xl">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Page title */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold text-slate-900 flex items-center gap-3">
          <div className="rounded-xl bg-primary/10 p-2 text-primary border border-primary/20">
            <Edit3 className="w-6 h-6" />
          </div>
          Edit Bookmark
        </h1>
        <p className="text-slate-500">Update the details of your saved link.</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="h-1.5 w-full bg-primary" />

        <form action={updateBookmark} className="p-6 space-y-6">
          <input type="hidden" name="id" value={bookmark.id} />

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-sm font-bold text-slate-700">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              defaultValue={bookmark.title}
              placeholder="Bookmark title"
              required
              className="h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white"
            />
          </div>

          {/* URL */}
          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-bold text-slate-700">
              URL
            </Label>
            <Input
              id="url"
              name="url"
              defaultValue={bookmark.url}
              placeholder="https://example.com"
              type="url"
              required
              className="h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white"
            />
          </div>

          {/* Public toggle */}
          <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-2.5 border border-slate-200 shadow-sm text-slate-500">
                {bookmark.is_public ? (
                  <Globe className="h-5 w-5" />
                ) : (
                  <Lock className="h-5 w-5" />
                )}
              </div>
              <div className="space-y-0.5">
                <Label htmlFor="isPublic" className="text-sm font-bold text-slate-900 cursor-pointer">
                  Public Bookmark
                </Label>
                <p className="text-xs text-slate-500">
                  Toggle visibility on your public profile
                </p>
              </div>
            </div>
            <Switch
              id="isPublic"
              name="isPublic"
              defaultChecked={bookmark.is_public}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100 mt-6 pt-6">
            <Link
              href="/dashboard"
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-white inline-flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-bold shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
