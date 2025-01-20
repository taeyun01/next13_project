import { getEvent } from '@/remote/event'
import { Event } from '@/types/event'
import { GetServerSidePropsContext } from 'next'

interface EventPageProps {
  initialEvent: Event
  id: string
}

const EventPage = ({ initialEvent, id }: EventPageProps) => {
  console.log('initialEvent', initialEvent)
  console.log('id', id)

  return <div>EventPage</div>
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query

  const event = await getEvent(id as string)

  console.log('event', event)

  return {
    props: {
      id,
      initialEvent: event,
    },
  }
}

export default EventPage
