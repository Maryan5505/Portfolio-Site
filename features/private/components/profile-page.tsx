"use client";

import { motion, type Variants } from "framer-motion";
import {
  Mail,
  Shield,
  User as UserIcon,
  Phone,
  Globe,
  Heart,
  AtSign,
  Fingerprint,
} from "lucide-react";

interface UserProfilePageProps {
  user: {
    name: string;
    id: string;
    surname: string | null;
    username: string;
    email: string;
    phone: string | null;
    country: string | null;
    hobby: string | null;
    role: "user" | "admin";
  } | null;
}

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut" as const,
    },
  },
};

function getInitials(name?: string | null, surname?: string | null) {
  const first = name?.trim()?.[0] ?? "";
  const second = surname?.trim()?.[0] ?? "";
  return `${first}${second}`.toUpperCase() || "U";
}

function getFullName(name: string, surname: string | null) {
  return [name, surname].filter(Boolean).join(" ");
}

function formatRole(role: "user" | "admin") {
  return role === "admin" ? "Administrator" : "User";
}

function formatValue(value: string | null) {
  return value?.trim() ? value : "Not provided";
}

export default function UserProfilePage({ user }: UserProfilePageProps) {
  if (!user) {
    return (
      <section className="flex min-h-[calc(100vh-80px)] items-center justify-center px-4">
        <div className="rounded-3xl border border-border/60 bg-background/80 px-6 py-10 text-center shadow-sm backdrop-blur">
          <h1 className="text-2xl font-semibold tracking-tight">
            User not found
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn’t load the profile information.
          </p>
        </div>
      </section>
    );
  }

  const initials = getInitials(user.name, user.surname);
  const fullName = getFullName(user.name, user.surname);

  return (
    <section className="relative py-10 min-h-[calc(100vh-80px)]  ">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="mx-auto flex w-full max-w-7xl flex-col gap-6"
      >
        <motion.div
          variants={itemVariants}
          className="overflow-hidden rounded-[28px] border border-border/60 bg-background/75 backdrop-blur-xl"
        >
          <div className="relative h-36 bg-linear-to-r from-primary/20 via-primary/10 to-transparent sm:h-46">
            <div className="absolute inset-0 opacity-90 dark:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.18),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.14),transparent_45%),radial-gradient(circle_at_center,rgba(239,68,68,0.08),transparent_60%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(239,68,68,0.28),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(244,63,94,0.20),transparent_50%),radial-gradient(circle_at_center,rgba(239,68,68,0.12),transparent_65%)]" />{" "}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="absolute left-6 top-full flex -translate-y-1/2 items-center gap-4 sm:left-8"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-linear-to-r from-primary to-primary/70 text-2xl font-bold text-primary-foreground shadow-xl sm:h-24 sm:w-24 sm:text-3xl">
                {initials}
              </div>

              <div className="pt-14 sm:pt-16">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {fullName}
                  </h1>

                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                      user.role === "admin"
                        ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {formatRole(user.role)}
                  </span>
                </div>

                <p className="mt-1 text-sm text-muted-foreground sm:text-base">
                  @{user.username} · Personal account overview
                </p>
              </div>
            </motion.div>
          </div>

          <div className="px-6 pb-6 pt-20 sm:px-8 sm:pb-8 sm:pt-24">
            <motion.div
              variants={itemVariants}
              className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"
            >
              <InfoCard
                icon={<UserIcon className="h-5 w-5" />}
                label="Full name"
                value={fullName}
              />
              <InfoCard
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                value={user.email}
              />
              <InfoCard
                icon={<AtSign className="h-5 w-5" />}
                label="Username"
                value={`@${user.username}`}
              />
              <InfoCard
                icon={<Shield className="h-5 w-5" />}
                label="Role"
                value={formatRole(user.role)}
              />
            </motion.div>
          </div>
        </motion.div>

        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            variants={itemVariants}
            className="rounded-[28px] border border-border/60 bg-background/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-8"
          >
            <div className="mb-6">
              <h2 className="text-xl font-semibold tracking-tight text-foreground">
                Profile Information
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed information associated with the current account
              </p>
            </div>

            <div className="space-y-4">
              <ProfileRow label="User ID" value={user.id} mono />
              <ProfileRow label="First name" value={user.name} />
              <ProfileRow label="Surname" value={formatValue(user.surname)} />
              <ProfileRow label="Username" value={`@${user.username}`} />
              <ProfileRow label="Email address" value={user.email} />
              <ProfileRow
                label="Phone number"
                value={formatValue(user.phone)}
              />
              <ProfileRow label="Country" value={formatValue(user.country)} />
              <ProfileRow label="Hobby" value={formatValue(user.hobby)} />
              <ProfileRow label="Access level" value={formatRole(user.role)} />
            </div>
          </motion.div>

          <div className="grid gap-6">
            <motion.div
              variants={itemVariants}
              className="rounded-[28px] border border-border/60 bg-background/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Quick Identity
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Compact visual summary of the user profile
                </p>
              </div>

              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-r from-background to-muted/40 p-5"
              >
                <div className="absolute right-4 top-4 rounded-full bg-primary/10 p-2 text-primary">
                  <Fingerprint className="h-5 w-5" />
                </div>

                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/15 text-lg font-bold text-primary">
                  {initials}
                </div>

                <h3 className="text-lg font-semibold text-foreground">
                  {fullName}
                </h3>

                <p className="mt-1 text-sm text-muted-foreground">
                  @{user.username}
                </p>

                <p className="mt-3 break-all text-sm text-muted-foreground">
                  {user.email}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <Badge>{formatRole(user.role)}</Badge>
                  <Badge>{formatValue(user.country)}</Badge>
                  <Badge>ID: {user.id.slice(0, 8)}...</Badge>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="rounded-[28px] border border-border/60 bg-background/75 p-6 shadow-[0_10px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl sm:p-8"
            >
              <div className="mb-6">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Personal Details
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Optional information shown in a cleaner card layout
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <MiniInfoCard
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                  value={formatValue(user.phone)}
                />
                <MiniInfoCard
                  icon={<Globe className="h-4 w-4" />}
                  label="Country"
                  value={formatValue(user.country)}
                />
                <MiniInfoCard
                  icon={<Heart className="h-4 w-4" />}
                  label="Hobby"
                  value={formatValue(user.hobby)}
                />
                <MiniInfoCard
                  icon={<Shield className="h-4 w-4" />}
                  label="Role"
                  value={formatRole(user.role)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group rounded-3xl border border-border/60 bg-background/80 p-4 shadow-sm"
    >
      <div className="mb-3 inline-flex rounded-2xl bg-primary/10 p-2.5 text-primary transition-transform duration-300 group-hover:scale-105">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 break-all text-base font-semibold text-foreground">
        {value}
      </p>
    </motion.div>
  );
}

function MiniInfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="rounded-2xl border border-border/60 bg-muted/25 p-4"
    >
      <div className="mb-2 inline-flex rounded-xl bg-primary/10 p-2 text-primary">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 break-words text-sm font-medium text-foreground">
        {value}
      </p>
    </motion.div>
  );
}

function ProfileRow({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-border/50 bg-muted/25 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span
        className={`break-all text-sm font-medium text-foreground ${
          mono ? "font-mono" : ""
        }`}
      >
        {value}
      </span>
    </div>
  );
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}
