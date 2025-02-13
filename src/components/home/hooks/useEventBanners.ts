import { useQuery } from '@tanstack/react-query'

import { getEventBanners } from '@/remote/banner'
import useAccount from '@/hooks/useAccount'

const useEventBanners = () => {
  // user가 계좌를 보유하고 있는지?
  const { data: account } = useAccount()

  const { data } = useQuery({
    queryKey: ['eventBanners'],
    queryFn: () =>
      getEventBanners({ hasAccount: !!account && account.status === 'DONE' }), // 계좌가 있거나, 개좌 심사가 완료되었을때
    suspense: true,
  })

  return { data }
}

export { useEventBanners }
