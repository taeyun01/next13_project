import Top from '@/components/shared/Top'
import { getPiggybankList } from '@/remote/piggybank'
import useUser from '@/hooks/useUser'
import { useQuery } from '@tanstack/react-query'

const PiggybankDetail = () => {
  const user = useUser()

  const { data: piggybankList } = useQuery({
    queryKey: ['piggybankList', user?.id],
    queryFn: () => getPiggybankList(user?.id as string),
    suspense: true,
  })

  // console.log('user', user?.id)

  console.log('piggybankList', piggybankList)

  return (
    <div>
      {/* //TODO : 진행중인 목표 통장 리스트 구현하기 */}
      <Top
        title="진행중인 통장"
        subtitle="매일 매일 조금씩 저금하여 목표금액을 모아보아요!"
      />

      {/* //TODO : 종료된 목표 통장 리스트 구현하기 */}
      <Top title="종료된 통장" subtitle="" />
    </div>
  )
}

export default PiggybankDetail
