import { Term } from '@/types/account'

export const TERMS = [
  {
    id: '01',
    title: '계좌개설 관련 안내 및 필수 동의',
    link: 'https://www.google.com',
    mandatory: true,
  },
  {
    id: '02',
    title: '개인정보 요약동의서',
    link: 'https://www.google.com',
    mandatory: true,
  },
  {
    id: '03',
    title: '마케팅 수신 동의',
    link: 'https://www.google.com',
    mandatory: false, // false면 선택 약관
  },
] as Term[]
