import Button from '@/components/shared/Button'
import CreditScoreChart from '@/components/shared/CreditScoreChart'
import Flex from '@/components/shared/Flex'
import Skeleton from '@/components/shared/Skeleton'
import Text from '@/components/shared/Text'
import Link from 'next/link'

const CreditScore = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column" gap={8}>
          <Text bold>
            나의 신용도를 증명하고 <br />
            점수를 올리세요
          </Text>
          <Link href="/credit">
            <Button color="basic">내 신용점수 보러가기</Button>
          </Link>
        </Flex>
        <CreditScoreChart width={80} height={80} score={500} />
      </Flex>
    </div>
  )
}

export const CreditScoreSkeleton = () => {
  return (
    <div style={{ padding: '24px' }}>
      <Flex justify="space-between" align="center">
        <Flex direction="column" gap={8}>
          <Skeleton width={155} height={50} />
          <Skeleton width={155} height={31} />
        </Flex>
      </Flex>
    </div>
  )
}

export default CreditScore
