import Button from '@/components/shared/Button'
import Flex from '@/components/shared/Flex'
import Input from '@/components/shared/Input'
import Text from '@/components/shared/Text'
import Top from '@/components/shared/Top'

const PiggybankSavingPage = () => {
  // TODO: 저금하기
  // 현재 저금한 내역
  // 저금할 금액 인풋
  // 저금하기 버튼 누를 시 "정말 이 금액을 저금할까요??" 경고창 띄우기
  // DB 업데이트 현재 저금액에 + 하기
  // "저금 완료" 띄우기
  //
  return (
    <div>
      <Top
        title="얼마를 저금할까요?"
        subtitle="저금할 금액을 채우고 목표를 달성해보아요!"
      />

      <Flex direction="column" gap={12} style={{ padding: '0 24px' }}>
        <Text bold typography="t5">
          현재 저금한 내역: 10,000원
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
