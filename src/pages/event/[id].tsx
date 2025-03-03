import Preview from '@/components/event/Preview'
import Alert from '@/components/shared/Alert'
import { useAlertContext } from '@/contexts/AlertContext'
import { getEvent } from '@/remote/event'
import { Event } from '@/types/event'
import { useQuery } from '@tanstack/react-query'
import { isAfter, parseISO } from 'date-fns'
import { GetServerSidePropsContext } from 'next'

interface EventPageProps {
  initialEvent: Event
  id: string
}

const EventPage = ({ initialEvent, id }: EventPageProps) => {
  const show = useAlertContext()

  //* initialEvent 데이터를 서버사이드측에서 못 불러올 수도 있으니까 클라쪽에서도 처리
  const { data } = useQuery({
    queryKey: ['event', id],
    queryFn: () => getEvent(id),
    initialData: initialEvent, // 서버측에 불러온 initialEvent가 있으면 그걸 초기 데이터로 사용, 없으면 useQuery로 불러옴
    // useQuery가 성공적으로 완료되면 호출되는 콜백 함수
    onSuccess: (event) => {
      // 이벤트가 종료되었는지 확인
      const isEventExist = isAfter(new Date(), parseISO(event.endDate))
      // console.log('isEventExist', isEventExist)
      if (isEventExist) {
        show?.open({
          title: `'${event.title}' 이벤트가 종료되었어요`,
          description: '다음에 더 좋은 이벤트로 찾아오겠습니다',
          onButtonClick: () => window.history.back(),
        })
      }
    },
  })

  if (!data) return null

  return <Preview data={data} mode="preview" />
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query

  const event = await getEvent(id as string)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}

export default EventPage
