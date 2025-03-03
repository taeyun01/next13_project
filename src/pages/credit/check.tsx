import useCreditCheck from '@/components/credit/hooks/useCreditCheck'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import FullPageLoader from '@/components/shared/FullPageLoader'
import { CHECK_STATUS } from '@/constants/credit'
import { useAlertContext } from '@/contexts/AlertContext'
import useUser from '@/hooks/useUser'
import { updateCredit } from '@/remote/credit'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'

const CreditCheckPage = () => {
  // 폴링상태를 체크하여 성공 또는 실패가 호출됐다면 폴링을 중지
  const [readyToPoll, setReadyToPoll] = useState(true)
  const showAlert = useAlertContext()
  const user = useUser()

  const { mutate } = useMutation({
    mutationFn: (creditScore: number) =>
      updateCredit({ userId: user?.id as string, creditScore }),
  })

  const { data: status } = useCreditCheck({
    onSuccess: (creditScore) => {
      // console.log('조회성공 나의 신용점수는!?', creditScore + '점')
      setReadyToPoll(false)
      mutate(creditScore)
    },
    onError: () => {
      setReadyToPoll(false)
      showAlert?.open({
        title: '신용점수 조회에 실패했어요',
        description: '잠시 후 다시 시도해주세요',
        onButtonClick: () => window.history.back(),
      })
    },
    enabled: readyToPoll,
  })

  return (
    <div>
      <FullPageLoader message={STATUS_CHECK_MESSAGE[status ?? 'READY']} />
      {status === CHECK_STATUS.COMPLETE && (
        <FixedBottomButton
          color="basic"
          label="확인"
          onClick={() => window.history.back()}
        />
      )}
    </div>
  )
}

const STATUS_CHECK_MESSAGE = {
  [CHECK_STATUS.READY]: '신용점수 조회를 위해 정보를 준비하고 있어요',
  [CHECK_STATUS.PROGRESS]: '신용정보를 조회중입니다. 잠시만 기다려주세요',
  [CHECK_STATUS.COMPLETE]: '신용점수 조회가 완료되었습니다',
}

export default CreditCheckPage
