import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookmarkHub - Modern Bookmark Manager",
  description: "Organize and share your favorite links with style.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-background antialiased`}>
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">{children}</div>
          <footer className="border-t py-6 md:py-0">
            <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-8">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built for modern bookmarking.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
