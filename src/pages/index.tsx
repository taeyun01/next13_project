import styled from '@emotion/styled'

import dynamic from 'next/dynamic'
import Skeleton from '@/components/shared/Skeleton'

//* dynamic은 리액트 lazy와 suspense가 합쳐져 있다고 생각. (코드 컴포넌트 청크가 분리됨)
const EventBanners = dynamic(() => import('@/components/home/EventBanners'), {
  ssr: false, // 해당 컴포넌트를 서버사이드 렌더링 할건지 여부 (false 시 클라이언트 사이드 렌더링) 배너는 빨리 보여줘야되는 데이터가 아니므로 csr 사용
  loading: () => (
    <Skeleton width="100%" height={106} style={{ borderRadius: 8 }} />
  ), // 기본값 null
})

export default function Home() {
  return (
    <ContainerStyled>
      <EventBanners />
    </ContainerStyled>
  )
}

const ContainerStyled = styled.div`
  padding: 24px;
`
