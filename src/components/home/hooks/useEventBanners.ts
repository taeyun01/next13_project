import { useQuery } from '@tanstack/react-query'

import { getEventBanners } from '@/remote/banner'

const useEventBanners = () => {
  // TODO: user가 계좌를 보유하고 있는지? (인증 구현 후 작업)

  const { data } = useQuery({
    queryKey: ['eventBanners'],
    queryFn: () => getEventBanners({ hasAccount: false }),
    suspense: true,
  })

  return { data }
}

export { useEventBanners }
