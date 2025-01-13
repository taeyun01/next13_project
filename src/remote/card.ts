import { COLLECTIONS } from '@/constants/collection'
import { store } from '@/remote/firebase'
import { Card } from '@/types/card'
import {
  QuerySnapshot,
  query,
  collection,
  startAfter,
  limit,
  getDocs,
  where,
} from 'firebase/firestore'

//* 전체 카드 리스트 조회
export const getCards = async (pageParam?: QuerySnapshot<Card>) => {
  // pageParam이 null이면 첫 호출, 아니면 페이징이 필요한 상태
  const cardQuery = !pageParam
    ? query(collection(store, COLLECTIONS.CARD), limit(15)) // 첫 호출시 15개 조회
    : query(
        collection(store, COLLECTIONS.CARD),
        startAfter(pageParam), // 이전 호출 결과의 마지막 데이터를 시작으로 15개 조회
        limit(15),
      )

  const cardSnapshot = await getDocs(cardQuery) // 쿼리 결과 가져오기

  // 이 마지막요소(lastVisible)를 pageParam으로 넘겨서 이 요소로 부터 15개를 불러오도록 함
  const lastVisible = cardSnapshot.docs[cardSnapshot.docs.length - 1] // 마지막 데이터 가져오기

  // 우리가 사용할 실제 데이터
  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return { items, lastVisible }
}

// 해당 키워드로 시작하는 카드들을 찾도록 간단하게 구현
export const getSearchCards = async (keyword: string) => {
  // 검색 쿼리
  const searchQuery = query(
    collection(store, COLLECTIONS.CARD),
    where('name', '>=', keyword),
    where('name', '<=', keyword + '\uf8ff'), // '\uf8ff') 이 유니코드 문자는 문자들 중에 가장 큰 값을 의미
  ) //* //////////////////////////////////////  키워드로 시작하는 모든 카드들을 찾으라는 의미

  const cardSnapshot = await getDocs(searchQuery)

  const items = cardSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Card),
  }))

  return items
}
