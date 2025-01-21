import { collection, doc, setDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { store } from '@/remote/firebase'

// 우선 어떤 유저가 몇점의 신용점수를 가지고 있는지 판단하기 위해 userId와 creditScore을 받음
export const updateCredit = ({
  userId,
  creditScore,
}: {
  userId: string
  creditScore: number
}) => {
  // CREDIT컬렉션의 접근하는데 문서id는 userId랑 같게 만들어줌 하나의 유저는 하나의 신용점수만 가지고 있으니까
  return setDoc(doc(collection(store, COLLECTIONS.CREDIT), userId), {
    // 저장되는 데이터
    userId,
    creditScore,
  })
}
