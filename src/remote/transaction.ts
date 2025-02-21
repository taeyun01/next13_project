import {
  Transaction,
  TransactionFilterType,
  TransactionType,
} from '@/types/transaction'

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
  filter = 'all', // 기본 필터는 all
}: {
  pageParam?: QuerySnapshot<TransactionType>
  userId: string
  filter?: TransactionFilterType
}) => {
  const transactionQuery = generateQuery({ filter, pageParam, userId })

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

const generateQuery = ({
  filter,
  pageParam,
  userId,
}: {
  filter: TransactionFilterType
  pageParam?: QuerySnapshot<TransactionType>
  userId: string
}) => {
  const baseQuery = query(
    collection(store, COLLECTIONS.TRANSACTION),
    where('userId', '==', userId),
    orderBy('date', 'desc'),
    limit(15),
  )

  if (filter !== 'all') {
    if (!pageParam) {
      return query(baseQuery, where('type', '==', filter))
    }

    return query(baseQuery, startAfter(pageParam), where('type', '==', filter))
  } else {
    // filter === 'all' 이면
    // pageParam이 null이면 전체호출
    if (!pageParam) {
      return baseQuery
    }

    return query(baseQuery, startAfter(pageParam))
  }
}
