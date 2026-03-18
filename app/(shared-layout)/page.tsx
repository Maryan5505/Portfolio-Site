export default async function Home() {
  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        Home page
      </div>
    </>
  );
}

{
  /*"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  LayoutDashboard,
  Sparkles,
} from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Modern Dashboard",
    description:
      "Clean admin experience with a clear structure and smooth interactions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Authentication",
    description:
      "Custom auth flow with sessions, protected routes and role-based access.",
  },
  {
    icon: Sparkles,
    title: "Beautiful UI",
    description:
      "Elegant animations, gradients and polished components across the app.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-zinc-50 text-foreground dark:bg-black">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-120px] top-[-80px] h-72 w-72 rounded-full bg-red-500/15 blur-3xl dark:bg-red-500/20" />
        <div className="absolute bottom-[-120px] right-[-80px] h-80 w-80 rounded-full bg-rose-500/10 blur-3xl dark:bg-rose-500/15" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.14),transparent_45%)]" />
      </div>

      <section className="relative mx-auto flex min-h-[88vh] max-w-7xl items-center px-6 py-16 sm:px-8 lg:px-10">
        <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="mb-6 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
              Modern portfolio platform
            </div>

            <h1 className="text-5xl font-bold leading-tight tracking-tight sm:text-6xl">
              Build your
              <span className="bg-gradient-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                {" "}
                portfolio
              </span>
              <br />
              with style and control
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              A clean platform for creating, managing and showcasing your work.
              Beautiful UI, secure auth, admin tools and a polished user
              experience in one place.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/create"
                className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.28)] transition-all hover:bg-red-600 hover:shadow-[0_16px_36px_rgba(239,68,68,0.34)]"
              >
                Get started
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center rounded-2xl border border-border/60 bg-background/70 px-6 py-3.5 font-semibold backdrop-blur transition-all hover:bg-muted/40"
              >
                Learn more
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground">
              <div>
                <span className="text-2xl font-bold text-foreground">Fast</span>
                <p className="mt-1">Smooth and responsive interactions</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  Secure
                </span>
                <p className="mt-1">Role-based auth and protected routes</p>
              </div>
              <div>
                <span className="text-2xl font-bold text-foreground">
                  Clean
                </span>
                <p className="mt-1">Minimal, elegant, premium design</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="relative"
          >
            <div className="rounded-[32px] border border-border/50 bg-background/75 p-5 ring-1 ring-red-500/10 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <div className="rounded-[24px] border border-border/50 bg-gradient-to-br from-background via-red-500/[0.04] to-rose-500/[0.06] p-5">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Dashboard Preview
                    </p>
                    <h2 className="text-xl font-semibold">
                      Portfolio Workspace
                    </h2>
                  </div>
                  <div className="flex gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400/80" />
                    <span className="h-3 w-3 rounded-full bg-orange-400/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400/80" />
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                      <p className="text-sm text-muted-foreground">Projects</p>
                      <p className="mt-2 text-2xl font-bold">12</p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                      <p className="text-sm text-muted-foreground">Users</p>
                      <p className="mt-2 text-2xl font-bold">248</p>
                    </div>
                    <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                      <p className="text-sm text-muted-foreground">Views</p>
                      <p className="mt-2 text-2xl font-bold">18.4k</p>
                    </div>
                  </div>

                  <div className="rounded-2xl border border-border/50 bg-background/80 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <p className="font-medium">Recent Users</p>
                      <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-600 dark:text-red-400">
                        Live
                      </span>
                    </div>

                    <div className="space-y-3">
                      {["Ivan Petrenko", "Anna Melnyk", "Maksym Bondar"].map(
                        (name) => (
                          <div
                            key={name}
                            className="flex items-center justify-between rounded-xl border border-border/40 bg-muted/20 px-3 py-2"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-rose-500/20 font-semibold text-red-600 dark:text-red-400">
                                {name
                                  .split(" ")
                                  .map((part) => part[0])
                                  .join("")}
                              </div>
                              <div>
                                <p className="text-sm font-medium">{name}</p>
                                <p className="text-xs text-muted-foreground">
                                  Portfolio member
                                </p>
                              </div>
                            </div>

                            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                              Active
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border/50 bg-background/80 px-4 py-3 shadow-lg backdrop-blur md:block">
              <p className="text-sm font-medium">Custom auth</p>
              <p className="text-xs text-muted-foreground">
                Redis + DB sessions
              </p>
            </div>

            <div className="absolute -right-4 -top-4 hidden rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-600 shadow-lg backdrop-blur dark:text-red-400 md:block">
              Premium UI
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        <div className="grid gap-6 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                viewport={{ once: true }}
                className="rounded-[28px] border border-border/50 bg-background/75 p-6 ring-1 ring-red-500/5 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,23,42,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-red-500/10 p-3 text-red-600 dark:text-red-400">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="text-lg font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-24 sm:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
          className="rounded-[32px] border border-border/50 bg-gradient-to-r from-red-500/10 via-rose-500/5 to-transparent p-10 text-center ring-1 ring-red-500/10 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to build something beautiful?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Start creating your portfolio, manage your content and deliver a
            polished experience from the very first screen.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/sign-up"
              className="inline-flex items-center gap-2 rounded-2xl bg-red-500 px-6 py-3.5 font-semibold text-white shadow-[0_12px_30px_rgba(239,68,68,0.28)] transition-all hover:bg-red-600"
            >
              Create account
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center rounded-2xl border border-border/60 bg-background/70 px-6 py-3.5 font-semibold backdrop-blur transition-all hover:bg-muted/40"
            >
              Explore more
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
 */
}
