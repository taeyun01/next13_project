import withAuth from '@/hooks/withAuth'

import TextField from '@/components/shared/TextField'
import Flex from '@/components/shared/Flex'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import dynamic from 'next/dynamic'
import { format } from 'date-fns'
import { Piggybank } from '@/types/piggybank'
import useUser from '@/hooks/useUser'

const FixedBottomButton = dynamic(
  () => import('@/components/shared/FixedBottomButton'),
  {
    ssr: false, // 서버 사이드 렌더링 방지
  },
)

import { useMutation } from '@tanstack/react-query'
import { createPiggybank } from '@/remote/piggybank'
import { useAlertContext } from '@/contexts/AlertContext'

const NewPiggybankPage = () => {
  const showAlert = useAlertContext()
  const [formValues, setFormValues] = useState({
    name: '',
    endDate: '',
    goalAmount: '',
  })

  const user = useUser()

  const { mutate, isLoading } = useMutation(
    (newPiggybank: Piggybank) => createPiggybank(newPiggybank),
    {
      onSuccess: () => {
        showAlert?.open({
          title: '저금통 생성 완료',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
      onError: () => {
        showAlert?.open({
          title: '저금통을 만들지 못했어요',
          description: '잠시 후 다시 시도해주세요',
          onButtonClick: () => {
            window.history.back()
          },
        })
      },
    },
  )

  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [e.target.name]: e.target.value,
    }))
  }, [])

  const handleSubmit = () => {
    // 새로운 저금통 정보
    const newPiggybank = {
      ...formValues,
      goalAmount: Number(formValues.goalAmount),
      userId: user?.id as string,
      startDate: new Date(),
      endDate: new Date(formValues.endDate),
      balance: 0,
    } as Piggybank

    mutate(newPiggybank)
  }

  // 오늘 날짜부터 선택할 수 있도록 최소 날짜 설정
  const minDate = useMemo(() => format(new Date(), 'yyyy-MM-dd'), [])

  return (
    <div>
      <Flex direction="column" gap={8} style={{ padding: 24 }}>
        <TextField
          name="name"
          label="통장이름"
          value={formValues.name}
          onChange={handleFormValues}
        />
        <TextField
          name="endDate"
          type="date"
          label="종료일자"
          min={minDate}
          value={formValues.endDate}
          onChange={handleFormValues}
        />
        <TextField
          name="goalAmount"
          type="number"
          label="목표금액"
          value={formValues.goalAmount}
          onChange={handleFormValues}
        />
      </Flex>
      <FixedBottomButton
        disabled={isLoading}
        label="저금통 생성하기"
        onClick={handleSubmit}
      />
    </div>
  )
}

export default withAuth(NewPiggybankPage)
