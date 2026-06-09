"use client";

import { useActionState, useState, useRef, useEffect } from "react";
import { deleteBookmark } from "@/actions/bookmarks";
import { Trash2, Loader2, AlertCircle } from "lucide-react";

export default function DeleteBookmarkButton({ id }: { id: string }) {
  const [state, formAction, isPending] = useActionState(deleteBookmark, null);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowModal(false);
    };
    if (showModal) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showModal]);

  return (
    <>
      <form action={formAction} ref={formRef}>
        <input type="hidden" name="id" value={id} />
        <button
          type="button"
          onClick={() => setShowModal(true)}
          disabled={isPending}
          title="Delete bookmark"
          className="flex items-center justify-center w-9 h-9 rounded-xl border border-red-100 text-red-400 hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </button>
      </form>

      {/* Custom Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          {/* Background overlay click to close */}
          <div className="absolute inset-0" onClick={() => setShowModal(false)} />
          
          <div className="relative bg-white rounded-3xl shadow-xl border border-slate-200 w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 space-y-5">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center border border-red-100">
                <AlertCircle className="w-6 h-6 text-red-500" />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-extrabold text-slate-900">Delete Bookmark?</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Are you sure you want to delete this bookmark? This action cannot be undone and it will be permanently removed from your collection.
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200/50 border border-transparent hover:border-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowModal(false);
                  formRef.current?.requestSubmit();
                }}
                className="px-6 py-2.5 rounded-xl text-sm font-bold bg-red-500 text-white hover:bg-red-600 transition-colors shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
