"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function createBookmark(
  prevState: { error?: string } | null,
  formData: FormData
) {
  const title = formData.get("title") as string;
  const url = formData.get("url") as string;
  const isPublic = formData.get("isPublic") === "on";

  if (!title || !url) {
    return { error: "All fields are required." };
  }

  try {
    new URL(url);
  } catch {
    return { error: "Please enter a valid URL." };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const { error } = await supabase
    .from("bookmarks")
    .insert({
      title,
      url,
      is_public: isPublic,
      user_id: user.id,
    });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard");

  return { success: true };
}