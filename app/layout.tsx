import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookmarkHub - Modern Bookmark Manager",
  description: "Organize and share your favorite links with style.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen bg-background antialiased`}
      >
        <div className="relative flex min-h-screen flex-col">
          <Navbar initialUser={user} />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-slate-200 bg-white py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-8">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm tracking-tight">
                <div className="rounded bg-primary p-1 text-white">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </div>
                BookmarkHub
              </div>
              <p className="text-center text-xs text-slate-500 md:text-left">
                Built for modern bookmarking. &copy; {new Date().getFullYear()}
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
