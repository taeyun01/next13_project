import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Button from '@/components/shared/Button'
import Image from 'next/image'
import { css } from '@emotion/react'

import useAccount from '@/hooks/useAccount'
import useUser from '@/hooks/useUser'
import addDelimiter from '@/utils/addDelimiter'
import Link from 'next/link'

//* 자산 관련 정보를 보여주는 컴포넌트
const Account = () => {
  const { data: account } = useAccount()
  const user = useUser()

  // 계좌가 없을 때
  if (!account) {
    return (
      <div style={{ padding: '24px' }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column" gap={8}>
            <Text bold css={textStyles}>
              {`계좌 개설이\n더 쉽고 빨라 졌어요`}
            </Text>
            <Link href="/account/new">
              <Button color="basic">3분만에 개설하기</Button>
            </Link>
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

  // 계좌개설은 했지만 심사중 일때
  if (account.status === 'READY') {
    return (
      <div style={{ padding: '24px' }}>
        <Flex justify="space-between" align="center">
          <Flex direction="column" gap={8}>
            <Text bold css={textStyles}>
              계좌개설 심사중입니다.
            </Text>
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

  // 계좌개설이 완료되어 계좌가 있을 때
  return (
    <div style={{ padding: '24px' }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column" gap={2}>
          <Text typography="t6" color="gray600">
            {user?.name} 회원님의 자산
          </Text>
          <Text typography="t3" bold>
            {addDelimiter(account.balance)}원
          </Text>
        </Flex>
        <Button color="basic">분석</Button>
      </Flex>
    </div>
  )
}

const textStyles = css`
  white-space: pre-line; // \n 줄바꿈 적용
`

export default Account
