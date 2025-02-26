import Top from '@/components/shared/Top'
import useUser from '@/hooks/useUser'
import { getTerms } from '@/remote/account'
import { User } from '@/types/user'
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { TERMS } from '@/constants/account'
import { useMemo } from 'react'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Button from '@/components/shared/Button'

const TermsPage = () => {
  const user = useUser()

  const { data: terms } = useQuery({
    queryKey: ['terms', user?.id],
    queryFn: () => getTerms(user?.id as string),
    enabled: !!user, // 유저가 있을때만 쿼리 실행
  })

  // console.log('terms', terms)

  // 동의한 약관목록
  const selectedTerms = useMemo(() => {
    if (!terms) return null

    // 동의한 전체 약관목록
    const selectedAllTerms = TERMS.filter((term) =>
      terms.termIds.includes(term.id),
    )

    // 필수 약관목록
    const requiredTerms = selectedAllTerms.filter((term) => term.mandatory)
    // 선택 약관목록
    const optionalTerms = selectedAllTerms.filter((term) => !term.mandatory)

    return { requiredTerms, optionalTerms }
  }, [terms])

  return (
    <div>
      <Top title="약관" subtitle="약관목록 및 철회" />

      {!selectedTerms ? (
        <Text>동의한 약관 목록이 없습니다.</Text>
      ) : (
        <ul>
          {selectedTerms.requiredTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.ListRowTexts
                  title={`[필수] ${term.title}`}
                  subTitle={''}
                />
              }
            />
          ))}
          {selectedTerms.optionalTerms.map((term) => (
            <ListRow
              key={term.id}
              contents={
                <ListRow.ListRowTexts
                  title={`[선택] ${term.title}`}
                  subTitle={''}
                />
              }
              right={<Button color="error">철회</Button>}
            />
          ))}
        </ul>
      )}
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  // 어떤 유저가 어떤 약관을 선택 했는지에 대한 정보
  const session = await getSession(context)

  if (session && session.user) {
    const client = new QueryClient()

    await client.prefetchQuery({
      queryKey: ['terms', (session.user as User).id],
      queryFn: () => getTerms((session.user as User).id),
    })

    return {
      props: {
        dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
      },
    }
  }

  // 유저(세션) 정보가 없는 경우
  return {
    props: {},
  }
}

export default TermsPage
