import { useParams } from 'react-router'

export default function StartupDetailPage() {
  const { id } = useParams()

  return (
    <div>
      <h1>스타트업 상세</h1>
      <p>ID: {id}</p>
      {/* TODO: 스타트업 상세 정보 + 투자 현황 */}
    </div>
  )
}
