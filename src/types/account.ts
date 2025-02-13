interface Term {
  id: string
  title: string
  link: string
  mandatory: boolean
}

interface BaseForm {
  id: string
  label: string
  required: boolean
  helpMessage?: string
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface SelectFieldForm extends BaseForm {
  type: 'SELECT'
  options: Array<{ label: string; value: string }>
}

export type AccountForm = TextFieldForm | SelectFieldForm // 계좌 개설 폼 타입 (TextFieldForm, SelectFieldForm 둘중 하나)

type AccountStatus = 'READY' | 'DONE' // 통장 상태 타입 (심사중, 개설완료)

export interface Account {
  accountName: string // 통장 이름
  accountNumber: number // 통장 번호
  balance: number // 잔액
  email: string // 이메일
  name: string // 이름
  phone: string // 전화번호
  status: AccountStatus // 통장 상태
  userId: string // 유저 아이디
}

export type { Term }
