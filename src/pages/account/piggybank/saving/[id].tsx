import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import useUser from '@/hooks/useUser'
import { getPiggybankSaving } from '@/remote/piggybanksaving'
import { Piggybank } from '@/types/piggybank'
import addDelimiter from '@/utils/addDelimiter'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

const PiggybankSavingPage = () => {
  // TODO: 저금하기
  // 현재 저금한 내역
  // 저금할 금액 인풋
  // 저금하기 버튼 누를 시 "정말 이 금액을 저금할까요??" 경고창 띄우기
  // DB 업데이트 현재 저금액에 + 하기
  // "저금 완료" 띄우기

  const user = useUser()

  const params = useParams()

  const { data: piggybankSaving } = useQuery({
    queryKey: ['piggybankSaving', params?.id],
    queryFn: () => getPiggybankSaving(params?.id as string),
    suspense: true,
    enabled: !!user,
  })

  console.log('id', params?.id)
  console.log('piggybankSaving', piggybankSaving)

  const { userId, name, startDate, endDate, balance, goalAmount } =
    piggybankSaving as Piggybank
  return (
    <div>
      <Top
        title="얼마를 저금할까요?"
        subtitle="저금할 금액을 채우고 목표를 달성해보아요!"
      />

      <Flex direction="column" gap={12} style={{ padding: '0 24px' }}>
        <Text bold typography="t6">
          통장: {name}
        </Text>
        <Text bold typography="t6" color="gray700">
          현재 저금한 내역: {addDelimiter(balance)}원
        </Text>
        <Text bold typography="t6" color="blue">
          목표 금액: {addDelimiter(goalAmount)}원
        </Text>
        <Text bold typography="t6" color="red">
          남은 금액: {addDelimiter(goalAmount - balance)}원
        </Text>
        <Input placeholder="저금할 금액을 입력해주세요." type="number" />
        <Button color="basic" size="medium">
          저금하기
        </Button>
      </Flex>
    </div>
  )
}

export default PiggybankSavingPage
