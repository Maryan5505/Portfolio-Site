import { containerVariants, goals, itemVariants, stack } from "../constants";
import { motion } from "framer-motion";
import GoalCard from "./goal-card";
import { Code2, Rocket, Sparkles } from "lucide-react";

export default function AboutPage() {
  return (
    <section className="relative min-h-screen  bg-background  px-4 py-8 sm:px-6 lg:px-8 ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex w-full flex-col gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-[32px] border border-border/50 bg-background/75 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)]"
        >
          <div className="relative border-b border-border/50 bg-linear-to-r from-red-500/12 via-rose-500/8 to-transparent px-6 py-12 sm:px-10">
            <div className="absolute inset-0 opacity-90 dark:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.16),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.10),transparent_45%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.24),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.16),transparent_50%)]" />

            <div className="relative max-w-3xl">
              <div className="mb-5 inline-flex items-center rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-sm font-medium text-red-600 dark:text-red-400">
                About this project
              </div>

              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                Hi, I’m Marian —
                <span className="bg-linear-to-r from-red-500 via-rose-500 to-red-600 bg-clip-text text-transparent">
                  {" "}
                  frontend developer
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                I built this application to improve my practical knowledge in
                authentication, protected routes, session handling and admin
                panel architecture. I wanted not only to design a clean
                interface, but also to understand how real application logic
                works behind the scenes.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-8 text-muted-foreground">
                This project combines frontend polish with backend logic and
                helps me grow as a developer who cares both about user
                experience and about strong technical foundations.
              </p>
            </div>
          </div>

          <div className="grid gap-4 px-6 py-6 sm:px-10 md:grid-cols-3">
            <GoalCard
              icon={<Code2 className="h-5 w-5" />}
              label="Main direction"
              value="Frontend Development"
            />
            <GoalCard
              icon={<Rocket className="h-5 w-5" />}
              label="Project goal"
              value="Learn by building real features"
            />
            <GoalCard
              icon={<Sparkles className="h-5 w-5" />}
              label="Focus"
              value="Clean UI + solid architecture"
            />
          </div>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <motion.div
            variants={itemVariants}
            className="rounded-[32px] border border-border/50 bg-background/75 p-6 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Why I built this app
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Practical goals behind the project
              </p>
            </div>

            <div className="space-y-4">
              {goals.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-border/50 bg-muted/20 p-4"
                  >
                    <div className="mb-3 inline-flex rounded-xl bg-red-500/10 p-2 text-red-600 dark:text-red-400">
                      <Icon className="h-5 w-5" />
                    </div>

                    <h3 className="text-lg font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="rounded-[32px] border border-border/50 bg-background/75 p-6 ring-1 ring-red-500/8 backdrop-blur-xl shadow-[0_14px_50px_rgba(15,23,42,0.07)] dark:shadow-[0_14px_50px_rgba(0,0,0,0.28)] sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Tech stack
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Technologies used in this project
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-2xl border border-border/50 bg-background/80 px-4 py-2 text-sm font-medium text-foreground transition-all hover:border-red-500/20 hover:bg-red-500/10"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-red-500/15 bg-linear-to-r from-red-500/10 via-rose-500/5 to-transparent p-5">
              <h3 className="text-lg font-semibold text-foreground">
                What this project helped me practice
              </h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Component architecture, route protection, working with sessions,
                auth flow design, admin UI, profile pages, client/server logic
                separation and overall fullstack understanding.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
