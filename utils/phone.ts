export const formatPhoneNumber = (value: string): string => {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  const trimmed = digits.slice(0, 10);

  if (trimmed.length === 0) return "";
  if (trimmed.length < 4) return `(${trimmed}`;
  if (trimmed.length < 7) return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3)}`;
  return `(${trimmed.slice(0, 3)}) ${trimmed.slice(3, 6)}-${trimmed.slice(6)}`;
};

export const isValidPhoneNumber = (value: string): boolean => {
  const digits = value.replace(/\D/g, "");
  return digits.length === 0 || digits.length === 10;
};
