const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getCompares() {
  const res = await fetch(`${BASE_URL}/api/compares`)
  if (!res.ok) throw new Error('비교 목록 조회 실패')
  return res.json()
}

export async function getCompareById(id) {
  const res = await fetch(`${BASE_URL}/api/compares/${id}`)
  if (!res.ok) throw new Error('비교 결과 조회 실패')
  return res.json()
}

export async function getComparisonStats({ page = 1, pageSize = 10, sortBy = 'mypickCount', order = 'desc' } = {}) {
  const params = new URLSearchParams({ page, pageSize, sortBy, order })
  const res = await fetch(`${BASE_URL}/api/comparison-stats?${params}`)
  if (!res.ok) throw new Error('비교 현황 조회 실패')
  return res.json()
}

export async function getInvestmentStats({ page = 1, pageSize = 10, sortBy = 'totalInvestment', order = 'desc' } = {}) {
  const params = new URLSearchParams({ page, pageSize, sortBy, order })
  const res = await fetch(`${BASE_URL}/api/comparison-stats?${params}`)
  if (!res.ok) throw new Error('투자 현황 조회 실패')
  return res.json()
}
