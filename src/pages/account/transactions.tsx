import useTransaction from '@/components/account/hooks/useTransaction'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'
import Text from '@/components/shared/Text'
import withAuth from '@/hooks/withAuth'
import { getTransactions } from '@/remote/transaction'
import { colors } from '@/styles/colorPalette'
import { TransactionFilterType } from '@/types/transaction'
import { User } from '@/types/user'
import addDelimiter from '@/utils/addDelimiter'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { parseISO, format } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useCallback, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

const FILTERS: Array<{ label: string; value: TransactionFilterType }> = [
  {
    label: '전체',
    value: 'all',
  },
  {
    label: '입금',
    value: 'deposit',
  },
  {
    label: '출금',
    value: 'withdraw',
  },
]

const TransactionsPage = () => {
  const [currentFilter, setCurrentFilter] =
    useState<TransactionFilterType>('all') // 기본 필터는 all

  const { data, hasNextPage, isFetching, fetchNextPage } = useTransaction({
    filter: currentFilter,
  })

  // console.log('currentFilter', currentFilter)

  const loadMore = useCallback(() => {
    // 다음 페이지가 없거나 데이터를 가져오는 중이면 아무일도 하지 않음
    if (!hasNextPage || isFetching) {
      return
    }

    // 그게 아니면 다음 페이지 호출
    fetchNextPage()
  }, [hasNextPage, isFetching, fetchNextPage])

  const transactions = data?.pages.flatMap(({ items }) => items) ?? []

  // console.log('transactions', transactions)

  return (
    <div>
      <Flex as="ul" justify="flex-end" gap={8} style={{ padding: 24 }}>
        {FILTERS.map((filter) => (
          <li
            key={filter.value}
            onClick={() => setCurrentFilter(filter.value)}
            style={{
              color:
                currentFilter === filter.value
                  ? `${colors.blue}`
                  : `${colors.gray}`,
              cursor: 'pointer',
            }}
          >
            {filter.label}
          </li>
        ))}
      </Flex>
      <InfiniteScroll
        dataLength={transactions.length}
        hasMore={hasNextPage ?? false}
        loader={<></>}
        next={loadMore}
        scrollThreshold={0.5}
      >
        <ul>
          {transactions?.map((transaction) => {
            const isDeposit = transaction.type === 'deposit' // 타입이 입금인지

            return (
              <ListRow
                key={transaction.id}
                contents={
                  <ListRow.ListRowTexts
                    title={transaction.displayText}
                    subTitle={format(parseISO(transaction.date), 'yyyy-MM-dd')}
                  />
                }
                right={
                  <Flex direction="column" align="flex-end">
                    <Text color={isDeposit ? 'blue' : 'red'} bold>
                      {isDeposit ? '+' : '-'}
                      {addDelimiter(transaction.amount)}원
                    </Text>
                    <Text>{addDelimiter(transaction.balance)}원</Text>
                  </Flex>
                }
              />
            )
          })}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (session && session.user) {
    const client = new QueryClient()

    await client.prefetchInfiniteQuery({
      queryKey: ['transactions', (session.user as User)?.id, 'all'], // 맨 처음 기본 필터는 all로 호출
      queryFn: () =>
        getTransactions({ userId: (session.user as User)?.id as string }),
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

export default withAuth(TransactionsPage)
