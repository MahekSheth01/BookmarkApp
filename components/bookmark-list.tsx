"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Globe,
  Lock,
  ExternalLink,
  Edit3,
  BookmarkIcon,
  X,
  PlusCircle,
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

export default function BookmarkList({
  initialBookmarks,
}: {
  initialBookmarks: Bookmark[];
}) {
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

  const filterTabs: { key: "all" | "public" | "private"; label: string }[] = [
    { key: "all", label: `All (${initialBookmarks.length})` },
    { key: "public", label: `Public (${initialBookmarks.filter((b) => b.is_public).length})` },
    { key: "private", label: `Private (${initialBookmarks.filter((b) => !b.is_public).length})` },
  ];

  return (
    <div className="space-y-6">
      {/* ── Search + Filter bar ── */}
      <div className="flex flex-col md:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          <Input
            placeholder="Search by title or URL…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 h-11 border-slate-200 focus:border-primary focus:ring-primary rounded-xl bg-white placeholder:text-slate-400"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X className="w-3.5 h-3.5 text-slate-400" />
            </button>
          )}
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 p-1 rounded-xl h-11 overflow-x-auto whitespace-nowrap">
          {filterTabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                filter === key
                  ? "bg-white text-slate-900 shadow-sm border border-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results summary ── */}
      {filteredBookmarks.length > 0 && (
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filteredBookmarks.length}</span>{" "}
          {filteredBookmarks.length === 1 ? "bookmark" : "bookmarks"}
          {search && ` for "${search}"`}
        </p>
      )}

      {/* ── List ── */}
      <div className="grid gap-3">
        {filteredBookmarks.length === 0 ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 py-16 text-center space-y-4">
            <div className="flex justify-center">
              <div className="rounded-full bg-slate-50 p-5">
                <BookmarkIcon className="h-10 w-10 text-slate-300" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-lg text-slate-900">No bookmarks found</p>
              <p className="text-sm text-slate-500 max-w-xs mx-auto">
                {search
                  ? `No results for "${search}" with the current filter.`
                  : "Your collection is empty. Start adding some links!"}
              </p>
            </div>
            {search ? (
              <button
                onClick={() => { setSearch(""); setFilter("all"); }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all"
              >
                <X className="w-4 h-4" />
                Clear filters
              </button>
            ) : (
              <Link
                href="/dashboard/add"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 rounded-full px-6 py-2.5 text-sm font-bold text-white transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                Add Bookmark
              </Link>
            )}
          </div>
        ) : (
          filteredBookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="group bg-white rounded-2xl border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all duration-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-5 gap-4">
                {/* Left: info */}
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 group-hover:text-primary transition-colors truncate">
                      {bookmark.title}
                    </h3>
                    {bookmark.is_public ? (
                      <Badge className="bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border-none text-xs font-semibold shrink-0">
                        <Globe className="w-3 h-3 mr-1" />
                        Public
                      </Badge>
                    ) : (
                      <Badge className="bg-slate-100 text-slate-600 hover:bg-slate-200 border-none text-xs font-semibold shrink-0">
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
                  <p className="text-[11px] text-slate-400">
                    {new Date(bookmark.created_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>

                {/* Right: actions */}
                <div className="flex items-center gap-2 shrink-0 border-t border-slate-100 pt-4 sm:border-t-0 sm:pt-0 sm:border-l sm:pl-5">
                  <Link
                    href={`/dashboard/edit/${bookmark.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 hover:text-slate-900 transition-all"
                  >
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
  );
}
