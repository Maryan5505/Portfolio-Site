export default function GoalCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-border/50 bg-background/80 p-4 shadow-sm">
      <div className="mb-3 inline-flex rounded-xl bg-red-500/10 p-2 text-red-600 dark:text-red-400">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-base font-semibold text-foreground">{value}</p>
    </div>
  );
}
