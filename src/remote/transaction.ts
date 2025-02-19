import { Transaction } from '@/types/transaction'

import { collection, doc, setDoc } from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

// 거래 내역 생성
export const createTransaction = async (newTransaction: Transaction) => {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}
