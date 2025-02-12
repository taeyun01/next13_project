import { useState } from 'react'

import { TERMS } from '@/constants/account'
import { Term } from '@/types/account'
import Agreement from '@/components/shared/Agreement'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

const Terms = () => {
  const [termsAgreements, setTermsAgreements] = useState(() =>
    generateInitialValues(TERMS),
  )

  console.log('termsAgreements', termsAgreements)

  const handleAllAgreement = () => {}

  return (
    <div>
      <Agreement>
        <Agreement.Title checked={false} onChange={handleAllAgreement}>
          약관 모두 동의
        </Agreement.Title>
        {termsAgreements.map((term) => {
          return (
            <Agreement.Description
              key={term.id}
              link={term.link}
              checked={term.checked}
              onChange={() => {}}
            >
              {term.mandatory ? '[필수] ' : '[선택] '}
              {term.title}
            </Agreement.Description>
          )
        })}
      </Agreement>
      <FixedBottomButton label="약관동의" disabled={false} onClick={() => {}} />
    </div>
  )
}

const generateInitialValues = (terms: Term[]) => {
  // 기존 약관목록을 그대로 복사하고, checked 상태 값을 추가해 false로 초기화
  return terms.map((term) => ({ ...term, checked: false }))
}

export default Terms
