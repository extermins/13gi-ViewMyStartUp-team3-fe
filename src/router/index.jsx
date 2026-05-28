import { createBrowserRouter } from 'react-router'
import App from '../App'
import StartupListPage from '../pages/StartupListPage'
import MyStartupPage from '../pages/MyStartupPage'
import CompareStatusPage from '../pages/CompareStatusPage'
import InvestmentStatusPage from '../pages/InvestmentStatusPage'
import CompareResultPage from '../pages/CompareResultPage'
import StartupDetailPage from '../pages/StartupDetailPage'
import NotFoundPage from '../pages/NotFoundPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <StartupListPage /> },        // 1. 기업 전체 목록
      { path: 'my-startup', element: <MyStartupPage /> },   // 2. 나의 기업 선택
      { path: 'compare', element: <CompareStatusPage /> },  // 3. 비교 현황
      { path: 'investments', element: <InvestmentStatusPage /> }, // 4. 투자 현황
      { path: 'compare/result', element: <CompareResultPage /> }, // 5. 비교 결과
      { path: 'startups/:id', element: <StartupDetailPage /> },   // 6. 기업 상세
    ],
  },
  { path: '*', element: <NotFoundPage /> },
])

export default router
