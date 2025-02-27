import Top from '@/components/shared/Top'
import useUser from '@/hooks/useUser'
import { getTerms } from '@/remote/account'
import { User } from '@/types/user'
import {
  dehydrate,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { TERMS } from '@/constants/account'
import { useMemo } from 'react'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Button from '@/components/shared/Button'

import { updateTerms } from '@/remote/account'

const TermsPage = () => {
  const user = useUser()
  const client = useQueryClient()

  const { data: terms } = useQuery({
    queryKey: ['terms', user?.id],
    queryFn: () => getTerms(user?.id as string),
    enabled: !!user, // 유저가 있을때만 쿼리 실행
  })

  const { mutate: updateTermsMutate, isLoading } = useMutation({
    mutationFn: (termIds: string[]) => updateTerms(user?.id as string, termIds),
    onSuccess: () => {
      client.invalidateQueries({
        queryKey: ['terms', user?.id], // 성공시 캐시 갱신을 하여 약관 목록을 다시 가지고 오도록함
      })
    },
    onError: () => {
      //TODO
    },
  })

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

  // 약관 철회 함수
  const handleDisagree = (selectedTermId: string) => {
    // terms?.termIds = [1,2,3] (1,2,3 모두 동의 상태 인데)
    // selectedTermId (삭제 되길 원하는 값은 2라고 하면)
    // [1,2,3].filter((n) => n !== 2) => [1, 3] (1,2,3을 필터링해서 2를 제외한 값만 남김)
    const updatedTermIds = terms?.termIds.filter(
      (termId) => selectedTermId !== termId,
    )

    if (!updatedTermIds) return

    updateTermsMutate(updatedTermIds)
  }

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
              right={
                <Button
                  color="error"
                  onClick={() => handleDisagree(term.id)}
                  disabled={isLoading}
                >
                  철회
                </Button>
              }
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
