"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Globe, ChevronRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface UserProfile {
  id: string;
  handle: string;
  public_count?: number;
}

export default function UserSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      let dbQuery = supabase.from("profiles").select("id, handle");

      if (query) {
        dbQuery = dbQuery.ilike("handle", `%${query}%`);
      }

      const { data: profiles } = await dbQuery.limit(10);

      if (profiles) {
        const usersWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            const { count } = await supabase
              .from("bookmarks")
              .select("*", { count: "exact", head: true })
              .eq("user_id", profile.id)
              .eq("is_public", true);

            return { ...profile, public_count: count || 0 };
          })
        );
        setUsers(usersWithCounts);
      }
      setLoading(false);
    };

    const timer = setTimeout(fetchUsers, 300);
    return () => clearTimeout(timer);
  }, [query, supabase]);

  return (
    <div className="space-y-5">
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        <Input
          placeholder="Search creators by handle…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white"
        />
      </div>

      {/* Results */}
      <div className="grid gap-2">
        {loading && users.length === 0 ? (
          <div className="flex items-center justify-center gap-2 py-10 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Searching creators…</span>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-10 text-slate-500 border-2 border-dashed border-slate-200 rounded-2xl">
            <Globe className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-medium">
              {query ? `No creators found matching "${query}"` : "Start typing to search creators"}
            </p>
          </div>
        ) : (
          users.map((user) => (
            <Link key={user.id} href={`/${user.handle}`}>
              <div className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl hover:border-primary hover:shadow-sm transition-all cursor-pointer">
                <div className="flex items-center gap-3">
                  <Avatar className="h-11 w-11 border border-slate-200">
                    <AvatarFallback className="bg-slate-100 text-slate-900 font-extrabold uppercase text-base">
                      {user.handle.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-0.5">
                    <div className="font-bold text-slate-900 group-hover:text-primary transition-colors">
                      @{user.handle}
                    </div>
                    <div className="text-xs text-slate-500 flex items-center gap-1">
                      <Globe className="w-3 h-3" />
                      {user.public_count} public{" "}
                      {user.public_count === 1 ? "bookmark" : "bookmarks"}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
