"use client";

import { useActionState } from "react";
import { deleteBookmark } from "@/actions/bookmarks";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";

export default function DeleteBookmarkButton({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(deleteBookmark, null);

  return (
    <form action={formAction}>
      <input type="hidden" name="id" value={id} />
      <Button
        variant="ghost"
        size="icon"
        type="submit"
        disabled={isPending}
        className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 h-8 w-8"
        title="Delete bookmark"
      >
        {isPending ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <Trash2 className="h-4 w-4" />
        )}
      </Button>
    </form>
  );
}
