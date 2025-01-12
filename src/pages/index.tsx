import dynamic from 'next/dynamic'

import Account from '@/components/home/Account'
import { BannerSkeleton } from '@/components/home/EventBanners'
import { CreditScoreSkeleton } from '@/components/home/CreditScore'
import Spacing from '@/components/shared/Spacing'
import { CardListSkeleton } from '@/components/home/CardList'

//* dynamic은 리액트 lazy와 suspense가 합쳐져 있다고 생각. (코드 컴포넌트 청크가 분리됨)
const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false, // 해당 컴포넌트를 서버사이드 렌더링 할건지 여부 (false 시 클라이언트 사이드 렌더링) 배너는 빨리 보여줘야되는 데이터가 아니므로 csr 사용
  loading: () => <BannerSkeleton />, // 기본값 null
})

const CreditScore = dynamic(() => import('@/components/home/CreditScore'), {
  ssr: false, // 해당 컴포넌트를 서버사이드 렌더링 할건지 여부 (false 시 클라이언트 사이드 렌더링) 배너는 빨리 보여줘야되는 데이터가 아니므로 csr 사용
  loading: () => <CreditScoreSkeleton />,
})

const CardList = dynamic(() => import('@/components/home/CardList'), {
  ssr: false,
  loading: () => <CardListSkeleton />,
})

export default function Home() {
  return (
    <>
      <EventBanners />
      {/* 자산은 빨리 유저에게 보여줘야할 정보라 서버사이드 렌더링 */}
      <Account />
      <Spacing size={8} backgroundColor="gray100" />
      <CreditScore />
      <Spacing size={8} backgroundColor="gray100" />
      <CardList />
    </>
  )
}
