import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookmarkIcon, LogOut } from "lucide-react";
import { signOut } from "@/actions/auth";

export default async function Navbar() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("handle")
      .eq("id", user.id)
      .single();
    profile = data;
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
          <div className="rounded-lg bg-primary p-1 text-primary-foreground">
            <BookmarkIcon className="h-6 w-6" />
          </div>
          <span>BookmarkHub</span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link href="/dashboard" className="hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block">
                Dashboard
              </Link>
              {profile?.handle && (
                <Link href={`/${profile.handle}`} className="hidden text-sm font-medium transition-colors hover:text-primary sm:inline-block">
                  My Profile
                </Link>
              )}
              <div className="flex items-center gap-4 border-l pl-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary font-bold">
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <form action={signOut}>
                  <Button variant="ghost" size="sm" type="submit" className="text-muted-foreground hover:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">Logout</span>
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm" asChild className="rounded-full px-6">
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
