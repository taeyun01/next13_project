import { useEventBanners } from '@/components/home/hooks/useEventBanners'
import Flex from '@/components/shared/Flex'
import withSuspense from '@/hooks/withSuspense'
import Text from '@/components/shared/Text'
import Link from 'next/link'
import { css } from '@emotion/react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import Skeleton from '@/components/shared/Skeleton'
import Image from 'next/image'
import useAccount from '@/hooks/useAccount'
import ErrorBoundary from '@/components/shared/ErrorBoundary'

const EventBanners = () => {
  const { data } = useEventBanners()
  const { data: account } = useAccount()

  const accountStatus = account?.status === 'DONE' ? 0 : 1.04

  return (
    <div style={{ padding: '24px' }}>
      <Swiper spaceBetween={8} slidesPerView={accountStatus}>
        {data?.map((banner) => (
          <SwiperSlide key={banner.id}>
            <Link href={banner.link}>
              <Flex
                style={{ backgroundColor: banner.backgroundColor }}
                justify="space-between"
                align="center"
                css={bannerStyles}
              >
                {/* 왼쪽 */}
                <Flex direction="column" gap={10}>
                  <Text bold>{banner.title}</Text>
                  <Text typography="t6">{banner.subTitle}</Text>
                </Flex>
                {/* 오른쪽 */}
                <Image
                  src={banner.iconUrl}
                  alt="배너 이미지"
                  width={40}
                  height={40}
                />
              </Flex>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

const bannerStyles = css`
  padding: 24px;
  border-radius: 8px;
`

const WrapErrorBoundary = () => {
  return (
    // <ErrorBoundary fallbackComponent={<></>}> // 아무것도 그리기 싫을 때
    <ErrorBoundary fallbackComponent={<BannerErrorFallback />}>
      <EventBanners />
    </ErrorBoundary>
  )
}

const BannerErrorFallback = () => {
  return (
    <div style={{ padding: 24 }}>
      <Text bold color="red">
        이벤트 배너에 문제가 생겼어요
      </Text>
      <Skeleton width="100%" height={106} style={{ borderRadius: 8 }} />
    </div>
  )
}

export const BannerSkeleton = () => {
  return (
    <div style={{ padding: 24 }}>
      <Skeleton width="100%" height={106} style={{ borderRadius: 8 }} />
    </div>
  )
}

export default withSuspense(WrapErrorBoundary, {
  fallback: <BannerSkeleton />,
})
