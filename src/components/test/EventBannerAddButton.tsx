import { collection, writeBatch, doc } from 'firebase/firestore'

import Button from '@shared/Button'
import { store } from '@/remote/firebase'
import { EVENT_BANNERS } from '@/mock/banner'
import { COLLECTIONS } from '@/constants/collection'

const EventBannerAddButton = () => {
  const handleButtonClick = async () => {
    try {
      const batch = writeBatch(store) // 배치 생성

      EVENT_BANNERS.forEach((banner) => {
        const bannerRef = doc(collection(store, COLLECTIONS.EVENT_BANNER)) // EVENT_BANNER 문서 생성

        batch.set(bannerRef, banner) // EVENT_BANNER 문서에 배너 데이터 추가
      })

      await batch.commit() // 배치 커밋 (데이터 반영)

      alert('배너 데이터가 추가되었습니다')
    } catch (error) {
      console.error(error)
      alert('배너 데이터 추가 실패')
    }
  }

  return <Button onClick={handleButtonClick}>이벤트 배너 데이터 추가</Button>
}

export default EventBannerAddButton
