import { useSession } from 'next-auth/react'

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession()

  // status가 로딩이명 아직 인증에 대한 처리를 하는중이므로 렌더링 x
  // 해당 분기처리를 안해주면 렌더링 중 처음에 인증 처리 하는 중 세션이 undefined로 나옴
  // 이렇게 해주면 인증이 완료된 상태로 그려진다 라는 걸 보장할 수 있음
  if (status === 'loading') return null

  return <>{children}</>
}

export default AuthGuard
