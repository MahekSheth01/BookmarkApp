import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Mail, 
  Globe, 
  BookmarkIcon, 
  ShieldCheck,
  Search,
  Users
} from "lucide-react";
import UserSearch from "@/components/user-search";

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { count: totalCount } = await supabase
    .from("bookmarks")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id);

  const { count: publicCount } = await supabase
    .from("bookmarks")
    .select("*", { count: 'exact', head: true })
    .eq("user_id", user.id)
    .eq("is_public", true);

  return (
    <main className="container mx-auto p-4 sm:p-8 space-y-8 animate-in fade-in duration-500">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">My Profile</h1>
        <p className="text-muted-foreground">
          Manage your account and discover other members of the community.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="overflow-hidden border-t-4 border-t-primary">
            <CardContent className="pt-8 pb-6 text-center space-y-4">
              <div className="flex justify-center">
                <Avatar className="h-24 w-24 ring-4 ring-slate-50 border shadow-sm">
                  <AvatarFallback className="bg-primary text-primary-foreground text-3xl font-bold uppercase">
                    {profile?.handle?.charAt(0) || user.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="space-y-1">
                <h2 className="text-xl font-bold">@{profile?.handle}</h2>
                <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email}
                </div>
              </div>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <Badge variant="secondary" className="px-3 py-1">
                  <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  Verified User
                </Badge>
              </div>
            </CardContent>
            
            <div className="border-t grid grid-cols-2 divide-x">
              <div className="p-4 text-center">
                <div className="text-xl font-bold">{totalCount}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total</div>
              </div>
              <div className="p-4 text-center">
                <div className="text-xl font-bold">{publicCount}</div>
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Public</div>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-50/50 border-dashed">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                Public URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xs font-mono bg-white p-3 rounded border break-all">
                bookmarkhub.io/{profile?.handle}
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 leading-relaxed">
                This is your personal Linktree-style profile that anyone can visit to see your public bookmarks.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Discover Users Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Discover Users
            </h2>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Find Creators</CardTitle>
            </CardHeader>
            <CardContent>
              <UserSearch />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
