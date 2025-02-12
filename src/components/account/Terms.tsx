import { MouseEvent, useState } from 'react'

import { TERMS } from '@/constants/account'
import { Term } from '@/types/account'
import Agreement from '@/components/shared/Agreement'
import dynamic from 'next/dynamic'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

const Terms = ({ onNext }: { onNext: (termIds: string[]) => void }) => {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(TERMS),
  )

  // console.log('termsAgreements', termsAgreements)

  // 하나하나 약관에 대한 동의처리를 하는 함수
  const handleAgreement = (id: string, checked: boolean) => {
    // console.log('id', id)
    // console.log('checked', checked)
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) =>
        term.id === id ? { ...term, checked } : term,
      )
    })
  }

  const handleAllAgreement = (_: MouseEvent<HTMLElement>, checked: boolean) => {
    setTermsAgreements((prevTerms) => {
      return prevTerms.map((term) => ({ ...term, checked }))
    })
  }

  // 모든 약관이 동의 됐는지 확인
  const isAllAgreement = termsAgreements.every((term) => term.checked)

  // 필수 약관이 동의 됐는지 확인
  const isRequiredAgreement = termsAgreements
    .filter((term) => term.mandatory)
    .every((term) => term.checked)

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={isAllAgreement} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => {
          return (
            <Agreement.Description
              key={term.id}
              link={term.link}
              checked={term.checked}
              onChange={(_, checked) => handleAgreement(term.id, checked)}
            >
              {term.mandatory ? '[필수] ' : '[선택] '}
              {term.title}
            </Agreement.Description>
          )
        })}
      </Agreement>
      <FixedBottomButton
        label="약관동의"
        disabled={!isRequiredAgreement}
        onClick={() => {
          onNext(
            // 지금 선택된 약관들의 id 배열을 반환
            termsAgreements.filter((term) => term.checked).map(({ id }) => id),
          )
        }}
      />
    </div>
  )
}

const generateInitialValues = (terms: Term[]) => {
  // 기존 약관목록을 그대로 복사하고, checked 상태 값을 추가해 false로 초기화
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
