import { useQuery } from '@tanstack/react-query'

import { CHECK_STATUS } from '@/constants/credit'

interface useCreditCheckProps {
  onSuccess: (creditScore: number) => void
  onError: () => void
  enabled: boolean // 폴링을 할지말지 결정하는 값
}
// 3가지 값은 필수로 받음

const useCreditCheck = ({
  onSuccess,
  onError,
  enabled,
}: useCreditCheckProps) => {
  return useQuery({
    queryKey: ['useCreditCheck'],
    queryFn: () => getCheckStatus(),
    enabled,
    refetchInterval: 2_000, // 2초마다 호출
    staleTime: 0, // 데이터가 오래되면 다시 호출
    onSuccess: (status) => {
      console.log('status:', status)
      // 'COMPLETE'상태면 조회성공!
      if (status === CHECK_STATUS.COMPLETE) {
        onSuccess(0)
      }
    },
    onError,
  })
}

const getCheckStatus = () => {
  const value = [
    CHECK_STATUS.READY,
    CHECK_STATUS.PROGRESS,
    CHECK_STATUS.COMPLETE,
    CHECK_STATUS.REJECT,
  ]

  const status = value[Math.floor(Math.random() * value.length)]

  if (status === 'REJECT') {
    throw new Error('신용점수 조회에 실패했습니다')
  }

  return status
}

export default useCreditCheck
