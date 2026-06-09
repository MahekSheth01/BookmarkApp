import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookmarkIcon, Globe } from "lucide-react";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: Props) {
  const { handle } = await params;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, handle")
    .eq("handle", handle)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20">
      <div className="h-40 bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b" />
      
      <main className="container mx-auto px-4 -mt-16">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl font-bold">
              {handle.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">@{profile.handle}</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium">Public Collection</span>
            </div>
          </div>

          <div className="bg-white border rounded-full px-6 py-2 shadow-sm flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-lg font-bold">{bookmarks?.length || 0}</span>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Bookmarks</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto space-y-4">
          {!bookmarks || bookmarks.length === 0 ? (
            <Card className="border-dashed py-12 text-center">
              <CardContent className="space-y-3">
                <div className="rounded-full bg-slate-100 p-4 w-fit mx-auto">
                  <BookmarkIcon className="h-8 w-8 text-slate-300" />
                </div>
                <p className="font-medium text-muted-foreground">No public bookmarks shared yet.</p>
              </CardContent>
            </Card>
          ) : (
            bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="group hover:shadow-md hover:border-primary/30 transition-all active:scale-[0.98] cursor-pointer">
                <a
                  href={bookmark.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-5"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <BookmarkIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 text-left">
                      <h2 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">
                        {bookmark.title}
                      </h2>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5 truncate max-w-[200px] sm:max-w-md">
                        {new URL(bookmark.url).hostname}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" className="shrink-0 group-hover:translate-x-1 transition-transform">
                    <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                  </Button>
                </a>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            <div className="rounded-md bg-muted p-1 group-hover:bg-primary/10">
              <BookmarkIcon className="h-4 w-4" />
            </div>
            Create your own BookmarkHub profile
          </Link>
        </div>
      </main>
    </div>
  );
}

// Separate component for Link to avoid import conflicts if needed, 
// but Next.js usually handles it. Adding it here for safety.
import Link from "next/link";
