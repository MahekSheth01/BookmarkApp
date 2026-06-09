"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Globe, 
  Lock, 
  ExternalLink, 
  Edit3, 
  Filter,
  BookmarkIcon,
  X
} from "lucide-react";
import Link from "next/link";
import DeleteBookmarkButton from "./delete-button";

interface Bookmark {
  id: string;
  title: string;
  url: string;
  is_public: boolean;
  created_at: string;
}

export default function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "public" | "private">("all");

  const filteredBookmarks = initialBookmarks.filter((bookmark) => {
    const matchesSearch = 
      bookmark.title.toLowerCase().includes(search.toLowerCase()) ||
      bookmark.url.toLowerCase().includes(search.toLowerCase());
    
    const matchesFilter = 
      filter === "all" || 
      (filter === "public" && bookmark.is_public) || 
      (filter === "private" && !bookmark.is_public);

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or URL..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11"
          />
          {search && (
            <button 
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5 text-muted-foreground" />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg h-11">
          <Button
            variant={filter === "all" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("all")}
            className={filter === "all" ? "bg-white shadow-sm" : ""}
          >
            All
          </Button>
          <Button
            variant={filter === "public" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("public")}
            className={filter === "public" ? "bg-white shadow-sm" : ""}
          >
            Public
          </Button>
          <Button
            variant={filter === "private" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setFilter("private")}
            className={filter === "private" ? "bg-white shadow-sm" : ""}
          >
            Private
          </Button>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookmarks.length === 0 ? (
          <Card className="border-dashed py-16">
            <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
              <div className="rounded-full bg-slate-100 p-6">
                <BookmarkIcon className="h-10 w-10 text-slate-300" />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-lg text-slate-900">No bookmarks found</p>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                  {search 
                    ? `We couldn't find any results for "${search}" with the current filter.`
                    : "Your collection is empty. Start adding some links!"}
                </p>
              </div>
              {search && (
                <Button variant="outline" onClick={() => {setSearch(""); setFilter("all");}}>
                  Clear search & filters
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <Card key={bookmark.id} className="group overflow-hidden hover:border-primary/50 transition-all hover:shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-lg group-hover:text-primary transition-colors">
                      {bookmark.title}
                    </h3>
                    {bookmark.is_public ? (
                      <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50/50">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-amber-600 border-amber-200 bg-amber-50/50">
                        <Lock className="w-3 h-3 mr-1" />
                        Private
                      </Badge>
                    )}
                  </div>
                  <a
                    href={bookmark.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground flex items-center gap-1.5 hover:text-primary transition-colors break-all"
                  >
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                    {bookmark.url}
                  </a>
                </div>
                
                <div className="flex items-center gap-2 border-t pt-4 sm:border-t-0 sm:pt-0 sm:pl-4">
                  <Button variant="outline" size="sm" asChild className="h-9 shadow-sm">
                    <Link href={`/dashboard/edit/${bookmark.id}`}>
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <DeleteBookmarkButton id={bookmark.id} />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
