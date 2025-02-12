import { collection, doc, setDoc, getDoc } from 'firebase/firestore'

import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'

// 어떤 유저가 어떤 약관에 동의 했는지 저장
export const setTerms = async ({
  userId,
  termIds,
}: {
  userId: string
  termIds: string[]
}) => {
  return setDoc(doc(collection(store, COLLECTIONS.TERMS), userId), {
    // 저장되는 값들
    userId,
    termIds,
  })
}

// 유저가 약관동의를 했는지 확인
export const getTerms = async (userId: string) => {
  const snapshot = await getDoc(
    doc(collection(store, COLLECTIONS.TERMS), userId),
  )

  // 유저의 약관동의 문서가 존재하지 않으면 null 반환
  if (!snapshot.exists()) {
    return null
  }

  return {
    id: snapshot.id,
    ...(snapshot.data() as {
      userId: string
      termIds: string[]
    }),
  }
}
