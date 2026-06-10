# BookmarkHub

A modern, responsive, and secure personal bookmark manager — a lightweight blend of Linktree and Pocket. Built as part of the EagerMinds Software Developer Take-Home Assignment.

## Live Demo

**Live URL:** https://bookmarkhub-indol.vercel.app/

**GitHub Repository:** https://github.com/MahekSheth01/BookmarkApp

---

## Features

* Secure email/password authentication
* Welcome email sent on successful signup (Brevo)
* Create, edit, and delete bookmarks
* Public and private bookmark visibility
* Unique public profiles using custom `@handles`
* User discovery and profile search
* Protected dashboard routes
* Responsive and modern UI
* Database-level security using Supabase Row Level Security (RLS)

---

## Tech Stack

| Technology           | Purpose                   |
| -------------------- | ------------------------- |
| Next.js (App Router) | Frontend & Backend        |
| TypeScript           | Type Safety               |
| Tailwind CSS v4      | Styling                   |
| Supabase             | Authentication & Database |
| Brevo                | Transactional Emails      |
| Vercel               | Deployment                |

---

## Running Locally

### 1. Clone the Repository

```bash
git clone https://github.com/MahekSheth01/BookmarkApp.git
cd BookmarkApp
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

BREVO_API_KEY=your_brevo_api_key
BREVO_SENDER_EMAIL=your_sender_email
```

### 4. Start the Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## AI Agent Workflow

I used Gemini CLI throughout development, primarily for UI ideation, frontend refinement, implementation reviews, and debugging assistance. Since I was using the free tier, I focused AI usage on accelerating repetitive development tasks while manually implementing, testing, and validating the application's core functionality, authentication flow, database design, deployment setup, and security rules.

I treated AI as a development assistant rather than a source of truth. Every significant suggestion was verified against documentation, runtime behavior, and the actual database configuration before being applied.

### Examples of AI Mistakes and How I Corrected Them

#### 1. React 19 `useActionState` Signature Mismatch

The AI generated a server action using a `deleteBookmark(id)` signature. However, React 19's `useActionState` passes the previous state as the first argument, which caused invalid UUID errors during bookmark deletion.

**How I fixed it:**
I inspected the server logs, identified the argument mismatch, and updated the action to extract the bookmark ID from `FormData`.

---

#### 2. Next.js Cookie API Compatibility

The AI generated middleware code using:

```ts
request.cookies.set(name, value, options)
```

which is not compatible with the current Next.js cookie API and resulted in TypeScript errors.

**How I fixed it:**
I reviewed the Next.js documentation and updated the implementation to use the correct response cookie API.

---

#### 3. Invalid Library Import

The AI imported `Github` from `lucide-react`, but that icon does not exist in the installed version of the library.

**How I fixed it:**
I reviewed the available exports, identified the invalid import, and replaced it with a valid icon component.

---

#### 4. Security Review False Positives

The AI reported several Supabase security vulnerabilities, including a missing `WITH CHECK` clause and missing unique handle constraints.

**How I fixed it:**
Rather than accepting the findings directly, I inspected the live database using `pg_policies` and constraint queries. The protections were already present, and the findings were based on historical project snapshots rather than the current database configuration.

---

These situations reinforced the importance of validating AI-generated output and understanding the underlying technologies instead of blindly accepting generated code.

---

## Security

This project uses Supabase Row Level Security (RLS) to enforce data ownership and privacy.

* Users can only create bookmarks for themselves.
* Users can only update their own bookmarks.
* Users can only delete their own bookmarks.
* Private bookmarks are visible only to their owner.
* Public profile pages expose only public bookmarks.
* User handles are protected by a database-level unique constraint.

---

## Future Improvements

Given more time, I would implement:

* Bookmark categories and tagging
* Bookmark preview cards using OpenGraph metadata
* Drag-and-drop bookmark organization

---

## Agent Sessions

Entire CLI was used throughout development to record AI-assisted coding sessions, as requested in the assignment.

Session checkpoints, prompts, and development history are available in the:

```text
entire/checkpoints/v1
```

branch of this repository.

The recorded sessions include:

* Authentication implementation and Supabase integration
* Bookmark CRUD development
* Public profile and handle routing
* Responsive UI redesign
* Security reviews and RLS verification
* Deployment and production debugging
* AI-generated code review and corrections

These sessions demonstrate both the use of AI tooling and the process of validating, correcting, and improving AI-generated suggestions during development.
