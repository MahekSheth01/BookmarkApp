import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
    <main className="container mx-auto p-4 sm:p-8 space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild className="-ml-2 text-muted-foreground hover:text-primary">
          <Link href="/dashboard">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="shadow-lg border-t-4 border-t-primary">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-primary/10 p-2 text-primary">
              <Edit3 className="h-5 w-5" />
            </div>
            <div>
              <CardTitle className="text-xl">Edit Bookmark</CardTitle>
              <CardDescription>Update the details of your saved link</CardDescription>
            </div>
          </div>
        </CardHeader>
        <form action={updateBookmark}>
          <CardContent className="space-y-6 pt-6">
            <input type="hidden" name="id" value={bookmark.id} />
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={bookmark.title}
                placeholder="Bookmark title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                defaultValue={bookmark.url}
                placeholder="https://example.com"
                type="url"
                required
              />
            </div>

            <div className="flex items-center justify-between rounded-lg border p-4 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-background p-2 border shadow-sm text-muted-foreground">
                  {bookmark.is_public ? <Globe className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                </div>
                <div className="space-y-0.5">
                  <Label htmlFor="isPublic" className="text-sm font-semibold">Public Bookmark</Label>
                  <p className="text-xs text-muted-foreground">Toggle visibility on your public profile</p>
                </div>
              </div>
              <Switch id="isPublic" name="isPublic" defaultChecked={bookmark.is_public} />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 border-t bg-slate-50/30 p-6 rounded-b-xl">
            <Button variant="outline" asChild>
              <Link href="/dashboard">Cancel</Link>
            </Button>
            <Button type="submit" className="font-bold shadow-lg shadow-primary/20">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </CardFooter>
        </form>
      </Card>
    </main>
  );
}
