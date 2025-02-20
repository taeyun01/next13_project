import { useInfiniteQuery } from '@tanstack/react-query'
import { getTransactions } from '@/remote/transaction'
import useUser from '@/hooks/useUser'

const useTransaction = ({ suspense }: { suspense?: boolean } = {}) => {
  const user = useUser()

  return useInfiniteQuery({
    queryKey: ['transactions', user?.id],
    queryFn: ({ pageParam }) =>
      getTransactions({ userId: user?.id as string, pageParam }),
    getNextPageParam: (lastPage) => lastPage.lastVisible,
    suspense,
  })
}

export default useTransaction
