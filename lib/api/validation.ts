export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function hasHoneypotValue(value?: string) {
  return Boolean(value?.trim());
}

export function toOptionalTrimmedValue(value?: string) {
  const trimmedValue = value?.trim();
  return trimmedValue ? trimmedValue : null;
}
