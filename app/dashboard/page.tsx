import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import DeleteBookmarkButton from "@/components/delete-button";
import Link from "next/link";
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
  ArrowRight,
  TrendingUp,
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
    .from("public_profiles")
    .select("handle")
    .eq("id", user.id)
    .single();

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalBookmarks = bookmarks?.length || 0;
  const publicBookmarks = bookmarks?.filter((b) => b.is_public).length || 0;
  const privateBookmarks = totalBookmarks - publicBookmarks;
  const recentBookmarks = bookmarks?.slice(0, 5) || [];

  return (
<main className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-8 space-y-8">      {/* ── Page Header ── */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
<h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">            Welcome back! 👋
          </h1>
          <p className="text-slate-500">
            Here&apos;s what&apos;s happening with your collection.
          </p>
        </div>
<div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <Badge className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-none py-1.5 px-4 h-fit font-medium">
            <ShieldCheck className="w-4 h-4 mr-2 text-primary" />
            @{profile?.handle}
          </Badge>
          <Link
            href="/dashboard/add"
className="inline-flex items-center justify-center gap-2 rounded-full bg-primary hover:bg-primary/90 text-white px-5 py-2.5 text-sm font-bold shadow-sm transition-colors w-full sm:w-auto"          >
            <PlusCircle className="w-4 h-4" />
            Add Bookmark
          </Link>
        </div>
      </div>

      {/* ── Stats ── */}
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Total */}
        <div className="bg-primary rounded-2xl p-6 text-white shadow-lg shadow-primary/20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl translate-x-1/2 -translate-y-1/2" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <span className="text-sm font-medium text-white/80">Total Bookmarks</span>
            <div className="rounded-xl bg-white/20 p-2">
              <BookmarkIcon className="h-5 w-5" />
            </div>
          </div>
          <div className="text-4xl font-extrabold relative z-10">{totalBookmarks}</div>
          <p className="text-xs text-white/70 mt-1 relative z-10">Saved across all time</p>
        </div>

        {/* Public */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Public Links</span>
            <div className="rounded-xl bg-slate-50 p-2 border border-slate-100">
              <Globe className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">{publicBookmarks}</div>
          <p className="text-xs text-slate-400 mt-1">Visible on your profile</p>
        </div>

        {/* Private */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-slate-500">Private Vault</span>
            <div className="rounded-xl bg-slate-50 p-2 border border-slate-100">
              <Lock className="h-5 w-5 text-slate-400" />
            </div>
          </div>
          <div className="text-4xl font-extrabold text-slate-900">{privateBookmarks}</div>
          <p className="text-xs text-slate-400 mt-1">Only you can see these</p>
        </div>
      </div>

      {/* ── Main grid ── */}
<div className="grid gap-8 xl:grid-cols-[1fr_340px]">
        {/* Recent bookmarks */}
        <div className="space-y-5">
<div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-slate-400" />
              Recent Activity
            </h2>
            <Link
              href="/dashboard/bookmarks"
              className="flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid gap-3">
            {recentBookmarks.length === 0 ? (
              <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-14 text-center space-y-4">
                <div className="flex justify-center">
                  <div className="rounded-full bg-slate-50 p-4">
                    <BookmarkIcon className="h-9 w-9 text-slate-300" />
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Your collection is empty</p>
                  <p className="text-sm text-slate-500 max-w-xs mx-auto">
                    Start by adding your first bookmark to see it here.
                  </p>
                </div>
                <Link
                  href="/dashboard/add"
                  className="inline-flex items-center gap-2 mt-2 bg-primary hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Add First Bookmark
                </Link>
              </div>
            ) : (
              recentBookmarks.map((bookmark) => (
                <div
                  key={bookmark.id}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all p-5"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1 flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                          {bookmark.title}
                        </h3>
                        {bookmark.is_public ? (
                          <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none text-xs font-semibold">
                            <Globe className="w-3 h-3 mr-1" />
                            Public
                          </Badge>
                        ) : (
                          <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-xs font-semibold">
                            <Lock className="w-3 h-3 mr-1" />
                            Private
                          </Badge>
                        )}
                      </div>
                      <a
                        href={bookmark.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-slate-500 flex items-center gap-1.5 hover:text-primary transition-colors break-all"
                      >
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        {bookmark.url}
                      </a>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/dashboard/edit/${bookmark.id}`}
className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 hover:text-slate-900 transition-colors flex-1 sm:flex-none"                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        Edit
                      </Link>
                      <DeleteBookmarkButton id={bookmark.id} />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-5">
          {/* Public Profile Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="h-24 bg-primary flex items-center justify-center relative overflow-hidden">
               <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
              <span className="text-white font-bold text-lg relative z-10 drop-shadow flex items-center gap-2">
                <LayoutGrid className="w-5 h-5 text-white/80" />
                Public Profile
              </span>
            </div>
            <div className="p-5 space-y-4">
              <p className="text-sm text-slate-500 leading-relaxed">
                Your public bookmarks are live at:
              </p>
<div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs sm:text-sm font-mono text-slate-700 break-all">                https://bookmarkhub-indol.vercel.app/{profile?.handle}
              </div>
              <Link
                href={`/${profile?.handle}`}
                target="_blank"
className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"              >
                View Public Profile
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Quick tips card */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <TrendingUp className="w-4 h-4 text-primary" />
              Quick Tips
            </div>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Make bookmarks public to share them on your profile page
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Private bookmarks are only visible to you
              </li>
              <li className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                Search for other users in the Profile section
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
