import { useEventBanners } from '@/components/home/hooks/useEventBanners'
import Flex from '@/components/shared/Flex'
import withSuspense from '@/components/shared/hocs/withSuspense'
import Text from '@/components/shared/Text'
import Link from 'next/link'
import { css } from '@emotion/react'

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

import Skeleton from '@/components/shared/Skeleton'
import Image from 'next/image'

const EventBanners = () => {
  const { data } = useEventBanners()

  return (
    <div>
      <Swiper spaceBetween={8} slidesPerView={1.04}>
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

export default withSuspense(EventBanners, {
  fallback: <Skeleton width="100%" height={106} style={{ borderRadius: 8 }} />,
})
