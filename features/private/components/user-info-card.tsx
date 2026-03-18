import { motion } from "framer-motion";

export default function UserInfoCard({
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
