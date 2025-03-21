import ListRow from '@/components/shared/ListRow'
import { css } from '@emotion/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import withSuspense from '@/hooks/withSuspense'

import { getPiggybank } from '@/remote/piggybank'
import { useQuery } from '@tanstack/react-query'
import useUser from '@/hooks/useUser'
import { differenceInDays } from 'date-fns'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import addDelimiter from '@/utils/addDelimiter'

const PiggybankRow = () => {
  const navigate = useRouter()
  const user = useUser()

  const { data: piggybank } = useQuery({
    queryKey: ['piggybank', user?.id],
    queryFn: () => getPiggybank(user?.id as string),
    suspense: true,
  })

  console.log('piggybank', piggybank)

  // 생성한 저금통이 없는 경우
  if (!piggybank || piggybank.balance === piggybank.goalAmount) {
    return (
      <div>
        <ul>
          <ListRow
            style={piggybankRowStyles}
            left={
              <Image
                src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-1024.png"
                alt="piggybank"
                width={40}
                height={40}
              />
            }
            contents={
              <ListRow.ListRowTexts
                title="저금통"
                subTitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요!"
              />
            }
            withArrow
            onClick={() => navigate.push('/account/piggybank/new')}
          />
        </ul>
      </div>
    )
  }

  const { balance, endDate, goalAmount } = piggybank
  const dday = differenceInDays(endDate, new Date()) // 종료일과 현재 날짜의 D-day

  // 생성한 저금통이 있는 경우
  return (
    <div>
      <ul>
        <ListRow
          style={piggybankRowStyles}
          left={
            <Image
              src="https://cdn2.iconfinder.com/data/icons/new-year-resolutions/64/resolutions-24-1024.png"
              alt="piggybank"
              width={40}
              height={40}
            />
          }
          contents={
            <Flex direction="column">
              <Text typography="t4" bold>
                D-{dday}
              </Text>
              <Text>{addDelimiter(goalAmount - balance)}원 남았어요!</Text>
            </Flex>
          }
          withArrow
          onClick={() => {
            //TODO : 저금통 상세 페이지 이동 or 저금통 리스트 페이지 이동
            navigate.push('/account/piggybank/detail')
          }}
        />
      </ul>
    </div>
  )
}

const piggybankRowStyles = css`
  cursor: pointer;
`

export default withSuspense(PiggybankRow, {
  fallback: <div>로딩중...</div>,
})
