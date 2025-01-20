import { getCards } from '@/remote/card'
import { useQuery } from '@tanstack/react-query'

const useCards = () => {
  const { data } = useQuery({
    queryKey: ['home-cards'],
    queryFn: () => getCards(),
    suspense: true,
  })

  return { data }
}

export default useCards
