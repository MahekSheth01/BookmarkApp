import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  BookmarkIcon, 
  Globe, 
  ShieldCheck, 
  ArrowRight, 
  LayoutGrid, 
  Zap, 
  Share2,
  Lock
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-50 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 rounded-full border bg-white px-4 py-1.5 text-sm font-medium text-primary shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <Zap className="h-4 w-4" />
              <span>Redesigned for 2024</span>
            </div>
            
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-slate-900 animate-in fade-in slide-in-from-bottom-8 duration-1000">
              Organize your digital life with <span className="text-primary">BookmarkHub</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-12 duration-1000">
              A minimalist, high-performance bookmark manager built for developers and power users. 
              Save, organize, and share your favorite links with style.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-16 duration-1000">
              <Button size="lg" asChild className="rounded-full px-8 py-6 text-lg font-bold shadow-xl shadow-primary/20">
                <Link href="/signup">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8 py-6 text-lg font-bold bg-white">
                <Link href="/login">Explore Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none overflow-hidden -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/5 blur-[120px] rounded-full" />
          <div className="absolute top-[20%] -right-[10%] w-[30%] h-[30%] bg-indigo-500/5 blur-[100px] rounded-full" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="border-none shadow-none bg-slate-50/50 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <LayoutGrid className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Minimalist UI</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Focus on what matters. Our clean dashboard provides a distraction-free environment for managing links.
                </p>
              </div>
            </Card>

            <Card className="border-none shadow-none bg-slate-50/50 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                <Share2 className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Public Profiles</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Turn your bookmarks into a beautiful public collection. Share your curated list with a single link.
                </p>
              </div>
            </Card>

            <Card className="border-none shadow-none bg-slate-50/50 p-6 space-y-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Secure Vault</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Keep your sensitive links private. Only you can access your private vault, protected by industry standards.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof / Call to Action */}
      <section className="py-20 border-t bg-slate-50/30">
        <div className="container mx-auto px-4 sm:px-8 text-center space-y-8">
          <h2 className="text-3xl font-bold tracking-tight">Ready to declutter your browser tabs?</h2>
          <div className="flex flex-col items-center gap-4">
            <Button size="lg" asChild className="rounded-full px-12">
              <Link href="/signup">Join BookmarkHub Today</Link>
            </Button>
            <p className="text-sm text-muted-foreground">Free forever. No credit card required.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
