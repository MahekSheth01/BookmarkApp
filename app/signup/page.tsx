"use client";

import { useActionState } from "react";
import { signUp } from "@/actions/auth";

export default function SignupPage() {
  const [state, formAction, isPending] = useActionState(signUp, null);

  return (
    <main className="max-w-md mx-auto mt-16 px-4">
      <h1 className="text-3xl font-bold mb-6">
        Create Account
      </h1>

      <form action={formAction} className="space-y-4">
        <div>
          <input
            name="handle"
            placeholder="Handle"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            placeholder="Email"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
            className="border p-3 w-full rounded"
          />
        </div>

        {state?.error && (
          <p className="text-red-500 text-sm font-medium">{state.error}</p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-black text-white px-4 py-3 w-full rounded disabled:bg-gray-400 transition-colors"
        >
          {isPending ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
}