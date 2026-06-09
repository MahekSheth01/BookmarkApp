"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  BookmarkIcon, 
  LogOut, 
  Menu, 
  X, 
  LayoutDashboard, 
  PlusCircle, 
  ListMusic, 
  User,
  Search
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("handle")
          .eq("id", user.id)
          .single();
        setProfile(data);
      }
    };
    getUser();
  }, [supabase]);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/add", label: "Add Bookmark", icon: PlusCircle },
    { href: "/dashboard/bookmarks", label: "My Bookmarks", icon: ListMusic },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight text-primary">
            <div className="rounded-lg bg-primary p-1 text-primary-foreground">
              <BookmarkIcon className="h-6 w-6" />
            </div>
            <span>BookmarkHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary flex items-center gap-1.5 ${
                      pathname === link.href ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}
                <div className="flex items-center gap-4 border-l pl-4 ml-2">
                  <Link href="/dashboard/profile">
                    <Avatar className="h-8 w-8 hover:ring-2 ring-primary/20 transition-all">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <form action={signOut}>
                    <Button variant="ghost" size="sm" type="submit" className="text-muted-foreground hover:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
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

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-4">
            {user && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary font-bold">
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t bg-background animate-in slide-in-from-top duration-300">
          <div className="container mx-auto px-4 py-4 space-y-4">
            {user ? (
              <>
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                        pathname === link.href 
                          ? "bg-primary/10 text-primary" 
                          : "text-muted-foreground hover:bg-slate-100"
                      }`}
                    >
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
                <div className="pt-4 border-t">
                  <form action={signOut} className="w-full">
                    <Button variant="destructive" size="lg" type="submit" className="w-full justify-start" onClick={closeMenu}>
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </Button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="lg" asChild onClick={closeMenu}>
                  <Link href="/login">Login</Link>
                </Button>
                <Button size="lg" asChild onClick={closeMenu}>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

