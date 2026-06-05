const BASE_URL = "http://localhost:8000";

// 매개변수에 keyword와 sort를 추가로 받습니다!
export async function getCompanies({
  page = 1,
  pageSize = 10,
  keyword = "",
  sort = "",
} = {}) {
  const params = new URLSearchParams({ page, pageSize });

  // 검색어나 정렬 조건이 있으면 파라미터에 추가로 붙여줍니다.
  if (keyword) params.append("keyword", keyword);
  if (sort) params.append("sort", sort);

  const res = await fetch(`${BASE_URL}/api/companies?${params}`);
  if (!res.ok) throw new Error("기업 목록 조회 실패");

  return res.json();
}
