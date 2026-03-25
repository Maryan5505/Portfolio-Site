"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { updateUserRole } from "../server/actions";
import { roles } from "../constants";

type UserRoleSelectProps = {
  userId: string;
  role: "user" | "admin";
  isCurrentUser: boolean;
};

export function UserRoleSelect({
  userId,
  role,
  isCurrentUser,
}: UserRoleSelectProps) {
  const router = useRouter();
  const rootRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState<"user" | "admin">(role);

  useEffect(() => {
    setValue(role);
  }, [role]);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const currentRole = roles.find((item) => item.value === value)!;
  const CurrentIcon = currentRole.icon;
  const isDisabled = isPending || isCurrentUser;

  function handleSelect(nextRole: "user" | "admin") {
    if (nextRole === value || isDisabled) {
      setIsOpen(false);
      return;
    }

    const previousValue = value;
    setValue(nextRole);
    setIsOpen(false);

    startTransition(async () => {
      try {
        await updateUserRole(userId, nextRole);
        router.refresh();
      } catch {
        setValue(previousValue);
      }
    });
  }

  return (
    <div
      ref={rootRef}
      onClick={(event) => event.stopPropagation()}
      className="relative inline-flex"
    >
      <button
        type="button"
        disabled={isDisabled}
        onClick={() => setIsOpen((prev) => !prev)}
        className={`group inline-flex h-8 min-w-[110px] items-center justify-between gap-2 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all duration-200 ${
          currentRole.triggerClassName
        } ${
          isDisabled
            ? "cursor-not-allowed opacity-60"
            : "cursor-pointer hover:shadow-[0_6px_16px_rgba(15,23,42,0.08)]"
        } ${isOpen ? "ring-2 ring-red-500/10" : ""}`}
      >
        <span className="inline-flex items-center gap-1.5">
          <span
            className={`flex h-4 w-4 items-center justify-center rounded-full ${currentRole.iconWrapClassName}`}
          >
            <CurrentIcon className="h-3 w-3" />
          </span>
          {currentRole.label}
        </span>

        <ChevronDown
          className={`h-3 w-3 opacity-70 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && !isDisabled && (
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.97 }}
            transition={{ duration: 0.14 }}
            className="absolute right-0 top-[calc(100%+6px)] z-50 min-w-[150px] rounded-xl border border-border/50 bg-background/95 p-1.5 shadow-[0_14px_30px_rgba(15,23,42,0.12)] backdrop-blur-xl"
          >
            <div className="space-y-1">
              {roles.map((item) => {
                const Icon = item.icon;
                const isActive = item.value === value;

                return (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => handleSelect(item.value)}
                    className={`flex w-full items-center justify-between rounded-lg px-2.5 py-2 text-xs font-medium transition-colors ${
                      isActive ? "bg-muted/60" : "hover:bg-muted/40"
                    }`}
                  >
                    <span className="inline-flex items-center gap-2">
                      <span
                        className={`flex h-5 w-5 items-center justify-center rounded-full ${item.iconWrapClassName}`}
                      >
                        <Icon
                          className={`h-3.5 w-3.5 ${item.optionClassName}`}
                        />
                      </span>
                      <span
                        className={
                          isActive ? item.optionClassName : "text-foreground"
                        }
                      >
                        {item.label}
                      </span>
                    </span>

                    {isActive && (
                      <Check
                        className={`h-3.5 w-3.5 ${item.optionClassName}`}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
