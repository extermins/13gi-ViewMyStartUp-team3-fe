const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getStartups({ page = 1, limit = 10, sort = 'totalInvestment' } = {}) {
  const res = await fetch(`${BASE_URL}/api/startups?page=${page}&limit=${limit}&sort=${sort}`)
  if (!res.ok) throw new Error('스타트업 목록 조회 실패')
  return res.json()
}

export async function getStartupById(id) {
  const res = await fetch(`${BASE_URL}/api/startups/${id}`)
  if (!res.ok) throw new Error('스타트업 조회 실패')
  return res.json()
}
