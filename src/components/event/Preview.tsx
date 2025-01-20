import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import { Event } from '@/types/event'

import ReactMarkdown from 'react-markdown'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { css } from '@emotion/react'

import { typographyMap } from '@/styles/typography'
import Button from '@/components/shared/Button'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  { ssr: false },
)

const Preview = ({ data, mode }: { data: Event; mode: 'preview' | 'edit' }) => {
  const router = useRouter()

  const { title, subtitle, buttonLabel, link, contents } = data
  return (
    <Flex direction="column" gap={16}>
      <Flex style={{ padding: '12px 24px' }} direction="column">
        <Text bold>{title}</Text>
        <Text typography="t6">{subtitle}</Text>
      </Flex>

      <div>
        <ReactMarkdown css={markdownStyles}>{contents}</ReactMarkdown>
      </div>

      {mode === 'preview' ? (
        <FixedBottomButton
          label={buttonLabel}
          onClick={() => router.push(link)}
        />
      ) : (
        buttonLabel && <Button>{buttonLabel}</Button>
      )}
    </Flex>
  )
}

const markdownStyles = css`
  padding: 0px 24px;
  ${typographyMap.t6};

  h1 {
    ${typographyMap.t3};
    font-weight: bold;
    margin: 14px 0;
  }

  h2 {
    ${typographyMap.t4};
    font-weight: bold;
    margin: 12px 0;
  }

  h3 {
    ${typographyMap.t5};
    font-weight: bold;
    margin: 10px 0;
  }

  ul {
    padding-inline-start: 24px;
    margin: 0px 0;
  }

  li {
    list-style-type: disc; // 채워진 원
    line-height: 1.75;
    // list-style-type: circle; // 빈 원
    //  list-style-type: square; // 채워진 사각형
    // list-style-type: decimal; // 숫자(1,2,3..)
    //  list-style-type: none; // 없음
  }

  p {
    margin: 18px 0;
  }

  img {
    width: 100%;
    height: 350px;
    object-fit: cover;
    border-radius: 8px;
  }
`

export default Preview
