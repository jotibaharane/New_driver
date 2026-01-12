// formatter.ts
export const formatPhone = (number: string): string => {
  const cleanNumber = number.replace(/\D/g, '');
  if (cleanNumber.length <= 3) return cleanNumber;
  if (cleanNumber.length <= 6)
    return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(3)}`;
  return `${cleanNumber.slice(0, 3)} ${cleanNumber.slice(
    3,
    6,
  )} ${cleanNumber.slice(6, 10)}`;
};
