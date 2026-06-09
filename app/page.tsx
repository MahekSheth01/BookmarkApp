import Link from "next/link";
import {
  BookmarkIcon,
  Globe,
  ShieldCheck,
  ArrowRight,
  LayoutGrid,
  Zap,
  Share2,
  Lock,
  CheckCircle,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden py-24 sm:py-36 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">

            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-semibold text-slate-700 shadow-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span>Redesigned for 2025 &mdash; faster &amp; smarter</span>
            </div>

            <h1 className="text-5xl font-extrabold tracking-tight sm:text-7xl text-slate-900 leading-tight">
              Organise your digital life{" "}
              <span className="text-primary">
                beautifully
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-500 max-w-2xl leading-relaxed">
              A high-performance bookmark manager built for developers and power users.
              Save, organise, and share your favourite links — all in one place.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold bg-primary text-white shadow-lg shadow-primary/20 hover:bg-primary/90 hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/login"
                className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-slate-700 border-2 border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all duration-200"
              >
                Explore Dashboard
              </Link>
            </div>

            {/* Social proof pill */}
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <CheckCircle className="h-4 w-4 text-primary" />
              Free forever &bull; No credit card required &bull; Setup in 30 seconds
            </div>
          </div>
        </div>

        {/* Decorative blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden -z-0">
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-full max-w-[1000px]">
            <div className="absolute top-0 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
            <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]" />
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">Why BookmarkHub</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Everything you need, nothing you don&apos;t
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Card 1 */}
            <div className="p-8 space-y-5 rounded-3xl border border-slate-200 bg-white hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <LayoutGrid className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Clean Dashboard</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Focus on what matters. A distraction-free environment that keeps your links
                  organized and instantly accessible.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="p-8 space-y-5 rounded-3xl border border-primary/20 bg-primary/5 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 md:-translate-y-4">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30">
                <Share2 className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Public Profiles</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Turn your bookmarks into a beautiful public collection. Share your curated
                  list with a single, memorable link.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="p-8 space-y-5 rounded-3xl border border-slate-200 bg-white hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center">
                <ShieldCheck className="h-7 w-7" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-slate-900">Private Vault</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Keep sensitive links private. Your private vault is protected by
                  industry-standard security — only you can access it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="text-center mb-16 space-y-3">
            <p className="text-sm font-bold uppercase tracking-widest text-primary">How it works</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Up and running in minutes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { step: "01", title: "Create your account", desc: "Sign up in seconds — just an email, password, and your unique handle." },
              { step: "02", title: "Save your bookmarks", desc: "Add any URL with a title. Choose public or private per link." },
              { step: "03", title: "Share your profile", desc: "Your personal page is live instantly. Share the link with anyone." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 text-slate-900 font-black text-xl flex items-center justify-center shadow-sm">
                  {step}
                </div>
                <h3 className="font-bold text-slate-900 text-xl">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-xs">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
        <div className="container mx-auto px-4 sm:px-8 text-center space-y-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to declutter your browser tabs?
          </h2>
          <p className="text-primary-foreground/80 max-w-lg mx-auto text-lg">
            Join thousands of developers and power users who keep their links organised with BookmarkHub.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold rounded-full px-10 py-4 text-lg hover:bg-slate-50 shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-1"
          >
            Join BookmarkHub Today
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
