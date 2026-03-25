import { Shield, UserIcon } from "lucide-react";

export const roles = [
  {
    value: "user" as const,
    label: "User",
    icon: UserIcon,
    triggerClassName: "bg-primary/10 text-primary",
    optionClassName: "text-primary",
    iconWrapClassName: "bg-primary/10",
  },
  {
    value: "admin" as const,
    label: "Admin",
    icon: Shield,
    triggerClassName:
      "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    optionClassName: "text-emerald-600 dark:text-emerald-400",
    iconWrapClassName: "bg-emerald-500/12",
  },
];
