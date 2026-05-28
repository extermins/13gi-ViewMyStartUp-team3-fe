import { Link } from 'react-router'

// 스타트업 목록 카드 컴포넌트
export default function StartupCard({ startup }) {
  return (
    <Link to={`/startups/${startup._id}`}>
      <div>
        <h3>{startup.name}</h3>
        <p>{startup.category}</p>
        <p>{startup.description}</p>
      </div>
    </Link>
  )
}
