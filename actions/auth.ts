"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { sendWelcomeEmail } from "@/lib/email";
export async function signUp(prevState: { error?: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const handle = formData.get("handle") as string;

  // if (!handle || handle.length < 3) {
  //   return { error: "Handle must be at least 3 characters." };
  // }
  const handleRegex = /^[a-zA-Z0-9_]{3,20}$/;

  if (!handleRegex.test(handle)) {
    return {
      error:
        "Handle must be 3-20 characters and contain only letters, numbers, and underscores.",
    };
  }

  const supabase = await createClient();

  // Check if handle is taken
  const { data: existingHandle } = await supabase
    .from("public_profiles")
    .select("handle")
    .eq("handle", handle)
    .single();

  if (existingHandle) {
    return { error: "Handle is already taken." };
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        handle: handle,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Note: It's better to use a database trigger for this, 
    // but keeping it here as requested for logic review.
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        email,
        handle,
      });

    try {
      await sendWelcomeEmail(email, handle);
    } catch (error) {
      console.error("Welcome email failed:", error);
    }
    if (profileError) {
      return { error: profileError.message };
    }
  }


  redirect("/login");
}

export async function signIn(prevState: { error?: string } | null, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const supabase = await createClient();

  const { error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  redirect("/login");
}