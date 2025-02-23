import withSuspense from '@/hooks/withSuspense'

import useTransaction from './hooks/useTransaction'
import Text from '@/components/shared/Text'
import Flex from '@/components/shared/Flex'
import ListRow from '@/components/shared/ListRow'

import { parseISO, format } from 'date-fns'
import addDelimiter from '@/utils/addDelimiter'
import Link from 'next/link'
import Button from '@/components/shared/Button'

const Transactions = () => {
  const { data } = useTransaction({ suspense: true })

  // 최근 5개만 보여줌
  const transactions = data?.pages.flatMap((page) => page.items).slice(0, 5)

  // console.log('transactions', transactions)

  return (
    <div>
      <Flex style={{ padding: 24 }}>
        <Text bold>입출금 내역</Text>
      </Flex>

      {!transactions?.length ? (
        <Text>아직 입출금 내역이 없어요</Text>
      ) : (
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
      )}

      <div style={{ padding: '0 24px' }}>
        <Link href="/account/transactions">
          <Button full size="medium" weak color="basic">
            자세히 보기
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default withSuspense(Transactions, {
  fallback: <div>로딩중 입니다...</div>,
})
