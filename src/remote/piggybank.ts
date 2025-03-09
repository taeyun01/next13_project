import { Piggybank } from '@/types/piggybank'
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

export const createPiggybank = (newPiggybank: Piggybank) => {
  return setDoc(doc(collection(store, COLLECTIONS.PIGGYBANK)), newPiggybank)
}

export const getPiggybank = async (userId: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      where('endDate', '>=', new Date()),
      orderBy('endDate', 'asc'), // 가장 최근순
      limit(1),
    ),
  )

  if (querySnapshot.docs.length === 0) {
    return null
  }

  // 문서의 첫번째 요소를 가져옴
  const piggybank = querySnapshot.docs[0].data()

  return {
    id: querySnapshot.docs[0].id,
    ...(piggybank as Piggybank),
    startDate: piggybank.startDate.toDate(), // 파이어 베이스에서 Date를 타임스태프로 바꿔버리기 때문에 다시 가지고 와서 Date 타입으로 변경해줘야함
    endDate: piggybank.endDate.toDate(),
  }
}

// 해당 유저가 가지고 있는 통장 전부 조회
export const getPiggybankList = async (userId: string) => {
  const querySnapshot = await getDocs(
    query(
      collection(store, COLLECTIONS.PIGGYBANK),
      where('userId', '==', userId),
      orderBy('endDate', 'asc'), // 가장 최근순
    ),
  )

  if (querySnapshot.docs.length === 0) {
    return null
  }

  const piggybankList = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Piggybank),
    startDate: doc.data().startDate.toDate(),
    endDate: doc.data().endDate.toDate(),
  }))

  return piggybankList
}
