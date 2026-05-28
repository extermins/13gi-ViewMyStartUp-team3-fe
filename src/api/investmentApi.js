const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function getInvestments(startupId) {
  const res = await fetch(`${BASE_URL}/api/investments?startupId=${startupId}`)
  if (!res.ok) throw new Error('투자 목록 조회 실패')
  return res.json()
}

export async function createInvestment(data) {
  const res = await fetch(`${BASE_URL}/api/investments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('투자 등록 실패')
  return res.json()
}

export async function updateInvestment(id, data) {
  const res = await fetch(`${BASE_URL}/api/investments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) throw new Error('투자 수정 실패')
  return res.json()
}

export async function deleteInvestment(id, password) {
  const res = await fetch(`${BASE_URL}/api/investments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  })
  if (!res.ok) throw new Error('투자 삭제 실패')
  return res.json()
}
