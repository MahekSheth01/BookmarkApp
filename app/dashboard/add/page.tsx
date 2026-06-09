import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BookmarkForm from "@/components/bookmark-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AddBookmarkPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4">
        <Button variant="ghost" size="sm" asChild className="w-fit -ml-2 text-muted-foreground hover:text-primary">
          <Link href="/dashboard" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </Button>
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 flex items-center gap-3">
            <PlusCircle className="w-8 h-8 text-primary" />
            Add New Bookmark
          </h1>
          <p className="text-muted-foreground">
            Save a new link to your collection. You can choose to make it public or private.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <BookmarkForm />
      </div>
    </main>
  );
}
