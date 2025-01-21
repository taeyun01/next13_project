import useUser from '@/hooks/useUser'
import { getCredit } from '@/remote/credit'
import { useQuery } from '@tanstack/react-query'

const useCredit = () => {
  const user = useUser()
  return useQuery({
    queryKey: ['credit', user?.id],
    queryFn: () => getCredit(user?.id as string),
    enabled: user != null, // 유저가 있을 때만 쿼리 실행
  })
}

export default useCredit
