"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
} from "lucide-react";
import { signOut } from "@/actions/auth";
import { createClient } from "@/lib/supabase/client";

export default function Navbar({ initialUser }: { initialUser: any }) {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(initialUser);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/dashboard/add", label: "Add Bookmark", icon: PlusCircle },
    { href: "/dashboard/bookmarks", label: "My Bookmarks", icon: ListMusic },
    { href: "/dashboard/profile", label: "Profile", icon: User },
  ];

  const closeMenu = () => setIsOpen(false);

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-300 bg-white/80 backdrop-blur-md border-b border-slate-200 ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href={user ? "/dashboard" : "/"}
            className="flex items-center gap-2.5 font-bold text-xl tracking-tight text-slate-900 group"
          >
            <div className="rounded-xl bg-primary p-1.5 text-white shadow-sm shadow-primary/20 group-hover:bg-primary/90 transition-colors">
              <BookmarkIcon className="h-5 w-5" />
            </div>
            <span>BookmarkHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                    }`}
                  >
                    <link.icon className="w-4 h-4" />
                    {link.label}
                  </Link>
                ))}

                <div className="flex items-center gap-3 border-l border-slate-200 pl-4 ml-2">
                  <Link href="/dashboard/profile">
                    <Avatar className="h-8 w-8 ring-2 ring-transparent hover:ring-primary/20 transition-all cursor-pointer">
                      <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <form action={signOut}>
                    <button
                      type="submit"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-destructive hover:bg-destructive/10 transition-all duration-200"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-5 py-2 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary/90 shadow-sm transition-all duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex md:hidden items-center gap-3">
            {user && (
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10 text-primary font-bold text-sm">
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/95 backdrop-blur-md animate-in slide-in-from-top duration-200">
          <div className="container mx-auto px-4 py-4 space-y-1">
            {user ? (
              <>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                    }`}
                  >
                    <link.icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                ))}
                <div className="pt-3 mt-3 border-t border-slate-200">
                  <form action={signOut} className="w-full">
                    <button
                      type="submit"
                      onClick={closeMenu}
                      className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all"
                    >
                      <LogOut className="h-5 w-5" />
                      Logout
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link
                  href="/login"
                  onClick={closeMenu}
                  className="block text-center px-4 py-3 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 transition-all border border-slate-200"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  onClick={closeMenu}
                  className="block text-center px-4 py-3 rounded-xl text-sm font-bold bg-primary text-white hover:bg-primary/90 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
