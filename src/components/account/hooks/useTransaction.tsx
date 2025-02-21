import { useInfiniteQuery } from '@tanstack/react-query'
import { getTransactions } from '@/remote/transaction'
import useUser from '@/hooks/useUser'
import { TransactionFilterType } from '@/types/transaction'

const useTransaction = ({
  suspense,
  filter,
}: {
  suspense?: boolean
  filter?: TransactionFilterType
} = {}) => {
  const user = useUser()

  return useInfiniteQuery({
    queryKey: ['transactions', user?.id, filter],
    queryFn: ({ pageParam }) =>
      getTransactions({ userId: user?.id as string, pageParam, filter }),
    getNextPageParam: (lastPage) => lastPage.lastVisible,
    suspense,
  })
}

export default useTransaction
