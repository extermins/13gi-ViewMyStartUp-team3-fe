const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getComparisonStats({ page = 1, pageSize = 10, sortBy = 'mypickCount', order = 'desc' } = {}) {
  const params = new URLSearchParams({ page, pageSize, sortBy, order })
  const res = await fetch(`${BASE_URL}/api/comparison-stats?${params}`)
  if (!res.ok) throw new Error('비교 현황 조회 실패')
  return res.json()
}
