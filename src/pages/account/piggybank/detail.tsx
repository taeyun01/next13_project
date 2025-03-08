import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import PiggybankRow from '@/components/account/PiggybankRow'
const PiggybankDetail = () => {
  // TODO : 통장 리스트 정렬 및 필터링 구현하기

  /* 
     1. 해당 유저의 통장 리스트 조회
     2. 진행중인 통장, 종료된 통장 분리
  */
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
