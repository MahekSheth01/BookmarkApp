import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// 1. Cleaned up Lucide imports (No duplicates, no broken brand icons)
import { ExternalLink, BookmarkIcon, Globe, Share2 } from "lucide-react";

// 2. Safe brand icon imports (Run: npm install react-icons)
import { FaGithub, FaTwitter } from "react-icons/fa";

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
    <div className="min-h-screen bg-slate-50/30 pb-24">
      {/* Dynamic Header Background */}
      <div className="h-64 bg-gradient-to-br from-primary/30 via-primary/5 to-background border-b relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>
      
      <main className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="flex flex-col items-center text-center space-y-6 mb-16">
          <div className="relative">
            <Avatar className="h-40 w-40 border-8 border-background shadow-2xl">
              <AvatarFallback className="bg-primary text-primary-foreground text-5xl font-bold uppercase">
                {handle.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-2 bg-green-500 border-4 border-background w-8 h-8 rounded-full shadow-lg" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">@{profile.handle}</h1>
            <div className="flex items-center justify-center gap-2 text-muted-foreground font-medium">
              <Globe className="h-4 w-4" />
              <span>Curated by BookmarkHub</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white/80 backdrop-blur-sm border rounded-2xl px-8 py-3 shadow-sm flex items-center gap-8">
              <div className="flex flex-col">
                <span className="text-2xl font-black text-primary">{bookmarks?.length || 0}</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Public Links</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="grid gap-4 sm:grid-cols-1">
            {!bookmarks || bookmarks.length === 0 ? (
              <Card className="border-dashed py-16 text-center bg-white/50 backdrop-blur-sm">
                <CardContent className="space-y-4">
                  <div className="rounded-full bg-slate-100 p-6 w-fit mx-auto">
                    <BookmarkIcon className="h-10 w-10 text-slate-300" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-lg">No public collections yet</p>
                    <p className="text-muted-foreground">This creator hasn't shared any links yet.</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {bookmarks.map((bookmark) => (
                  <a
                    key={bookmark.id}
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block"
                  >
                    <Card className="overflow-hidden border-2 border-transparent hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all active:scale-[0.99] bg-white">
                      <div className="flex items-center justify-between p-6">
                        <div className="flex items-center gap-5 flex-1 min-w-0">
                          <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <BookmarkIcon className="h-6 w-6" />
                          </div>
                          <div className="space-y-1.5 truncate">
                            <h2 className="font-bold text-xl leading-tight group-hover:text-primary transition-colors truncate">
                              {bookmark.title}
                            </h2>
                            <p className="text-sm text-muted-foreground flex items-center gap-1.5 font-medium">
                              <span className="truncate">{new URL(bookmark.url).hostname}</span>
                            </p>
                          </div>
                        </div>
                        <div className="ml-4 shrink-0 flex h-10 w-10 items-center justify-center rounded-full border group-hover:bg-primary/5 group-hover:border-primary/30 transition-all">
                          <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </div>
                      </div>
                    </Card>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          <div className="mt-20 pt-12 border-t text-center space-y-6">
            <div className="flex items-center justify-center gap-6">
              <Button variant="ghost" size="icon" className="rounded-full hover:text-primary hover:bg-primary/5">
                <Share2 className="w-5 h-5" />
              </Button>
              {/* Swapped for FaTwitter */}
              <Button variant="ghost" size="icon" className="rounded-full hover:text-[#1DA1F2] hover:bg-[#1DA1F2]/5">
                <FaTwitter className="w-5 h-5" />
              </Button>
              {/* Swapped for FaGithub */}
              <Button variant="ghost" size="icon" className="rounded-full hover:text-slate-900 hover:bg-slate-900/5">
                <FaGithub className="w-5 h-5" />
              </Button>
            </div>
            
            <Link href="/" className="inline-flex items-center gap-3 text-sm font-bold text-muted-foreground hover:text-primary transition-all group">
              <div className="rounded-xl bg-slate-100 p-2 group-hover:bg-primary/10 group-hover:rotate-12 transition-all">
                <BookmarkIcon className="h-5 w-5" />
              </div>
              Create your own BookmarkHub profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
