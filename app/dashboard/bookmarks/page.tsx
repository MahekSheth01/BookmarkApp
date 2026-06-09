import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookmarkList from "@/components/bookmark-list";
import { ListMusic } from "lucide-react";

export default async function BookmarksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
          <ListMusic className="w-8 h-8 text-primary" />
          My Bookmarks
        </h1>
        <p className="text-muted-foreground">
          View and manage your entire collection of saved links.
        </p>
      </div>

      <BookmarkList initialBookmarks={bookmarks || []} />
    </main>
  );
}
