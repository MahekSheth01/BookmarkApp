import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {updateBookmark} from "@/actions/bookmarks";
export default async function EditBookmarkPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    notFound();
  }

  const { data: bookmark } = await supabase
    .from("bookmarks")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!bookmark) {
    notFound();
  }

  return (
    <main className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">
        Edit Bookmark
      </h1>

      <form action={updateBookmark} className="space-y-4">
        <input
          type="hidden"
          name="id"
          value={bookmark.id}
        />

        <input
          name="title"
          defaultValue={bookmark.title}
          className="w-full border p-3 rounded"
        />

        <input
          name="url"
          defaultValue={bookmark.url}
          className="w-full border p-3 rounded"
        />

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPublic"
            defaultChecked={bookmark.is_public}
          />
          Public Bookmark
        </label>

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}