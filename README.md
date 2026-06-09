# BookmarkHub

A simple, modern, and high-performance personal bookmark manager — think of it as a tiny "linktree meets pocket". Built for the EagerMinds Take-Home Build Task.

## Features

- **Authentication:** Secure email and password login.
- **Email Delivery:** New sign-ups receive confirmation emails (Powered by Brevo).
- **Personal Vault:** Add, edit, and delete your bookmarks securely.
- **Privacy First:** Strict database-level Row Level Security (RLS) ensures nobody can access your private data.
- **Public Profiles:** Claim a unique `@handle` and share your public links with the world at `/<handle>`.
- **Aesthetic UI:** Fully responsive, modern, and polished interface.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database & Auth:** Supabase
- **Email:** Brevo (used instead of Resend due to domain verification constraints)
- **Deployment:** Vercel

---

## 🚀 Running Locally

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd bookmark-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🤖 AI Agent Workflow

**Where the AI agent got something wrong, and how I caught and fixed it:**
During development, the AI agent made two notable mistakes that required intervention. First, it configured CSS variables for the Tailwind v4 color theme incorrectly by dropping the `hsl()` wrapper, which caused backgrounds and buttons to render completely invisible (transparent). I caught this by noticing the missing UI elements on the dashboard and directed the agent to use explicit hex codes in the new Tailwind v4 `@theme` directive. Second, when setting up the bookmark deletion, the agent used the `deleteBookmark(id)` signature inside a React 19 `useActionState` hook. Since `useActionState` passes the previous state as the first argument, it resulted in a database crash (`invalid input syntax for type uuid: "null"`). I analyzed the crash logs, identified the signature mismatch, and had the agent rewrite the action to correctly extract the ID from the `formData`.

## 💡 Future Improvements

**One thing I'd improve with more time:**
I would implement metadata scraping. When a user pastes a URL, the app would automatically fetch the OpenGraph tags (title, description, and preview image) in the background so the user doesn't have to manually type out the bookmark title, making the saving experience entirely frictionless.
