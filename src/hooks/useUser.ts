import { User } from '@/types/user'
import { useSession } from 'next-auth/react'

const useUser = () => {
  const { data } = useSession()

  // 로그인 안했으면 null 반환, 했으면 유저정보 반환
  return !data ? null : (data.user as User)
}

export default useUser
