import { Transaction, TransactionType } from '@/types/transaction'

import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
  where,
} from 'firebase/firestore'
import { store } from '@/remote/firebase'
import { COLLECTIONS } from '@/constants/collection'

// 거래 내역 생성
export const createTransaction = async (newTransaction: Transaction) => {
  return setDoc(doc(collection(store, COLLECTIONS.TRANSACTION)), newTransaction)
}

// 거래 내역 조회
export const getTransactions = async ({
  pageParam,
  userId,
}: {
  pageParam?: QuerySnapshot<TransactionType>
  userId: string
}) => {
  const transactionQuery = !pageParam
    ? query(
        collection(store, COLLECTIONS.TRANSACTION),
        where('userId', '==', userId),
        orderBy('date', 'desc'), // 날짜 기준 내림차순 정렬 (최신순)
        limit(15),
      )
    : query(
        collection(store, COLLECTIONS.TRANSACTION),
        where('userId', '==', userId),
        orderBy('date', 'desc'),
        startAfter(pageParam), // 이전 페이지의 마지막 문서를 기준으로 다음 페이지 조회
        limit(15),
      )

  // 거래 내역 조회
  const transactionSnapshot = await getDocs(transactionQuery)
  // 마지막 문서 조회
  const lastVisible =
    transactionSnapshot.docs[transactionSnapshot.docs.length - 1]

  const items = transactionSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Transaction),
  }))

  return {
    items,
    lastVisible,
  }
}
