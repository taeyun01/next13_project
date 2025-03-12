import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'
import useUser from '@/hooks/useUser'
import {
  getPiggybankSaving,
  updatePiggybankSaving,
} from '@/remote/piggybanksaving'
import { Piggybank } from '@/types/piggybank'
import addDelimiter from '@/utils/addDelimiter'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useRouter } from 'next/router'
import { useState } from 'react'

const PiggybankSavingPage = () => {
  // TODO: 저금하기
  // 현재 저금한 내역
  // 저금할 금액 인풋
  // 저금하기 버튼 누를 시 "정말 이 금액을 저금할까요??" 경고창 띄우기
  // DB 업데이트 현재 저금액에 + 하기
  // "저금 완료" 띄우기

  const [savingAmount, setSavingAmount] = useState(0)
  const navigate = useRouter()

  const user = useUser()

  const params = useParams()

  const { data: piggybankSaving } = useQuery({
    queryKey: ['piggybankSaving', params?.id],
    queryFn: () => getPiggybankSaving(params?.id as string),
    suspense: true,
    enabled: !!user,
  })

  const { userId, name, startDate, endDate, balance, goalAmount } =
    piggybankSaving as Piggybank

  const handleSubmit = async () => {
    if (savingAmount > goalAmount - balance) {
      alert('저금할 금액이 목표 금액을 초과합니다.')
      return
    }

    const isConfirmed = confirm(
      `${addDelimiter(savingAmount)}원을 저금하시겠습니까?`,
    )
    if (!isConfirmed) return

    await updatePiggybankSaving(params?.id as string, savingAmount)
    alert('저금이 완료되었습니다.')
    setSavingAmount(0)
    navigate.push('/account')
  }

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
        <Input
          value={savingAmount}
          onChange={(e) => setSavingAmount(Number(e.target.value))}
          placeholder="저금할 금액을 입력해주세요."
          type="number"
          max={goalAmount - balance}
          min={0}
        />
        <Button color="basic" size="medium" onClick={handleSubmit}>
          저금하기
        </Button>
      </Flex>
    </div>
  )
}

export default PiggybankSavingPage
