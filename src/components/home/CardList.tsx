import useCards from '@/components/home/hooks/useCards'
import Badge from '@/components/shared/Badge'
import Button from '@/components/shared/Button'
import withSuspense from '@/hooks/withSuspense'
import ListRow from '@/components/shared/ListRow'
import Skeleton from '@/components/shared/Skeleton'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import { css } from '@emotion/react'

import { useRouter } from 'next/router'

const CardList = () => {
  const { data } = useCards()
  const navigate = useRouter()

  const isShowMoreButton = (data?.items.length ?? 0) > 5

  return (
    <div style={{ padding: '24px 0' }}>
      <Top title="추천카드" subtitle="회원님을 위해 준비했어요" />
      {/* <Text bold style={{ padding: '12px 24px' }}>
        추천카드
      </Text> */}
      <ul>
        {data?.items
          .slice(0, 5)
          .map((card, idx) => (
            <ListRow
              style={cardListBox}
              key={card.id}
              contents={
                <ListRow.ListRowTexts
                  title={`${idx + 1}위`}
                  subTitle={card.name}
                />
              }
              right={card.payback ? <Badge label={card.payback} /> : null}
              withArrow
              onClick={() => navigate.push(`/card/${card.id}`)}
            />
          ))}
      </ul>
      {isShowMoreButton && (
        <div style={{ padding: '12px 24px' }}>
          <Button
            full
            weak
            size="medium"
            color="basic"
            onClick={() => navigate.push('/card')}
          >
            더보기
          </Button>
        </div>
      )}
    </div>
  )
}

export const CardListSkeleton = () => {
  return (
    <div style={{ padding: '24px 0' }}>
      <Text bold style={{ padding: '12px 24px' }}>
        추천카드
      </Text>

      {[...new Array(5)].map((_, idx) => (
        <ListRow
          key={idx}
          contents={
            <ListRow.ListRowTexts
              title={<Skeleton width={30} height={25} />}
              subTitle={<Skeleton width={80} height={20} />}
            />
          }
        />
      ))}
    </div>
  )
}

const cardListBox = css`
  cursor: pointer;
`

export default withSuspense(CardList, {
  fallback: <CardListSkeleton />,
})
