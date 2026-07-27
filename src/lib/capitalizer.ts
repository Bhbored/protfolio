export function capitalizeName(name: string): string {
  if (!name || !name.trim()) return name

  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ")
}

export function getInitials(name: string): string {
  if (!name || !name.trim()) return name

  return name
    .trim()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("")
}
