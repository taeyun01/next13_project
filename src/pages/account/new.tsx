import { useState } from 'react'

import withAuth from '@/hooks/withAuth'
import ProgressBar from '@/components/shared/ProgressBar'
import Terms from '@/components/account/Terms'
import useUser from '@/hooks/useUser'
import { createAccount, getAccount, getTerms, setTerms } from '@/remote/account'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { User } from '@/types/user'
import Form from '@/components/account/Form'
import { Account } from '@/types/account'
import FullPageLoader from '@/components/shared/FullPageLoader'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'))

// STEP = 0 약관동의
// STEP = 1 계좌 개설 폼 페이지
// STEP = 2 완료 페이지
const LAST_STEP = 2

const AccountNew = ({ initialStep }: { initialStep: number }) => {
  const [step, setStep] = useState(initialStep)
  const user = useUser()
  const navigate = useRouter()
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

      {step === 1 ? (
        <Form
          onNext={async (formValues) => {
            // console.log('formValues', formValues)

            const newAccount = {
              ...formValues,
              accountNumber: Date.now(), // 계좌번호(임시)
              balance: 0, // 잔액
              status: 'READY', // 심사중
              userId: user?.id as string,
            } as Account

            await createAccount(newAccount)

            setStep((prevStep) => prevStep + 1)
          }}
        />
      ) : null}

      {step === 2 ? (
        <>
          <FullPageLoader message="계좌개설 신청이 완료되었어요" />
          <FixedBottomButton label="확인" onClick={() => navigate.push('/')} />
        </>
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

  const account = await getAccount((session?.user as User).id) // 유저의 계좌 정보 가져오기

  // 계좌개설을 하는데 계좌가 없다는건 어쨋든 약관동의는 한거니까 step1부터 시작
  if (!account) {
    return {
      props: {
        initialStep: 1,
      },
    }
  }

  // 계좌개설을 했다면 이미 완료된 유저니까 step2로 이동
  return {
    props: {
      initialStep: 2,
    },
  }
}

export default withAuth(AccountNew)
