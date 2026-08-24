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
];

export const maxScore = categories.reduce(
  (sum, category) => sum + category.items.reduce((s, item) => s + item.score, 0),
  0,
);

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
