export interface Piggybank {
  userId: string
  name: string // 저금통 이름
  startDate: Date // 언제부터 모으기 시작했는지
  endDate: Date // 언제까지 목표인지
  balance: number // 현재 저금액
  goalAmount: number // 목표 저금액
}
