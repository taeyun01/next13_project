import { useState } from 'react'

import withAuth from '@/hooks/withAuth'
import ProgressBar from '@/components/shared/ProgressBar'
import Terms from '@/components/account/Terms'
import useUser from '@/hooks/useUser'
import { getTerms, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@/types/user'

// STEP = 0 약관동의
// STEP = 1 계좌 개설 폼 페이지
// STEP = 2 완료 페이지
const LAST_STEP = 2

const AccountNew = ({ initialStep }: { initialStep: number }) => {
  const [step, setStep] = useState(initialStep)
  const user = useUser()
  // console.log('initialStep', initialStep)

  return (
    <div>
      <ProgressBar progress={step / LAST_STEP} />
      {step === 0 ? (
        <Terms
          onNext={async (termIds) => {
            await setTerms({ userId: user?.id as string, termIds })
            setStep((prevStep) => prevStep + 1)
          }}
        />
      ) : null}
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context) // 세션 가져오기

  const agreedTerms = await getTerms((session?.user as User).id) // 유저의 약관동의 정보 가져오기

  // 약관동의를 하지 않는 처음 유저면 처음부터 시작하도록
  if (!agreedTerms) {
    return {
      props: {
        initialStep: 0,
      },
    }
  }

  // 약관 동의를 한 유저면 step1로 이동
  if (agreedTerms) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  return {
    props: {
      initialStep: 0,
    },
  }
}

export default withAuth(AccountNew)
