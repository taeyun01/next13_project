import { useQuery } from '@tanstack/react-query'
import { getAccount } from '@/remote/account'
import useUser from './useUser'

const useAccount = () => {
  const user = useUser()

  return useQuery({
    queryKey: ['account', user?.id],
    queryFn: () => getAccount(user?.id as string),
    enabled: !!user?.id, // 유저가 로그인 되어있어야 쿼리 실행
  })
}

export default useAccount
