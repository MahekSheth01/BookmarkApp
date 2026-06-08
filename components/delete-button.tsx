"use client";

import { deleteBookmark } from "@/actions/bookmarks";

export default function DeleteBookmarkButton({
  id,
}: {
  id: string;
}) {
  const handleDelete = async () => {
    const confirmed = confirm(
      "Delete this bookmark?"
    );

    if (!confirmed) return;

    await deleteBookmark(id);
  };

  return (
    <button
      onClick={handleDelete}
      className="text-red-500 text-sm"
    >
      Delete
    </button>
  );
}