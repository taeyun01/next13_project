import EventBannerAddButton from '@/components/test/EventBannerAddButton'
import CardListAddButton from '@/components/test/CardListAddButton'
import Flex from '@/components/shared/Flex'
import Text from '@/components/shared/Text'
import Spacing from '@/components/shared/Spacing'
import EventForm from '@/components/test/EventForm'

const TestPage = () => {
  return (
    <Flex direction="column">
      <Flex direction="column" gap={8} style={{ padding: '12px 24px' }}>
        <Text bold>이벤트 배너</Text>
        <EventBannerAddButton />
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <Flex direction="column" gap={8} style={{ padding: '12px 24px' }}>
        <Text bold>카드 리스트</Text>
        <CardListAddButton />
      </Flex>
      <Spacing
        size={8}
        backgroundColor="gray100"
        style={{ margin: '20px 0' }}
      />
      <EventForm />
    </Flex>
  )
}

export default TestPage
