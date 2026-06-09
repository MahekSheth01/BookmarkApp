import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Globe,
  BookmarkIcon,
  ShieldCheck,
  Users,
  ExternalLink,
} from "lucide-react";
import UserSearch from "@/components/user-search";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("public_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { count: totalCount } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: publicCount } = await supabase
    .from("bookmarks")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id)
    .eq("is_public", true);

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
          <div className="rounded-xl bg-slate-100 p-2 text-slate-700 border border-slate-200">
            <User className="w-6 h-6" />
          </div>
          My Profile
        </h1>
        <p className="text-slate-500">
          Manage your account and discover other members of the community.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Profile Card ── */}
        <div className="lg:col-span-1 space-y-5">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-br from-primary to-indigo-600 relative">
              <div className="absolute inset-0 opacity-20"
                style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "20px 20px" }}
              />
            </div>

            {/* Avatar */}
            <div className="flex justify-center -mt-12 pb-6 px-6">
              <div className="flex flex-col items-center text-center space-y-4 w-full">
                <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg border border-slate-200 bg-white">
                  <AvatarFallback className="bg-slate-100 text-slate-900 text-3xl font-extrabold uppercase">
                    {profile?.handle?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <h2 className="text-xl font-extrabold text-slate-900">
                    @{profile?.handle}
                  </h2>
                  <div className="flex items-center justify-center gap-1.5 text-sm text-slate-500">
                    <Mail className="w-3.5 h-3.5" />
                    {user.email}
                  </div>
                </div>

                <Badge className="bg-emerald-50 text-emerald-600 border-none px-3 py-1 font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5" />
                  Verified User
                </Badge>

                {/* Stats */}
                <div className="w-full border-t border-slate-100 mt-2 grid grid-cols-2 divide-x divide-slate-100">
                  <div className="p-4 text-center">
                    <div className="text-2xl font-extrabold text-slate-900">{totalCount}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                      Total
                    </div>
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-2xl font-extrabold text-slate-900">{publicCount}</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">
                      Public
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Public URL Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Globe className="w-4 h-4 text-slate-400" />
              Public Profile URL
            </div>
            <div className="text-xs font-mono bg-slate-50 border border-slate-200 p-3 rounded-xl text-slate-700 break-all">
              bookmarkhub.io/{profile?.handle}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Anyone can visit this page to see your public bookmarks.
            </p>
            <Link
              href={`/${profile?.handle}`}
              target="_blank"
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-all"
            >
              View Live Profile
              <ExternalLink className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ── Discover Users ── */}
        <div className="lg:col-span-2 space-y-5">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-slate-400" />
              Discover Users
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="border-b border-slate-100 px-6 py-5 bg-slate-50/50">
              <h3 className="text-base font-bold text-slate-900">Find Creators</h3>
              <p className="text-sm text-slate-500 mt-0.5">
                Search for other BookmarkHub users and explore their collections.
              </p>
            </div>
            <div className="p-6">
              <UserSearch />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
