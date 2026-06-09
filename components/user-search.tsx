"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Globe, ChevronRight, User } from "lucide-react";
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
      
      // Get profiles matching query
      let dbQuery = supabase
        .from("profiles")
        .select("id, handle");
      
      if (query) {
        dbQuery = dbQuery.ilike("handle", `%${query}%`);
      }
      
      const { data: profiles } = await dbQuery.limit(10);

      if (profiles) {
        // For each profile, get public bookmark count
        const usersWithCounts = await Promise.all(
          profiles.map(async (profile) => {
            const { count } = await supabase
              .from("bookmarks")
              .select("*", { count: 'exact', head: true })
              .eq("user_id", profile.id)
              .eq("is_public", true);
            
            return {
              ...profile,
              public_count: count || 0
            };
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
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search creators by handle..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      <div className="grid gap-3">
        {loading && users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground animate-pulse">
            Searching for creators...
          </div>
        ) : users.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground border rounded-xl border-dashed">
            No creators found matching "{query}"
          </div>
        ) : (
          users.map((user) => (
            <Link key={user.id} href={`/${user.handle}`}>
              <Card className="hover:border-primary/50 transition-all hover:shadow-sm cursor-pointer group">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10 border group-hover:border-primary/30 transition-colors">
                      <AvatarFallback className="bg-slate-100 text-slate-600 font-bold uppercase">
                        {user.handle.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-0.5">
                      <div className="font-bold flex items-center gap-2">
                        @{user.handle}
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Globe className="w-3 h-3" />
                        {user.public_count} public bookmarks
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
