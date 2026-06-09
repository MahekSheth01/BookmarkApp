import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookmarkForm from "@/components/bookmark-form";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function AddBookmarkPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8">
      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors w-fit"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
            <div className="rounded-xl bg-primary/10 p-2 text-primary border border-primary/20">
              <PlusCircle className="w-6 h-6" />
            </div>
            Add New Bookmark
          </h1>
          <p className="text-slate-500">
            Save a new link to your collection. Choose to make it public or private.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <BookmarkForm />
      </div>
    </main>
  );
}
