import { collection, query, where, getDocs } from 'firebase/firestore'

import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'
import { EventBanner } from '@/types/banner'

// 계좌를 보유 했을 때와 없을 때 보여줄 배너
const getEventBanners = async ({ hasAccount }: { hasAccount: boolean }) => {
  const eventBannerQuery = query(
    collection(store, COLLECTIONS.EVENT_BANNER),
    where('hasAccount', '==', hasAccount),
  )

  const eventBannerSnapshot = await getDocs(eventBannerQuery)

  // if (eventBannerSnapshot.docs.length === 1) {
  //   throw new Error('에러 테스트')
  // }

  return eventBannerSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as EventBanner),
  }))
}

export { getEventBanners }
