import { motion } from "framer-motion";

export default function UserInfoMiniCard({
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
      <p className="mt-1 wrap-break-word text-sm font-medium text-foreground">
        {value}
      </p>
    </motion.div>
  );
}
