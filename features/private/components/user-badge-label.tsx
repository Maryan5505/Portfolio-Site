export default function UserBadgeLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
      {children}
    </span>
  );
}
