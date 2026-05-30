export function formatNumber(num) {
  if (num === null || num === undefined) return "-";

  const number = Number(num);

  if (number >= 1_000_000_000_000) {
    return Math.floor(number / 1_000_000_000_000) + "조 원";
  }

  if (number >= 100_000_000) {
    return Math.floor(number / 100_000_000) + "억 원";
  }

  if (number >= 10_000) {
    return Math.floor(number / 10_000) + "만 원";
  }

  return number.toLocaleString() + "원";
}
