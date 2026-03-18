export function getInitials(name?: string | null, surname?: string | null) {
  const first = name?.trim()?.[0] ?? "";
  const second = surname?.trim()?.[0] ?? "";
  return `${first}${second}`.toUpperCase() || "U";
}

export function getFullName(name: string, surname: string | null) {
  return [name, surname].filter(Boolean).join(" ");
}

export function formatRole(role: "user" | "admin") {
  return role === "admin" ? "Administrator" : "User";
}

export function formatValue(value: string | null) {
  return value?.trim() ? value : "Not provided";
}
