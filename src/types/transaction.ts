export type TransactionType = 'deposit' | 'withdraw' // 입금, 출금

export interface Transaction {
  userId: string
  type: TransactionType
  amount: number // 입금 금액
  balance: number // 입금 후 잔액
  displayText: string // 어떤 사람이 보냈는지 텍스트
  date: string // 언제 액션이 일어났는지 날짜
}
