// 숫자를 억 단위로 변환 (ex: 1000000000 → "10억")
export function formatAmount(amount) {
  if (amount >= 100000000) {
    return `${(amount / 100000000).toLocaleString()}억 원`
  }
  if (amount >= 10000) {
    return `${(amount / 10000).toLocaleString()}만 원`
  }
  return `${amount.toLocaleString()}원`
}
