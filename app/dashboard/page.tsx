import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DeleteBookmarkButton from "@/components/delete-button";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BookmarkIcon, 
  Globe, 
  Lock, 
  ExternalLink, 
  Edit3, 
  LayoutGrid,
  ShieldCheck,
  PlusCircle,
  History,
  ArrowRight
} from "lucide-react";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("handle")
    .eq("id", user.id)
    .single();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalBookmarks = bookmarks?.length || 0;
  const publicBookmarks = bookmarks?.filter(b => b.is_public).length || 0;
  const privateBookmarks = totalBookmarks - publicBookmarks;
  const recentBookmarks = bookmarks?.slice(0, 5) || [];

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back!</h1>
          <p className="text-muted-foreground">
            Here's what's happening with your collection.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-slate-100 shadow-sm py-1.5 px-4 h-fit">
            <ShieldCheck className="w-3.5 h-3.5 mr-2 text-primary" />
            @{profile?.handle}
          </Badge>
          <Button asChild className="rounded-full shadow-lg shadow-primary/20">
            <Link href="/dashboard/add">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Bookmark
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Bookmarks</CardTitle>
            <BookmarkIcon className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookmarks}</div>
            <p className="text-xs text-muted-foreground mt-1">Saved across all time</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Public Links</CardTitle>
            <Globe className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publicBookmarks}</div>
            <p className="text-xs text-muted-foreground mt-1">Visible on your profile</p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-amber-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Private Vault</CardTitle>
            <Lock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{privateBookmarks}</div>
            <p className="text-xs text-muted-foreground mt-1">Only you can see these</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-primary" />
              Recent Activity
            </h2>
            <Button variant="ghost" size="sm" asChild className="text-primary hover:text-primary hover:bg-primary/5">
              <Link href="/dashboard/bookmarks">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-4">
            {recentBookmarks.length === 0 ? (
              <Card className="border-dashed py-12">
                <CardContent className="flex flex-col items-center justify-center text-center space-y-3">
                  <div className="rounded-full bg-slate-100 p-4">
                    <BookmarkIcon className="h-8 w-8 text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-medium">Your collection is empty</p>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Start by adding your first bookmark to see it here.
                    </p>
                    <Button asChild variant="outline" className="mt-4">
                      <Link href="/dashboard/add">Add First Bookmark</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              recentBookmarks.map((bookmark) => (
                <Card key={bookmark.id} className="group overflow-hidden hover:border-primary/50 transition-colors shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                          {bookmark.title}
                        </h3>
                        {bookmark.is_public ? (
                          <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50/50">
                            <Lock className="w-3 h-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground flex items-center gap-1.5 hover:text-primary transition-colors break-all"
                      >
                        <ExternalLink className="w-3 h-3 shrink-0" />
                        {bookmark.url}
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-2 border-t pt-4 sm:border-t-0 sm:pt-0 sm:pl-4">
                      <Button variant="outline" size="sm" asChild className="h-8 shadow-sm">
                        <Link href={`/dashboard/edit/${bookmark.id}`}>
                          <Edit3 className="w-3.5 h-3.5 mr-1.5" />
                          Edit
                        </Link>
                      </Button>
                      <DeleteBookmarkButton id={bookmark.id} />
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </div>

        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/10 overflow-hidden">
            <div className="h-24 bg-primary/10 flex items-center justify-center">
              <LayoutGrid className="w-12 h-12 text-primary/20" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">Public Profile</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your public bookmarks are live at:
              </p>
              <div className="bg-white p-3 rounded-lg border text-sm font-mono truncate">
                bookmarkhub.io/{profile?.handle}
              </div>
              <Button asChild className="w-full" variant="outline">
                <Link href={`/${profile?.handle}`} target="_blank">
                  View Public Profile
                  <ExternalLink className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

