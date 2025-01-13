import Badge from '@/components/shared/Badge'
import ListRow from '@/components/shared/ListRow'
import Top from '@/components/shared/Top'
import { getCards } from '@/remote/card'
import { QueryClient, dehydrate, useInfiniteQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'

const CardListPage = () => {
  const navigate = useRouter()

  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey: ['cards'],
    queryFn: ({ pageParam }) => getCards(pageParam),
    getNextPageParam: (snapshot) => {
      return snapshot.lastVisible
    },
  })

  const loadMore = useCallback(() => {
    // 다음 페이지가 없거나 페칭중이면 아무런 액션 하지 않도록 그냥 리턴
    if (!hasNextPage || isFetching) return

    fetchNextPage() // 다음 페이지 페칭
  }, [hasNextPage, fetchNextPage, isFetching])

  useEffect(() => {
    // 페이지가 마운트될 때 스크롤을 최상단으로 이동
    window.scrollTo(0, 0)
  }, [])

  if (!data) return null

  const cards = data?.pages.flatMap((page) => page.items)

  return (
    <div>
      <Top title="추천카드" subtitle="회원님을 위해 준비했어요" />
      <InfiniteScroll
        dataLength={cards.length}
        hasMore={hasNextPage}
        loader={
          <ListRow.Skeleton
            titleWidth={55}
            titleHeight={20}
            subTitleWidth={120}
          />
        }
        next={loadMore}
        scrollThreshold="100px"
      >
        <ul>
          <ul>
            {cards.map((card, idx) => (
              <ListRow
                key={card.id}
                contents={
                  <ListRow.ListRowTexts
                    title={`${idx + 1}위`}
                    subTitle={card.name}
                  />
                }
                right={card.payback && <Badge label={card.payback} />}
                withArrow
                onClick={() => navigate.push(`/card/${card.id}`)}
              />
            ))}
          </ul>
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export const getServerSideProps = async () => {
  const client = new QueryClient()

  // prefetchInfiniteQuery를 사용해 서버에서 데이터를 페칭해서 미리 받아옴 (무한 스크롤 데이터를 미리 준비) 그리고 나서 클라이언트로 전달
  await client.prefetchInfiniteQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
  })

  // 위 prefetchInfiniteQuery 액션이 끝난 후에 이 서버에서 수행한 데이터를 JSON형태로 전달해야함
  return {
    props: {
      // 서버에서 수행한 데이터 값을 넘겨줄 수 있음(해당 props는 _app에 pageProps로 전달됨)
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(client))),
    },
  }
}

export default CardListPage
