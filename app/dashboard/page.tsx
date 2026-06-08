import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/actions/auth";

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

        <p className="text-gray-500">
          No bookmarks yet.
        </p>
      </div>
    </main>
  );
}