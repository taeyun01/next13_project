import { collection, doc, getDoc, setDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@constants/collection'
import { store } from '@/remote/firebase'
import { Credit } from '@/types/credit'

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

export const getCredit = async (userId: string) => {
  const creditSnapshot = await getDoc(
    doc(collection(store, COLLECTIONS.CREDIT), userId),
  )

  // 신용점수 조회를 했는데 없으면 유저가 아직 신용점수를 조회하지 않았기 때문에 null반환
  if (!creditSnapshot.exists()) {
    return null
  }

  return {
    id: creditSnapshot.id,
    ...(creditSnapshot.data() as Credit),
  }
}
