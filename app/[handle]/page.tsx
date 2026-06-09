import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { ExternalLink, BookmarkIcon, Globe, Share2 } from "lucide-react";
import { FaGithub, FaTwitter } from "react-icons/fa";

type Props = {
  params: Promise<{ handle: string }>;
};

export default async function PublicProfilePage({ params }: Props) {
  const { handle } = await params;
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("public_profiles")
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
    <div className="min-h-screen bg-slate-50 pb-24">

      {/* ── Hero Banner ── */}
      <div className="h-56 bg-primary relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <main className="container mx-auto px-4 -mt-20 relative z-10">

        {/* ── Profile header ── */}
        <div className="flex flex-col items-center text-center space-y-5 mb-14">
          <Avatar className="h-36 w-36 border-8 border-white shadow-xl bg-white">
            <AvatarFallback className="bg-slate-100 text-slate-900 text-5xl font-extrabold uppercase">
              {handle.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900">
              @{profile.handle}
            </h1>
            <div className="flex items-center justify-center gap-2 text-slate-500 font-medium text-sm">
              <Globe className="h-4 w-4" />
              <span>Curated by BookmarkHub</span>
            </div>
          </div>

          {/* Stats pill */}
          <div className="bg-white border border-slate-200 rounded-2xl px-10 py-4 shadow-sm flex items-center gap-3">
            <BookmarkIcon className="h-5 w-5 text-slate-400" />
            <div className="flex flex-col items-start">
              <span className="text-2xl font-black text-slate-900">
                {bookmarks?.length || 0}
              </span>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold leading-none">
                Public Links
              </span>
            </div>
          </div>
        </div>

        {/* ── Bookmarks grid ── */}
        <div className="max-w-3xl mx-auto">
          {!bookmarks || bookmarks.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-20 text-center space-y-4 shadow-sm">
              <div className="flex justify-center">
                <div className="rounded-full bg-slate-50 p-6 border border-slate-100">
                  <BookmarkIcon className="h-10 w-10 text-slate-300" />
                </div>
              </div>
              <p className="font-bold text-lg text-slate-900">
                No public collections yet
              </p>
              <p className="text-slate-500 text-sm">
                This creator hasn&apos;t shared any links yet.
              </p>
            </div>
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
                  <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-200 hover:border-primary hover:shadow-lg transition-all active:scale-[0.99]">
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="hidden sm:flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 border border-slate-100 group-hover:border-primary">
                        <BookmarkIcon className="h-6 w-6" />
                      </div>
                      {/* Text */}
                      <div className="space-y-1 min-w-0">
                        <h2 className="font-bold text-xl text-slate-900 group-hover:text-primary transition-colors truncate leading-tight">
                          {bookmark.title}
                        </h2>
                        <p className="text-sm text-slate-500 font-medium truncate">
                          {(() => {
                            try { return new URL(bookmark.url).hostname; }
                            catch { return bookmark.url; }
                          })()}
                        </p>
                      </div>
                    </div>
                    {/* Arrow */}
                    <div className="ml-4 shrink-0 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 group-hover:bg-primary group-hover:border-primary transition-all shadow-sm">
                      <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* ── Footer ── */}
          <div className="mt-24 pt-12 border-t border-slate-200 text-center space-y-8">
            <div className="flex items-center justify-center gap-4">
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:border-slate-300 hover:bg-white shadow-sm transition-all">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2]/30 hover:bg-white shadow-sm transition-all">
                <FaTwitter className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 hover:text-black hover:border-slate-900 hover:bg-white shadow-sm transition-all">
                <FaGithub className="w-5 h-5" />
              </button>
            </div>

            <Link
              href="/"
              className="inline-flex items-center gap-3 text-sm font-bold text-slate-500 hover:text-primary transition-all group"
            >
              <div className="rounded-xl bg-white border border-slate-200 p-2 shadow-sm group-hover:bg-primary group-hover:border-primary group-hover:rotate-12 transition-all">
                <BookmarkIcon className="h-4 w-4 text-slate-600 group-hover:text-white" />
              </div>
              Create your own BookmarkHub profile
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
