import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/actions/auth";
import BookmarkForm from "@/components/bookmark-form";
import DeleteBookmarkButton from "@/components/delete-button";
import Link from "next/link";
export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("handle")
    .eq("id", user.id)
    .single();

    const { data: bookmarks } = await supabase
  .from("bookmarks")
  .select("*")
  .eq("user_id", user.id)
  .order("created_at", { ascending: false });

  return (
    <main className="max-w-5xl mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">
            Dashboard
          </h1>

          <p className="text-gray-600 mt-2">
            {user.email}
          </p>

          <p className="text-sm text-gray-500">
            @{profile?.handle}
          </p>
        </div>

        <form action={signOut}>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </form>
      </div>

      <div className="border rounded-lg p-8">
        <h2 className="text-xl font-semibold mb-4">
          My Bookmarks
        </h2>

        <BookmarkForm />

<div className="space-y-4">
  {bookmarks?.length === 0 ? (
    <p className="text-gray-500">
      No bookmarks yet.
    </p>
  ) : (
    bookmarks?.map((bookmark) => (
      <div
        key={bookmark.id}
        className="border rounded-lg p-4"
      >
        <div className="flex justify-between items-center">
          <h3 className="font-semibold">
            {bookmark.title}
          </h3>

          <span
            className={`text-sm px-2 py-1 rounded ${
              bookmark.is_public
                ? "bg-green-100"
                : "bg-gray-100"
            }`}
          >
            {bookmark.is_public ? "Public" : "Private"}
          </span>
        </div>

        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 break-all"
        >
          {bookmark.url}

        </a>
          <Link
    href={`/dashboard/edit/${bookmark.id}`}
    className="text-blue-600 text-sm"
  >
    Edit
  </Link>

         <DeleteBookmarkButton
      id={bookmark.id}
    />
      </div>
      
    ))
    
  )}
</div>
      </div>
    </main>
  );
}