import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function PublicProfilePage({
  params,
}: Props) {
  const { handle } = await params;

  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, handle")
    .eq("handle", handle)
    .maybeSingle();

  if (!profile) {
    notFound();
  }

  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("user_id", profile.id)
    .eq("is_public", true)
    .order("created_at", { ascending: false });

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">
        @{profile.handle}
      </h1>

      <div className="space-y-4">
        {!bookmarks || bookmarks.length === 0 ? (
  <p className="text-gray-500">
    No public bookmarks yet.
  </p>
) : (
  bookmarks.map((bookmark) => (
            <div
              key={bookmark.id}
              className="border rounded-lg p-4"
            >
              <h2 className="font-semibold text-lg">
                {bookmark.title}
              </h2>

              <a
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 break-all"
              >
                {bookmark.url}
              </a>
            </div>
          ))
        )}
      </div>
    </main>
  );
}