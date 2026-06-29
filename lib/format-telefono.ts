export function formatearTelefonoVE(raw: string): string {
  const digits = (raw ?? "").replace(/\D/g, "");

  if (digits.startsWith("58") && digits.length === 12) {
    const local = digits.slice(2);
    return `+58 ${local.slice(0, 3)} ${local.slice(3)}`;
  }

  if (digits.startsWith("0") && digits.length === 11) {
    const local = digits.slice(1);
    return `+58 ${local.slice(0, 3)} ${local.slice(3)}`;
  }

  if (digits.length === 10) {
    return `+58 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  return digits;
}
