"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  User as UserIcon,
  Mail,
  Phone,
  Globe,
  Heart,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
} from "lucide-react";
import { useRouter } from "next/navigation";

type AdminUsersTableProps = {
  users: {
    id: string;
    name: string;
    surname: string | null;
    username: string;
    email: string;
    phone: string | null;
    country: string | null;
    hobby: string | null;
    role: "user" | "admin";
    createdAt: Date;
    updatedAt: Date;
  }[];
  currentUserId: string;
};

type SortDirection = "asc" | "desc";

function formatValue(value: string | null) {
  return value?.trim() ? value : "—";
}

function formatFullName(name: string, surname: string | null) {
  return [name, surname].filter(Boolean).join(" ");
}

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("uk-UA", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(date));
}

export default function AdminUsersTable({
  users,
  currentUserId,
}: AdminUsersTableProps) {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const filteredAndSortedUsers = useMemo(() => {
    const normalizedSearch = searchValue.trim().toLowerCase();

    const filteredUsers = users.filter((user) => {
      const fullName = formatFullName(user.name, user.surname).toLowerCase();
      return fullName.includes(normalizedSearch);
    });

    return filteredUsers.sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();

      return sortDirection === "asc" ? timeA - timeB : timeB - timeA;
    });
  }, [users, searchValue, sortDirection]);

  function toggleCreatedAtSort() {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  }

  function renderSortIcon() {
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4" />
    ) : (
      <ArrowDown className="h-4 w-4" />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="overflow-hidden rounded-[28px] border border-border/50 bg-background/80 ring-1 ring-primary/5 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06),0_2px_8px_rgba(15,23,42,0.04)] dark:ring-primary/10 dark:shadow-[0_8px_30px_rgba(0,0,0,0.22),0_2px_8px_rgba(0,0,0,0.16)]"
    >
      <div className="border-b border-border/50 bg-linear-to-r from-primary/10 via-red-500/10 to-transparent px-6 py-5">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-semibold tracking-tight">Users</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Total registered users: {users.length}
              </p>
            </div>

            <div className="rounded-full border border-border/50 bg-background/70 px-4 py-2 text-sm text-muted-foreground">
              Found{" "}
              <span className="font-semibold text-foreground">
                {filteredAndSortedUsers.length}
              </span>{" "}
              users
            </div>
          </div>

          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Search by full name..."
              className="h-11 w-full rounded-2xl border border-border/50 bg-background/80 pl-11 pr-4 text-sm outline-none ring-0 transition-all placeholder:text-muted-foreground/80 focus:border-red-500/30 focus:ring-2 focus:ring-red-500/10"
            />
          </div>
        </div>
      </div>

      {filteredAndSortedUsers.length === 0 ? (
        <div className="px-6 py-12 text-center">
          <p className="text-base font-medium text-foreground">
            No users found
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try another name or clear the search input.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-muted/30">
              <tr className="border-b border-border/50 text-left">
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Username</th>
                <th className="px-6 py-4 font-semibold">Email</th>
                <th className="px-6 py-4 font-semibold">Phone</th>
                <th className="px-6 py-4 font-semibold">Country</th>
                <th className="px-6 py-4 font-semibold">Hobby</th>
                <th className="px-6 py-4 font-semibold">Role</th>
                <th className="px-6 py-4 font-semibold">
                  <button
                    type="button"
                    onClick={toggleCreatedAtSort}
                    className="inline-flex items-center gap-2 rounded-lg transition-colors hover:text-red-500"
                  >
                    Created
                    {renderSortIcon()}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredAndSortedUsers.map((user, index) => {
                const fullName = formatFullName(user.name, user.surname);
                const initials =
                  `${user.name[0] ?? ""}${
                    user.surname?.[0] ?? ""
                  }`.toUpperCase() || "U";
                const isCurrentUser = user.id === currentUserId;

                return (
                  <motion.tr
                    key={user.id}
                    onClick={() => router.push(`/admin/user/${user.id}`)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.03, duration: 0.2 }}
                    className={`cursor-pointer ${
                      isCurrentUser
                        ? "border-b border-red-500/20 bg-gradient-to-r from-red-500/[0.07] via-red-500/[0.03] to-transparent ring-1 ring-inset ring-red-500/10 transition-all hover:from-red-500/[0.10] hover:via-red-500/[0.05]"
                        : "border-b border-border/40 transition-colors hover:bg-muted/20"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-primary/20 to-red-500/20 text-sm font-semibold text-primary">
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="font-medium text-foreground">
                            {fullName}
                          </p>
                          <p className="truncate font-mono text-xs text-muted-foreground">
                            {user.id.slice(0, 8)}...
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <UserIcon className="h-4 w-4" />
                        <span>@{user.username}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        <span className="max-w-[220px] truncate">
                          {user.email}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-4 w-4" />
                        <span>{formatValue(user.phone)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <span>{formatValue(user.country)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="inline-flex items-center gap-2 text-muted-foreground">
                        <Heart className="h-4 w-4" />
                        <span>{formatValue(user.hobby)}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                          user.role === "admin"
                            ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                            : "bg-primary/10 text-primary"
                        }`}
                      >
                        <Shield className="h-3.5 w-3.5" />
                        {user.role}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      {formatDate(user.createdAt)}
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
