import { getCards } from '@/remote/card'
import { useQuery } from '@tanstack/react-query'

const useCards = () => {
  const { data } = useQuery({
    queryKey: ['cards'],
    queryFn: () => getCards(),
    suspense: false,
  })

  return { data }
}

export default useCards
