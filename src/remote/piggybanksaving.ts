// 통장 저금 내역 조회 및 업데이트
// 파이어베이스 문서의 id를 받아 해당 저금 내역 조회
// 저금 금액 +

import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { Piggybank } from '@/types/piggybank'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'

// 통장 저금 내역 조회
export const getPiggybankSaving = async (docId: string) => {
  const docRef = doc(collection(store, COLLECTIONS.PIGGYBANK), docId)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as Piggybank
}

// 저금 금액 +
