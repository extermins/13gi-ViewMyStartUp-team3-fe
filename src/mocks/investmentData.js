// 투자 현황 페이지용 임시 목 데이터
// TODO: 백엔드 API 확정 후 제거하고 startupApi.getStartups() 사용
export const MOCK_INVESTMENTS = [
  { id: '1',  name: '카카오',       category: 'AI',       description: '국내 최대 메신저 카카오톡을 운영하는 IT 플랫폼 기업',            totalInvestment: 1500000, investmentCount: 12, imageUrl: null },
  { id: '2',  name: '토스',         category: '핀테크',   description: '간편 송금으로 시작해 종합 금융 서비스로 성장한 핀테크 유니콘',    totalInvestment: 1320000, investmentCount: 10, imageUrl: null },
  { id: '3',  name: '당근마켓',     category: '커머스',   description: '동네 기반 중고거래 플랫폼으로 지역 커뮤니티 문화를 만든 기업',   totalInvestment: 1180000, investmentCount: 9,  imageUrl: null },
  { id: '4',  name: '크래프톤',     category: '게임',     description: '배틀그라운드로 글로벌 게임 시장에서 두각을 나타낸 게임 전문 기업', totalInvestment: 1050000, investmentCount: 8,  imageUrl: null },
  { id: '5',  name: '쏘카',         category: '모빌리티', description: '국내 대표 카셰어링 서비스로 공유 모빌리티 시장을 선도하는 기업',  totalInvestment:  920000, investmentCount: 7,  imageUrl: null },
  { id: '6',  name: '마켓컬리',     category: '커머스',   description: '새벽 배송으로 신선식품 온라인 시장의 패러다임을 바꾼 기업',      totalInvestment:  840000, investmentCount: 6,  imageUrl: null },
  { id: '7',  name: '야놀자',       category: '여행',     description: '숙박 예약 앱에서 출발해 글로벌 여행 테크 플랫폼으로 성장한 기업', totalInvestment:  760000, investmentCount: 6,  imageUrl: null },
  { id: '8',  name: '직방',         category: '프롭테크', description: '부동산 정보 플랫폼으로 스마트홈과 프롭테크 분야를 선도하는 기업', totalInvestment:  680000, investmentCount: 5,  imageUrl: null },
  { id: '9',  name: '무신사',       category: '패션',     description: '패션 커뮤니티에서 출발해 국내 최대 패션 이커머스로 성장한 기업', totalInvestment:  590000, investmentCount: 5,  imageUrl: null },
  { id: '10', name: '오늘의집',     category: '인테리어', description: '인테리어 콘텐츠 플랫폼으로 홈퍼니싱 시장을 혁신하는 기업',      totalInvestment:  520000, investmentCount: 4,  imageUrl: null },
  { id: '11', name: '뤼튼',         category: 'AI',       description: 'AI 글쓰기 도구를 기반으로 생성형 AI 서비스를 제공하는 기업',     totalInvestment:  450000, investmentCount: 4,  imageUrl: null },
  { id: '12', name: '에이블리',     category: '패션',     description: 'AI 기반 개인화 추천으로 MZ세대 패션 쇼핑을 선도하는 기업',      totalInvestment:  390000, investmentCount: 3,  imageUrl: null },
  { id: '13', name: '센드버드',     category: 'SaaS',     description: '글로벌 채팅·메시징 API 서비스를 제공하는 B2B SaaS 기업',        totalInvestment:  330000, investmentCount: 3,  imageUrl: null },
  { id: '14', name: '리디',         category: '콘텐츠',   description: '전자책과 웹툰·웹소설 플랫폼으로 디지털 콘텐츠 시장을 이끄는 기업', totalInvestment: 280000, investmentCount: 3, imageUrl: null },
  { id: '15', name: '클래스101',    category: '에듀테크', description: '크리에이터 중심의 온라인 클래스 플랫폼으로 취미·자기계발 시장 공략', totalInvestment: 230000, investmentCount: 2, imageUrl: null },
  { id: '16', name: '스타일쉐어',   category: '패션',     description: '10·20대 패션 SNS에서 이커머스로 진화한 패션 플랫폼 기업',      totalInvestment:  190000, investmentCount: 2,  imageUrl: null },
  { id: '17', name: '왓챠',         category: '콘텐츠',   description: '국내 OTT 시장에서 독자적인 큐레이션으로 차별화를 꾀하는 기업',  totalInvestment:  160000, investmentCount: 2,  imageUrl: null },
  { id: '18', name: '버킷플레이스',  category: '인테리어', description: '오늘의집 운영사로 인테리어 커머스와 커뮤니티를 결합한 플랫폼',   totalInvestment:  130000, investmentCount: 2,  imageUrl: null },
  { id: '19', name: '플렉스',       category: 'HR테크',   description: 'HR SaaS로 기업의 급여·복지 관리 자동화를 돕는 스타트업',       totalInvestment:   90000, investmentCount: 1,  imageUrl: null },
  { id: '20', name: '솔트룩스',     category: 'AI',       description: '자연어 처리와 지식그래프 기반 AI 솔루션을 공급하는 기업',       totalInvestment:   60000, investmentCount: 1,  imageUrl: null },
]

export const INVESTMENT_TOTAL_COUNT = MOCK_INVESTMENTS.length
