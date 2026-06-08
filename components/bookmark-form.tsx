"use client";

import { useActionState } from "react";
import { createBookmark } from "@/actions/bookmarks";

const initialState: {
  error?: string;
  success?: boolean;
} = {};

export default function BookmarkForm() {
  const [state, formAction, pending] =
    useActionState(createBookmark, initialState);

  return (
    <form
      action={formAction}
      className="border rounded-lg p-6 mb-8 space-y-4"
    >
      <h2 className="text-xl font-semibold">
        Add Bookmark
      </h2>

      <input
        name="title"
        placeholder="Bookmark title"
        className="w-full border p-3 rounded"
        required
      />

      <input
        name="url"
        placeholder="https://example.com"
        className="w-full border p-3 rounded"
        required
      />

      <label className="flex items-center gap-2">
        <input type="checkbox" name="isPublic" />
        Public Bookmark
      </label>

      {state?.error && (
        <p className="text-red-500">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {pending ? "Saving..." : "Save Bookmark"}
      </button>
    </form>
  );
}