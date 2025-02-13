import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Image from 'next/image'
import { css } from '@emotion/react'

//* 자산 관련 정보를 보여주는 컴포넌트
const Account = () => {
  const hasAccount = true

  // 계좌가 있을 때
  if (hasAccount) {
    return (
      <div style={{ padding: '24px' }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column" gap={2}>
            <Text typography="t6" color="gray600">
              새우깡 회원님의 자산
            </Text>
            <Text typography="t3" bold>
              12,000원
            </Text>
          </Flex>
          <Button color="basic">분석</Button>
        </Flex>
      </div>
    )
  }

  // 계좌가 없을 때
  // 또는 계좌를 개설중 일 때 (계좌개설을 완료하지 않은 상태)

  const isAccountCreating = 'READY'
  const title =
    isAccountCreating === 'READY'
      ? '만들고 있으신\n계좌가 있으시군요.'
      : '계좌 개설이\n더 쉽고 빨라 졌어요'

  const buttonLabel =
    isAccountCreating === 'READY' ? '이어 만들기' : '3분만에 개설하기'

  return (
    <div style={{ padding: '24px' }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column" gap={8}>
          <Text bold css={textStyles}>
            {title}
          </Text>
          <Button color="basic">{buttonLabel}</Button>
        </Flex>
        <Image
          src="https://cdn2.iconfinder.com/data/icons/flat-icons-19/512/Coin.png"
          alt="cash icon"
          width={80}
          height={80}
        />
      </Flex>
    </div>
  )
}

const textStyles = css`
  white-space: pre-line; // \n 줄바꿈 적용
`

export default Account
