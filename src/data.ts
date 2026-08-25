export type Item = {
  id: string;
  label: string;
  score: number;
  cost: number;
  costLabel?: string;
};

export type Category = {
  id: string;
  name: string;
  emoji: string;
  items: Item[];
};

export const categories: Category[] = [
  {
    id: 'work',
    name: '직장',
    emoji: '💼',
    items: [
      { id: 'work-1', label: '퇴근 5분 전 업무 지시', score: 8, cost: 15000, costLabel: '야근 배달음식' },
      { id: 'work-2', label: '메신저 "잠깐 통화 가능하세요?"에 심장 철렁', score: 5, cost: 0 },
      { id: 'work-3', label: '내가 한 일에 상사가 숟가락 얹기', score: 9, cost: 0 },
      { id: 'work-4', label: '점심시간에 갑자기 잡힌 회의', score: 6, cost: 8000, costLabel: '점심 대충 때움' },
      { id: 'work-5', label: '복사기 종이 걸림, 하필 내 차례', score: 4, cost: 0 },
      { id: 'work-6', label: '에어컨 리모컨 자리 쟁탈전에서 패배', score: 4, cost: 0 },
      { id: 'work-7', label: '내가 짠 기획, 이름만 바뀌어 재활용됨', score: 9, cost: 0 },
      { id: 'work-8', label: '월급날인데 카드값이 더 많음', score: 7, cost: 0 },
    ],
  },
  {
    id: 'relationship',
    name: '인간관계',
    emoji: '🫠',
    items: [
      { id: 'rel-1', label: '단톡방에서 나만 씹힘', score: 6, cost: 0 },
      { id: 'rel-2', label: '약속 30분 전 갑자기 취소 통보', score: 7, cost: 0 },
      { id: 'rel-3', label: '빌려간 거 안 돌려주면서 당당함', score: 8, cost: 0 },
      { id: 'rel-4', label: '내 얘기하는데 자기 얘기로 뺏어감', score: 5, cost: 0 },
      { id: 'rel-5', label: '생일 챙겨줬는데 상대는 까먹음', score: 7, cost: 0 },
      { id: 'rel-6', label: '단체 사진에서 나만 눈 감음', score: 3, cost: 0 },
      { id: 'rel-7', label: '한참 안 읽씹 당하다가 갑자기 부탁만 옴', score: 6, cost: 0 },
      { id: 'rel-8', label: '친구가 갑자기 다단계 권유', score: 9, cost: 0 },
    ],
  },
  {
    id: 'transit',
    name: '교통·외출',
    emoji: '🚇',
    items: [
      { id: 'transit-1', label: '지하철에서 발 밟히고 사과 못 받음', score: 5, cost: 3000, costLabel: '홧김 커피' },
      { id: 'transit-2', label: '택시 잡히자마자 승차 거부', score: 7, cost: 0 },
      { id: 'transit-3', label: '우산 없이 나왔는데 갑자기 소나기', score: 6, cost: 12000, costLabel: '편의점 우산' },
      { id: 'transit-4', label: '만석 버스가 정류장 그냥 지나침', score: 6, cost: 0 },
      { id: 'transit-5', label: '네비 안내대로 갔더니 막다른 길', score: 6, cost: 0 },
      { id: 'transit-6', label: '주차하자마자 옆 차가 문콕', score: 8, cost: 0 },
      { id: 'transit-7', label: '엘리베이터 코앞에서 문 닫힘', score: 4, cost: 0 },
      { id: 'transit-8', label: '장바구니 바퀴 고장나서 삐뚤빼뚤 굴러감', score: 3, cost: 0 },
    ],
  },
  {
    id: 'delivery',
    name: '배달·온라인',
    emoji: '📦',
    items: [
      { id: 'delivery-1', label: '환불 안 해주는 매장', score: 7, cost: 0 },
      { id: 'delivery-2', label: '배달이 늦어서 다 식음', score: 6, cost: 5000, costLabel: '재주문' },
      { id: 'delivery-3', label: '주문한 거랑 다른 게 옴', score: 7, cost: 4000, costLabel: '홧김 간식 주문' },
      { id: 'delivery-4', label: '리뷰 이벤트 상품 안 줌', score: 5, cost: 0 },
      { id: 'delivery-5', label: '할인쿠폰 적용 깜빡하고 결제함', score: 5, cost: 0 },
      { id: 'delivery-6', label: '택배가 옆집으로 잘못 감', score: 6, cost: 0 },
      { id: 'delivery-7', label: '품절돼서 못 산 인기템, 재입고 알림 놓침', score: 6, cost: 0 },
      { id: 'delivery-8', label: '무료배송 기준 채우려고 안 사도 될 거 삼', score: 5, cost: 7000, costLabel: '홧김 추가구매' },
    ],
  },
  {
    id: 'family',
    name: '가족·집안일',
    emoji: '🏠',
    items: [
      { id: 'family-1', label: '설거지 순번인데 모른 척', score: 6, cost: 0 },
      { id: 'family-2', label: '택배 왔는데 나만 계속 가지러 감', score: 5, cost: 0 },
      { id: 'family-3', label: '화장실 휴지 다 썼는데 안 채워놓음', score: 6, cost: 0 },
      { id: 'family-4', label: '리모컨 어디 있는지 아무도 모름', score: 3, cost: 0 },
      { id: 'family-5', label: '분리수거 날짜 깜빡해서 다음 주까지 쌓임', score: 5, cost: 0 },
      { id: 'family-6', label: '냉장고 정리했더니 곰팡이 핀 반찬통 발견', score: 7, cost: 0 },
      { id: 'family-7', label: '홧김에 장 보러 나갔다가 필요없는 것까지 삼', score: 6, cost: 15000, costLabel: '홧김 장보기' },
      { id: 'family-8', label: '가족 단톡방에 나만 답장 안 했다고 등짝 스매싱', score: 4, cost: 0 },
    ],
  },
  {
    id: 'digital',
    name: '디지털·SNS',
    emoji: '📱',
    items: [
      { id: 'digital-1', label: '좋아요 안 눌러주는 애인', score: 5, cost: 0 },
      { id: 'digital-2', label: '스토리 봤는데 답장 없음', score: 4, cost: 0 },
      { id: 'digital-3', label: '광고 스킵 안 되는 유튜브 15초', score: 3, cost: 0 },
      { id: 'digital-4', label: '와이파이 끊겨서 결제 화면 두 번 새로고침', score: 5, cost: 0 },
      { id: 'digital-5', label: '핸드폰 배터리 1%인데 충전기 안 챙김', score: 6, cost: 0 },
      { id: 'digital-6', label: '구독 무료체험 깜빡하고 자동결제 됨', score: 8, cost: 9900, costLabel: '자동결제' },
      { id: 'digital-7', label: '택배 추적 조회했는데 3일째 그대로', score: 5, cost: 0 },
      { id: 'digital-8', label: '인스타 알고리즘이 광고만 보여줌', score: 3, cost: 0 },
    ],
  },
  {
    id: 'weather',
    name: '날씨·환경',
    emoji: '🌦️',
    items: [
      { id: 'weather-1', label: '미세먼지 매우나쁨인데 마스크 깜빡', score: 5, cost: 0 },
      { id: 'weather-2', label: '에어컨 안 나오는 버스', score: 6, cost: 0 },
      { id: 'weather-3', label: '우산 챙겼는데 정작 날씨 맑음', score: 3, cost: 0 },
      { id: 'weather-4', label: '갑자기 폭염특보, 에어컨 없는 곳에서 회의', score: 7, cost: 0 },
      { id: 'weather-5', label: '장마철에 신발이 다 젖음', score: 6, cost: 5000, costLabel: '새 양말' },
      { id: 'weather-6', label: '세차한 지 하루 만에 미세먼지로 뿌옇게 됨', score: 5, cost: 0 },
      { id: 'weather-7', label: '일기예보 안 맞아서 반팔 입고 나갔다가 추위에 떰', score: 6, cost: 0 },
      { id: 'weather-8', label: '황사 때문에 목이 칼칼해서 목캔디 삼', score: 4, cost: 2000, costLabel: '목캔디' },
    ],
  },
  {
    id: 'health',
    name: '건강·컨디션',
    emoji: '💊',
    items: [
      { id: 'health-1', label: '감기약 사러 갔는데 약국 문 닫음', score: 6, cost: 0 },
      { id: 'health-2', label: '헬스장 러닝머신 만석', score: 4, cost: 0 },
      { id: 'health-3', label: '다이어트 중인데 눈앞에서 치킨 냄새', score: 7, cost: 0 },
      { id: 'health-4', label: '병원 예약했는데 30분 넘게 대기', score: 6, cost: 0 },
      { id: 'health-5', label: '알람 못 듣고 늦잠 자서 아침 거름', score: 5, cost: 0 },
      { id: 'health-6', label: '다크서클 심해져서 화장으로도 안 가려짐', score: 3, cost: 0 },
      { id: 'health-7', label: '허리 삐끗해서 파스 삼', score: 6, cost: 6000, costLabel: '파스' },
      { id: 'health-8', label: '다이어트 실패하고 홧김에 야식 시킴', score: 7, cost: 18000, costLabel: '홧김 야식' },
    ],
  },
  {
    id: 'finance',
    name: '돈·금융',
    emoji: '💰',
    items: [
      { id: 'finance-1', label: '카드 한도 초과로 결제 실패, 사람들 앞에서 민망', score: 8, cost: 0 },
      { id: 'finance-2', label: '이체 실수로 수수료만 나감', score: 7, cost: 0 },
      { id: 'finance-3', label: '월급 들어오자마자 자동이체로 다 빠져나감', score: 7, cost: 0 },
      { id: 'finance-4', label: '적금 깰까 고민될 정도로 갑자기 큰돈 나감', score: 8, cost: 0 },
      { id: 'finance-5', label: '해지 깜빡한 카드 연회비 또 청구됨', score: 6, cost: 30000, costLabel: '연회비' },
      { id: 'finance-6', label: '세일한다길래 샀는데 다음날 더 싸짐', score: 6, cost: 0 },
      { id: 'finance-7', label: '계좌 잔액 확인했는데 생각보다 훨씬 적음', score: 7, cost: 0 },
      { id: 'finance-8', label: '공과금 자동이체일에 잔액 부족해서 연체', score: 8, cost: 0 },
    ],
  },
  {
    id: 'pet',
    name: '반려동물',
    emoji: '🐾',
    items: [
      { id: 'pet-1', label: '산책 나가자마자 비 옴', score: 5, cost: 0 },
      { id: 'pet-2', label: '츄르 사놨는데 안 먹음', score: 4, cost: 3000, costLabel: '간식 재구매' },
      { id: 'pet-3', label: '카펫에 실수함', score: 6, cost: 0 },
      { id: 'pet-4', label: '새벽에 짖어서 잠 설침', score: 6, cost: 0 },
      { id: 'pet-5', label: '병원비 무섭게 나옴', score: 8, cost: 50000, costLabel: '동물병원비' },
      { id: 'pet-6', label: '산책 중에 다른 강아지랑 시비 붙음', score: 6, cost: 0 },
      { id: 'pet-7', label: '애지중지 키운 화분 다 파헤쳐놓음', score: 5, cost: 0 },
      { id: 'pet-8', label: '사료 그릇 엎어서 집안 난장판', score: 5, cost: 0 },
    ],
  },
];

export const maxScore = categories.reduce(
  (sum, category) => sum + category.items.reduce((s, item) => s + item.score, 0),
  0,
);

export const CATEGORY_BONUS = 5;

export const categoryBonusTotal = categories.length * CATEGORY_BONUS;

export const effectiveMaxScore = maxScore + categoryBonusTotal;

export type Tier = {
  min: number;
  max: number;
  emoji: string;
  title: string;
};

export const tiers: Tier[] = [
  { min: 0, max: 20, emoji: '🧘', title: '평온한 부처님' },
  { min: 21, max: 40, emoji: '😐', title: '잔잔한 빡침 보유자' },
  { min: 41, max: 60, emoji: '😤', title: '킹받음 중급자' },
  { min: 61, max: 80, emoji: '💳', title: '분노의 카드결제러' },
  { min: 81, max: 100, emoji: '🔥', title: '킹받음 그 자체' },
];

export function getTier(percentage: number): Tier {
  return tiers.find((tier) => percentage >= tier.min && percentage <= tier.max) ?? tiers[tiers.length - 1];
}
