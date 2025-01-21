import useCredit from '@/components/credit/hooks/useCredit'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import { getCredit } from '@/remote/credit'
import { User } from '@/types/user'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useCallback } from 'react'

const FixedBottomButton = dynamic(() => import('@shared/FixedBottomButton'), {
  ssr: false,
})

const CreditPage = () => {
  // const isCreditScoreChecked = true // 신용점수를 조회했는지 여부
  const user = useUser()
  const showAlert = useAlertContext()
  const router = useRouter()
  const { data: isCreditScoreChecked } = useCredit() // 서버사이드에서 처리했기때문에 데이터가 바로 차 있을거임

  const handleCheck = useCallback(() => {
    if (!user) {
      showAlert?.open({
        title: '로그인이 필요한 기능이에요.',
        description:
          '정확한 신용정보를 확인하기 위해 로그인을 먼저 진행해주세요.',
        onButtonClick: () => router.push('/auth/signin'),
      })
      return
    }

    // 로그인 된 상태면 신용점수 조회 페이지로 이동
    router.push('/credit/check')
  }, [user, router, showAlert])

  const renderMyCreditScore = () => {
    if (!isCreditScoreChecked) return null

    return (
      <>
        <Spacing size={40} />
        <Flex direction="column" align="center" gap={10}>
          <Text bold typography="t4" textAlign="center">
            나의 신용점수
          </Text>
          <Spacing size={10} />
          <CreditScoreChart score={isCreditScoreChecked.creditScore} />
        </Flex>
        <Spacing size={80} />
        <ul>
          <ListRow
            contents={
              <ListRow.ListRowTexts
                title="추천카드"
                subTitle="나에게 맞는 카드 찾아보기"
              />
            }
            withArrow
            onClick={() => router.push('/cards')}
          />
        </ul>
        <FixedBottomButton
          label="신용점수 올리기"
          color="basic"
          onClick={handleCheck}
        />
      </>
    )
  }

  return isCreditScoreChecked ? (
    renderMyCreditScore()
  ) : (
    <Flex direction="column">
      <Spacing size={40} />
      <Flex direction="column" align="center" gap={10}>
        <Text bold typography="t4" textAlign="center">
          내 신용점수를
          <br />
          조회하고 관리해보세요
        </Text>
        <Spacing size={10} />
        <CreditScoreChart score={0} />
      </Flex>

      <Spacing size={80} />

      <ul>
        <ListRow
          contents={
            <ListRow.ListRowTexts
              title="정확한 신용평점"
              subTitle="대표 신용평가 기관의 데이터로 관리해요."
            />
          }
        />

        <ListRow
          contents={
            <ListRow.ListRowTexts
              title="신용점수 무료조회"
              subTitle="신용점수에 영향없이 무료로 조회"
            />
          }
        />
      </ul>

      <FixedBottomButton
        label="30초 만에 신용점수 조회하기"
        color="basic"
        onClick={handleCheck}
      />
    </Flex>
  )
}

// 서버사이드에서 신용점수 조회하기
// 신용점수 조회 페이지에서 가장 중요한 정보는 유저의 신용점수기 때문에 서버사이드에서 불러오도록 설정
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // 서버에 저장되어있는 세션정보를 가지고 오기 위해서는 getSession 사용
  const session = await getSession(context)

  // 세션이 있을때만 신용점수 조회
  if (!session || !session.user) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['credit', (session?.user as User)?.id],
      queryFn: () => getCredit((session?.user as User)?.id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  return {
    props: {},
  }
}

export default CreditPage
