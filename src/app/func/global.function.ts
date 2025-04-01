export function getInitials(fullName: string) {
  const names = fullName.trim().split(/\s+/);
  if (names.length < 2) return '';

  const firstInitial = names[0][0].toUpperCase();
  const lastInitial = names[names.length - 1][0].toUpperCase();

  return `${firstInitial}${lastInitial}`;
}
